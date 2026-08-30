# Pangea — MVP v0.1

**Talent without borders.** A global marketplace connecting skilled people with temporary missions
anywhere in the world. This is a self-contained app at `pangea/` inside the Vlington repo — it does
not touch or depend on the Vlington site (`../src`) in any way.

## Running it

```bash
cd pangea
npm install
npm run dev
```

The app runs entirely on realistic mock data + `localStorage` — no environment variables or
Supabase project are required to try it. Open the app, hit **"Skip with a demo profile"** on the
role screen to drop straight into a populated account, or fill out onboarding to create your own.

## Information architecture

```
Landing (/)
 └─ Role select (/start) ── talent or company, or a one-tap demo identity
     ├─ Talent onboarding (/onboarding/talent)
     └─ Company onboarding (/onboarding/company)
          │
          ▼
     Missions feed (/missions) ─── Mission detail (/missions/:id) ─── Apply / manage applicants
     Talent discovery (/talent) ── Talent profile (/talent/:id) ───── Recruit
     Dashboard (/dashboard) ────── active / pending / completed missions, Match, Complete, Rate
     Profile (/profile) ────────── your own talent or company profile, edit, sign out
```

The core transaction the whole product is built around:

**Discover → Apply / Recruit → Match → Mission → Complete → Rate**

- **Discover**: Mission feed (talent browsing missions) and Talent discovery (companies browsing
  talent) are symmetric — same search/filter pattern on both sides.
- **Apply / Recruit**: a talent applying to a mission and a company recruiting a talent are the same
  underlying object (`Application`, `origin: "apply" | "recruit"`), just initiated from either side.
- **Match**: when a company accepts an application (either origin), a `Match` is created linking the
  mission, talent and company.
- **Mission → Complete → Rate**: an active match can be marked complete by either side, which
  unlocks mutual rating — the reputation that follows talent (and companies) to their next mission.

## Data model

See `src/types/index.ts` for the TypeScript shape and `supabase/migrations/0001_init.sql` for the
matching Postgres schema (with row-level security). Core entities:

- `TalentProfile` / `CompanyProfile` — the two account types, both public/discoverable.
- `Mission` — the core object of the product (not a "job").
- `Application` — apply or recruit, same table, `origin` distinguishes direction.
- `Match` — created on acceptance; `active` → `completed`.
- `Rating` — mutual, 1–5 with a comment, tied to a completed mission.

## Connecting a real Supabase project

The MVP intentionally ships without a live backend so it works out of the box. To wire one up:

1. Create a **new, dedicated** Supabase project for Pangea (don't reuse Vlington's).
2. Run `supabase/migrations/0001_init.sql` against it.
3. Copy `.env.example` to `.env.local` and fill in the project's URL and anon/publishable key.
4. Regenerate types: `supabase gen types typescript --project-id <id> > src/types/database.ts`.
5. Swap the mock-data reads/writes in `src/state/AppStateContext.tsx` for calls through
   `src/lib/supabase.ts` (`isSupabaseConfigured` is already exported to branch on).

## Structure

```
src/
  components/
    ui/        primitive building blocks (Button, Card, Badge, Avatar, Input, Chip, Stars)
    layout/     Header, BottomNav, Shell, Wordmark
    mission/    MissionCard
    talent/     TalentCard
    shared/     RatingForm
  data/         mock companies, talent, missions + seed applications/matches/ratings
  lib/          cn/format helpers, Supabase client scaffold
  pages/        one file per screen
  state/        AppStateContext — the single source of truth (localStorage-backed)
  types/        shared TypeScript types + Supabase Database placeholder
supabase/
  migrations/   SQL schema mirroring src/types
```

## Design system

- **Type**: Fraunces (display/serif, editorial and human) + Inter (body/sans).
- **Palette**: warm paper background, near-black ink for text, a horizon amber accent, an earth
  green for trust/verification signals. Deliberately not the blue-and-white SaaS palette.
- **Mobile-first**: bottom tab bar on small screens, top nav on `md+`. Every screen was built at
  375px width first.
