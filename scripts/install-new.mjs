import fs from 'fs';
const SQL = fs.readFileSync('scripts/install-supabase.sql', 'utf8');
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const URL = 'https://jsydumdmswwqxnbwrdxj.supabase.co';
const headers = { 'apikey': SERVICE_KEY, 'Authorization': 'Bearer ' + SERVICE_KEY, 'Content-Type': 'application/json' };

// Try /pg/v1/sql (works from Node, no CORS)
let res = await fetch(`${URL}/pg/v1/sql`, { method: 'POST', headers, body: JSON.stringify({ query: SQL }) });
console.log('PG/SQL STATUS:', res.status);
const txt = await res.text();
console.log('PG/SQL BODY (first 600):', txt.slice(0, 600));
