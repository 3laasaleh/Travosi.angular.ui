import { ImageDTO } from "../../../../shared/models/image-dto";

export interface PackageDTO {
  id: number;

  name: string;
  nameEng: string;
  nameAr: string;

  routeName: string;

  description: string;
  descriptionEng: string;
  descriptionAr: string;

  durationDays: number;
  durationHours: number;

  pricePerPerson: number;
  pricePerChild: number;
  pricePerInfant: number;

  currencyId: number;

  maxCapacity: number;
  seatsBooked: number;
  seatsAvailable: number;

  isActive: boolean;

  cancellationPolicies: PolicyDTO[];
  highlights: PackageHighlightDTO[];
  includes: PackageIncludeDTO[];
  excludes: PackageExcludeDTO[];
  isFreeCancelation: boolean;

  dateFrom: string;
  dateTo: string;

  bookingsCount: number;

  activeDiscount?: TravelDiscountDTO | null;

  discountedPricePerPerson?: number | null;
  discountedPricePerChild?: number | null;
  discountedPricePerInfant?: number | null;

  destinations: PackageDestinationDTO[];
  images: ImageDTO[];
  itinerary: PackageItineraryDTO[];
}

export interface PolicyDTO {
  id: number;

  value?: string | null;
  valueEng?: string | null;
  valueAr?: string | null;
}

export interface TravelDiscountDTO {
  id: number;

  tourId?: number | null;
  packageId?: number | null;

  productType: string;
  productName: string;

  percentage: number;

  dateFromUtc: string;
  dateToUtc: string;

  isEnabled: boolean;
  isCurrentlyActive: boolean;

  status: string;

  createdAtUtc: string;

  notificationQueuedAtUtc?: string | null;

  canNotifyCustomers: boolean;

  stoppedAtUtc?: string | null;

  restartedFromDiscountId?: number | null;

  emailsQueued: number;
}

export interface PackageDestinationDTO {
  destinationId: number;

  destinationName?: string | null;
  destinationNameEng?: string | null;
  destinationNameAr?: string | null;

  
}



export interface PackageItineraryDTO {
  id: number;

  orderNumber: number;

  parentId?: number | null;

  isChildNode: boolean;

  title: string;
  value: string;
  notes: string;

  titleAr: string;
  titleEng: string;

  valueAr: string;
  valueEng: string;

  notesEng: string;
  notesAr: string;

  arrivalDate?: string | null;

  startTime?: string | null;
  endTime?: string | null;

  childs: PackageItineraryDTO[];
}

export interface PackageHighlightDTO {
  id: number;
  valueEng: string;
  valueAr: string;
}

export interface PackageIncludeDTO {
  id: number;
  valueEng: string;
  valueAr: string;
}

export interface PackageExcludeDTO {
  id: number;
  valueEng: string;
  valueAr: string;
}
