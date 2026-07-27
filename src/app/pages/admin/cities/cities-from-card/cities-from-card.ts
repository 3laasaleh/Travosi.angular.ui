import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../../../core/services/apiservice.service';

export interface CityDTO {
  id: number;
  nameEng: string;
  nameAr: string;
  countryId: number;
  countryNameEng?: string;
  countryNameAr?: string;
  isActive: boolean;
}

@Component({
  selector: 'app-cities-from-card',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './cities-from-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CitiesFromCard implements OnInit, OnChanges {
  @Input() selectedCity: CityDTO | null = null;
  @Output() citySaved = new EventEmitter<void>();
  @Output() editCancelled = new EventEmitter<void>();

  cityForm = this.createForm();
  countries: any[] = [];
  isLoading = false;
  countriesLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['selectedCity']) return;
    if (this.selectedCity) this.populateForm(this.selectedCity);
    else this.resetForm(false);
  }

  saveCity(): void {
    if (this.cityForm.invalid) {
      this.cityForm.markAllAsTouched();
      return;
    }

    const form = this.cityForm.getRawValue();
    const payload: any = {
      nameEng: form.nameEng.trim(),
      nameAr: form.nameAr.trim(),
      countryId: Number(form.countryId),
    };
    if (this.selectedCity?.id) payload.id = this.selectedCity.id;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    const request$ = this.selectedCity
      ? this.apiService.put('Cities', payload)
      : this.apiService.post('Cities', payload);

    request$.pipe(
      catchError(() => {
        this.errorMessage = 'citySaveError';
        return of(null);
      }),
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      if (response?.isSuccess === false) {
        this.errorMessage = response.message || 'citySaveError';
        return;
      }
      this.successMessage = this.selectedCity ? 'cityUpdated' : 'cityCreated';
      this.resetForm(false);
      this.citySaved.emit();
    });
  }

  cancelEdit(): void {
    this.resetForm(true);
  }

  private loadCountries(): void {
    this.countriesLoading = true;
    this.apiService.get('Countries/GetAll?page=1&pageSize=500').pipe(
      catchError(() => {
        this.errorMessage = 'countriesLoadError';
        return of(null);
      }),
      finalize(() => {
        this.countriesLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      const pageData = response?.data ?? response;
      const rows = pageData?.data ?? pageData?.items ?? pageData?.countries ?? pageData;
      this.countries = Array.isArray(rows) ? rows : [];
    });
  }

  private populateForm(city: CityDTO): void {
    this.cityForm.setValue({
      nameEng: city.nameEng ?? '',
      nameAr: city.nameAr ?? '',
      countryId: city.countryId ?? null,
    });
  }

  private resetForm(emitCancel: boolean): void {
    this.cityForm.reset({ nameEng: '', nameAr: '', countryId: null });
    if (emitCancel) this.editCancelled.emit();
  }

  private createForm() {
    return new FormGroup({
      nameEng: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(150)],
      }),
      nameAr: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(150)],
      }),
      countryId: new FormControl<number | null>(null, { validators: [Validators.required] }),
    });
  }
}
