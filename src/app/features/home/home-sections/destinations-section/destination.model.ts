export interface DestinationHomeImageDTO {
  imageUrl?: string | null;
  altEng?: string | null;
  altAr?: string | null;
}

export interface DestinationHomeDTO {
  id: number;
  routeName?: string | null;
  name: string;
  subDescription?: string | null;
  description?: string | null;
  isActive: boolean;
  images: DestinationHomeImageDTO[];
}
