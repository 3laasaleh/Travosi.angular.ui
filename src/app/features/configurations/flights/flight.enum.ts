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


export enum FlighConnectionTypeEnum {
DIRECT , 
STOPPED

}