export interface TourItineraryItem {
  id: number;
  orderNumber: number;
  parentId: number | null;
  isChildNode: boolean;
  titleAr: string;
  titleEng: string;
  valueAr: string;
  valueEng: string;
  notesEng: string;
  notesAr: string;
  arrivalDate: string;
  startTime: string | null;
  endTime: string | null;
  tourId: number | null;
  childs: TourItineraryItem[];
}

export function createEmptyTourItinerary(tourId: number | null = null): TourItineraryItem {
  return {
    id: 0,
    orderNumber: 0,
    parentId: null,
    isChildNode: false,
    titleAr: '',
    titleEng: '',
    valueAr: '',
    valueEng: '',
    notesEng: '',
    notesAr: '',
    arrivalDate: '',
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
    orderNumber: Number(item?.orderNumber) || 0,
    parentId: toOptionalId(item?.parentId),
    isChildNode: item?.isChildNode === true,
    titleAr: String(item?.titleAr ?? item?.title ?? ''),
    titleEng: String(item?.titleEng ?? item?.title ?? ''),
    valueAr: String(item?.valueAr ?? item?.value ?? ''),
    valueEng: String(item?.valueEng ?? item?.value ?? ''),
    // Keep a legacy one-language note usable when editing existing records.
    notesEng: String(item?.notesEng ?? item?.NotesEng ?? item?.notes ?? item?.Notes ?? ''),
    notesAr: String(item?.notesAr ?? item?.NotesAr ?? item?.notes ?? item?.Notes ?? ''),
    arrivalDate: toDateInput(item?.arrivalDate ?? item?.ArrivalDate ?? item?.date ?? item?.Date),
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
    orderNumber: Number(item?.orderNumber) || 0,
    parentId: isChildNode ? toOptionalId(item?.parentId) : null,
    isChildNode,
    titleAr: String(item?.titleAr ?? item?.title ?? '').trim(),
    titleEng: String(item?.titleEng ?? item?.title ?? '').trim(),
    valueAr: String(item?.valueAr ?? item?.value ?? '').trim(),
    valueEng: String(item?.valueEng ?? item?.value ?? '').trim(),
    notesEng: String(item?.notesEng ?? item?.NotesEng ?? '').trim(),
    notesAr: String(item?.notesAr ?? item?.NotesAr ?? '').trim(),
    arrivalDate: toDateInput(item?.arrivalDate ?? item?.ArrivalDate ?? item?.date ?? item?.Date),
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
