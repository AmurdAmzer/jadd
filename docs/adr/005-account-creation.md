# ADR-005: Teacher-created student accounts for M1

**Status:** Accepted, 24 Nov 2026
**Decider:** Ahmed Hamza

## Context

Jadd's first users are 11 students retaking the Algebra I Regents on 26 to 29 January 2027. The question was whether students should sign themselves up (for example with a Reddit-style random username), so that Jadd could later grow to a whole school or beyond without extra work for the teacher.

Self sign-up brings problems that teacher-created accounts do not have:

| Problem | Teacher-created | Self sign-up |
|---|---|---|
| Who can get in | only the teacher's students | anyone with the link, unless gated |
| Which class a student belongs to | known | needs a class code |
| Forgotten password | ask the teacher | needs email, or still asks the teacher |
| Bots and fake accounts | not possible | needs rate limiting, maybe a CAPTCHA |
| Student-data privacy | teacher controls the data | the school will ask questions |

The students are minors. New York Education Law 2-d (student data privacy) may apply to an app that stores student data, and COPPA applies to children under 13. How either applies to a teacher-built tool has not been checked.

## Decision

For M1:

- **The teacher creates every student account.** There is no sign-up page.
- **Usernames are random two-word names** (for example `blue-heron`). No real names, no email addresses.
- The teacher gives each student a temporary password. `mustChangePassword` is `true`, so the student sets their own on first login.
- A student who forgets their password asks the teacher.

## Alternatives considered

| Option | Why not now |
|---|---|
| Open sign-up (anyone with the link) | anyone could join; abuse and privacy risk |
| Class-code sign-up for this class only | about 1 extra week; delays practice questions before January |
| Class codes plus teacher accounts (whole school) | about 3 to 4 extra weeks; effectively a second app |

The time figures are rough estimates based on the pace of Phase 1.

## Consequences

- Phase 2 builds login and set-password only. No sign-up page, no email, no password-reset flow.
- The real 11 students are added by the teacher. Whether that is the seed script or a small admin script is decided in Phase 2.
- Class-code sign-up stays possible later and undoes nothing: one migration (a `Class` table and a `classId` on `Student`), a sign-up page, an API route, and rate limiting.
- **Before Jadd is offered beyond this one class:** check with the school or district about Education Law 2-d and any data-privacy agreement it requires.
- **Revisit** after the January 2027 Regents, or earlier if another teacher wants to use Jadd.