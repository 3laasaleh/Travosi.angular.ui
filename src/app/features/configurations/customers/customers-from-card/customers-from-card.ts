import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../../../core/services/apiservice.service';
import { AuthService } from '../../../user/_services/auth.service';
import { CustomerTypeEnum } from '../customer-type.enum';
import { DatePicker } from '../../../../shared/components/date-picker/date-picker';

enum GenderEnum { Male = 0, Female = 1 }
enum TravelerTypeEnum { Adult = 1, Child = 2, Infant = 3 }

interface TravelerDTO {
  id?: number;
  firstName: string;
  lastName: string;
  passportNumber: string;
  dateOfBirth?: string | null;
  gender: GenderEnum;
  travelerType: TravelerTypeEnum;
  relationship?: string;
  isPrimary?: boolean;
}

export interface CustomerDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  customerType: CustomerTypeEnum;
  companyName?: string | null;
  agentId?: number | null;
  isActive: boolean;
  travelers?: TravelerDTO[];
}

@Component({
  selector: 'app-customers-from-card',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe, DatePicker],
  templateUrl: './customers-from-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomersFromCard implements OnInit, OnChanges {
  private readonly destroyRef = inject(DestroyRef);
  readonly customerTypeEnum = CustomerTypeEnum;
  readonly travelerTypeEnum = TravelerTypeEnum;
  readonly genderEnum = GenderEnum;
  readonly customerTypes = [
    { value: CustomerTypeEnum.Individual, label: 'individual' },
    { value: CustomerTypeEnum.Couple, label: 'couple' },
    { value: CustomerTypeEnum.Family, label: 'family' },
    { value: CustomerTypeEnum.Company, label: 'company' },
  ];
  readonly travelerTypes = [
    { value: TravelerTypeEnum.Adult, label: 'adult' },
    { value: TravelerTypeEnum.Child, label: 'child' },
    { value: TravelerTypeEnum.Infant, label: 'infant' },
  ];
  readonly genders = [
    { value: GenderEnum.Male, label: 'male' },
    { value: GenderEnum.Female, label: 'female' },
  ];

  @Input() selectedCustomer: CustomerDTO | null = null;
  @Output() customerSaved = new EventEmitter<void>();
  @Output() editCancelled = new EventEmitter<void>();

  customerForm = this.createForm();
  agents: any[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
  ) {}

  get isAdmin(): boolean {
    return this.authService.getCurrentUserRole() === 'Admin';
  }

  get travelers(): FormArray<ReturnType<CustomersFromCard['createTravelerForm']>> {
    return this.customerForm.controls.travelers;
  }

  ngOnInit(): void {
    this.loadLookups();
    this.applyAgentValidator();
    this.customerForm.controls.customerType.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((type) => this.applyCustomerType(type));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['selectedCustomer']) return;
    if (this.selectedCustomer) this.populateForm(this.selectedCustomer);
    else this.resetForm(false);
  }

  addTraveler(kind: 'spouse' | 'child' | 'infant' | 'babysitter' | 'adult' = 'adult'): void {
    if (this.customerForm.controls.customerType.value === CustomerTypeEnum.Couple && this.travelers.length >= 1)
      return;
    const presets = {
      spouse: { relationship: 'Spouse', travelerType: TravelerTypeEnum.Adult },
      child: { relationship: 'Child', travelerType: TravelerTypeEnum.Child },
      infant: { relationship: 'Infant', travelerType: TravelerTypeEnum.Infant },
      babysitter: { relationship: 'Babysitter', travelerType: TravelerTypeEnum.Adult },
      adult: { relationship: 'Companion', travelerType: TravelerTypeEnum.Adult },
    };
    this.travelers.push(this.createTravelerForm(presets[kind]));
    this.cdr.markForCheck();
  }

  removeTraveler(index: number): void {
    this.travelers.removeAt(index);
    this.cdr.markForCheck();
  }

  saveCustomer(): void {
    if (this.isLoading) return;
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      this.errorMessage = 'customerFormInvalid';
      return;
    }

    const form = this.customerForm.getRawValue();
    const payload: any = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      mobile: form.mobile.trim(),
      passportNumber: form.passportNumber.trim(),
      dateOfBirth: form.dateOfBirth,
      gender: Number(form.gender),
      customerType: Number(form.customerType),
      companyName: form.customerType === CustomerTypeEnum.Company ? form.companyName.trim() : null,
      agentId: this.isAdmin ? Number(form.agentId) : null,
      travelers: form.travelers.map((traveler) => ({
        firstName: traveler.firstName.trim(),
        lastName: traveler.lastName.trim(),
        passportNumber: traveler.passportNumber.trim(),
        dateOfBirth: traveler.dateOfBirth,
        gender: Number(traveler.gender),
        travelerType: Number(traveler.travelerType),
        relationship: traveler.relationship.trim(),
      })),
    };
    if (this.selectedCustomer?.id) payload.id = this.selectedCustomer.id;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    const request$ = this.selectedCustomer
      ? this.apiService.put('Customers', payload)
      : this.apiService.post('Customers', payload);
    request$.pipe(
      catchError((error) => {
        this.errorMessage = error?.error?.message || 'customerSaveError';
        return of(null);
      }),
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      if (response?.isSuccess === false) {
        this.errorMessage = response?.message || 'customerSaveError';
        return;
      }
      this.successMessage = response?.message || 'customerSavedWithTravelers';
      this.resetForm(false, true);
      this.customerSaved.emit();
    });
  }

  cancelEdit(): void {
    this.resetForm(true);
  }

  private loadLookups(): void {
    if (this.isAdmin) {
      this.apiService.get('Account/GetAgents').pipe(catchError(() => of(null))).subscribe((response: any) => {
        const rows = response?.data ?? response;
        this.agents = (Array.isArray(rows) ? rows : []).filter((agent) => agent?.isActivated !== false);
        this.cdr.markForCheck();
      });
    }
  }

  private populateForm(customer: CustomerDTO): void {
    const allTravelers = Array.isArray(customer.travelers) ? customer.travelers : [];
    const primary = allTravelers.find((traveler) => traveler.isPrimary) ?? allTravelers[0];
    this.customerForm.patchValue({
      firstName: customer.firstName ?? primary?.firstName ?? '',
      lastName: customer.lastName ?? primary?.lastName ?? '',
      email: customer.email ?? '',
      mobile: customer.mobile ?? '',
      passportNumber: primary?.passportNumber ?? '',
      dateOfBirth: this.toDateInput(primary?.dateOfBirth),
      gender: primary?.gender ?? GenderEnum.Male,
      customerType: customer.customerType ?? CustomerTypeEnum.Individual,
      companyName: customer.companyName ?? '',
      agentId: customer.agentId ?? null,
    }, { emitEvent: false });
    this.travelers.clear();
    allTravelers.filter((traveler) => traveler !== primary).forEach((traveler) =>
      this.travelers.push(this.createTravelerForm({
        firstName: traveler.firstName,
        lastName: traveler.lastName,
        passportNumber: traveler.passportNumber,
        dateOfBirth: this.toDateInput(traveler.dateOfBirth),
        gender: traveler.gender,
        travelerType: traveler.travelerType,
        relationship: traveler.relationship ?? '',
      })));
    this.applyAgentValidator();
    this.applyCustomerType(customer.customerType ?? CustomerTypeEnum.Individual);
  }

  private applyCustomerType(type: CustomerTypeEnum): void {
    const companyName = this.customerForm.controls.companyName;
    companyName.setValidators(type === CustomerTypeEnum.Company ? [Validators.required] : []);
    companyName.updateValueAndValidity({ emitEvent: false });
    this.travelers.setValidators(
      type === CustomerTypeEnum.Couple || type === CustomerTypeEnum.Family
        ? [Validators.minLength(1)]
        : [],
    );
    this.travelers.updateValueAndValidity({ emitEvent: false });
    if (this.selectedCustomer) return;
    this.travelers.clear();
    if (type === CustomerTypeEnum.Couple) this.addTraveler('spouse');
    if (type === CustomerTypeEnum.Family) {
      this.addTraveler('spouse');
      this.addTraveler('child');
    }
    this.cdr.markForCheck();
  }

  private applyAgentValidator(): void {
    const control = this.customerForm.controls.agentId;
    control.setValidators(this.isAdmin ? [Validators.required] : []);
    control.updateValueAndValidity({ emitEvent: false });
  }

  private resetForm(emitCancel: boolean, keepMessage = false): void {
    this.customerForm.reset({
      firstName: '', lastName: '', email: '', mobile: '', passportNumber: '', dateOfBirth: '',
      gender: GenderEnum.Male, customerType: CustomerTypeEnum.Individual,
      companyName: '', agentId: null,
    }, { emitEvent: false });
    this.travelers.clear();
    this.errorMessage = '';
    if (!keepMessage) this.successMessage = '';
    this.applyAgentValidator();
    this.applyCustomerType(CustomerTypeEnum.Individual);
    if (emitCancel) this.editCancelled.emit();
  }

  private createForm() {
    return new FormGroup({
      firstName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(100)] }),
      lastName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(100)] }),
      email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
      mobile: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^\+?[0-9 ()-]{7,20}$/)] }),
      passportNumber: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(20)] }),
      dateOfBirth: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      gender: new FormControl(GenderEnum.Male, { nonNullable: true, validators: [Validators.required] }),
      customerType: new FormControl(CustomerTypeEnum.Individual, { nonNullable: true, validators: [Validators.required] }),
      companyName: new FormControl('', { nonNullable: true }),
      agentId: new FormControl<number | null>(null),
      travelers: new FormArray<ReturnType<CustomersFromCard['createTravelerForm']>>([]),
    });
  }

  private createTravelerForm(value: Partial<{
    firstName: string; lastName: string; passportNumber: string; dateOfBirth: string;
    gender: GenderEnum; travelerType: TravelerTypeEnum; relationship: string;
  }> = {}) {
    return new FormGroup({
      firstName: new FormControl(value.firstName ?? '', { nonNullable: true, validators: [Validators.required, Validators.maxLength(100)] }),
      lastName: new FormControl(value.lastName ?? '', { nonNullable: true, validators: [Validators.required, Validators.maxLength(100)] }),
      passportNumber: new FormControl(value.passportNumber ?? '', { nonNullable: true, validators: [Validators.required, Validators.maxLength(20)] }),
      dateOfBirth: new FormControl(value.dateOfBirth ?? '', { nonNullable: true, validators: [Validators.required] }),
      gender: new FormControl(value.gender ?? GenderEnum.Male, { nonNullable: true, validators: [Validators.required] }),
      travelerType: new FormControl(value.travelerType ?? TravelerTypeEnum.Adult, { nonNullable: true, validators: [Validators.required] }),
      relationship: new FormControl(value.relationship ?? 'Companion', { nonNullable: true, validators: [Validators.required, Validators.maxLength(50)] }),
    });
  }

  private toDateInput(value: unknown): string {
    return String(value ?? '').match(/^\d{4}-\d{2}-\d{2}/)?.[0] ?? '';
  }
}
