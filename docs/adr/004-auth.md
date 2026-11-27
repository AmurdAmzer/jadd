# ADR-004: Better Auth for student login

**Status:** Accepted, 27 Nov 2026. Supersedes the Auth.js choice in ADR-001.
**Decider:** Ahmed Hamza

## Context

Phase 2 adds login. Students sign in with a username and password; there is no sign-up page and no email (ADR-005). Every page and API route must check the session on the server.

A login system does three jobs: **check** the password, **remember** the student across pages (a session), and **forget** them on log-out. "Remember" is the riskiest to build by hand: session tokens, cookie settings, expiry and revocation are where most attacks aim. So we use a maintained library rather than our own session code.

ADR-001 chose Auth.js. Since then (September 2025), Auth.js has moved to maintenance mode, with security patches only, and its maintainers (now the Better Auth team) point new projects to Better Auth.

## Decision

Use **Better Auth as a library in our own code**, with its Prisma adapter and its **username plugin**. Its tables live in our Neon database, defined in our Prisma schema and created by our own migrations.

How Jadd's needs are met:

| Need | How |
|---|---|
| Sign in with a username, not an email | username plugin (`signIn.username`) |
| Usernames like `blue-heron` (hyphens are not allowed by default) | `usernameValidator: isValidUsername`, reusing our existing rule (DRY) |
| No student email (ADR-005), but Better Auth requires one | a placeholder per student that can never be a real address: `<username>@students.jadd.invalid` |
| `mustChangePassword` on first login | a custom field on Better Auth's user record (exact option to confirm in the design doc) |

## Alternatives considered

| Option | Why not |
|---|---|
| Auth.js | maintenance mode; not a good base for a new project |
| Neon's managed Better Auth | less code, but less control and learning; its docs do not confirm username-plugin support; ties auth to one vendor |
| Our own sessions and cookies | the "remember" job is too easy to get subtly wrong; a library is safer |

## Consequences

- Better Auth adds its own tables (user, session, account, verification). How our `Student` table maps onto its user table is settled in the Phase 2 design doc, before any code.
- Passwords are hashed and checked by Better Auth, not by our bcrypt code. The two test students are re-seeded through Better Auth; this is cheap because they are test data.
- The plugin lowercases usernames by default, so `BLUE-HERON` typed at login matches `blue-heron`.
- Versions are checked at install time; Better Auth 1.7.28 was the latest stable when this was written.
- Revisit if Better Auth's username support changes, or if Jadd ever needs email or class-code sign-up.