import fs from 'fs';

const SQL = fs.readFileSync('scripts/install-supabase.sql', 'utf8');
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const URL = process.env.SUPABASE_URL || 'https://draqiendljxssicwfjyc.supabase.co';

if (!SERVICE_KEY) { console.error('Missing SUPABASE_SERVICE_KEY'); process.exit(1); }

const headers = {
  'apikey': SERVICE_KEY,
  'Authorization': 'Bearer ' + SERVICE_KEY,
  'Content-Type': 'application/json',
};

try {
  const res = await fetch(`${URL}/rest/v1/rpc/exec_sql`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ sql: SQL }),
  });
  const txt = await res.text();
  console.log('STATUS:', res.status);
  console.log('BODY:', txt.slice(0, 1000));
} catch (e) {
  console.error('ERROR:', e.message);
}
