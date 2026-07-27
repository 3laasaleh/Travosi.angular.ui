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
import { CustomerTypeEnum } from '../customer-type.enum';

export interface CustomerDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  passportNumber?: string;
  customerType: CustomerTypeEnum;
  companyName?: string | null;
  isActive: boolean;
}

@Component({
  selector: 'app-customers-from-card',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './customers-from-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomersFromCard implements OnChanges {
  readonly customerTypeEnum = CustomerTypeEnum;
  readonly customerTypes = [
    { value: CustomerTypeEnum.Individual, label: 'individual' },
    { value: CustomerTypeEnum.Couple, label: 'couple' },
    { value: CustomerTypeEnum.Family, label: 'family' },
    { value: CustomerTypeEnum.Company, label: 'company' },
  ];
  @Input() selectedCustomer: CustomerDTO | null = null;
  @Output() customerSaved = new EventEmitter<void>();
  @Output() editCancelled = new EventEmitter<void>();

  customerForm = this.createForm();
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['selectedCustomer']) return;
    if (this.selectedCustomer) this.populateForm(this.selectedCustomer);
    else this.resetForm(false);
  }

  saveCustomer(): void {
    if (this.isLoading) return;
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }
    const form = this.customerForm.getRawValue();
    const payload: any = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      mobile: form.mobile.trim(),
      passportNumber: form.passportNumber.trim(),
      customerType: form.customerType,
      companyName: form.customerType === CustomerTypeEnum.Company
        ? form.companyName.trim()
        : null,
      isActive: form.isActive,
    };
    if (this.selectedCustomer?.id) payload.id = this.selectedCustomer.id;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    const request$ = this.selectedCustomer
      ? this.apiService.put('Customers', payload)
      : this.apiService.post('Customers', payload);
    request$
      .pipe(
        catchError(() => {
          this.errorMessage = 'customerSaveError';
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
        this.customerSaved.emit();
      });
  }

  cancelEdit(): void {
    this.resetForm(true);
  }

  private populateForm(customer: CustomerDTO): void {
    this.customerForm.setValue({
      firstName: customer.firstName ?? '',
      lastName: customer.lastName ?? '',
      email: customer.email ?? '',
      mobile: customer.mobile ?? '',
      passportNumber: customer.passportNumber ?? '',
      customerType: customer.customerType ?? CustomerTypeEnum.Individual,
      companyName: customer.companyName ?? '',
      isActive: customer.isActive !== false,
    });
  }

  private resetForm(emitCancel: boolean): void {
    this.customerForm.reset({
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      passportNumber: '',
      customerType: CustomerTypeEnum.Individual,
      companyName: '',
      isActive: true,
    });
    if (emitCancel) this.editCancelled.emit();
  }

  private createForm() {
    return new FormGroup({
      firstName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
      lastName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
      email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
      mobile: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      passportNumber: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      customerType: new FormControl(CustomerTypeEnum.Individual, { nonNullable: true, validators: [Validators.required] }),
      companyName: new FormControl('', { nonNullable: true }),
      isActive: new FormControl(true, { nonNullable: true }),
    });
  }
}
