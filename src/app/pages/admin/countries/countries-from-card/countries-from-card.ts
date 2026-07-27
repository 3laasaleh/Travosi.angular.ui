import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../../../core/services/apiservice.service';

export interface CountryDTO {
  id: number;
  nameEng: string;
  nameAr: string;
  isActive: boolean;
}

@Component({
  selector: 'app-countries-from-card',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './countries-from-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesFromCard implements OnChanges {
  @Input() selectedCountry: CountryDTO | null = null;
  @Output() countrySaved = new EventEmitter<void>();
  @Output() editCancelled = new EventEmitter<void>();

  countryForm = this.createForm();
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['selectedCountry']) return;
    if (this.selectedCountry) this.populateForm(this.selectedCountry);
    else this.resetForm(false);
  }

  saveCountry(): void {
    if (this.countryForm.invalid) {
      this.countryForm.markAllAsTouched();
      return;
    }

    const form = this.countryForm.getRawValue();
    const payload: any = {
      nameEng: form.nameEng.trim(),
      nameAr: form.nameAr.trim(),
    };
    if (this.selectedCountry?.id) payload.id = this.selectedCountry.id;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    const request$ = this.selectedCountry
      ? this.apiService.put('Countries', payload)
      : this.apiService.post('Countries', payload);

    request$.pipe(
      catchError(() => {
        this.errorMessage = 'countrySaveError';
        return of(null);
      }),
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      if (response?.isSuccess === false) {
        this.errorMessage = response.message || 'countrySaveError';
        return;
      }
      this.successMessage = this.selectedCountry ? 'countryUpdated' : 'countryCreated';
      this.resetForm(false);
      this.countrySaved.emit();
    });
  }

  cancelEdit(): void {
    this.resetForm(true);
  }

  private populateForm(country: CountryDTO): void {
    this.countryForm.setValue({
      nameEng: country.nameEng ?? '',
      nameAr: country.nameAr ?? '',
    });
  }

  private resetForm(emitCancel: boolean): void {
    this.countryForm.reset({ nameEng: '', nameAr: '' });
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
    });
  }
}
