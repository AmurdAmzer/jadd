# ADR-003: Product names (Jadd for Regents, Koso for WASSCE)

**Status:** Accepted, 24 Oct 2026
**Decider:** Ahmed Hamza

## Context

"AdamsBrain" was both the repo name and the product name. Two problems:

1. It is long (three syllables) and does not read as a student-facing brand.
2. The engine is curriculum-agnostic. Regents Algebra 1 (US) is the first content pack and WASSCE Core Maths (Ghana) is planned. These two audiences should see **distinct brands**.

The names honour the founder's grandfather, Adams, who encouraged him to stay in school.

## Decision

| | Regents Algebra 1 (US) | WASSCE Core Maths (Ghana) |
|---|---|---|
| Brand | **Jadd** | **Koso** (provisional) |
| Meaning | Arabic جَدّ, "grandfather" | Twi *kɔ so*, "keep going" |
| Tutor persona | Mr. Adams | to decide when built |
| Repo | `jadd` | its own, decided when built |
| Vercel project | `jadd` | decided when built |
| Database | its own Neon project | decided when built |

- **The repo is renamed `jadd`** (`AmurdAmzer/jadd`). It is Jadd's codebase only.
- **Koso is out of scope for now.** Jadd is built without designing for Koso. When Koso starts, it gets its own codebase and picks what it needs from Jadd at that point.
- Product-wide text (name, tagline, tutor) lives in one small file, `lib/site.ts`, because several pages use it.
- Student-facing line for Jadd: **"Jadd: Algebra 1 practice with Mr. Adams"**.

## Alternatives considered

| Name | Why not |
|---|---|
| AdamsBrain | too long; not student-facing |
| Rungs | already used by other apps |
| StepWise, other "Step" names | taken or crowded (StepWise Math AI, StepMath, MathStep) |
| Daraj, Sankofa, Nyansa, Panin | already used by education products |
| Pappus, Papou, Paps | unfortunate sounds or meanings in English ("pus", "poo", slang) |
| Jaddi | good, but two syllables; Jadd is the plain word and one syllable |
| Footing, Trinn, Qadam, Sullam, Taid | viable, but less personal or with weaker fit |

## Consequences

- The top bar, tab title and icon show Jadd; the name comes from `lib/site.ts`.
- The old Vercel project (connected to `AdamsBrain-V0`) is renamed `adamsbrain-v0` and paused. A new Vercel project `jadd` deploys this repo.
- Docs that say "AdamsBrain" are updated over time. "AdamsBrain" is retired as a name; the Neon project may keep it, since the name does not affect connections.
- **Still to do before relying on either name commercially:** search the USPTO trademark database and both app stores; for Koso, confirm the Twi meaning with native speakers and check Ghana's Registrar-General.
- The name checks so far were quick web and app-store searches, not legal clearance.
