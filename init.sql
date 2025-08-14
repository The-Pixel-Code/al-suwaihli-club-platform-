# init.sql

-- Create additional databases if needed
-- CREATE DATABASE al_suwaihli_club_test;
-- CREATE DATABASE al_suwaihli_club_staging;

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create custom types
CREATE TYPE user_role AS ENUM (
  'SUPER_ADMIN',
  'ADMIN', 
  'CONTENT_MANAGER',
  'MEMBER_COORDINATOR',
  'SPORTS_COORDINATOR',
  'FINANCIAL_OFFICER',
  'MEMBER'
);

CREATE TYPE membership_status AS ENUM (
  'ACTIVE',
  'INACTIVE', 
  'SUSPENDED',
  'PENDING'
);

CREATE TYPE event_type AS ENUM (
  'SPORTS',
  'CULTURAL',
  'SOCIAL',
  'ADMINISTRATIVE'
);