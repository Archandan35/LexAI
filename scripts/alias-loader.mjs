import { pathToFileURL } from 'url';
import { existsSync } from 'fs';
import path from 'path';

const SRC = path.resolve('src');

export async function resolve(specifier, context, next) {
  if (specifier.startsWith('@/')) {
    const rel = specifier.slice(2);
    let candidate = path.join(SRC, rel);
    const exts = ['', '.js', '.mjs', '.json'];
    let found = null;
    for (const e of exts) {
      if (existsSync(candidate + e)) { found = candidate + e; break; }
    }
    if (found) {
      return { url: pathToFileURL(found).href, shortCircuit: true };
    }
  }
  return next(specifier, context);
}
