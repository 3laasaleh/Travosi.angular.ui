import { cityAreaIds, selectCityTours } from './city-tours';

describe('city tour relevance', () => {
  const city = { id: 1, destinationId: 1, surroundingCityIds: [2, '2', 0, -1] };
  it('prioritizes the city and admits only its explicitly configured area', () => {
    expect(cityAreaIds(city)).toEqual([1, 2]);
    const tours = [
      { id: 2, cityId: 2, destinationId: 1 },
      { id: 3, cityId: 3, destinationId: 1 },
      { id: 4, cityId: 1, destinationId: 99 },
      { id: 1, cityId: 1, destinationId: 1 },
      { id: 1, cityId: 1, destinationId: 1 },
      { id: 5, cityId: 1, destinationId: 1, endDate: '2000-01-01' },
      { id: 6, cityId: 1, destinationId: 1, isActive: false },
    ];
    expect(selectCityTours(tours, city).map(tour => tour.id)).toEqual([1, 2]);
  });
  it('does not infer surrounding cities from a destination-wide recommendation', () => {
    expect(selectCityTours([{ id: 9, cityId: 9, destinationId: 1 }], { id: 1, destinationId: 1 })).toEqual([]);
  });
});
