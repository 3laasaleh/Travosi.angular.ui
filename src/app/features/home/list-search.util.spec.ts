import { describe, expect, it } from 'vitest';
import { isExpiredPackage, isExpiredTour, isSoldOut, isWithinDateRange, matchesSearchQuery } from './list-search.util';

describe('list search helpers', () => {
  it('matches a title or destination search', () => {
    const item = { nameEng: 'Dubai City Escape', destinationName: 'Dubai' };

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

  it('excludes expired packages and tours using their relevant travel date', () => {
    expect(isExpiredPackage({ dateFrom: '2020-01-01' })).toBe(true);
    expect(isExpiredTour({ startDate: '2020-01-01', endDate: '2020-01-02' })).toBe(true);
    expect(isExpiredTour({ startDate: '2020-01-01', endDate: '2099-01-02' })).toBe(false);
    expect(isExpiredPackage({ isExpired: true })).toBe(true);
  });

  it('recognizes explicit and calculated sold-out inventory', () => {
    expect(isSoldOut({ isSoldOut: true })).toBe(true);
    expect(isSoldOut({ seatsAvailable: 0 })).toBe(true);
    expect(isSoldOut({ maxSeats: 10, seatsBooked: 10 })).toBe(true);
    expect(isSoldOut({ maxCapacity: 10, seatsBooked: 9 })).toBe(false);
  });
});
