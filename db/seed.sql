-- Seed data for Sweihli Club
-- Run after schema: psql -U <user> -d <db> -f db/seed.sql

INSERT INTO app.role (name, description) VALUES
  ('admin','Full control'),
  ('editor','Content manager'),
  ('viewer','Read only')
ON CONFLICT (name) DO NOTHING;

-- Basic permissions (extend as needed)
INSERT INTO app.permission (name, description) VALUES
  ('ads.create','Create advertisements'),
  ('ads.update','Update advertisements'),
  ('ads.delete','Delete advertisements')
ON CONFLICT (name) DO NOTHING;

-- Sports and age categories
INSERT INTO app.sport (name) VALUES ('Football') ON CONFLICT (name) DO NOTHING;
INSERT INTO app.sport (name) VALUES ('Volleyball') ON CONFLICT (name) DO NOTHING;

INSERT INTO app.age_category (name, min_age, max_age) VALUES
  ('U17', 15, 17),
  ('U20', 18, 20),
  ('Seniors', NULL, NULL)
ON CONFLICT (name) DO NOTHING;

-- Example users
WITH admin_role AS (
  SELECT id FROM app.role WHERE name='admin'
), editor_role AS (
  SELECT id FROM app.role WHERE name='editor'
)
INSERT INTO app.app_user (email, full_name) VALUES
  ('admin@sweihli.club','Main Admin'),
  ('editor@sweihli.club','Content Editor')
ON CONFLICT (email) DO NOTHING;

-- Assign roles
INSERT INTO app.user_role (user_id, role_id)
SELECT u.id, r.id
FROM app.app_user u
JOIN app.role r ON r.name = CASE u.email WHEN 'admin@sweihli.club' THEN 'admin' ELSE 'editor' END
ON CONFLICT DO NOTHING;

-- Example teams and players
WITH fb AS (SELECT id AS sport_id FROM app.sport WHERE name='Football')
INSERT INTO app.team (sport_id, name, is_club_team)
SELECT sport_id, 'Sweihli FC', true FROM fb
ON CONFLICT DO NOTHING;

INSERT INTO app.player (full_name, birthdate, position)
VALUES ('Ali Ahmed','2001-05-10','Forward')
ON CONFLICT DO NOTHING;

WITH t AS (SELECT id AS team_id FROM app.team WHERE name='Sweihli FC'),
     p AS (SELECT id AS player_id FROM app.player WHERE full_name='Ali Ahmed')
INSERT INTO app.team_player (team_id, player_id, jersey_number, joined_at)
SELECT t.team_id, p.player_id, 9, '2023-08-01' FROM t, p
ON CONFLICT DO NOTHING;

-- Example competition and match
WITH fb AS (SELECT id AS sport_id FROM app.sport WHERE name='Football'),
     t AS (SELECT id AS team_id FROM app.team WHERE name='Sweihli FC')
INSERT INTO app.competition (sport_id, name, type, season, start_date)
SELECT sport_id, 'National League', 'league', '2024/25', '2024-08-15' FROM fb
ON CONFLICT DO NOTHING;

-- Create an opponent team for seeding a valid match
WITH fb AS (SELECT id AS sport_id FROM app.sport WHERE name='Football')
INSERT INTO app.team (sport_id, name, is_club_team)
SELECT sport_id, 'Rival FC', false FROM fb
ON CONFLICT DO NOTHING;

WITH comp AS (SELECT id AS competition_id FROM app.competition WHERE name='National League'),
     fb AS (SELECT id AS sport_id FROM app.sport WHERE name='Football'),
     home_t AS (SELECT id AS home_team_id FROM app.team WHERE name='Sweihli FC'),
     away_t AS (SELECT id AS away_team_id FROM app.team WHERE name='Rival FC')
INSERT INTO app.match (sport_id, competition_id, home_team_id, away_team_id, starts_at, venue)
SELECT fb.sport_id, comp.competition_id, home_t.home_team_id, away_t.away_team_id, now() + interval '7 days', 'Home Stadium'
FROM comp, fb, home_t, away_t
WHERE home_t.home_team_id IS NOT NULL AND away_t.away_team_id IS NOT NULL
ON CONFLICT DO NOTHING;
