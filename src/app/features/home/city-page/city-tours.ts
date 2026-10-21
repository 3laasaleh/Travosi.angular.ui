import { isExpiredTour } from '../list-search.util';

/** Surrounding areas are explicit API configuration; sharing a country is not enough. */
export function cityAreaIds(city: any): number[] {
  return [...new Set([city?.id, ...(Array.isArray(city?.surroundingCityIds) ? city.surroundingCityIds : [])]
    .map(Number).filter(id => Number.isInteger(id) && id > 0))];
}

export function selectCityTours(tours: any[], city: any): any[] {
  const allowed = new Set(cityAreaIds(city));
  const seen = new Set<number>();
  return tours.filter(tour => {
    const id = Number(tour?.id);
    if (!id || seen.has(id) || !allowed.has(Number(tour?.cityId))
      || (tour?.destinationId != null && Number(tour.destinationId) !== Number(city?.destinationId))
      || tour?.isActive === false || isExpiredTour(tour)) return false;
    seen.add(id);
    return true;
  }).sort((a, b) => Number(Number(b.cityId) === Number(city.id)) - Number(Number(a.cityId) === Number(city.id)));
}
