import { Pipe, PipeTransform } from '@angular/core';
import { richTextPlainText } from '../components/rich-text-content/rich-text-content';

@Pipe({
  name: 'richTextPlainText',
  standalone: true,
})
export class RichTextPlainTextPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return richTextPlainText(value);
  }
}
