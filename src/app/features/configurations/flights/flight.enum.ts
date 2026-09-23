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
    Economy, PremiumEconomy, Business, First
}

export const FLIGHT_CLASS_OPTIONS = [
  { value: FlightClassEnum.Economy, labelKey: 'flightClassEconomy' },
  { value: FlightClassEnum.PremiumEconomy, labelKey: 'flightClassPremiumEconomy' },
  { value: FlightClassEnum.Business, labelKey: 'flightClassBusiness' },
  { value: FlightClassEnum.First, labelKey: 'flightClassFirst' },
];


export enum FlighConnectionTypeEnum {
DIRECT , 
STOPPED

}