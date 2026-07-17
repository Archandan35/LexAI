import { SchemaCompiler } from '@/data-provider/schema/SchemaCompiler.js';

const artifact = SchemaCompiler.installArtifact('supabase');
const text = artifact?.text || '';
process.stdout.write('SQL_LENGTH:' + text.length + '\n');
const fs = await import('fs');
fs.writeFileSync('scripts/install-supabase.sql', text, 'utf8');
process.stdout.write('WROTE scripts/install-supabase.sql\n');
