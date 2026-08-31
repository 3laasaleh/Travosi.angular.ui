import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';

export interface DescriptionPart {
  text: string;
  href?: string;
}

/** Renders only Markdown links in a plain-text description without using innerHTML. */
@Component({
  selector: 'app-description-links',
  standalone: true,
  templateUrl: './description-links.html',
  styles: [':host { display: contents; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionLinks implements OnChanges {
  @Input() text: string | null | undefined = '';
  parts: DescriptionPart[] = [];

  ngOnChanges(): void {
    this.parts = parseDescriptionLinks(this.text);
  }
}

export function parseDescriptionLinks(value: string | null | undefined): DescriptionPart[] {
  const text = normalizeDescription(value ?? '');
  const parts: DescriptionPart[] = [];
  const pattern = /\[([^\]\r\n]+)]\(([^\s)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push({ text: text.slice(lastIndex, match.index) });

    const href = safeExternalUrl(match[2]);
    if (href) {
      parts.push({ text: match[1], href });
    } else {
      // Preserve malformed or unsafe Markdown exactly as normal description text.
      parts.push({ text: match[0] });
    }
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length || parts.length === 0) parts.push({ text: text.slice(lastIndex) });
  return parts;
}

function normalizeDescription(value: string): string {
  let text = value
    .replace(/<br\s*\/?\s*>/gi, '\n')
    .replace(/<\/(p|div|li|h[1-6])\s*>/gi, '\n')
    .replace(/<a\b[^>]*\bhref\s*=\s*(["'])(.*?)\1[^>]*>(.*?)<\/a>/gis,
      (_match, _quote, href, label) => `[${stripTags(label)}](${href})`)
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_match, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_match, code) => String.fromCodePoint(Number(code)));

  // Accept the link format generated/pasted by some editors:
  // (Marsa Alam) [[https://example.com](https://example.com)]
  text = text.replace(
    /\(([^)\r\n]+)\)\s*\[\[?[^\]\r\n]+\]\((https?:\/\/[^\s)]+)\)\]?/gi,
    (_match, label, href) => `[${label}](${unescapeMarkdownUrl(href)})`,
  );
  text = text.replace(
    /\(([^)\r\n]+)\)\s*\[\[(https?:\/\/[^\]\s]+)\]\]/gi,
    (_match, label, href) => `[${label}](${unescapeMarkdownUrl(href)})`,
  );
  return text.replace(
    /\[([^\]\r\n]+)]\((https?:\/\/[^\s)]+)\)/gi,
    (_match, label, href) => `[${label}](${unescapeMarkdownUrl(href)})`,
  );
}

function unescapeMarkdownUrl(value: string): string {
  return value.replace(/\\([&_=+#?])/g, '$1');
}

function stripTags(value: string): string {
  return value.replace(/<[^>]+>/g, '').trim();
}

function safeExternalUrl(value: string): string | null {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : null;
  } catch {
    return null;
  }
}
