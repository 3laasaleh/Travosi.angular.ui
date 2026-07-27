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
  inject,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, forkJoin, of } from 'rxjs';
import { ApiService } from '../../../../core/services/apiservice.service';
import { CurrencyService } from '../../../../core/services/currency.service';

export enum QuotationStatusEnum {
  Draft = 1,
  Sent,
  Accepted,
  Rejected,
  Expired,
}

export interface QuotationDTO {
  id: number;
  quotationNo: string;
  customerId: number;
  currencyId: number;
  travelStartDate: string;
  travelEndDate: string;
  adults: number;
  children: number;
  infants: number;
  exchangeRate: number;
  subTotal: number;
  discount: number;
  taxRate: number;
  tax: number;
  totalAmount: number;
  totalCost: number;
  status: QuotationStatusEnum;
  validUntil: string;
  notes?: string | null;
  items: any[];
}

@Component({
  selector: 'app-quotations-from-card',
  standalone: true,
  imports: [ReactiveFormsModule, DecimalPipe, TranslatePipe],
  templateUrl: './quotations-from-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotationsFromCard implements OnInit, OnChanges {
  private readonly currencyService = inject(CurrencyService);

  @Input() selectedQuotation: QuotationDTO | null = null;
  @Output() quotationSaved = new EventEmitter<void>();
  @Output() editCancelled = new EventEmitter<void>();

  readonly quotationStatusEnum = QuotationStatusEnum;
  readonly statuses = Object.entries(QuotationStatusEnum)
    .filter(([, value]) => typeof value === 'number')
    .map(([label, value]) => ({ label, value: value as number }));

  quotationForm = this.createForm();
  customers: any[] = [];
  readonly currencies = this.currencyService.options;
  packages: any[] = [];
  selectedPackageIds = new Set<number>();
  isLoading = false;
  optionsLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['selectedQuotation']) return;
    if (this.selectedQuotation) this.populateForm(this.selectedQuotation);
    else this.resetForm(false);
  }

  get selectedPackages(): any[] {
    return this.packages.filter((pkg) => this.selectedPackageIds.has(Number(pkg.id)));
  }

  get subTotal(): number {
    return this.selectedPackages.reduce((sum, pkg) => sum + this.packagePrice(pkg), 0);
  }

  get totalCost(): number {
    return this.selectedPackages.reduce(
      (sum, pkg) => sum + Number(pkg.costPrice ?? pkg.cost ?? pkg.price ?? 0),
      0,
    );
  }

  get tax(): number {
    const discountedSubtotal = Math.max(0, this.subTotal - this.quotationForm.controls.discount.value);
    return discountedSubtotal * this.quotationForm.controls.taxRate.value / 100;
  }

  get totalAmount(): number {
    return (Math.max(0, this.subTotal - this.quotationForm.controls.discount.value) + this.tax)
      * this.quotationForm.controls.exchangeRate.value;
  }

  isPackageSelected(id: number): boolean {
    return this.selectedPackageIds.has(Number(id));
  }

  togglePackage(pkg: any, checked: boolean): void {
    const id = Number(pkg.id);
    if (checked) this.selectedPackageIds.add(id);
    else this.selectedPackageIds.delete(id);
  }

  packagePrice(pkg: any): number {
    return Number(pkg.price ?? pkg.totalAmount ?? 0);
  }

  saveQuotation(): void {
    if (this.isLoading) return;
    if (this.quotationForm.invalid || !this.selectedPackageIds.size) {
      this.quotationForm.markAllAsTouched();
      if (!this.selectedPackageIds.size) this.errorMessage = 'selectAtLeastOnePackage';
      return;
    }

    const form = this.quotationForm.getRawValue();
    const payload: any = {
      quotationNo: form.quotationNo.trim(),
      customerId: Number(form.customerId),
      currencyId: Number(form.currencyId),
      travelStartDate: form.travelStartDate,
      travelEndDate: form.travelEndDate,
      adults: form.adults,
      children: form.children,
      infants: form.infants,
      exchangeRate: form.exchangeRate,
      subTotal: this.subTotal,
      discount: form.discount,
      taxRate: form.taxRate,
      tax: this.tax,
      totalAmount: this.totalAmount,
      totalCost: this.totalCost,
      status: form.status,
      validUntil: form.validUntil,
      notes: form.notes.trim() || null,
      items: this.selectedPackages.map((pkg) => ({
        packageId: Number(pkg.id),
        quantity: 1,
        unitPrice: this.packagePrice(pkg),
        costPrice: Number(pkg.costPrice ?? pkg.cost ?? pkg.price ?? 0),
        totalAmount: this.packagePrice(pkg),
      })),
    };
    if (this.selectedQuotation?.id) payload.id = this.selectedQuotation.id;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    const request$ = this.selectedQuotation
      ? this.apiService.put('Quotations', payload)
      : this.apiService.post('Quotations', payload);

    request$.pipe(
      catchError(() => {
        this.errorMessage = 'quotationSaveError';
        return of(null);
      }),
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      if (response?.isSuccess === false) {
        this.errorMessage = response.message;
        return;
      }
      this.successMessage = response?.message ?? 'quotationSaved';
      this.resetForm(false);
      this.quotationSaved.emit();
    });
  }

  cancelEdit(): void {
    this.resetForm(true);
  }

  private loadOptions(): void {
    this.optionsLoading = true;
    forkJoin({
      customers: this.apiService.get('Customers?page=1&pageSize=100').pipe(catchError(() => of([]))),
      packages: this.apiService.get('Packages?page=1&pageSize=100').pipe(catchError(() => of([]))),
    }).pipe(finalize(() => {
      this.optionsLoading = false;
      this.cdr.markForCheck();
    })).subscribe(({ customers, packages }) => {
      this.customers = this.rows(customers, 'customers');
      this.packages = this.rows(packages, 'packages');
      if (this.selectedQuotation) this.selectQuotationPackages(this.selectedQuotation.items);
    });
  }

  private populateForm(quotation: QuotationDTO): void {
    this.quotationForm.setValue({
      quotationNo: quotation.quotationNo ?? '',
      customerId: quotation.customerId ?? '',
      currencyId: quotation.currencyId ?? '',
      travelStartDate: quotation.travelStartDate ?? '',
      travelEndDate: quotation.travelEndDate ?? '',
      adults: quotation.adults ?? 1,
      children: quotation.children ?? 0,
      infants: quotation.infants ?? 0,
      exchangeRate: quotation.exchangeRate ?? 1,
      discount: quotation.discount ?? 0,
      taxRate: quotation.taxRate ?? 0,
      status: quotation.status ?? QuotationStatusEnum.Draft,
      validUntil: quotation.validUntil ?? '',
      notes: quotation.notes ?? '',
    });
    this.selectQuotationPackages(quotation.items);
  }

  private selectQuotationPackages(items: any[] | undefined): void {
    this.selectedPackageIds = new Set(
      (items ?? []).map((item) => Number(item.packageId ?? item.package?.id ?? item.id)),
    );
  }

  private resetForm(emitCancel: boolean): void {
    this.selectedPackageIds.clear();
    this.quotationForm.reset({
      quotationNo: '',
      customerId: '',
      currencyId: this.currencyService.currentCurrency().id,
      travelStartDate: '',
      travelEndDate: '',
      adults: 1,
      children: 0,
      infants: 0,
      exchangeRate: 1,
      discount: 0,
      taxRate: 0,
      status: QuotationStatusEnum.Draft,
      validUntil: '',
      notes: '',
    });
    if (emitCancel) this.editCancelled.emit();
  }

  private rows(response: any, key: string): any[] {
    const payload = response?.data ?? response;
    const rows = payload?.data ?? payload?.items ?? payload?.[key] ?? payload;
    return Array.isArray(rows) ? rows : [];
  }

  private createForm() {
    return new FormGroup({
      quotationNo: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      customerId: new FormControl<number | ''>('', { nonNullable: true, validators: [Validators.required] }),
      currencyId: new FormControl<number | ''>(this.currencyService.currentCurrency().id, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      travelStartDate: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      travelEndDate: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      adults: new FormControl(1, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
      children: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }),
      infants: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }),
      exchangeRate: new FormControl(1, { nonNullable: true, validators: [Validators.required, Validators.min(0.000001)] }),
      discount: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }),
      taxRate: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }),
      status: new FormControl(QuotationStatusEnum.Draft, { nonNullable: true, validators: [Validators.required] }),
      validUntil: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      notes: new FormControl('', { nonNullable: true }),
    });
  }
}
