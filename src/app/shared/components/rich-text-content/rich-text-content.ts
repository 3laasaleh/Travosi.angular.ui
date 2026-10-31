import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-rich-text-content',
  standalone: true,
  template: '',
  host: {
    class: 'rich-text-content',
    '[innerHTML]': 'displayHtml',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RichTextContent implements OnChanges {
  @Input() content: string | null | undefined = '';
  displayHtml = '';

  ngOnChanges(): void {
    this.displayHtml = displayRichText(this.content);
  }
}

export function displayRichText(value: string | null | undefined): string {
  const text = String(value ?? '');
  if (!text) return '';
  if (/<\/?[a-z][^>]*>/i.test(text)) return text;

  return escapeHtml(text)
    .replace(
      /\[([^\]\r\n]+)]\((https?:\/\/[^\s)]+)\)/gi,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
    )
    .replace(/\r?\n/g, '<br>');
}

export function richTextPlainText(value: string | null | undefined): string {
  return decodeHtml(String(value ?? '')
    .replace(/<br\s*\/?\s*>/gi, '\n')
    .replace(/<\/\s*(p|div|li|h[1-6]|blockquote)\s*>/gi, '\n')
    .replace(/<[^>]+>/g, ' '))
    .replace(/[ \t]+/g, ' ')
    .replace(/\s*\n\s*/g, '\n')
    .trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function decodeHtml(value: string): string {
  return value
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_match, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_match, code) => String.fromCodePoint(Number(code)));
}
