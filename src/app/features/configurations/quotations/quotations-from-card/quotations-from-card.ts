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
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, forkJoin, of } from 'rxjs';
import { ApiService } from '../../../../core/services/apiservice.service';
import { environment } from '../../../../../environments/environment';
import { DatePicker } from '../../../../shared/components/date-picker/date-picker';

export enum QuotationStatusEnum {
  Draft = 1,
  Sent,
  Accepted,
  Rejected,
  Expired,
  Cancelled,
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
  imports: [ReactiveFormsModule, DecimalPipe, TranslatePipe, DatePicker],
  templateUrl: './quotations-from-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotationsFromCard implements OnInit, OnChanges {
  @Input() selectedQuotation: QuotationDTO | null = null;
  @Output() quotationSaved = new EventEmitter<void>();
  @Output() editCancelled = new EventEmitter<void>();

  readonly quotationStatusEnum = QuotationStatusEnum;
  readonly statuses = Object.entries(QuotationStatusEnum)
    .filter(([, value]) => typeof value === 'number')
    .map(([label, value]) => ({ label, value: value as number }));

  quotationForm = this.createForm();
  customers: any[] = [];
  readonly currencies = [
    { id: 2, code: 'USD', symbol: '$', labelKey: 'currencyUsd' },
    { id: 1, code: 'EGP', symbol: 'EGP', labelKey: 'currencyEgp' },
  ];
  packages: any[] = [];
  tours: any[] = [];
  selectedPackageIds = new Set<number>();
  selectedTourIds = new Set<number>();
  isLoading = false;
  optionsLoading = false;
  optionsLoadError = false;
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

  get selectedTours(): any[] {
    return this.tours.filter((tour) => this.selectedTourIds.has(Number(tour.id)));
  }

  get travelerCount(): number {
    const form = this.quotationForm.controls;
    return form.adults.value + form.children.value + form.infants.value;
  }

  get subTotal(): number {
    return this.selectedPackages.reduce((sum, pkg) => sum + this.catalogTotal(pkg), 0)
      + this.selectedTours.reduce((sum, tour) => sum + this.catalogTotal(tour), 0);
  }

  get totalCost(): number {
    return [...this.selectedPackages, ...this.selectedTours].reduce(
      (sum, item) => sum + Number(item.costPrice ?? item.cost ?? 0), 0);
  }

  get tax(): number {
    const discountedSubtotal = Math.max(0, this.subTotal - this.quotationForm.controls.discount.value);
    return discountedSubtotal * this.quotationForm.controls.taxRate.value / 100;
  }

  get totalAmount(): number {
    return Math.max(0, this.subTotal - this.quotationForm.controls.discount.value) + this.tax;
  }

  get today(): string { return new Date().toISOString().slice(0, 10); }

  isPackageSelected(id: number): boolean {
    return this.selectedPackageIds.has(Number(id));
  }

  togglePackage(pkg: any, checked: boolean): void {
    const id = Number(pkg.id);
    if (checked) this.selectedPackageIds.add(id);
    else this.selectedPackageIds.delete(id);
  }

  isTourSelected(id: number): boolean {
    return this.selectedTourIds.has(Number(id));
  }

  toggleTour(tour: any, checked: boolean): void {
    const id = Number(tour.id);
    if (checked) this.selectedTourIds.add(id);
    else this.selectedTourIds.delete(id);
  }

  packagePrice(pkg: any): number {
    return Number(pkg.pricePerPerson ?? pkg.price ?? pkg.totalAmount ?? 0);
  }

  childPrice(item: any): number {
    return Number(item.pricePerChild ?? 0);
  }

  catalogTotal(item: any): number {
    return this.packagePrice(item) * this.quotationForm.controls.adults.value
      + this.childPrice(item) * this.quotationForm.controls.children.value;
  }

  itemName(item: any): string {
    return item?.nameEng ?? item?.titleEng ?? item?.title ?? item?.name ?? '';
  }

