import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, forkJoin, of } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';

@Component({ selector: 'app-facility-categories-page', standalone: true, imports: [ReactiveFormsModule, TranslatePipe], templateUrl: './facility-categories-page.html', changeDetection: ChangeDetectionStrategy.OnPush })
export class FacilityCategoriesPage implements OnInit {
  categories: any[] = []; icons: string[] = []; selected: any; loading = false; saving = false; error = '';
  form = new FormGroup({ id: new FormControl(0, { nonNullable: true }), nameEng: new FormControl('', { nonNullable: true, validators: [Validators.required] }), nameAr: new FormControl('', { nonNullable: true, validators: [Validators.required] }), descriptionEng: new FormControl('', { nonNullable: true }), descriptionAr: new FormControl('', { nonNullable: true }), iconKey: new FormControl('circle-check', { nonNullable: true, validators: [Validators.required] }), displayOrder: new FormControl(0, { nonNullable: true }), isActive: new FormControl(true, { nonNullable: true }) });
  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}
  ngOnInit(): void { forkJoin({ icons: this.api.get('HotelAmenities/IconKeys').pipe(catchError(() => of([]))), categories: this.api.get('FacilityCategories').pipe(catchError(() => of(null))) }).subscribe((data: any) => { this.icons = Array.isArray(data.icons) ? data.icons : []; this.categories = data.categories?.data ?? []; this.reset(); this.cdr.markForCheck(); }); }
  reset(): void { this.selected = null; this.form.reset({ id: 0, nameEng: '', nameAr: '', descriptionEng: '', descriptionAr: '', iconKey: this.icons[0] ?? 'circle-check', displayOrder: this.categories.length, isActive: true }); }
  edit(category: any): void { this.selected = category; this.form.reset({ id: category.id, nameEng: category.nameEng, nameAr: category.nameAr, descriptionEng: category.descriptionEng ?? '', descriptionAr: category.descriptionAr ?? '', iconKey: category.iconKey, displayOrder: category.displayOrder, isActive: category.isActive }); }
  save(): void { if (this.form.invalid || this.saving) { this.form.markAllAsTouched(); return; } this.saving = true; const v = this.form.getRawValue(); const req = v.id ? this.api.put(`FacilityCategories/${v.id}`, v) : this.api.post('FacilityCategories', v); req.pipe(catchError(() => { this.error = 'facilityCategorySaveError'; return of(null); }), finalize(() => { this.saving = false; this.cdr.markForCheck(); })).subscribe((r: any) => { if (r?.isSuccess === false || !r) return; this.ngOnInit(); }); }
}
