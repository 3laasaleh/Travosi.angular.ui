import { orderItineraryItems } from './itinerary-order.util';

describe('orderItineraryItems', () => {
  it('orders API itinerary rows ascending and preserves insertion order when no order exists', () => {
    expect(orderItineraryItems([
      { id: 3, orderNumber: 3 },
      { id: 2, orderNumber: 2 },
      { id: 1, orderNumber: 1 },
    ]).map((item) => item.id)).toEqual([1, 2, 3]);

    expect(orderItineraryItems([{ id: 1 }, { id: 2 }, { id: 3 }]).map((item) => item.id))
      .toEqual([1, 2, 3]);
  });
});
