export interface TourItineraryItem {
  id: number;
  parentId: number | null;
  isChildNode: boolean;
  title: string;
  value: string;
  description: string;
  dayNumber: number;
  startTime: string | null;
  endTime: string | null;
  tourId: number | null;
  childs: TourItineraryItem[];
}

export function createEmptyTourItinerary(tourId: number | null = null): TourItineraryItem {
  return {
    id: 0,
    parentId: null,
    isChildNode: false,
    title: '',
    value: '',
    description: '',
    dayNumber: 1,
    startTime: null,
    endTime: null,
    tourId,
    childs: [],
  };
}

export function readTourItinerary(
  item: any,
  fallbackTourId: number | null = null,
): TourItineraryItem {
  return {
    id: toRequiredId(item?.id),
    parentId: toOptionalId(item?.parentId),
    isChildNode: item?.isChildNode === true,
    title: String(item?.title ?? ''),
    value: String(item?.value ?? ''),
    description: String(item?.description ?? ''),
    dayNumber: toDayNumber(item?.dayNumber ?? item?.DayNumber),
    startTime: toTimeInput(item?.startTime),
    endTime: toTimeInput(item?.endTime),
    tourId: toOptionalId(item?.tourId) ?? fallbackTourId,
    childs: readChildren(item).map((child) => readTourItinerary(child, fallbackTourId)),
  };
}

export function toTourItineraryPayload(
  item: any,
  fallbackTourId: number | null = null,
): TourItineraryItem {
  const isChildNode = item?.isChildNode === true;
  return {
    id: toRequiredId(item?.id),
    parentId: isChildNode ? toOptionalId(item?.parentId) : null,
    isChildNode,
    title: String(item?.title ?? '').trim(),
    value: String(item?.value ?? '').trim(),
    description: String(item?.description ?? '').trim(),
    dayNumber: toDayNumber(item?.dayNumber ?? item?.DayNumber),
    startTime: toApiTime(item?.startTime),
    endTime: toApiTime(item?.endTime),
    tourId: toOptionalId(item?.tourId) ?? fallbackTourId,
    childs: readChildren(item).map((child) => toTourItineraryPayload(child, fallbackTourId)),
  };
}

function readChildren(item: any): any[] {
  const children = item?.childs ?? item?.children ?? item?.childItineraries;
  return Array.isArray(children) ? children : [];
}

function toRequiredId(value: unknown): number {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : 0;
}

function toOptionalId(value: unknown): number | null {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function toDayNumber(value: unknown): number {
  const dayNumber = Number(value);
  return Number.isInteger(dayNumber) && dayNumber > 0 ? dayNumber : 1;
}

function toTimeInput(value: unknown): string | null {
  if (typeof value !== 'string' || !value.trim()) return null;
  const match = value.trim().match(/^(\d{2}):(\d{2})/);
  return match ? `${match[1]}:${match[2]}` : null;
}

function toApiTime(value: unknown): string | null {
  const time = toTimeInput(value);
  return time ? `${time}:00` : null;
}
