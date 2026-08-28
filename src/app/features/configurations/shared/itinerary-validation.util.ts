interface ItineraryScheduleItem {
  titleEng?: unknown;
  titleAr?: unknown;
  arrivalDate?: unknown;
  startTime?: unknown;
  endTime?: unknown;
  childs?: unknown;
}

export function isQuarterHourTime(value: unknown): boolean {
  return typeof value === 'string' && /^([01]\d|2[0-3]):(00|15|30|45)$/.test(value.trim());
}

export function hasInvalidItinerary(items: ItineraryScheduleItem[]): boolean {
  return items.some((item) => {
    const startMinutes = timeToMinutes(item.startTime);
    const endMinutes = timeToMinutes(item.endTime);
    const children = readChildren(item);

    return (
      !String(item.titleEng ?? '').trim() ||
      !String(item.titleAr ?? '').trim() ||
      startMinutes === null ||
      endMinutes === null ||
      endMinutes <= startMinutes ||
      hasInvalidItinerary(children)
    );
  });
}

export function hasItineraryTimeOverlap(items: ItineraryScheduleItem[]): boolean {
  for (let leftIndex = 0; leftIndex < items.length; leftIndex++) {
    const left = items[leftIndex];
    const leftStart = timeToMinutes(left.startTime);
    const leftEnd = timeToMinutes(left.endTime);
    if (leftStart === null || leftEnd === null) continue;

    for (let rightIndex = leftIndex + 1; rightIndex < items.length; rightIndex++) {
      const right = items[rightIndex];
      const leftArrivalDate = String(left.arrivalDate ?? '');
      if (!leftArrivalDate || leftArrivalDate !== String(right.arrivalDate ?? '')) continue;

      const rightStart = timeToMinutes(right.startTime);
      const rightEnd = timeToMinutes(right.endTime);
      if (rightStart === null || rightEnd === null) continue;
      if (leftStart < rightEnd && rightStart < leftEnd) return true;
    }
  }

  return items.some((item) => hasItineraryTimeOverlap(readChildren(item)));
}

function readChildren(item: ItineraryScheduleItem): ItineraryScheduleItem[] {
  return Array.isArray(item.childs) ? (item.childs as ItineraryScheduleItem[]) : [];
}

function timeToMinutes(value: unknown): number | null {
  if (!isQuarterHourTime(value)) return null;
  const [hours, minutes] = String(value).split(':').map(Number);
  return hours * 60 + minutes;
}
