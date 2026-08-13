export interface HomePriceFormatter {
  formatPrice(value: unknown, sourceCurrency?: unknown): string;
}

/**
 * Resolves the currency attached to a travel product without assuming that
 * values returned by the API have already been converted for display.
 * Packages currently have no currency field and therefore use the API's USD
 * base currency.
 */
export function homePriceSource(item: any): unknown {
  const direct = item?.currencyId
    ?? item?.sourceCurrencyId
    ?? item?.currencyCode
    ?? item?.sourceCurrencyCode
    ?? item?.currencySign;
  if (direct !== null && direct !== undefined && direct !== '') return direct;

  const nested = item?.currency;
  if (nested !== null && nested !== undefined && typeof nested !== 'object') return nested;
  return nested?.id ?? nested?.code ?? nested?.sign ?? nested?.name ?? 'USD';
}

export function formatHomePrice(
  formatter: HomePriceFormatter,
  value: unknown,
  item: any,
): string {
  return formatter.formatPrice(value, homePriceSource(item));
}
