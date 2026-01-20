-- 1️Create analytics schema
CREATE SCHEMA IF NOT EXISTS analytics;

-- 2 Copy table with existing data
CREATE TABLE IF NOT EXISTS analytics.monthly_visitor_count AS
TABLE public.monthly_visitor_count WITH DATA;


-- 4️ Add useful indexes

-- Lookup/grouping by year_month
CREATE INDEX IF NOT EXISTS monthly_visitor_count_year_month_idx
ON analytics.monthly_visitor_count (year_month);

-- Filtering by recent dates
CREATE INDEX IF NOT EXISTS monthly_visitor_count_created_at_idx
ON analytics.monthly_visitor_count (created_at DESC);

-- 5️ Enable Row Level Security (RLS)
ALTER TABLE analytics.monthly_visitor_count ENABLE ROW LEVEL SECURITY;

-- 6️ Read-only policy for all users
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'monthly_visitor_count'
      AND policyname = 'Allow select for all'
  ) THEN
    CREATE POLICY "Allow select for all"
    ON analytics.monthly_visitor_count
    FOR SELECT
    TO anon, authenticated
    USING (true);
  END IF;
END $$;
