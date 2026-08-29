import { parseDescriptionLinks } from './description-links';

describe('parseDescriptionLinks', () => {
  it('parses multiple safe Markdown links and preserves normal text', () => {
    expect(parseDescriptionLinks('Explore [Dubai Mall](https://www.thedubaimall.com) and [Burj Khalifa](https://www.burjkhalifa.ae).'))
      .toEqual([
        { text: 'Explore ' },
        { text: 'Dubai Mall', href: 'https://www.thedubaimall.com/' },
        { text: ' and ' },
        { text: 'Burj Khalifa', href: 'https://www.burjkhalifa.ae/' },
        { text: '.' },
      ]);
  });

  it('keeps unsafe links as plain text', () => {
    expect(parseDescriptionLinks('[Do not open](javascript:alert(1))'))
      .toEqual([{ text: '[Do not open](javascript:alert(1))' }]);
  });
});
