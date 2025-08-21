-- Sweihli Club Database Schema (PostgreSQL + PostgREST)
-- Run with: psql -U <user> -d <database> -f db/schema.sql

-- Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto"; -- for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "citext";   -- case-insensitive email

-- Namespaces
CREATE SCHEMA IF NOT EXISTS app;  -- application objects (tables, views)

-- ============
-- Auth & RBAC
-- ============
-- Roles are implemented at two levels:
-- 1) Database roles used by PostgREST (anon, web_user, service_role)
-- 2) Application roles stored in app.role and app.user_role; exposed to PostgREST via JWT claims
--    Expected JWT claims:
--      - role: text (e.g., 'admin', 'editor', 'viewer')
--      - user_id: uuid (the app_user.id)

-- Core users for control panel
CREATE TABLE IF NOT EXISTS app.app_user (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email citext UNIQUE NOT NULL,
  full_name text NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS app.role (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL CHECK (name ~ '^[a-z_]+$'), -- admin, editor, viewer
  description text
);

CREATE TABLE IF NOT EXISTS app.permission (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL CHECK (name ~ '^[a-z_\.]+$'), -- e.g., ads.create, ads.update
  description text
);

CREATE TABLE IF NOT EXISTS app.role_permission (
  role_id uuid REFERENCES app.role(id) ON DELETE CASCADE,
  permission_id uuid REFERENCES app.permission(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE IF NOT EXISTS app.user_role (
  user_id uuid REFERENCES app.app_user(id) ON DELETE CASCADE,
  role_id uuid REFERENCES app.role(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, role_id)
);

-- Invitations to add more users (via email)
CREATE TABLE IF NOT EXISTS app.user_invitation (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email citext NOT NULL,
  invited_by uuid NOT NULL REFERENCES app.app_user(id) ON DELETE SET NULL,
  token text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','accepted','revoked','expired')),
  expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Tasks and notifications (email can be handled at app layer; DB keeps assignment and notes)
CREATE TABLE IF NOT EXISTS app.task (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  body text,
  assigned_to uuid REFERENCES app.app_user(id) ON DELETE SET NULL,
  due_at timestamptz,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open','in_progress','done','cancelled')),
  created_by uuid REFERENCES app.app_user(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS app.notification (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES app.app_user(id) ON DELETE CASCADE,
  subject text NOT NULL,
  body text,
  task_id uuid REFERENCES app.task(id) ON DELETE SET NULL,
  sent_at timestamptz
);

-- ==========
-- Media
-- ==========
CREATE TYPE app.media_type AS ENUM ('image','video');

CREATE TABLE IF NOT EXISTS app.media_asset (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  type app.media_type NOT NULL,
  width int,
  height int,
  duration_seconds int,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- =================
-- Advertisements
-- =================
CREATE TYPE app.publish_status AS ENUM ('draft','scheduled','published','archived');

CREATE TABLE IF NOT EXISTS app.advertisement (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  body text,
  cover_media_id uuid REFERENCES app.media_asset(id) ON DELETE SET NULL,
  created_by uuid REFERENCES app.app_user(id) ON DELETE SET NULL,
  status app.publish_status NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS app.advertisement_media (
  ad_id uuid REFERENCES app.advertisement(id) ON DELETE CASCADE,
  media_id uuid REFERENCES app.media_asset(id) ON DELETE CASCADE,
  sort_order int NOT NULL DEFAULT 1,
  PRIMARY KEY (ad_id, media_id)
);

-- =============
-- Sports model
-- =============
CREATE TABLE IF NOT EXISTS app.sport (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text
);

CREATE TABLE IF NOT EXISTS app.age_category (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,       -- e.g., U17, Seniors
  min_age int,
  max_age int
);

CREATE TABLE IF NOT EXISTS app.team (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sport_id uuid NOT NULL REFERENCES app.sport(id) ON DELETE CASCADE,
  name text NOT NULL,
  age_category_id uuid REFERENCES app.age_category(id) ON DELETE SET NULL,
  coach_name text,
  is_club_team boolean NOT NULL DEFAULT true,
  UNIQUE (sport_id, name)
);

CREATE TABLE IF NOT EXISTS app.player (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  birthdate date,
  position text,  -- role in team (e.g., GK, MF)
  bio text,
  photo_media_id uuid REFERENCES app.media_asset(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS app.team_player (
  team_id uuid REFERENCES app.team(id) ON DELETE CASCADE,
  player_id uuid REFERENCES app.player(id) ON DELETE CASCADE,
  jersey_number int,
  joined_at date,
  PRIMARY KEY (team_id, player_id)
);

-- ===================
-- Competitions/Leagues
-- ===================
CREATE TYPE app.competition_type AS ENUM ('league','cup','tournament');

CREATE TABLE IF NOT EXISTS app.competition (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sport_id uuid NOT NULL REFERENCES app.sport(id) ON DELETE CASCADE,
  name text NOT NULL,
  type app.competition_type NOT NULL,
  season text, -- e.g., 2024/25
  start_date date,
  end_date date,
  description text
);

CREATE TABLE IF NOT EXISTS app.competition_team (
  competition_id uuid REFERENCES app.competition(id) ON DELETE CASCADE,
  team_id uuid REFERENCES app.team(id) ON DELETE CASCADE,
  group_name text,
  PRIMARY KEY (competition_id, team_id)
);

-- League standings (for type='league')
CREATE TABLE IF NOT EXISTS app.league_table (
  competition_id uuid REFERENCES app.competition(id) ON DELETE CASCADE,
  team_id uuid REFERENCES app.team(id) ON DELETE CASCADE,
  played int NOT NULL DEFAULT 0,
  won int NOT NULL DEFAULT 0,
  drawn int NOT NULL DEFAULT 0,
  lost int NOT NULL DEFAULT 0,
  goals_for int NOT NULL DEFAULT 0,
  goals_against int NOT NULL DEFAULT 0,
  goal_diff int GENERATED ALWAYS AS (goals_for - goals_against) STORED,
  points int NOT NULL DEFAULT 0,
  position int,
  PRIMARY KEY (competition_id, team_id)
);

-- =============
-- Matches
-- =============
CREATE TYPE app.match_status AS ENUM ('scheduled','live','completed','cancelled');

CREATE TABLE IF NOT EXISTS app.match (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sport_id uuid NOT NULL REFERENCES app.sport(id) ON DELETE CASCADE,
  competition_id uuid REFERENCES app.competition(id) ON DELETE SET NULL,
  home_team_id uuid NOT NULL REFERENCES app.team(id) ON DELETE RESTRICT,
  away_team_id uuid NOT NULL REFERENCES app.team(id) ON DELETE RESTRICT,
  home_score int,
  away_score int,
  venue text,
  starts_at timestamptz NOT NULL,
  status app.match_status NOT NULL DEFAULT 'scheduled',
  notes text,
  CONSTRAINT teams_distinct CHECK (home_team_id <> away_team_id)
);

-- Optional: per-player stats per match (can be extended later)
CREATE TABLE IF NOT EXISTS app.match_player (
  match_id uuid REFERENCES app.match(id) ON DELETE CASCADE,
  team_id uuid REFERENCES app.team(id) ON DELETE CASCADE,
  player_id uuid REFERENCES app.player(id) ON DELETE CASCADE,
  started boolean,
  minutes_played int,
  goals int,
  assists int,
  cards text, -- can be refined
  PRIMARY KEY (match_id, player_id)
);

-- =====================
-- Championships (Won)
-- =====================
CREATE TABLE IF NOT EXISTS app.championship (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sport_id uuid NOT NULL REFERENCES app.sport(id) ON DELETE CASCADE,
  name text NOT NULL,
  obtained_on date,
  description text,
  media_id uuid REFERENCES app.media_asset(id) ON DELETE SET NULL
);

-- =============
-- Stars / Honors
-- =============
CREATE TYPE app.star_award_for AS ENUM ('tournament','league','season','match','other');

CREATE TABLE IF NOT EXISTS app.star (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid NOT NULL REFERENCES app.player(id) ON DELETE CASCADE,
  sport_id uuid NOT NULL REFERENCES app.sport(id) ON DELETE CASCADE,
  title text NOT NULL, -- e.g., Player of the Tournament
  description text,
  media_id uuid REFERENCES app.media_asset(id) ON DELETE SET NULL,
  awarded_for app.star_award_for NOT NULL DEFAULT 'tournament',
  awarded_at date,
  competition_id uuid REFERENCES app.competition(id) ON DELETE SET NULL
);

-- =========================
-- Helpful indexes & trigges
-- =========================
CREATE INDEX IF NOT EXISTS idx_advertisement_status_pub ON app.advertisement(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_match_starts_at ON app.match(starts_at);
CREATE INDEX IF NOT EXISTS idx_match_competition ON app.match(competition_id);
CREATE INDEX IF NOT EXISTS idx_team_sport ON app.team(sport_id);
CREATE INDEX IF NOT EXISTS idx_player_name ON app.player(full_name);

-- Updated_at triggers
CREATE OR REPLACE FUNCTION app.touch_updated_at() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;$$;

DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='app' AND table_name='app_user' AND column_name='updated_at') THEN
    CREATE TRIGGER trg_app_user_updated_at BEFORE UPDATE ON app.app_user FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='app' AND table_name='task' AND column_name='updated_at') THEN
    CREATE TRIGGER trg_task_updated_at BEFORE UPDATE ON app.task FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='app' AND table_name='advertisement' AND column_name='updated_at') THEN
    CREATE TRIGGER trg_ad_updated_at BEFORE UPDATE ON app.advertisement FOR EACH ROW EXECUTE FUNCTION app.touch_updated_at();
  END IF;
END $$;

-- =====================
-- PostgREST RLS policies
-- =====================
-- Strategy: allow public read for public content; restrict writes to admin/editor via JWT claim 'role'

-- Enable RLS
ALTER TABLE app.advertisement ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.media_asset ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.sport ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.age_category ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.team ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.player ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.team_player ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.match ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.competition ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.competition_team ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.league_table ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.championship ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.star ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.app_user ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.role ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.permission ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.role_permission ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.user_role ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.user_invitation ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.task ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.notification ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.advertisement_media ENABLE ROW LEVEL SECURITY;

-- Helper: role check
CREATE OR REPLACE FUNCTION app.is_admin() RETURNS boolean LANGUAGE sql STABLE AS $$
  SELECT coalesce(current_setting('request.jwt.claims', true)::jsonb ->> 'role', '') IN ('admin');
$$;

CREATE OR REPLACE FUNCTION app.is_editor() RETURNS boolean LANGUAGE sql STABLE AS $$
  SELECT coalesce(current_setting('request.jwt.claims', true)::jsonb ->> 'role', '') IN ('admin','editor');
$$;

CREATE OR REPLACE FUNCTION app.current_user_id() RETURNS uuid LANGUAGE sql STABLE AS $$
  SELECT NULLIF(coalesce(current_setting('request.jwt.claims', true)::jsonb ->> 'user_id',''), '')::uuid;
$$;

-- Public read policies
CREATE POLICY pub_read_media ON app.media_asset FOR SELECT USING (true);
CREATE POLICY pub_read_sport ON app.sport FOR SELECT USING (true);
CREATE POLICY pub_read_age_category ON app.age_category FOR SELECT USING (true);
CREATE POLICY pub_read_team ON app.team FOR SELECT USING (true);
CREATE POLICY pub_read_player ON app.player FOR SELECT USING (true);
CREATE POLICY pub_read_team_player ON app.team_player FOR SELECT USING (true);
CREATE POLICY pub_read_match ON app.match FOR SELECT USING (true);
CREATE POLICY pub_read_competition ON app.competition FOR SELECT USING (true);
CREATE POLICY pub_read_competition_team ON app.competition_team FOR SELECT USING (true);
CREATE POLICY pub_read_league_table ON app.league_table FOR SELECT USING (true);
CREATE POLICY pub_read_championship ON app.championship FOR SELECT USING (true);
CREATE POLICY pub_read_star ON app.star FOR SELECT USING (true);

-- Ads: only published visible to public
DROP POLICY IF EXISTS pub_read_ad ON app.advertisement;
CREATE POLICY pub_read_ad ON app.advertisement FOR SELECT USING (status = 'published');

-- Control panel entities: restrict read to editors/admins
CREATE POLICY cp_read_app_user ON app.app_user FOR SELECT USING (app.is_editor());
CREATE POLICY cp_read_role ON app.role FOR SELECT USING (app.is_editor());
CREATE POLICY cp_read_permission ON app.permission FOR SELECT USING (app.is_editor());
CREATE POLICY cp_read_role_permission ON app.role_permission FOR SELECT USING (app.is_editor());
CREATE POLICY cp_read_user_role ON app.user_role FOR SELECT USING (app.is_editor());
CREATE POLICY cp_read_invitation ON app.user_invitation FOR SELECT USING (app.is_editor());
CREATE POLICY cp_read_task ON app.task FOR SELECT USING (app.is_editor());
CREATE POLICY cp_read_notification ON app.notification FOR SELECT USING (app.is_editor());
CREATE POLICY cp_read_ad_media ON app.advertisement_media FOR SELECT USING (true);

-- Write policies (admins/editors)
CREATE POLICY edit_media ON app.media_asset FOR INSERT WITH CHECK (app.is_editor());
CREATE POLICY upd_media ON app.media_asset FOR UPDATE USING (app.is_editor());
CREATE POLICY del_media ON app.media_asset FOR DELETE USING (app.is_editor());

CREATE POLICY edit_ad ON app.advertisement FOR INSERT WITH CHECK (app.is_editor());
CREATE POLICY upd_ad ON app.advertisement FOR UPDATE USING (app.is_editor());
CREATE POLICY del_ad ON app.advertisement FOR DELETE USING (app.is_editor());

CREATE POLICY edit_ad_media ON app.advertisement_media FOR INSERT WITH CHECK (app.is_editor());
CREATE POLICY del_ad_media ON app.advertisement_media FOR DELETE USING (app.is_editor());

CREATE POLICY edit_sport ON app.sport FOR INSERT WITH CHECK (app.is_editor());
CREATE POLICY upd_sport ON app.sport FOR UPDATE USING (app.is_editor());
CREATE POLICY del_sport ON app.sport FOR DELETE USING (app.is_editor());

CREATE POLICY edit_age_cat ON app.age_category FOR INSERT WITH CHECK (app.is_editor());
CREATE POLICY upd_age_cat ON app.age_category FOR UPDATE USING (app.is_editor());
CREATE POLICY del_age_cat ON app.age_category FOR DELETE USING (app.is_editor());

CREATE POLICY edit_team ON app.team FOR INSERT WITH CHECK (app.is_editor());
CREATE POLICY upd_team ON app.team FOR UPDATE USING (app.is_editor());
CREATE POLICY del_team ON app.team FOR DELETE USING (app.is_editor());

CREATE POLICY edit_player ON app.player FOR INSERT WITH CHECK (app.is_editor());
CREATE POLICY upd_player ON app.player FOR UPDATE USING (app.is_editor());
CREATE POLICY del_player ON app.player FOR DELETE USING (app.is_editor());

CREATE POLICY edit_team_player ON app.team_player FOR INSERT WITH CHECK (app.is_editor());
CREATE POLICY del_team_player ON app.team_player FOR DELETE USING (app.is_editor());

CREATE POLICY edit_match ON app.match FOR INSERT WITH CHECK (app.is_editor());
CREATE POLICY upd_match ON app.match FOR UPDATE USING (app.is_editor());
CREATE POLICY del_match ON app.match FOR DELETE USING (app.is_editor());

CREATE POLICY edit_comp ON app.competition FOR INSERT WITH CHECK (app.is_editor());
CREATE POLICY upd_comp ON app.competition FOR UPDATE USING (app.is_editor());
CREATE POLICY del_comp ON app.competition FOR DELETE USING (app.is_editor());

CREATE POLICY edit_comp_team ON app.competition_team FOR INSERT WITH CHECK (app.is_editor());
CREATE POLICY del_comp_team ON app.competition_team FOR DELETE USING (app.is_editor());

CREATE POLICY edit_league_table ON app.league_table FOR INSERT WITH CHECK (app.is_editor());
CREATE POLICY upd_league_table ON app.league_table FOR UPDATE USING (app.is_editor());
CREATE POLICY del_league_table ON app.league_table FOR DELETE USING (app.is_editor());

CREATE POLICY edit_champ ON app.championship FOR INSERT WITH CHECK (app.is_editor());
CREATE POLICY upd_champ ON app.championship FOR UPDATE USING (app.is_editor());
CREATE POLICY del_champ ON app.championship FOR DELETE USING (app.is_editor());

CREATE POLICY edit_star ON app.star FOR INSERT WITH CHECK (app.is_editor());
CREATE POLICY upd_star ON app.star FOR UPDATE USING (app.is_editor());
CREATE POLICY del_star ON app.star FOR DELETE USING (app.is_editor());

-- Control panel write policies (admins only for roles/permissions)
CREATE POLICY edit_user ON app.app_user FOR INSERT WITH CHECK (app.is_admin());
CREATE POLICY upd_user ON app.app_user FOR UPDATE USING (app.is_admin());
CREATE POLICY del_user ON app.app_user FOR DELETE USING (app.is_admin());

CREATE POLICY edit_role ON app.role FOR INSERT WITH CHECK (app.is_admin());
CREATE POLICY upd_role ON app.role FOR UPDATE USING (app.is_admin());
CREATE POLICY del_role ON app.role FOR DELETE USING (app.is_admin());

CREATE POLICY edit_perm ON app.permission FOR INSERT WITH CHECK (app.is_admin());
CREATE POLICY upd_perm ON app.permission FOR UPDATE USING (app.is_admin());
CREATE POLICY del_perm ON app.permission FOR DELETE USING (app.is_admin());

CREATE POLICY edit_role_perm ON app.role_permission FOR INSERT WITH CHECK (app.is_admin());
CREATE POLICY del_role_perm ON app.role_permission FOR DELETE USING (app.is_admin());

CREATE POLICY edit_user_role ON app.user_role FOR INSERT WITH CHECK (app.is_admin());
CREATE POLICY del_user_role ON app.user_role FOR DELETE USING (app.is_admin());

CREATE POLICY edit_invitation ON app.user_invitation FOR INSERT WITH CHECK (app.is_editor());
CREATE POLICY upd_invitation ON app.user_invitation FOR UPDATE USING (app.is_editor());
CREATE POLICY del_invitation ON app.user_invitation FOR DELETE USING (app.is_admin());

CREATE POLICY edit_task ON app.task FOR INSERT WITH CHECK (app.is_editor());
CREATE POLICY upd_task ON app.task FOR UPDATE USING (app.is_editor());
CREATE POLICY del_task ON app.task FOR DELETE USING (app.is_editor());

CREATE POLICY edit_notification ON app.notification FOR INSERT WITH CHECK (app.is_editor());

-- Views for public API convenience
CREATE OR REPLACE VIEW app.public_ads AS
  SELECT a.id, a.title, a.body, a.cover_media_id, a.published_at
  FROM app.advertisement a
  WHERE a.status = 'published'
  ORDER BY a.published_at DESC NULLS LAST;

-- Database roles for PostgREST (if they don't already exist)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
    CREATE ROLE anon NOLOGIN;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'webuser') THEN
    CREATE ROLE webuser NOLOGIN;
  END IF;
END $$;

-- Grant usage on schema; table-level privileges combined with RLS
GRANT USAGE ON SCHEMA app TO anon, webuser;

-- Read privileges for anonymous
GRANT SELECT ON TABLE
  app.media_asset,
  app.sport,
  app.age_category,
  app.team,
  app.player,
  app.team_player,
  app.match,
  app.competition,
  app.competition_team,
  app.league_table,
  app.championship,
  app.star,
  app.advertisement,
  app.advertisement_media
TO anon;

-- Read/write privileges for application user role (actual access restricted by RLS)
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA app TO webuser;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA app TO webuser;

