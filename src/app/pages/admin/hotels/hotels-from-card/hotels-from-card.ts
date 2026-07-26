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

export interface HotelDTO {
  id: number;
  name: string;
  starRating: number;
  address?: string;
  description?: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
  isActive: boolean;
}

@Component({
  selector: 'app-hotels-from-card',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './hotels-from-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelsFromCard implements OnChanges {
  @Input() selectedHotel: HotelDTO | null = null;
  @Output() hotelSaved = new EventEmitter<void>();
  @Output() editCancelled = new EventEmitter<void>();

  hotelForm = this.createForm();
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  readonly starOptions = [1, 2, 3, 4, 5];

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['selectedHotel']) return;
    if (this.selectedHotel) this.populateForm(this.selectedHotel);
    else this.resetForm(false);
  }

  saveHotel(): void {
    if (this.hotelForm.invalid) {
      this.hotelForm.markAllAsTouched();
      return;
    }
    const form = this.hotelForm.getRawValue();
    const payload: any = {
      name: form.name.trim(),
      starRating: Number(form.starRating),
      address: form.address.trim(),
      description: form.description.trim(),
      phoneNumber: form.phoneNumber.trim(),
      email: form.email.trim(),
      website: form.website.trim(),
      isActive: form.isActive,
    };
    if (this.selectedHotel?.id) payload.id = this.selectedHotel.id;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    const request$ = this.selectedHotel
      ? this.apiService.put('Hotels', payload)
      : this.apiService.post('Hotels', payload);
    request$
      .pipe(
        catchError(() => {
          this.errorMessage = 'hotelSaveError';
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe((res: any) => {
        if (res === null) return;
        if (!res.isSuccess) {
          this.errorMessage = res.message;
          return;
        }
        this.successMessage = res.message;
        this.resetForm(false);
        this.hotelSaved.emit();
      });
  }

  cancelEdit(): void {
    this.resetForm(true);
  }

  private populateForm(hotel: HotelDTO): void {
    this.hotelForm.setValue({
      name: hotel.name ?? '',
      starRating: hotel.starRating ?? 1,
      address: hotel.address ?? '',
      description: hotel.description ?? '',
      phoneNumber: hotel.phoneNumber ?? '',
      email: hotel.email ?? '',
      website: hotel.website ?? '',
      isActive: hotel.isActive !== false,
    });
  }

  private resetForm(emitCancel: boolean): void {
    this.hotelForm.reset({
      name: '',
      starRating: 1,
      address: '',
      description: '',
      phoneNumber: '',
      email: '',
      website: '',
      isActive: true,
    });
    if (emitCancel) this.editCancelled.emit();
  }

  private createForm() {
    return new FormGroup({
      name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      starRating: new FormControl(1, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1), Validators.max(5)],
      }),
      address: new FormControl('', { nonNullable: true }),
      description: new FormControl('', { nonNullable: true }),
      phoneNumber: new FormControl('', { nonNullable: true }),
      email: new FormControl('', { nonNullable: true, validators: [Validators.email] }),
      website: new FormControl('', { nonNullable: true }),
      isActive: new FormControl(true, { nonNullable: true }),
    });
  }
}
