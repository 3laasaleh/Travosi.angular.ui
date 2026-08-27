export interface TourItineraryItem {
  id: number;
  parentId: number | null;
  isChildNode: boolean;
  title: string;
  value: string;
  description: string;
  notes: string;
  date: string;
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
    notes: '',
    date: '',
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
    notes: String(item?.notes ?? item?.Notes ?? ''),
    date: toDateInput(item?.date ?? item?.Date),
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
    notes: String(item?.notes ?? '').trim(),
    date: toDateInput(item?.date ?? item?.Date),
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

function toDateInput(value: unknown): string {
  if (!value) return '';
  const match = String(value).match(/^(\d{4}-\d{2}-\d{2})/);
  return match?.[1] ?? '';
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