  thumbnail(item: any): string {
    const image = item?.images?.[0];
    const raw = image?.imageUrl ?? image?.url ?? item?.coverImageUrl ?? item?.imageUrl ?? '';
    if (!raw || /^(blob:|data:|https?:\/\/)/i.test(raw)) return raw;
    const path = String(raw).replace(/^\/+/, '').replace(/^images\//i, '');
    return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
  }

  private buildQuotationItems(): any[] {
    const items: any[] = [];
    let sortOrder = 1;
    const addCatalogItem = (item: any, itemType: number, reference: 'packageId' | 'tourId') => {
      const base = {
        itemType,
        description: this.itemName(item),
        costPrice: Number(item.costPrice ?? item.cost ?? 0),
        discount: 0,
        sortOrder: sortOrder++,
        [reference]: Number(item.id),
      };
      const adults = this.quotationForm.controls.adults.value;
      const children = this.quotationForm.controls.children.value;
      if (adults > 0) items.push({ ...base, description: `${base.description} - Adults`, quantity: adults, sellingPrice: this.packagePrice(item) });
      if (children > 0 && this.childPrice(item) > 0) items.push({ ...base, description: `${base.description} - Children`, quantity: children, sellingPrice: this.childPrice(item), sortOrder: sortOrder++ });
    };
    this.selectedPackages.forEach((item) => addCatalogItem(item, 1, 'packageId'));
    this.selectedTours.forEach((item) => addCatalogItem(item, 2, 'tourId'));
    return items;
  }

  saveQuotation(): void {
    if (this.isLoading) return;
    if (this.quotationForm.controls.discount.value > this.subTotal) {
      this.errorMessage = 'discountExceedsSubtotal';
      return;
    }
    if (this.quotationForm.invalid || (!this.selectedPackageIds.size && !this.selectedTourIds.size)) {
      this.quotationForm.markAllAsTouched();
      if (!this.selectedPackageIds.size && !this.selectedTourIds.size) this.errorMessage = 'selectAtLeastOneTravelItem';
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
      items: this.buildQuotationItems(),
    };
    if (this.selectedQuotation?.id) payload.id = this.selectedQuotation.id;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    const request$ = this.selectedQuotation
      ? this.apiService.put('Quotations', payload)
      : this.apiService.post('Quotations', payload);

    request$.pipe(
      catchError((error) => {
        this.errorMessage = error?.error?.message ?? 'quotationSaveError';
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
    this.optionsLoadError = false;
    forkJoin({
      customers: this.apiService.get('Customers?page=1&pageSize=100').pipe(catchError(() => { this.optionsLoadError = true; return of([]); })),
      packages: this.apiService.get('Packages?page=1&pageSize=100').pipe(catchError(() => { this.optionsLoadError = true; return of([]); })),
      tours: this.apiService.get('Tours?page=1&pageSize=100').pipe(catchError(() => { this.optionsLoadError = true; return of([]); })),
    }).pipe(finalize(() => {
      this.optionsLoading = false;
      this.cdr.markForCheck();
    })).subscribe(({ customers, packages, tours }) => {
      this.customers = this.rows(customers, 'customers');
      this.packages = this.rows(packages, 'packages');
      this.tours = this.rows(tours, 'tours');
      if (this.selectedQuotation) this.selectQuotationItems(this.selectedQuotation.items);
    });
  }

  retryOptions(): void { this.loadOptions(); }

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
    this.selectQuotationItems(quotation.items);
  }

  private selectQuotationItems(items: any[] | undefined): void {
    this.selectedPackageIds = new Set(
      (items ?? []).filter((item) => item.packageId ?? item.package?.id)
        .map((item) => Number(item.packageId ?? item.package?.id)),
    );
    this.selectedTourIds = new Set(
      (items ?? []).filter((item) => item.tourId).map((item) => Number(item.tourId)),
    );
  }

  private resetForm(emitCancel: boolean): void {
    this.selectedPackageIds.clear();
    this.selectedTourIds.clear();
    this.quotationForm.reset({
      quotationNo: '',
      customerId: '',
      currencyId: this.currencies[0].id,
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
      quotationNo: new FormControl('', { nonNullable: true }),
      customerId: new FormControl<number | ''>('', { nonNullable: true, validators: [Validators.required] }),
      currencyId: new FormControl<number | ''>(this.currencies[0].id, {
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
    }, { validators: this.quotationDatesValidator });
  }

  private quotationDatesValidator(control: AbstractControl): ValidationErrors | null {
    const start = String(control.get('travelStartDate')?.value ?? '');
    const end = String(control.get('travelEndDate')?.value ?? '');
    const validUntil = String(control.get('validUntil')?.value ?? '');
    if (start && end && end < start) return { invalidTravelDateRange: true };
    if (start && validUntil && validUntil > start) return { invalidValidityDate: true };
    return null;
  }
}
