import fs from 'fs';
import { pathToFileURL } from 'url';

const SQL = fs.readFileSync('scripts/install-supabase.sql', 'utf8');
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const URL = process.env.SUPABASE_URL || 'https://draqiendljxssicwfjyc.supabase.co';

if (!SERVICE_KEY) { console.error('Missing SUPABASE_SERVICE_KEY'); process.exit(1); }

// Split into statements, keeping $$ ... $$ blocks intact.
function splitStatements(sql) {
  const stmts = [];
  let cur = '';
  let i = 0;
  let inDollar = false;
  let dollarTag = '';
  while (i < sql.length) {
    const ch = sql[i];
    if (!inDollar && ch === '$') {
      // detect $$ or $tag$
      let j = i;
      let tag = '$';
      j++;
      while (j < sql.length && sql[j] !== '$') { tag += sql[j]; j++; }
      if (j < sql.length && sql[j] === '$') {
        tag += '$';
        inDollar = true;
        dollarTag = tag;
        cur += tag;
        i = j + 1;
        continue;
      } else {
        cur += ch; i++; continue;
      }
    }
    if (inDollar) {
      if (ch === '$') {
        // possible end tag
        let j = i;
        let tag = '$';
        j++;
        while (j < sql.length && sql[j] !== '$') { tag += sql[j]; j++; }
        if (j < sql.length && sql[j] === '$') {
          tag += '$';
          if (tag === dollarTag) {
            inDollar = false;
            cur += tag;
            i = j + 1;
            continue;
          } else {
            cur += tag; i = j + 1; continue;
          }
        } else { cur += ch; i++; continue; }
      } else { cur += ch; i++; continue; }
    }
    if (ch === ';') {
      cur += ';';
      const trimmed = cur.trim();
      if (trimmed && !trimmed.startsWith('--')) stmts.push(cur.trim());
      cur = '';
      i++;
      continue;
    }
    cur += ch; i++;
  }
  if (cur.trim()) stmts.push(cur.trim());
  return stmts;
}

const stmts = splitStatements(SQL);
console.log('Total statements:', stmts.length);

// Group small statements into chunks up to ~30KB to reduce round trips.
const chunks = [];
let buf = '';
for (const s of stmts) {
  if (buf.length + s.length + 1 > 30000) {
    chunks.push(buf); buf = '';
  }
  buf += s + ';\n';
}
if (buf.trim()) chunks.push(buf);
console.log('Chunks:', chunks.length);

const headers = {
  'apikey': SERVICE_KEY,
  'Authorization': 'Bearer ' + SERVICE_KEY,
  'Content-Type': 'application/json',
};

let ok = 0, fail = 0;
for (let c = 0; c < chunks.length; c++) {
  const body = JSON.stringify({ sql: chunks[c] });
  try {
    const res = await fetch(`${URL}/rest/v1/rpc/exec_sql`, {
      method: 'POST', headers, body,
    });
    const txt = await res.text();
    if (!res.ok) {
      fail++;
      console.error(`CHUNK ${c} FAILED (${res.status}):`, txt.slice(0, 500));
    } else {
      ok++;
      if ((c + 1) % 10 === 0 || c === chunks.length - 1) console.log(`chunk ${c + 1}/${chunks.length} ok`);
    }
  } catch (e) {
    fail++;
    console.error(`CHUNK ${c} ERROR:`, e.message);
  }
}
console.log(`DONE ok=${ok} fail=${fail}`);
