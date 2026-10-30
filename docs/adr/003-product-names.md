# ADR-003: Product names (Jadd for Regents, Koso for WASSCE)

**Status:** Accepted, 24 Oct 2026
**Decider:** Ahmed Hamza

## Context

"AdamsBrain" was both the repo name and the product name. Two problems:

1. It is long (three syllables) and does not read as a student-facing brand.
2. The engine is curriculum-agnostic. Regents Algebra 1 (US) is the first content pack and WASSCE Core Maths (Ghana) is planned. These two audiences should see **distinct brands**, even though they share one codebase.

The names honour the founder's grandfather, Adams, who encouraged him to stay in school.

## Decision

| | Regents Algebra 1 (US) | WASSCE Core Maths (Ghana) |
|---|---|---|
| Brand | **Jadd** | **Koso** (provisional) |
| Meaning | Arabic جَدّ, "grandfather" | Twi *kɔ so*, "keep going" |
| Tutor persona | Mr. Adams | to decide when built |
| Repo | `jadd` | decided when built |
| Vercel project | `jadd` | its own project |
| Database | its own Neon project | its own Neon project |

- **The repo is renamed `jadd`** (`AmurdAmzer/jadd`). It holds the engine and the Jadd brand.
- Each brand gets its **own Vercel project, domain and database**. Separate databases also keep US and Ghanaian student data apart under different data-protection laws.
- **How Koso gets its code is decided when Koso is built:** either a copy of this repo (fully independent, but fixes must be applied twice) or a shared engine (fixes applied once, brands selected by a `BRAND` environment variable). Until then, brand details still live in one brand config file so either path stays cheap.
- Brand details (name, tagline, tutor name, colours) live in **one brand config file**, never typed into individual pages.
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

- The top bar, tab title and login card change from "AdamsBrain" to "Jadd" via the brand config file.
- The old Vercel project (connected to `AdamsBrain-V0`) is renamed `adamsbrain-v0` and paused. A new Vercel project `jadd` deploys this repo.
- Docs that say "AdamsBrain" are updated over time. "AdamsBrain" is retired as a name; the Neon project may keep it, since the name does not affect connections.
- **Still to do before relying on either name commercially:** search the USPTO trademark database and both app stores; for Koso, confirm the Twi meaning with native speakers and check Ghana's Registrar-General.
- The name checks so far were quick web and app-store searches, not legal clearance.
