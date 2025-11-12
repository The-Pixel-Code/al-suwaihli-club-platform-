# Sweihli Club Database (PostgreSQL + PostgREST)

This folder contains the database schema, seed data, and a PostgREST configuration example for the Sweihli Club website.

Contents:
- schema.sql — full database schema with RLS policies for PostgREST
- seed.sql — minimal sample data
- postgrest.example.conf — example configuration for running PostgREST
- setup.ps1 — helper script to create the database and load schema/seed on Windows PowerShell

Quick start (Windows, PowerShell):
1) Ensure PostgreSQL is installed and `psql` is available in PATH.
2) Create a database user and database (or use existing).
3) Copy `postgrest.example.conf` to `postgrest.conf` and fill placeholders.
4) Run setup:

\`\`\`powershell
# Set your variables
$env:PGUSER = "your_pg_user"
$env:PGPASSWORD = "your_pg_password"
$env:PGDATABASE = "sweihli_club"
$env:PGHOST = "localhost"
$env:PGPORT = "5432"

# Initialize
pwsh -File ./db/setup.ps1
\`\`\`

Running PostgREST:
- Install from https://postgrest.org
- Then run:

\`\`\`powershell
postgrest ./db/postgrest.example.conf
\`\`\`

JWT claims expected by RLS policies:
- role: 'admin' | 'editor' | 'viewer'
- user_id: UUID of app_user

Notes:
- Public (anonymous) requests can read published advertisements and general public tables; writes are restricted.
- Adjust RLS to your needs if you want wider public access.
