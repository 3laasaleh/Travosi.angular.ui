import { FormGroup } from '@angular/forms';
import { appendSeoFields, createSeoControls, seoValues } from './seo-fields';

describe('SEO editor', () => {
  it('loads, validates, and submits localized metadata without changing display content', () => {
    const form = new FormGroup(createSeoControls());
    form.patchValue(seoValues({ SeoTitleAr: '  جولات القاهرة  ', seoDescriptionEng: 'Plan a visit.' }));
    expect(form.controls.seoTitleAr.value).toBe('جولات القاهرة');
    const payload = new FormData();
    appendSeoFields(payload, form.getRawValue());
    expect(payload.get('seoTitleAr')).toBe('جولات القاهرة');
    expect(payload.get('seoTitleEng')).toBe('');
    form.controls.seoTitleEng.setValue('a'.repeat(61));
    expect(form.invalid).toBe(true);
    form.reset();
    expect(form.valid).toBe(true);
    expect(form.getRawValue()).toEqual(seoValues(null));
  });
});
