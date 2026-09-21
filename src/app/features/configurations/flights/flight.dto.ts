import { FlightTypeEnum } from './flight.enum';

export interface CreateFlightSegmentDto {
  airlineId: number;
  airlineCode: string;
  flightNumber: string;
  ticketNumber: string | null;
  originAirport: string;
  destinationAirport: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  cabinClass: string;
}

export interface CreateFlightLegDto {
  originAirport: string;
  destinationAirport: string;
  segments: CreateFlightSegmentDto[];
}

export interface CreateFlightDto {
  flightType: FlightTypeEnum;
  adults: number;
  children: number;
  infants: number;
  price: number;
  baggageAllowanceKg: number | null;
  legs: CreateFlightLegDto[];
}

export interface UpdateFlightDto extends CreateFlightDto {
  id: number;
}

export interface FlightDto {
  id: number;
}

export interface FlightApiResponseDto {
  isSuccess?: boolean;
  message?: string;
  data?: FlightDto;
}
