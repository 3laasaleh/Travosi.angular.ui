import { hasInvalidItinerary, hasItineraryTimeOverlap, isQuarterHourTime, isValidTime } from './itinerary-validation.util';

describe('itinerary validation', () => {
  const validStep = {
    arrivalDate: '2030-01-02',
    titleEng: 'Museum visit',
    titleAr: 'زيارة المتحف',
    valueEng: 'Visit details',
    valueAr: 'تفاصيل الزيارة',
    startTime: '09:15',
    endTime: '11:45',
    childs: [],
  };

  it('accepts valid times and restricts itinerary values to quarter hours', () => {
    expect(isValidTime('09:07')).toBe(true);
    expect(isValidTime('23:59')).toBe(true);
    expect(isValidTime('24:00')).toBe(false);
    expect(isQuarterHourTime('09:15')).toBe(true);
    expect(isQuarterHourTime('09:07')).toBe(false);
    expect(hasInvalidItinerary([validStep])).toBe(false);
    expect(hasInvalidItinerary([{ ...validStep, startTime: '09:07' }])).toBe(true);
  });

  it('detects overlapping steps only when they share the same date', () => {
    const overlapping = { ...validStep, titleEng: 'Gallery', startTime: '10:00', endTime: '12:00' };
    const nextDay = { ...overlapping, arrivalDate: '2030-01-03' };

    expect(hasItineraryTimeOverlap([validStep, overlapping])).toBe(true);
    expect(hasItineraryTimeOverlap([validStep, nextDay])).toBe(false);
  });
});
