export function apiPrice(value: unknown): number {
  const price = Number(value ?? 0);
  return Number.isFinite(price) ? price : 0;
}

export function apiCurrencyLabel(currencyId: number=2): string {
  if (currencyId === 2) return '$';
  if (currencyId === 1) return 'EGP';
  return '';
}
