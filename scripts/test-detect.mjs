import { databaseInstaller } from '@/data-provider/migrations/DatabaseInstaller.js';
import { config } from '@/config/config.js';

config.credentials.supabaseUrl = 'https://jsydumdmswwqxnbwrdxj.supabase.co';
config.credentials.supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzeWR1bWRtc3d3cXhuYndyZHhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzMDI1ODAsImV4cCI6MjA5OTg3ODU4MH0.YH8phHDLrbnHhRBM4W7oSK8GdCgaCDU6F_PWtO3Tlic';
config.credentials.supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzeWR1bWRtc3d3cXhuYndyZHhqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDMwMjU4MCwiZXhwIjoyMDk5ODc4NTgwfQ.gcuBm_MozJat5x2j7yQM-COVjgGOwtI4GfDqDs5b5x4';
config.providers.database = 'supabase';

const result = await databaseInstaller.detect();
console.log('DETECT RESULT:', JSON.stringify({ present: result.present?.length, missing: result.missing?.length, blocked: result.blocked?.length, installed: result.installed, needsSetup: result.needsSetup, blockedFlag: result.blocked, error: result.error }, null, 2));
