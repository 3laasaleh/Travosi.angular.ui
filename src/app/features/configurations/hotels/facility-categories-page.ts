import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, forkJoin, of } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';

interface Facility {
  id: number;
  nameEng: string;
  nameAr: string;
  iconKey: string;
  facilityCategoryId: number;
  kind: number;
  
  isActive: boolean;
}

interface FacilityCategory {
  id: number;
  nameEng: string;
  nameAr: string;
  iconKey: string;
  
  isActive: boolean;
  facilities: Facility[];
}

@Component({
  selector: 'app-facility-categories-page',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './facility-categories-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacilityCategoriesPage implements OnInit {
  categories: FacilityCategory[] = [];
  icons: string[] = [];
  selectedCategory: FacilityCategory | null = null;
  loading = false;
  savingCategory = false;
  savingFacility = false;
  error = '';
  editor: 'category' | 'facility' | null = null;
  readonly kinds = [1, 2, 3];

  readonly categoryForm = new FormGroup({
    id: new FormControl(0, { nonNullable: true }),
    nameEng: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(150)] }),
    nameAr: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(150)] }),
    iconKey: new FormControl('check-circle', { nonNullable: true, validators: [Validators.required] }),
    isActive: new FormControl(true, { nonNullable: true }),
  });

  readonly facilityForm = new FormGroup({
    id: new FormControl(0, { nonNullable: true }),
    nameEng: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(150)] }),
    nameAr: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(150)] }),
    iconKey: new FormControl('check-circle', { nonNullable: true, validators: [Validators.required] }),
    facilityCategoryId: new FormControl(0, { nonNullable: true, validators: [Validators.min(1)] }),
    kind: new FormControl(1, { nonNullable: true }),
    isActive: new FormControl(true, { nonNullable: true }),
  });

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.error = '';
    forkJoin({
      icons: this.api.get('HotelAmenities/IconKeys').pipe(catchError(() => of([]))),
      categories: this.api.get('FacilityCategories').pipe(catchError(() => of(null))),
    })
      .pipe(finalize(() => { this.loading = false; this.cdr.markForCheck(); }))
      .subscribe(({ icons, categories }: any) => {
        this.icons = Array.isArray(icons) ? icons : [];
        const data = categories?.data ?? categories;
        this.categories = (Array.isArray(data) ? data : []).map((category: any) => ({
          ...category,
          facilities: Array.isArray(category?.facilities)
            ? [...category.facilities].sort((a: Facility, b: Facility) =>  a.nameEng.localeCompare(b.nameEng))
            : [],
        }));
        this.restoreSelectedCategory();
        if (this.selectedCategory) {
          if (this.facilityForm.controls.facilityCategoryId.value !== this.selectedCategory.id) {
            this.resetFacilityForm(this.selectedCategory);
          }
        } else if (!this.categoryForm.dirty) {
          this.resetCategoryForm();
        }
      });
  }

  editCategory(category: FacilityCategory): void {
    this.selectedCategory = category;
    this.categoryForm.reset({
      id: category.id, nameEng: category.nameEng, nameAr: category.nameAr,
      iconKey: category.iconKey, isActive: category.isActive,
    });
    this.resetFacilityForm(category);
    this.error = '';
    this.editor = 'category';
  }

  newCategory(): void {
    this.resetCategoryForm();
    this.error = '';
    this.editor = 'category';
  }

  newFacility(category = this.selectedCategory): void {
    if (!category) return;
    this.resetFacilityForm(category);
    this.error = '';
    this.editor = 'facility';
  }

  editFacility(category: FacilityCategory, facility: Facility): void {
    this.selectedCategory = category;
    this.facilityForm.reset({ ...facility, facilityCategoryId: category.id });
    this.error = '';
    this.editor = 'facility';
  }

  closeEditor(): void {
    if (this.savingCategory || this.savingFacility) return;
    this.editor = null;
    this.error = '';
  }

  @HostListener('document:keydown.escape')
  closeEditorOnEscape(): void { this.closeEditor(); }

  saveCategory(): void {
    if (this.savingCategory || this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }
    this.savingCategory = true;
    this.error = '';
    const value = this.categoryForm.getRawValue();
    const request = value.id
      ? this.api.put(`FacilityCategories/${value.id}`, value)
      : this.api.post('FacilityCategories', value);
    request.pipe(
      catchError(() => { this.error = 'facilityCategorySaveError'; return of(null); }),
      finalize(() => { this.savingCategory = false; this.cdr.markForCheck(); }),
    ).subscribe((response: any) => {
      if (response?.isSuccess === false || !response) return;
      const savedId = Number(response?.data?.id ?? value.id);
      this.selectedCategory = savedId ? ({ id: savedId } as FacilityCategory) : null;
      this.editor = null;
      this.load();
    });
  }

  saveFacility(): void {
    if (this.savingFacility || this.facilityForm.invalid) {
      this.facilityForm.markAllAsTouched();
      return;
    }
    this.savingFacility = true;
    this.error = '';
    const value = this.facilityForm.getRawValue();
    const request = value.id
      ? this.api.put(`HotelAmenities/${value.id}`, value)
      : this.api.post('HotelAmenities', value);
    request.pipe(
      catchError(() => { this.error = 'hotelFacilitiesSaveError'; return of(null); }),
      finalize(() => { this.savingFacility = false; this.cdr.markForCheck(); }),
    ).subscribe((response: any) => {
      if (response?.isSuccess === false || !response) return;
      this.selectedCategory = ({ id: value.facilityCategoryId } as FacilityCategory);
      this.editor = null;
      this.load();
    });
  }

  kindName(value: number): string {
    return ['Hotel facility', 'Room facility', 'Privilege'][value - 1] ?? 'Hotel facility';
  }

  private get defaultIcon(): string { return this.icons[0] ?? 'check-circle'; }

  private resetCategoryForm(): void {
    this.selectedCategory = null;
    this.categoryForm.reset({
      id: 0, nameEng: '', nameAr: '', iconKey: this.defaultIcon,
      isActive: true,
    });
    this.facilityForm.reset({
      id: 0, nameEng: '', nameAr: '', iconKey: this.defaultIcon, facilityCategoryId: 0,
      kind: 1,
      isActive: true,
    });
  }

  private resetFacilityForm(category: FacilityCategory): void {
    this.selectedCategory = category;
    this.facilityForm.reset({
      id: 0, nameEng: '', nameAr: '', 
      iconKey: this.defaultIcon,
      facilityCategoryId: category.id, kind: 1,
       isActive: true,
    });
  }

  private restoreSelectedCategory(): void {
    if (!this.selectedCategory) return;
    this.selectedCategory = this.categories.find((category) => category.id === this.selectedCategory!.id) ?? null;
  }
}
