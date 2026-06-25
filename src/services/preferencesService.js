import { getPreferencesProvider } from '@/providers/preferences/index.js';

// preferencesService — provider-agnostic UI preference storage.
const _pref = getPreferencesProvider(); // eager init — fires DB load on construction
export const preferencesService = {
  get: (key, fallback = null) => getPreferencesProvider().get(key, fallback),
  set: (key, value) => getPreferencesProvider().set(key, value),
  remove: (key) => getPreferencesProvider().remove(key),
};

export default preferencesService;
