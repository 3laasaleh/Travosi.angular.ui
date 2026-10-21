import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

export const seoFieldNames = ['seoTitleEng', 'seoTitleAr', 'seoDescriptionEng', 'seoDescriptionAr'] as const;

export function createSeoControls() {
  const control = (max: number) => new FormControl('', { nonNullable: true, validators: [Validators.maxLength(max)] });
  return { seoTitleEng: control(60), seoTitleAr: control(60), seoDescriptionEng: control(160), seoDescriptionAr: control(160) };
}

export function seoValues(entity: any) {
  const value = (key: string) => String(entity?.[key] ?? entity?.[key[0].toUpperCase() + key.slice(1)] ?? '').trim();
  return { seoTitleEng: value('seoTitleEng'), seoTitleAr: value('seoTitleAr'),
    seoDescriptionEng: value('seoDescriptionEng'), seoDescriptionAr: value('seoDescriptionAr') };
}

export function appendSeoFields(data: FormData, entity: any): void {
  const values = seoValues(entity);
  for (const key of seoFieldNames) data.append(key, values[key]);
}

@Component({
  selector: 'app-seo-fields',
  imports: [ReactiveFormsModule, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <fieldset [formGroup]="form()" class="my-6 rounded-xl border border-slate-200 p-4">
      <legend class="px-2 font-semibold">{{ 'seoMetadata' | translate }}</legend>
      <p class="mb-4 text-sm text-slate-500">{{ 'seoOptionalHint' | translate }}</p>
      <div class="grid gap-4 md:grid-cols-2">
        @for (field of fields; track field.key) {
          <label class="block text-sm font-medium">
            {{ field.label | translate }}
            <textarea [formControlName]="field.key" [attr.dir]="field.arabic ? 'rtl' : 'ltr'"
              [attr.lang]="field.arabic ? 'ar' : 'en'" [attr.maxlength]="field.max"
              [rows]="field.max === 60 ? 2 : 3"
              class="mt-1 block w-full rounded-lg border border-slate-300 p-2"></textarea>
            @if (form().get(field.key)?.hasError('maxlength')) {
              <span class="text-red-600">{{ (field.max === 60 ? 'seoTitleMaxLength' : 'seoDescriptionMaxLength') | translate }}</span>
            }
          </label>
        }
      </div>
    </fieldset>`,
})
export class SeoFields {
  readonly form = input.required<FormGroup>();
  readonly fields = [
    { key: 'seoTitleEng', label: 'seonameEnglish', max: 60, arabic: false },
    { key: 'seoTitleAr', label: 'seonameArabic', max: 60, arabic: true },
    { key: 'seoDescriptionEng', label: 'seoDescriptionEnglish', max: 160, arabic: false },
    { key: 'seoDescriptionAr', label: 'seoDescriptionArabic', max: 160, arabic: true },
  ];
}
