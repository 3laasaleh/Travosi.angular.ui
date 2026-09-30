function normalizeText(value: unknown): string {
  return String(value ?? '').trim().toLowerCase();
}

function pickDateValue(item: any, keys: string[]): string {
  for (const key of keys) {
    const value = item?.[key];
    if (value) return String(value).slice(0, 10);
  }

  return '';
}

function todayDate(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

function hasValue(value: unknown): boolean {
  return value !== null && value !== undefined && String(value).trim() !== '';
}

function nonNegativeNumber(value: unknown): number | null {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

/** Packages are unavailable once their departure date has passed. */
export function isExpiredPackage(item: any): boolean {
  if (item?.isExpired === true) return true;
  const departure = pickDateValue(item, ['dateFrom', 'startDate', 'travelStartDate', 'departureDate']);
  return Boolean(departure && departure < todayDate());
}

/** Tours are unavailable after their final travel date; a one-day tour may only have a start date. */
export function isExpiredTour(item: any): boolean {
  if (item?.isExpired === true) return true;
  const finalDate = pickDateValue(item, ['endDate', 'dateTo', 'travelEndDate', 'returnDate', 'toDate'])
    || pickDateValue(item, ['startDate', 'dateFrom', 'travelStartDate', 'departureDate', 'fromDate']);
  return Boolean(finalDate && finalDate < todayDate());
}

/** A product is sold out when the API says so, no seats remain, or booked seats fill its configured capacity. */
export function isSoldOut(item: any): boolean {
  if (item?.isSoldOut === true) return true;

  if (hasValue(item?.seatsAvailable)) {
    const available = Number(item.seatsAvailable);
    return Number.isFinite(available) && available <= 0;
  }

  const capacity = nonNegativeNumber(item?.maxSeats ?? item?.maxCapacity ?? item?.groupSize ?? item?.capacity);
  if (!capacity || capacity <= 0) return false;

  const booked = nonNegativeNumber(item?.seatsBooked ?? item?.bookedSeats ?? item?.bookingsCount) ?? 0;
  return booked >= capacity;
}

export function matchesSearchQuery(query: string, item: any): boolean {
  const cleanedQuery = normalizeText(query);
  if (!cleanedQuery) return true;

  const searchableValues = [
    item?.nameEng,
    item?.nameAr,
    item?.nameEng,
    item?.nameAr,
    item?.name,
    item?.title,
    item?.destinationName,
    item?.destination?.nameEng,
    item?.destination?.nameAr,
    item?.destination?.name,
    item?.description,
    item?.descriptionEng,
    item?.descriptionAr,
    item?.subDescription,
  ];

  return searchableValues.some((value) => normalizeText(value).includes(cleanedQuery));
}

export function isWithinDateRange(fromDate: string, toDate: string, item: any): boolean {
  if (!fromDate && !toDate) return true;

  const startDate = pickDateValue(item, ['startDate', 'dateFrom', 'travelStartDate', 'departureDate', 'fromDate']);
  const endDate = pickDateValue(item, ['endDate', 'dateTo', 'travelEndDate', 'returnDate', 'toDate']);

  if (!startDate || !endDate) {
    return false;
  }

  const startTime = new Date(startDate).getTime();
  const endTime = new Date(endDate).getTime();
  if (Number.isNaN(startTime) || Number.isNaN(endTime)) {
    return false;
  }

  const fromTime = fromDate ? new Date(fromDate).getTime() : Number.NEGATIVE_INFINITY;
  const toTime = toDate ? new Date(toDate).getTime() : Number.POSITIVE_INFINITY;

  if (fromDate && toDate && fromTime > toTime) {
    return false;
  }

  return !(fromDate && endTime < fromTime) && !(toDate && startTime > toTime);
}
