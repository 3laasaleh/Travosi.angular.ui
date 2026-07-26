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

export interface QuotationDTO {
  id: number;
  customerName: string;
  email?: string;
  phoneNumber?: string;
  description?: string;
  price: number;
}

@Component({
  selector: 'app-quotations-from-card',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './quotations-from-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotationsFromCard implements OnChanges {
  @Input() selectedQuotation: QuotationDTO | null = null;
  @Output() quotationSaved = new EventEmitter<void>();
  @Output() editCancelled = new EventEmitter<void>();

  quotationForm = this.createForm();
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['selectedQuotation']) return;
    if (this.selectedQuotation) this.populateForm(this.selectedQuotation);
    else this.resetForm(false);
  }

  saveQuotation(): void {
    if (this.quotationForm.invalid) {
      this.quotationForm.markAllAsTouched();
      return;
    }
    const form = this.quotationForm.getRawValue();
    const payload: any = {
      customerName: form.customerName.trim(),
      email: form.email.trim(),
      phoneNumber: form.phoneNumber.trim(),
      description: form.description.trim(),
      price: Number(form.price),
    };
    if (this.selectedQuotation?.id) payload.id = this.selectedQuotation.id;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    const request$ = this.selectedQuotation
      ? this.apiService.put('Quotations', payload)
      : this.apiService.post('Quotations', payload);
    request$
      .pipe(
        catchError(() => {
          this.errorMessage = 'quotationSaveError';
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
        this.quotationSaved.emit();
      });
  }

  cancelEdit(): void {
    this.resetForm(true);
  }

  private populateForm(quotation: QuotationDTO): void {
    this.quotationForm.setValue({
      customerName: quotation.customerName ?? '',
      email: quotation.email ?? '',
      phoneNumber: quotation.phoneNumber ?? '',
      description: quotation.description ?? '',
      price: quotation.price ?? 0,
    });
  }

  private resetForm(emitCancel: boolean): void {
    this.quotationForm.reset({
      customerName: '',
      email: '',
      phoneNumber: '',
      description: '',
      price: 0,
    });
    if (emitCancel) this.editCancelled.emit();
  }

  private createForm() {
    return new FormGroup({
      customerName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      email: new FormControl('', { nonNullable: true, validators: [Validators.email] }),
      phoneNumber: new FormControl('', { nonNullable: true }),
      description: new FormControl('', { nonNullable: true }),
      price: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
    });
  }
}
