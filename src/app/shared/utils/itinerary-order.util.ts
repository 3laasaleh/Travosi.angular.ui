export function orderItineraryItems<T>(items: readonly T[] | null | undefined): T[] {
  if (!Array.isArray(items)) return [];

  return items
    .map((item, index) => ({ item, index, order: readOrder(item) }))
    .sort((left, right) => {
      if (left.order !== null && right.order !== null) {
        return left.order - right.order || left.index - right.index;
      }
      if (left.order !== null) return -1;
      if (right.order !== null) return 1;
      return left.index - right.index;
    })
    .map(({ item }) => item);
}

function readOrder(item: unknown): number | null {
  const value = item as { orderNumber?: unknown; OrderNumber?: unknown } | null | undefined;
  const order = Number(value?.orderNumber ?? value?.OrderNumber);
  return Number.isFinite(order) && order > 0 ? order : null;
}
