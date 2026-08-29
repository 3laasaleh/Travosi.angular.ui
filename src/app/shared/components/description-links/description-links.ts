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
  const text = value ?? '';
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

function safeExternalUrl(value: string): string | null {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : null;
  } catch {
    return null;
  }
}
