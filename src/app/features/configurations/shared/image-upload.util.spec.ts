import { truncateImageFileName } from './image-upload.util';

describe('truncateImageFileName', () => {
  it('limits the complete filename to 100 characters and preserves the extension', () => {
    const file = new File(['image'], `${'a'.repeat(120)}.jpeg`, { type: 'image/jpeg' });

    const truncated = truncateImageFileName(file);

    expect(truncated.name).toBe(`${'a'.repeat(95)}.jpeg`);
    expect(truncated.name.length).toBe(100);
    expect(truncated.type).toBe(file.type);
  });

  it('leaves filenames at or below 100 characters unchanged', () => {
    const file = new File(['image'], `${'a'.repeat(95)}.webp`, { type: 'image/webp' });

    expect(truncateImageFileName(file)).toBe(file);
  });
});
