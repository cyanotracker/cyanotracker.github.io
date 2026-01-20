-- 1. Ensure table exists
ALTER TABLE public.visitor_info_backup
ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now();

-- 2. Convert ip_addr from TEXT → INET (safe cast)
ALTER TABLE public.visitor_info_backup
ALTER COLUMN ip_addr TYPE INET
USING ip_addr::inet;

-- 3. Add indexes (remove ad_id references)
CREATE INDEX IF NOT EXISTS visitor_info_backup_visitor_key_idx
ON public.visitor_info_backup (visitor_key);

CREATE INDEX IF NOT EXISTS visitor_info_backup_ip_addr_idx
ON public.visitor_info_backup (ip_addr);

-- 4. Enable RLS (if not already)
ALTER TABLE public.visitor_info_backup ENABLE ROW LEVEL SECURITY;

-- 5. Insert policy (visitor tracking)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'visitor_info_backup'
      AND policyname = 'Allow insert visitor info'
  ) THEN
    CREATE POLICY "Allow insert visitor info"
    ON public.visitor_info_backup
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);
  END IF;
END $$;

-- 6. Read policy (optional)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'visitor_info_backup'
      AND policyname = 'Allow read visitor info'
  ) THEN
    CREATE POLICY "Allow read visitor info"
    ON public.visitor_info_backup
    FOR SELECT
    TO authenticated
    USING (true);
  END IF;
END $$;
