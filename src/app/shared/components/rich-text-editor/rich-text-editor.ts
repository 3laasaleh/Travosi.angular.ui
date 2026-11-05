import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
  selector: 'app-rich-text-editor',
  standalone: true,
  imports: [ReactiveFormsModule, QuillEditorComponent],
  template: `
    <quill-editor
      class="rich-text-editor block"
      format="html"
      theme="snow"
      [formControl]="editorControl"
      [modules]="modules"
      [placeholder]="placeholder"
      [styles]="{ minHeight: minHeight }"
        (onBlur)="markTouched()"
    />
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RichTextEditor),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RichTextEditor implements ControlValueAccessor {
  @Input() direction: 'ltr' | 'rtl' = 'ltr';
  @Input() placeholder = '';
  @Input() minHeight = '9rem';

  readonly editorControl = new FormControl('', { nonNullable: true });
  readonly modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link'],
      ['clean'],
    ],
  };

  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  constructor() {
    this.editorControl.valueChanges.subscribe((value) => {
      this.onChange(normalizeEditorValue(value));
    });
  }

  writeValue(value: unknown): void {
    this.editorControl.setValue(editorHtml(value), { emitEvent: false });
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    disabled
      ? this.editorControl.disable({ emitEvent: false })
      : this.editorControl.enable({ emitEvent: false });
  }

  markTouched(): void {
    this.onTouched();
  }
}

function normalizeEditorValue(value: string): string {
  const visibleText = value
    .replace(/<br\s*\/?\s*>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .trim();
  return visibleText ? value.trim() : '';
}

function editorHtml(value: unknown): string {
  const text = String(value ?? '').trim();
  if (!text || /<\/?[a-z][^>]*>/i.test(text)) return text;
  return text
    .split(/\r?\n/)
    .map((line) => `<p>${escapeHtml(line) || '<br>'}</p>`)
    .join('');
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
