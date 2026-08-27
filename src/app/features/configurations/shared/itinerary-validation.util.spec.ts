import { hasInvalidItinerary, hasItineraryTimeOverlap } from './itinerary-validation.util';

describe('itinerary validation', () => {
  const validStep = {
    date: '2030-01-02',
    title: 'Museum visit',
    startTime: '09:00',
    endTime: '11:00',
    childs: [],
  };

  it('requires a real date instead of a day number', () => {
    expect(hasInvalidItinerary([validStep])).toBe(false);
    expect(hasInvalidItinerary([{ ...validStep, date: '' }])).toBe(true);
    expect(hasInvalidItinerary([{ ...validStep, date: '02/01/2030' }])).toBe(true);
  });

  it('detects overlapping steps only when they share the same date', () => {
    const overlapping = { ...validStep, title: 'Gallery', startTime: '10:00', endTime: '12:00' };
    const nextDay = { ...overlapping, date: '2030-01-03' };

    expect(hasItineraryTimeOverlap([validStep, overlapping])).toBe(true);
    expect(hasItineraryTimeOverlap([validStep, nextDay])).toBe(false);
  });
});
