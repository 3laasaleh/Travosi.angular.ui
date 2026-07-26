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

export interface AirlineDTO {
  id: number;
  name?: string;
  code?: string;
  logoUrl?: string;
}

@Component({
  selector: 'app-airlines-from-card',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './airlines-from-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AirlinesFromCard implements OnChanges {
  @Input() selectedAirline: AirlineDTO | null = null;
  @Output() airlineSaved = new EventEmitter<void>();
  @Output() editCancelled = new EventEmitter<void>();

  airlineForm = this.createForm();
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['selectedAirline']) return;
    if (this.selectedAirline) this.populateForm(this.selectedAirline);
    else this.resetForm(false);
  }

  saveAirline(): void {
    if (this.airlineForm.invalid) {
      this.airlineForm.markAllAsTouched();
      return;
    }
    const form = this.airlineForm.getRawValue();
    const payload: any = {
      name: form.name.trim(),
      code: form.code.trim().toUpperCase(),
      logoUrl: form.logoUrl.trim(),
    };
    if (this.selectedAirline?.id) payload.id = this.selectedAirline.id;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    const request$ = this.selectedAirline
      ? this.apiService.put('Airlines', payload)
      : this.apiService.post('Airlines', payload);
    request$
      .pipe(
        catchError(() => {
          this.errorMessage = 'airlineSaveError';
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
        this.airlineSaved.emit();
      });
  }

  cancelEdit(): void {
    this.resetForm(true);
  }

  private populateForm(airline: AirlineDTO): void {
    this.airlineForm.setValue({
      name: airline.name ?? '',
      code: airline.code ?? '',
      logoUrl: airline.logoUrl ?? '',
    });
  }

  private resetForm(emitCancel: boolean): void {
    this.airlineForm.reset({ name: '', code: '', logoUrl: '' });
    if (emitCancel) this.editCancelled.emit();
  }

  private createForm() {
    return new FormGroup({
      name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      code: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/^[A-Za-z0-9]{2,3}$/)],
      }),
      logoUrl: new FormControl('', { nonNullable: true }),
    });
  }
}
