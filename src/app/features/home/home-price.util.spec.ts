import { formatHomePrice, homePriceSource } from './home-price.util';

describe('home price formatting', () => {
  it('preserves an explicit source currency id', () => {
    expect(homePriceSource({ currencyId: 1, currency: { id: 2 } })).toBe(1);
  });

  it('supports nested currency codes and defaults package prices to USD', () => {
    expect(homePriceSource({ currency: { code: 'EGP' } })).toBe('EGP');
    expect(homePriceSource({ pricePerPerson: 100 })).toBe('USD');
  });

  it('passes the raw value and resolved source to the centralized formatter', () => {
    const calls: unknown[][] = [];
    const formatter = {
      formatPrice: (value: unknown, source: unknown) => {
        calls.push([value, source]);
        return `${source}:${value}`;
      },
    };

    expect(formatHomePrice(formatter, 125.5, { currencyId: 1 })).toBe('1:125.5');
    expect(calls).toEqual([[125.5, 1]]);
  });

  it('does not cache formatter output when the selected display currency changes', () => {
    let target = 'USD';
    const formatter = { formatPrice: (value: unknown) => `${target}:${value}` };
    const item = { currencyId: 2 };

    expect(formatHomePrice(formatter, 100, item)).toBe('USD:100');
    target = 'EGP';
    expect(formatHomePrice(formatter, 100, item)).toBe('EGP:100');
  });
});
