import { truncateImageFileName } from './image-upload.util';

describe('truncateImageFileName', () => {
  it('limits the complete filename to 30 characters and preserves the extension', () => {
    const file = new File(['image'], `${'a'.repeat(40)}.jpeg`, { type: 'image/jpeg' });

    const truncated = truncateImageFileName(file);

    expect(truncated.name).toBe(`${'a'.repeat(25)}.jpeg`);
    expect(truncated.name.length).toBe(30);
    expect(truncated.type).toBe(file.type);
  });

  it('leaves filenames at or below 30 characters unchanged', () => {
    const file = new File(['image'], 'holiday-photo.webp', { type: 'image/webp' });

    expect(truncateImageFileName(file)).toBe(file);
  });
});
