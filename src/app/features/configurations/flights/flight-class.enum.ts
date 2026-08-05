export enum FlightClassEnum {
  Economy = 0,
  Business,
  First,
}

export const FLIGHT_CLASS_OPTIONS = [
  { value: FlightClassEnum.Economy, labelKey: 'flightClassEconomy' },
  { value: FlightClassEnum.Business, labelKey: 'flightClassBusiness' },
  { value: FlightClassEnum.First, labelKey: 'flightClassFirst' },
];
