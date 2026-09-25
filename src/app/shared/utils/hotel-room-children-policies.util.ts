export interface HotelRoomChildrenPolicy {
  valueEng: string;
  valueAr: string;
}

/** Read bilingual arrays and preserve policies saved in the older text format. */
export function readRoomChildrenPolicies(value: unknown): HotelRoomChildrenPolicy[] {
  if (typeof value === 'string') {
    const text = value.trim();
    if (!text) return [];
    if (text.startsWith('[')) {
      try {
        const parsed: unknown = JSON.parse(text);
        if (Array.isArray(parsed)) return readRoomChildrenPolicies(parsed);
      } catch { /* Legacy policy text may begin with a bracket. */ }
    }
    return text.split(';').map(item => item.trim()).filter(Boolean).map(legacyPolicy);
  }
  if (!Array.isArray(value)) return [];
  return value.flatMap(item => {
    if (typeof item === 'string') return item.trim() ? [legacyPolicy(item.trim())] : [];
    if (!item || typeof item !== 'object') return [];
    const valueEng = String(item.valueEng ?? item.ValueEng ?? '').trim();
    const valueAr = String(item.valueAr ?? item.ValueAr ?? '').trim();
    if (valueEng || valueAr) return [{ valueEng, valueAr }];
    const legacy = String(item.value ?? item.Value ?? '').trim();
    return legacy ? [legacyPolicy(legacy)] : [];
  });
}

function legacyPolicy(value: string): HotelRoomChildrenPolicy {
  return /[\u0600-\u06ff]/.test(value)
    ? { valueEng: '', valueAr: value }
    : { valueEng: value, valueAr: '' };
}
