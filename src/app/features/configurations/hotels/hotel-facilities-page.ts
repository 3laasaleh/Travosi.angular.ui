import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, forkJoin, of } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';

type Amenity = { id: number; nameEng: string; nameAr: string; iconKey: string; facilityCategoryId?: number; kind: number; displayOrder: number; isActive: boolean };

@Component({
  selector: 'app-hotel-facilities-page',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './hotel-facilities-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelFacilitiesPage implements OnInit {
  icons: string[] = [];
  categories: Array<{ id: number; nameEng: string; nameAr: string; iconKey: string }> = [];
  readonly kinds = [1, 2, 3];
  facilities: Amenity[] = [];
  filtered: Amenity[] = [];
  filter = '';
  selected: Amenity | null = null;
  loading = false;
  saving = false;
  error = '';
  form = new FormGroup({
    id: new FormControl(0, { nonNullable: true }),
    nameEng: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(150)] }),
    nameAr: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(150)] }),
    iconKey: new FormControl('check-circle', { nonNullable: true, validators: [Validators.required] }),
    facilityCategoryId: new FormControl(0, { nonNullable: true, validators: [Validators.min(1)] }),
    kind: new FormControl(1, { nonNullable: true }),
    displayOrder: new FormControl(0, { nonNullable: true }),
    isActive: new FormControl(true, { nonNullable: true }),
  });

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}
  ngOnInit(): void { this.loadCatalog(); this.load(); }

  loadCatalog(): void {
    forkJoin({ icons: this.api.get('HotelAmenities/IconKeys').pipe(catchError(() => of([]))), categories: this.api.get('FacilityCategories/Active').pipe(catchError(() => of(null))) }).subscribe(({ icons, categories }: any) => {
      this.icons = Array.isArray(icons) ? icons : [];
      const data = categories?.data ?? categories;
      this.categories = Array.isArray(data) ? data : [];
      if (!this.form.controls.facilityCategoryId.value && this.categories[0]) this.form.controls.facilityCategoryId.setValue(this.categories[0].id);
      this.cdr.markForCheck();
    });
  }

  load(): void {
    this.loading = true;
    this.api.get('HotelAmenities').pipe(catchError(() => { this.error = 'hotelFacilitiesLoadError'; return of(null); }), finalize(() => { this.loading = false; this.cdr.markForCheck(); }))
      .subscribe((response: any) => { const data = response?.data ?? response; this.facilities = Array.isArray(data) ? data : []; this.applyFilter(); });
  }
  applyFilter(): void { const value = this.filter.trim().toLowerCase(); this.filtered = !value ? this.facilities : this.facilities.filter(x => `${x.nameEng} ${x.nameAr} ${x.iconKey}`.toLowerCase().includes(value)); }
  edit(item: Amenity): void { this.selected = item; this.form.reset({ ...item, facilityCategoryId: item.facilityCategoryId ?? 0 }); }
  newFacility(): void { this.selected = null; this.form.reset({ id: 0, nameEng: '', nameAr: '', iconKey: this.icons[0] ?? 'check-circle', facilityCategoryId: this.categories[0]?.id ?? 0, kind: 2, displayOrder: this.facilities.length, isActive: true }); }
  save(): void {
    if (this.saving || this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving = true; this.error = '';
    const value = this.form.getRawValue();
    const request = value.id ? this.api.put(`HotelAmenities/${value.id}`, value) : this.api.post('HotelAmenities', value);
    request.pipe(catchError(() => { this.error = 'hotelFacilitiesSaveError'; return of(null); }), finalize(() => { this.saving = false; this.cdr.markForCheck(); }))
      .subscribe((response: any) => { if (response?.isSuccess === false || !response) return; this.newFacility(); this.load(); });
  }
  categoryName(value: number): string { return this.categories.find(x => x.id === value)?.nameEng ?? ''; }
  kindName(value: number): string { return ['Hotel facility', 'Room facility', 'Privilege'][value - 1] ?? 'Hotel facility'; }
}
