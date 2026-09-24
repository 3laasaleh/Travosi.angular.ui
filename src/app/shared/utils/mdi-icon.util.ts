/**
 * Returns a Material Design Icons class from either a full database key
 * (`mdi-shower`) or a legacy short key (`shower`).
 */
export function mdiIconClass(iconKey: unknown, fallback = 'mdi-check-circle'): string {
  const parts = String(iconKey ?? '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const key = parts.find((part) => part.startsWith('mdi-'))
    ?? parts.find((part) => part !== 'mdi');

  if (!key) return fallback.startsWith('mdi-') ? fallback : `mdi-${fallback}`;
  return key.startsWith('mdi-') ? key : `mdi-${key}`;
}
