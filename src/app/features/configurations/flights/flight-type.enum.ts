export enum FlightTypeEnum {
  OneWay = 0,
  RoundTrip,
  MultiCity,
}

export const FLIGHT_TYPE_OPTIONS = [
  { value: FlightTypeEnum.OneWay, labelKey: 'oneWay' },
  { value: FlightTypeEnum.RoundTrip, labelKey: 'roundTrip' },
  { value: FlightTypeEnum.MultiCity, labelKey: 'multiCity' },
];