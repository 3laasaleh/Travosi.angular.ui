export var FlightClassEnum;
(function (FlightClassEnum) {
    FlightClassEnum[FlightClassEnum["Economy"] = 0] = "Economy";
    FlightClassEnum[FlightClassEnum["Business"] = 1] = "Business";
    FlightClassEnum[FlightClassEnum["First"] = 2] = "First";
})(FlightClassEnum || (FlightClassEnum = {}));
export const FLIGHT_CLASS_OPTIONS = [
    { value: FlightClassEnum.Economy, labelKey: 'flightClassEconomy' },
    { value: FlightClassEnum.Business, labelKey: 'flightClassBusiness' },
    { value: FlightClassEnum.First, labelKey: 'flightClassFirst' },
];
