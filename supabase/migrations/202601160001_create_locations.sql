-- -- Create schema
-- CREATE SCHEMA IF NOT EXISTS geo;

-- -- Create table
-- CREATE TABLE IF NOT EXISTS geo.locations (
--   id BIGSERIAL PRIMARY KEY,
--   location TEXT NOT NULL,
--   latitude DOUBLE PRECISION NOT NULL,
--   longitude DOUBLE PRECISION NOT NULL,
--   frequency INTEGER DEFAULT 1,
--   created_at TIMESTAMPTZ DEFAULT now()
-- );

-- -- Creating indexes:

-- -- Lookup by name
-- CREATE INDEX IF NOT EXISTS locations_location_idx
-- ON geo.locations (location);

-- -- Geo coordinates
-- CREATE INDEX IF NOT EXISTS locations_lat_lon_idx
-- ON geo.locations (latitude, longitude);

-- -- Popular locations
-- CREATE INDEX IF NOT EXISTS locations_frequency_idx
-- ON geo.locations (frequency DESC);

-- -- Recent locations
-- CREATE INDEX IF NOT EXISTS locations_created_at_idx
-- ON geo.locations (created_at DESC);

-- -- Enable RLS
-- ALTER TABLE geo.locations ENABLE ROW LEVEL SECURITY;

-- -- Policies
-- DO $$
-- BEGIN
--   IF NOT EXISTS (
--     SELECT 1 FROM pg_policies
--     WHERE tablename = 'locations'
--       AND policyname = 'Allow insert for authenticated users'
--   ) THEN
--     CREATE POLICY "Allow insert for authenticated users"
--     ON geo.locations
--     FOR INSERT
--     TO authenticated
--     WITH CHECK (true);
--   END IF;
-- END $$;

-- -- Allow select for all users (anon + authenticated)
-- DO $$
-- BEGIN
--   IF NOT EXISTS (
--     SELECT 1 FROM pg_policies
--     WHERE tablename = 'locations'
--       AND policyname = 'Allow select for all'
--   ) THEN
--     CREATE POLICY "Allow select for all"
--     ON geo.locations
--     FOR SELECT
--     TO anon, authenticated
--     USING (true);
--   END IF;
-- END $$;
