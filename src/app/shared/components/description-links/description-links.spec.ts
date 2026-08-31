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

  it('parses pasted nested Markdown and uses the preceding label', () => {
    expect(parseDescriptionLinks('(Marsa Alam) [[https://google.com?q=Marsa\\&lang=en](https://google.com?q=Marsa\\&lang=en)]'))
      .toEqual([{ text: 'Marsa Alam', href: 'https://google.com/?q=Marsa&lang=en' }]);
  });

  it('converts safe HTML anchors from the blog editor', () => {
    expect(parseDescriptionLinks('<p>Visit <a href="https://example.com">Example</a></p>'))
      .toEqual([
        { text: 'Visit ' },
        { text: 'Example', href: 'https://example.com/' },
        { text: '\n' },
      ]);
  });
});
