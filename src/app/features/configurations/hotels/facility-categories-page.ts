import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, forkJoin, of } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';
import { mdiIconClass } from '../../../shared/utils/mdi-icon.util';
import { SaveFeedbackService } from '../shared/save-feedback.service';

interface Facility {
  id: number;
  name: string;
  nameEng: string;
  nameAr: string;
  iconKey: string;
  facilityCategoryId: number;
  kind: number;
  isMostPopular: boolean;
  isActive: boolean;
}

interface FacilityCategory {
  id: number;
  name: string;
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
  private readonly feedback = inject(SaveFeedbackService);
  readonly iconClass = mdiIconClass;
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
    iconKey: new FormControl('mdi-check-circle', { nonNullable: true, validators: [Validators.required] }),
    isActive: new FormControl(true, { nonNullable: true }),
  });

  readonly facilityForm = new FormGroup({
    id: new FormControl(0, { nonNullable: true }),
    nameEng: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(150)] }),
    nameAr: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(150)] }),
    iconKey: new FormControl('mdi-check-circle', { nonNullable: true, validators: [Validators.required] }),
    facilityCategoryId: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
    kind: new FormControl(1, { nonNullable: true }),
    isMostPopular: new FormControl(false, { nonNullable: true }),
    isActive: new FormControl(true, { nonNullable: true }),
  });

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void { this.load(); }
setSelctedIcon(icon:string){
  const form = this.editor === 'category' ? this.categoryForm : this.facilityForm;
  form.controls.iconKey.setValue(mdiIconClass(icon));
  form.controls.iconKey.markAsDirty();

}
  load(): void {
    this.loading = true;
    this.cdr.markForCheck();
    this.error = '';
    forkJoin({
      icons: this.api.get('HotelAmenities/IconKeys').pipe(catchError(() => of([]))),
      categories: this.api.get('FacilityCategories').pipe(catchError(error => {
        this.error = this.feedback.errorMessage(error, 'facilityCategoriesLoadError');
        this.feedback.show('error', this.error);
        return of(null);
      })),
    })
      .pipe(finalize(() => { this.loading = false; this.cdr.markForCheck(); }))
      .subscribe(({ icons, categories }: any) => {
        if (!categories || categories.isSuccess === false) {
          if (categories) {
            this.error = this.feedback.errorMessage(categories, 'facilityCategoriesLoadError');
            this.feedback.show('error', this.error);
          }
          return;
        }
        const iconRows: unknown[] = Array.isArray(icons)
          ? icons
          : Array.isArray(icons?.data)
            ? icons.data
            : [];
        this.icons = [...new Set<string>(iconRows.map((icon) => mdiIconClass(icon)))];
        const data = categories?.data ?? categories;
        this.categories = (Array.isArray(data) ? data : []).map((category: any) => ({
          ...category,
          facilities: category?.facilities ?? []
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
      iconKey: mdiIconClass(category.iconKey), isActive: category.isActive,
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
    this.facilityForm.reset({
      ...facility,
      iconKey: mdiIconClass(facility.iconKey),
      facilityCategoryId: category.id,
    });
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
    if (this.savingCategory) return;
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      this.feedback.show('warning', 'pleaseCorrectFormErrors');
      return;
    }
    this.savingCategory = true;
    this.error = '';
    const rawValue = this.categoryForm.getRawValue();
    const value = { ...rawValue, iconKey: mdiIconClass(rawValue.iconKey) };
    const request = value.id
      ? this.api.put(`FacilityCategories/${value.id}`, value)
      : this.api.post('FacilityCategories', value);
    request.pipe(
      catchError(error => {
        this.error = this.feedback.errorMessage(error, 'facilityCategorySaveError');
        this.feedback.show('error', this.error);
        return of(null);
      }),
      finalize(() => { this.savingCategory = false; this.cdr.markForCheck(); }),
    ).subscribe((response: any) => {
      if (!response) return;
      if (response.isSuccess === false) {
        this.error = this.feedback.errorMessage(response, 'facilityCategorySaveError');
        this.feedback.show('error', this.error);
        return;
      }
      this.feedback.show('success', 'facilityCategorySaved');
      const savedId = Number(response?.data?.id ?? value.id);
      this.selectedCategory = savedId ? ({ id: savedId } as FacilityCategory) : null;
      this.editor = null;
      this.load();
    });
  }

  saveFacility(): void {
    if (this.savingFacility) return;
    if (this.facilityForm.invalid) {
      this.facilityForm.markAllAsTouched();
      this.feedback.show('warning', 'pleaseCorrectFormErrors');
      return;
    }
    this.savingFacility = true;
    this.error = '';
    const rawValue = this.facilityForm.getRawValue();
    const value = {
      ...rawValue,
      iconKey: mdiIconClass(rawValue.iconKey),
      isMostPopular: rawValue.kind === 1 && rawValue.isMostPopular,
    };
    const request = value.id
      ? this.api.put(`HotelAmenities/${value.id}`, value)
      : this.api.post('HotelAmenities', value);
    request.pipe(
      catchError(error => {
        this.error = this.feedback.errorMessage(error, 'hotelFacilitiesSaveError');
        this.feedback.show('error', this.error);
        return of(null);
      }),
      finalize(() => { this.savingFacility = false; this.cdr.markForCheck(); }),
    ).subscribe((response: any) => {
      if (!response) return;
      if (response.isSuccess === false) {
        this.error = this.feedback.errorMessage(response, 'hotelFacilitiesSaveError');
        this.feedback.show('error', this.error);
        return;
      }
      this.feedback.show('success', 'hotelFacilitySaved');
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
      kind: 1, isMostPopular: false,
      isActive: true,
    });
  }

  private resetFacilityForm(category: FacilityCategory): void {
    this.selectedCategory = category;
    this.facilityForm.reset({
      id: 0, nameEng: '', nameAr: '', 
      iconKey: this.defaultIcon,
      facilityCategoryId: category.id, kind: 1,
       isMostPopular: false, isActive: true,
    });
  }

  private restoreSelectedCategory(): void {
    if (!this.selectedCategory) return;
    this.selectedCategory = this.categories.find((category) => category.id === this.selectedCategory!.id) ?? null;
  }
}
