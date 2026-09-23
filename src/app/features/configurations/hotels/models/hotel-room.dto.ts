import { ImageDTO } from "../../../../shared/models/image-dto";

export interface HotelRoomDto {
  id: number;
  hotelId: number;

  nameEng: string;
  nameAr: string;
  routeName: string | null;

  descriptionEng: string | null;
  descriptionAr: string | null;

  roomSize: number | null;

  maxInfants: number;
  maxTotalOccupancy: number;

  bedTypeEng: string | null;
  bedTypeAr: string | null;
  bedType?: string | null;
  bedSize: string | null;

  numberOfBathrooms: number;
  smokingAllowed: boolean;

  bathroom: string | null;
  view: string | null;

  avilableRoomsCount: number;
  hasBalcony: boolean;

  roomType: any;
  mealPlan: any;

  maxAdults: number;
  maxChildren: number;

  isActive: boolean;

  // Navigation properties
  images: ImageDTO[];

  roomPeriodPrices: RoomPeriodPriceDto[];
  amenities:number[];
}
export interface RoomPeriodPriceDto {
  id: number;
  startDate: string; // DateOnly -> YYYY-MM-DD
  endDate: string;   // DateOnly -> YYYY-MM-DD
  price: number;
  hotelRoomId: number;
  hotelRoom: HotelRoomDto;
  isActive: boolean;
}
