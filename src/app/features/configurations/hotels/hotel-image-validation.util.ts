export const HOTEL_IMAGE_ALT_MAX_LENGTH = 500;
export const HOTEL_IMAGE_MAX_BYTES = 5 * 1024 * 1024;

export function hotelImageFileError(file: File): string {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size === 0) return 'invalidImageType';
  return file.size > HOTEL_IMAGE_MAX_BYTES ? 'imageTooLarge' : '';
}

export function hotelImagesError(images: Array<{ altEng: string; altAr: string; file?: File }>): string {
  if (images.length > 5) return 'hotelImageLimit';
  for (const image of images) {
    if (!image.altEng.trim() || !image.altAr.trim()) return 'imageAltRequired';
    if (image.altEng.trim().length > HOTEL_IMAGE_ALT_MAX_LENGTH || image.altAr.trim().length > HOTEL_IMAGE_ALT_MAX_LENGTH) return 'hotelImageAltTooLong';
    if (image.file) {
      const error = hotelImageFileError(image.file);
      if (error) return error;
    }
  }
  return '';
}
