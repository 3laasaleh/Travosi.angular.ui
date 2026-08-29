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

export function matchesSearchQuery(query: string, item: any): boolean {
  const cleanedQuery = normalizeText(query);
  if (!cleanedQuery) return true;

  const searchableValues = [
    item?.titleEng,
    item?.titleAr,
    item?.titleEng,
    item?.titleAr,
    item?.name,
    item?.title,
    item?.destinationName,
    item?.destination?.titleEng,
    item?.destination?.titleAr,
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
