-- Pangea MVP schema
-- Mirrors the shape used by the mock data in src/data/*.ts and the types in src/types/index.ts.
-- Apply against a dedicated Supabase project for Pangea (do not run against Vlington's project).

create extension if not exists "pgcrypto";

create type role as enum ('talent', 'company');
create type availability as enum ('available', 'open', 'unavailable');
create type mission_status as enum ('open', 'in_progress', 'completed', 'closed');
create type application_status as enum ('pending', 'shortlisted', 'accepted', 'declined', 'withdrawn');
create type application_origin as enum ('apply', 'recruit');
create type match_status as enum ('active', 'completed');

-- One row per authenticated user, linked to auth.users.
create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role role not null,
  name text not null,
  avatar_url text,
  city text,
  country text,
  country_code text,
  created_at timestamptz not null default now()
);

create table talent_profiles (
  profile_id uuid primary key references profiles (id) on delete cascade,
  headline text not null,
  bio text not null default '',
  skills text[] not null default '{}',
  languages text[] not null default '{}',
  years_experience int not null default 0,
  availability availability not null default 'open',
  day_rate_usd numeric not null default 0,
  missions_completed int not null default 0,
  rating numeric not null default 0,
  rating_count int not null default 0,
  verified boolean not null default false
);

create table company_profiles (
  profile_id uuid primary key references profiles (id) on delete cascade,
  industry text not null,
  bio text not null default '',
  website text,
  missions_posted int not null default 0,
  rating numeric not null default 0,
  rating_count int not null default 0,
  verified boolean not null default false
);

create table missions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references profiles (id) on delete cascade,
  title text not null,
  category text not null,
  skills_required text[] not null default '{}',
  city text not null,
  country text not null,
  country_code text not null,
  remote boolean not null default false,
  duration text not null,
  start_date date not null,
  budget_min numeric not null,
  budget_max numeric not null,
  currency text not null default 'USD',
  description text not null default '',
  status mission_status not null default 'open',
  created_at timestamptz not null default now()
);

create table applications (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references missions (id) on delete cascade,
  talent_id uuid not null references profiles (id) on delete cascade,
  status application_status not null default 'pending',
  message text not null default '',
  origin application_origin not null,
  created_at timestamptz not null default now(),
  unique (mission_id, talent_id)
);

create table matches (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references missions (id) on delete cascade,
  talent_id uuid not null references profiles (id) on delete cascade,
  company_id uuid not null references profiles (id) on delete cascade,
  status match_status not null default 'active',
  matched_at timestamptz not null default now(),
  completed_at timestamptz,
  unique (mission_id, talent_id)
);

create table ratings (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references missions (id) on delete cascade,
  from_id uuid not null references profiles (id) on delete cascade,
  to_id uuid not null references profiles (id) on delete cascade,
  score int not null check (score between 1 and 5),
  comment text not null default '',
  created_at timestamptz not null default now(),
  unique (mission_id, from_id, to_id)
);

create index missions_status_idx on missions (status);
create index missions_company_idx on missions (company_id);
create index applications_mission_idx on applications (mission_id);
create index applications_talent_idx on applications (talent_id);
create index matches_talent_idx on matches (talent_id);
create index matches_company_idx on matches (company_id);

-- Row Level Security
alter table profiles enable row level security;
alter table talent_profiles enable row level security;
alter table company_profiles enable row level security;
alter table missions enable row level security;
alter table applications enable row level security;
alter table matches enable row level security;
alter table ratings enable row level security;

-- Profiles and role-specific tables: public read (marketplace discovery), owner write.
create policy "profiles are publicly readable" on profiles for select using (true);
create policy "users manage their own profile" on profiles for insert with check (auth.uid() = id);
create policy "users update their own profile" on profiles for update using (auth.uid() = id);

create policy "talent profiles are publicly readable" on talent_profiles for select using (true);
create policy "talent manages their own profile" on talent_profiles for insert with check (auth.uid() = profile_id);
create policy "talent updates their own profile" on talent_profiles for update using (auth.uid() = profile_id);

create policy "company profiles are publicly readable" on company_profiles for select using (true);
create policy "company manages their own profile" on company_profiles for insert with check (auth.uid() = profile_id);
create policy "company updates their own profile" on company_profiles for update using (auth.uid() = profile_id);

-- Missions: public read, only the posting company can write.
create policy "missions are publicly readable" on missions for select using (true);
create policy "companies create their own missions" on missions for insert with check (auth.uid() = company_id);
create policy "companies update their own missions" on missions for update using (auth.uid() = company_id);

-- Applications: visible to the talent who applied and the company that owns the mission.
create policy "applications visible to participants" on applications for select using (
  auth.uid() = talent_id
  or auth.uid() in (select company_id from missions where missions.id = mission_id)
);
create policy "talent or company create applications" on applications for insert with check (
  auth.uid() = talent_id
  or auth.uid() in (select company_id from missions where missions.id = mission_id)
);
create policy "participants update applications" on applications for update using (
  auth.uid() = talent_id
  or auth.uid() in (select company_id from missions where missions.id = mission_id)
);

-- Matches: visible and updatable by both sides of the match.
create policy "matches visible to participants" on matches for select using (
  auth.uid() = talent_id or auth.uid() = company_id
);
create policy "participants create matches" on matches for insert with check (
  auth.uid() = talent_id or auth.uid() = company_id
);
create policy "participants update matches" on matches for update using (
  auth.uid() = talent_id or auth.uid() = company_id
);

-- Ratings: publicly readable (reputation is the point), only the author can write their own.
create policy "ratings are publicly readable" on ratings for select using (true);
create policy "participants create ratings" on ratings for insert with check (auth.uid() = from_id);
