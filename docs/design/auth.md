# Jadd auth design (Phase 2)

Status: accepted, 27 Nov 2026. Decision record: ADR-004 (Better Auth), ADR-005 (teacher-created accounts).

## 1. The big picture

A login system does three jobs. Better Auth does the risky parts; Jadd decides who may see what.

| Job | Who does it | How |
|---|---|---|
| **Check** the password | Better Auth | finds the user by username, verifies the scrypt hash |
| **Remember** the student | Better Auth | a `session` row in Neon + a `session_token` cookie in the browser |
| **Forget** on log-out | Better Auth | deletes the session row, clears the cookie |
| **Guard** pages and API | Jadd code | every protected page and route asks "is there a valid session?" on the server |

```
browser ── cookie: session_token ──► Vercel (Jadd)
                                     ├─ app/api/auth/[...all]/route.ts   Better Auth's own endpoints
                                     ├─ lib/auth.ts                       Better Auth config (server)
                                     ├─ pages + API routes                call getSession() on the server
                                     └─ lib/db.ts ──► Neon: user, session, account, verification
```

## 2. Files we will add

| File | Job |
|---|---|
| `lib/auth.ts` | server config: Prisma adapter, email + password on, username plugin (`usernameValidator: isValidUsername`), `mustChangePassword` field, `nextCookies` plugin |
| `lib/auth-client.ts` | browser-side helper used by the login form (`signIn.username`, `signOut`) |
| `app/api/auth/[...all]/route.ts` | one line: `export const { GET, POST } = toNextJsHandler(auth);` Next.js sends every `/api/auth/...` request to Better Auth |
| `lib/session.ts` | our helper `requireStudent()`: get the session on the server, or redirect to `/login` |
| `app/login/page.tsx` | login form (screens 01, 02) |
| `app/set-password/page.tsx` | first-login password (screens 03, 04), stretch |

`[...all]` is a **catch-all** route: one folder matches `/api/auth/sign-in/username`, `/api/auth/sign-out`, and every other auth address.

## 3. Tables

Better Auth's CLI (`npx auth@latest generate`) writes these models into `schema.prisma`; we run the migration ourselves.

| Table | Holds | Jadd notes |
|---|---|---|
| `user` | id, name, email, emailVerified, createdAt, updatedAt, + `username`, `displayUsername` (plugin), + `mustChangePassword` (ours) | `email` = `<username>@students.jadd.invalid`; `name` = the username |
| `session` | token, userId, expiresAt, (ipAddress, userAgent) | one row per logged-in device |
| `account` | userId, providerId `credential`, the **password hash** | the hash lives here, not on `user` |
| `verification` | short-lived codes (email checks, resets) | created but unused by Jadd for now |

**Decided:** the old `Student` table is **dropped**; Better Auth's `user` table is Jadd's student record. It only held 2 test students, and keeping two tables in sync would be worse. `lib/students.ts` stays as Jadd's one door to student data; it reads `user` instead. Students never see or use the placeholder email.

**Knock-on changes to the ERD** (those tables don't exist yet, so this is a docs update only):
- `PROGRESS`, `ATTEMPT` and the practice-session table point to `user.id` instead of `STUDENT.id`. Better Auth ids are **text**, so `studentId` becomes text.
- The ERD's `SESSION` table (a 5-question practice session) is renamed **`PracticeSession`**, because Better Auth's `session` means a login.

## 4. Flows

**A. Log in**
1. Student types `blue-heron` + password on `/login`, presses Start.
2. Browser sends `POST /api/auth/sign-in/username` (JSON).
3. Better Auth lowercases the username, finds the `user`, verifies the hash in `account`.
4. Wrong? It returns an error; Jadd shows **one generic message**: "That username or password is not right."
5. Right? It creates a `session` row and sends back `Set-Cookie: session_token=...`.
6. Jadd sends the student to `/set-password` if `mustChangePassword` is true, otherwise home.

**B. Every protected page or API request**
1. The browser attaches the cookie automatically.
2. The page or route calls `auth.api.getSession({ headers })` on the server.
3. Better Auth looks the token up in `session`, checks it hasn't expired, and returns the user, or `null`.
4. `null`: a page redirects to `/login`; an API route returns **401**.

**C. Log out**
1. `POST /api/auth/sign-out`. 2. The session is ended and the cookie cleared. 3. The old token no longer works, even if copied.

**D. Teacher creates accounts (seed)**
The seed calls Better Auth on the server to create each student (username, placeholder email, temporary password), so the hash is made Better Auth's way. Public sign-up stays switched off. *To verify at install: the exact option that disables public sign-up, and that the seed can still create users.*

**E. First login (stretch)**
`/set-password` checks: at least 8 characters, both fields match. On success: the password changes, and **our code** sets `mustChangePassword` to false. The field is server-owned (`input: false`), so a browser can't flip it.

## 5. Threats and defences

| Threat | Defence |
|---|---|
| Guessing passwords | Better Auth's built-in rate limiting (on by default); one generic error message |
| Finding out which usernames exist | the same message for "no such user" and "wrong password" |
| Stealing the cookie with page scripts | cookie is `httpOnly`: JavaScript can't read it |
| Cookie sent over plain http | `Secure` on https (Vercel is https) |
| Another site submitting forms as the student (CSRF) | `SameSite=Lax` cookie + Better Auth checks the request's `Origin` |
| Old or copied token reused | sessions expire (default 7 days); log-out ends the session server-side |
| Trusting the cookie alone | never: every protected page and route validates the session on the server (a cookie-only check is only for fast redirects) |
| Teacher knows the first password | `mustChangePassword` forces a new one (stretch) |
| Leaking hashes or emails through our API | `select` allow-lists; the hash is in `account`, which our routes never read |

**Decided:** sessions keep the **default 7 days**. Each student has their own Chromebook (occasionally lent to a classmate); daily logins would add friction for little benefit, since the data is practice results only. Mitigation: a clear Log out button, and students are told to log out before lending. Shortening it later is a one-line change.

## 6. Order of work (Phase 2 sheet)

4. Install, config, generate models, migration. 5. Re-seed through Better Auth. 6 to 7. Login page and generic error [YOU]. 9. `requireStudent()` on every page. 10. 401 for API routes [YOU]. 11. Log out. 13. Deploy and test. 14 to 15. Set password (stretch).

## 7. Decisions (27 Nov)
1. `Student` table dropped; Better Auth's `user` table is the student record.
2. Sessions last 7 days (one Chromebook per student).
3. ERD: practice `SESSION` renamed `PracticeSession`; `studentId` columns become text.