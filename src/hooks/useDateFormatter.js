import { useState, useEffect, useCallback, useRef } from 'react';
import { DateEngine } from '@/core/DateEngine.js';
import { settingsCache } from '@/core/settingsCache.js';

const PLACEHOLDER_MAP = {
  'june23': 'dd Month yyyy',
  '23june': 'dd Month yyyy',
  '23rdjune': 'dd Month yyyy',
  '23.06.2026': 'dd.mm.yyyy',
  '2026-06-23': 'yyyy-mm-dd',
  'iso': 'yyyy-mm-dd',
  '23-06-2026': 'dd-mm-yyyy',
  '23/06/2026': 'dd/mm/yyyy',
  'dmy': 'dd/mm/yyyy',
  '06/23/2026': 'mm/dd/yyyy',
  'mdy': 'mm/dd/yyyy',
};

function getPlaceholder(dateFormat) {
  return PLACEHOLDER_MAP[dateFormat] || dateFormat || 'dd-mm-yyyy';
}

export function useDateFormatter() {
  const [cache, setCache] = useState(() => settingsCache.getAll());
  const prevRef = useRef(null);

  useEffect(() => {
    const unsub = settingsCache.subscribe((s) => {
      setCache({ ...s });
    });
    return unsub;
  }, []);

  const dateFormat = cache.dateFormat || 'june23';
  const timeFormat = cache.timeFormat || '12h';
  const timezone = cache.timezone;

  const formatDate = useCallback((value, format, tz) => {
    return DateEngine.formatDate(value, format || dateFormat, tz || timezone);
  }, [dateFormat, timezone]);

  const formatDateTime = useCallback((value, dateFmt, timeFmt, tz) => {
    const d = DateEngine.formatDate(value, dateFmt || dateFormat, tz || timezone);
    const t = DateEngine.formatTime(value, timeFmt || timeFormat, tz || timezone);
    return `${d} ${t}`;
  }, [dateFormat, timeFormat, timezone]);

  const formatTime = useCallback((value, format, tz) => {
    return DateEngine.formatTime(value, format || timeFormat, tz || timezone);
  }, [timeFormat, timezone]);

  const datePlaceholder = getPlaceholder(dateFormat);

  return { formatDate, formatDateTime, formatTime, dateFormat, timeFormat, timezone, datePlaceholder };
}

export default useDateFormatter;
