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
  descriptionEng: string;
  descriptionAr: string;
  destinationId?: number | null;
  destinationNameEng?: string;
  destinationNameAr?: string;

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
  destinations: any[] = [];
  isLoading = false;
  destinationsLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadDestinations();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['selectedCity']) return;
    if (this.selectedCity) this.populateForm(this.selectedCity);
    else this.resetForm(false);
  }

  saveCity(): void {
    if (this.isLoading) return;
    if (this.cityForm.invalid) {
      this.cityForm.markAllAsTouched();
      return;
    }

    const form = this.cityForm.getRawValue();
    const payload: any = {
      nameEng: form.nameEng.trim(),
      nameAr: form.nameAr.trim(),
      descriptionEng: form.descriptionEng.trim(),
      descriptionAr: form.descriptionAr.trim(),
      destinationId: Number(form.destinationId),

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

  private loadDestinations(): void {
    this.destinationsLoading = true;
    this.apiService.get('Destinations/GetAll?page=1&pageSize=500').pipe(
      catchError(() => {
        this.errorMessage = 'destinationsLoadError';
        return of(null);
      }),
      finalize(() => {
        this.destinationsLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      const pageData = response?.data ?? response;
      const rows = pageData?.data ?? pageData?.items ?? pageData?.destinations ?? pageData;
      this.destinations = (Array.isArray(rows) ? rows : []).filter((destination) => destination?.isActive !== false);
    });
  }

  private populateForm(city: CityDTO): void {
    this.cityForm.setValue({
      nameEng: city.nameEng ?? '',
      nameAr: city.nameAr ?? '',
      descriptionEng: city.descriptionEng ?? '',
      descriptionAr: city.descriptionAr ?? '',
      destinationId: city.destinationId ?? null,

    });
  }

  private resetForm(emitCancel: boolean): void {
    this.cityForm.reset({
      nameEng: '',
      nameAr: '',
      descriptionEng: '',
      descriptionAr: '',
      destinationId: null,

    });
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
      descriptionEng: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(4000)],
      }),
      descriptionAr: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(4000)],
      }),
      destinationId: new FormControl<number | null>(null, { validators: [Validators.required] }),
    });
  }
}
