param(
  [string]$DbName = $env:PGDATABASE,
  [string]$Host = $env:PGHOST,
  [string]$Port = $env:PGPORT,
  [string]$User = $env:PGUSER,
  [string]$Password = $env:PGPASSWORD
)

if (-not $DbName) { throw "PGDATABASE not set and -DbName not provided" }
if (-not $Host) { $Host = "localhost" }
if (-not $Port) { $Port = "5432" }

$env:PGPASSWORD = $Password

Write-Host "Creating database (if not exists): $DbName"
psql "host=$Host port=$Port user=$User dbname=postgres" -v ON_ERROR_STOP=1 -c "CREATE DATABASE \"$DbName\" WITH ENCODING 'UTF8' TEMPLATE template1;" 2>$null

Write-Host "Applying schema.sql"
psql "host=$Host port=$Port user=$User dbname=$DbName" -v ON_ERROR_STOP=1 -f "$(Resolve-Path ./db/schema.sql)"

Write-Host "Applying seed.sql"
psql "host=$Host port=$Port user=$User dbname=$DbName" -v ON_ERROR_STOP=1 -f "$(Resolve-Path ./db/seed.sql)"

Write-Host "Done."
