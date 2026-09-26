import { hotelImageFileError, hotelImagesError } from './hotel-image-validation.util';

describe('Hotel and room image validation', () => {
  it('rejects empty files, unsupported types, and oversized uploads', () => {
    expect(hotelImageFileError(new File([], 'empty.png', { type: 'image/png' }))).toBe('invalidImageType');
    expect(hotelImageFileError(new File(['bad'], 'bad.svg', { type: 'image/svg+xml' }))).toBe('invalidImageType');
    expect(hotelImageFileError(new File([new Uint8Array(5 * 1024 * 1024 + 1)], 'large.jpg', { type: 'image/jpeg' }))).toBe('imageTooLarge');
  });
  it('validates existing captions and the total image limit', () => {
    expect(hotelImagesError([{ altEng: ' ', altAr: 'صورة' }])).toBe('imageAltRequired');
    expect(hotelImagesError([{ altEng: 'x'.repeat(501), altAr: 'صورة' }])).toBe('hotelImageAltTooLong');
    expect(hotelImagesError(Array.from({ length: 6 }, () => ({ altEng: 'Photo', altAr: 'صورة' })))).toBe('hotelImageLimit');
    expect(hotelImagesError([{ altEng: 'Photo', altAr: 'صورة' }])).toBe('');
  });
});
