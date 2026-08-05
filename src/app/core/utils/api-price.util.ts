export function apiPrice(value: unknown): number {
  const price = Number(value ?? 0);
  return Number.isFinite(price) ? price : 0;
}

export function apiCurrencyLabel(source: any): string {
  const currency = source?.currency;
  const label =
    source?.currencySymbol ??
    source?.currencySign ??
    currency?.symbol ??
    currency?.sign ??
    source?.currencyCode ??
    currency?.code;

  if (label !== null && label !== undefined && String(label).trim()) {
    return String(label).trim();
  }

  // The current API uses these identifiers when it does not include currency details.
  const currencyId = Number(source?.currencyId ?? currency?.id);
  if (currencyId === 2) return '$';
  if (currencyId === 1) return 'EGP';
  return '';
}
