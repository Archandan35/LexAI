-- Supabase Keep-Alive Setup
-- Run this SQL in your Supabase SQL Editor to enable keep-alive pings.
-- This creates a lightweight RPC function that the keep-alive service calls.

-- 1) Create the keepalive RPC function (no-op, just confirms DB is awake)
CREATE OR REPLACE FUNCTION keepalive()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN json_build_object(
    'status', 'ok',
    'timestamp', now(),
    'message', 'Keep-alive ping received'
  );
END;
$$;

-- 2) Grant execute to anonymous and authenticated users
GRANT EXECUTE ON FUNCTION keepalive TO anon;
GRANT EXECUTE ON FUNCTION keepalive TO authenticated;

-- 3) Optional: Create a keepalive_log table to track pings from the app
-- This helps you verify that keep-alive pings are actually happening.
CREATE TABLE IF NOT EXISTS keepalive_log (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ping_timestamp timestamptz DEFAULT now(),
  source text DEFAULT 'app',
  strategy text DEFAULT 'rest'
);

-- 4) Enable RLS on the log table
ALTER TABLE keepalive_log ENABLE ROW LEVEL SECURITY;

-- 5) Allow anon inserts (for keep-alive tracking)
CREATE POLICY "Allow anon keepalive inserts"
  ON keepalive_log
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 6) Allow authenticated reads
CREATE POLICY "Allow authenticated reads"
  ON keepalive_log
  FOR SELECT
  TO authenticated
  USING (true);

-- 7) Optional: Create a view to check recent activity
CREATE OR REPLACE VIEW keepalive_status AS
SELECT
  COUNT(*) FILTER (WHERE ping_timestamp > now() - interval '24 hours') AS pings_last_24h,
  COUNT(*) FILTER (WHERE ping_timestamp > now() - interval '7 days') AS pings_last_7d,
  MAX(ping_timestamp) AS last_ping,
  MIN(ping_timestamp) AS first_ping,
  COUNT(*) AS total_pings
FROM keepalive_log;

-- Verify the setup:
-- SELECT * FROM keepalive();  -- Should return {"status": "ok", "timestamp": "...", "message": "..."}
-- SELECT * FROM keepalive_status;  -- Shows ping activity
