export interface CityHomeImageDTO {
  imageUrl?: string | null;
}

export interface CityHomeDTO {
  id: number;
  routeName?: string | null;
  name?: string | null;
  description?: string | null;
  destinationId?: number | null;
  destinationName?: string | null;
  images?: CityHomeImageDTO[];
  coverImageUrl?: string | null;
  imageUrl?: string | null;
  isActive?: boolean;
}
