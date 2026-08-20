import { describe, expect, it } from 'vitest';
import { isWithinDateRange, matchesSearchQuery } from './list-search.util';

describe('list search helpers', () => {
  it('matches a title or destination search', () => {
    const item = { titleEng: 'Dubai City Escape', destinationName: 'Dubai' };

    expect(matchesSearchQuery('dubai', item)).toBe(true);
    expect(matchesSearchQuery('escape', item)).toBe(true);
    expect(matchesSearchQuery('amman', item)).toBe(false);
  });

  it('matches items that overlap the selected date range', () => {
    const item = { startDate: '2026-04-10', endDate: '2026-04-20' };

    expect(isWithinDateRange('2026-04-05', '2026-04-12', item)).toBe(true);
    expect(isWithinDateRange('2026-04-15', '2026-04-25', item)).toBe(true);
    expect(isWithinDateRange('2026-04-22', '2026-04-27', item)).toBe(false);
  });
});
