import { config } from '@/config/config.js';
import DatabasePreferencesProvider from './DatabasePreferencesProvider.js';

const registry = {
  database: () => new DatabasePreferencesProvider(),
};

let instance = null;

export function getPreferencesProvider() {
  if (instance) return instance;
  const key = config.providers.preferences;
  if (key && registry[key]) {
    instance = registry[key]();
  } else {
    // Default: persist through the active database provider so preferences
    // (backup catalogs, schedules, UI state) survive page reloads.
    instance = new DatabasePreferencesProvider();
  }
  return instance;
}

export function resetPreferencesProvider() { instance = null; }

export default getPreferencesProvider;
