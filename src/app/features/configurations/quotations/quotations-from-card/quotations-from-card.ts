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
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { DatePipe, DecimalPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, forkJoin, of } from 'rxjs';
import { ApiService } from '../../../../core/services/apiservice.service';
import { environment } from '../../../../../environments/environment';
import { DatePicker } from '../../../../shared/components/date-picker/date-picker';
import { TimePicker } from '../../../../shared/components/time-picker/time-picker';

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
  policies?: Array<{ id?: number; value: string }>;
}

@Component({
  selector: 'app-quotations-from-card',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, DecimalPipe, TranslatePipe, DatePicker, TimePicker],
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

  quotationForm :any;
  customers: any[] = [];
  readonly currencies = [
    { id: 2, code: 'USD', symbol: '$', labelKey: 'currencyUsd' },
    { id: 1, code: 'EGP', symbol: 'EGP', labelKey: 'currencyEgp' },
  ];
  packages: any[] = [];
  tours: any[] = [];
  flights: any[] = [];
  selectedPackageIds = new Set<number>();
  selectedTourIds = new Set<number>();
  selectedFlightIds = new Set<number>();
  isLoading = false;
  optionsLoading = false;
  optionsLoadError = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
  ) {
   this.quotationForm= this.createForm();
  }

  ngOnInit(): void {
    this.loadOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedQuotation) this.populateForm(this.selectedQuotation);
    else this.resetForm(false);
  }

  get selectedPackages(): any[] {
    return this.packages.filter((pkg) => this.selectedPackageIds.has(Number(pkg.id)));
  }

  get selectedTours(): any[] {
    return this.tours.filter((tour) => this.selectedTourIds.has(Number(tour.id)));
  }

  get selectedFlights(): any[] {
    return this.flights.filter((flight) => this.selectedFlightIds.has(Number(flight.id)));
  }

  get policiesArray(): FormArray<FormGroup> {
    return this.quotationForm.controls.policies;
  }

  get transfersArray(): FormArray<FormGroup> {
    return this.quotationForm.controls.transfers;
  }

  get travelerCount(): number {
    const form = this.quotationForm.controls;
    return form.adults.value + form.children.value + form.infants.value;
  }

  get subTotal(): number {
    return this.selectedPackages.reduce((sum, pkg) => sum + this.catalogTotal(pkg), 0)
      + this.selectedTours.reduce((sum, tour) => sum + this.catalogTotal(tour), 0)
      + this.selectedFlights.reduce((sum, flight) => sum + this.flightTotal(flight), 0);
  }

  get totalCost(): number {
    return this.buildQuotationItems().reduce(
      (sum, item) => sum + Number(item.costPrice ?? 0) * Number(item.quantity ?? 0),
      0,
    );
  }

  get hasTravelItems(): boolean {
    return this.selectedPackageIds.size > 0
      || this.selectedTourIds.size > 0
      || this.selectedFlightIds.size > 0
      || this.transfersArray.length > 0;
  }

  get tax(): number {
    const discountedSubtotal = Math.max(0, this.subTotal - this.quotationForm.controls.discount.value);
    return discountedSubtotal * this.quotationForm.controls.taxRate.value / 100;
  }

  get totalAmount(): number {
    return Math.max(0, this.subTotal - this.quotationForm.controls.discount.value) + this.tax;
  }

  get today(): string { return this.localDate(new Date()); }

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

  isFlightSelected(id: number): boolean {
    return this.selectedFlightIds.has(Number(id));
  }

  toggleFlight(flight: any, checked: boolean): void {
    const id = Number(flight.id);
    if (checked) this.selectedFlightIds.add(id);
    else this.selectedFlightIds.delete(id);
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

  flightPrice(flight: any): number {
    return Number(flight?.price ?? 0);
  }

  flightTotal(flight: any): number {
    return this.flightPrice(flight) * this.travelerCount;
  }

  flightName(flight: any): string {
    const number = String(flight?.flightNumber ?? '').trim();
    const airline = String(flight?.airlineName ?? flight?.airline?.name ?? '').trim();
    const route = [flight?.departureAirport, flight?.arrivalAirport]
      .filter(Boolean)
      .join(' - ');
    return [airline, number, route].filter(Boolean).join(' · ');
  }

  addPolicy(): void {
    this.policiesArray.push(this.createPolicyGroup());
  }

  removePolicy(index: number): void {
    this.policiesArray.removeAt(index);
  }

  addTransfer(): void {
    this.transfersArray.push(this.createTransferGroup());
  }

  removeTransfer(index: number): void {
    this.transfersArray.removeAt(index);
  }

  itemName(item: any): string {
    return item?.nameEng ?? item?.titleEng ?? item?.title ?? item?.name ?? '';
  }

  thumbnail(item: any): string {
    const image = item?.images?.[0];
    const raw = item?.airlineLogoUrl
      ?? item?.airline?.logoUrl
      ?? item?.coverImageUrl
      ?? image?.imageUrl
      ?? image?.url
      ?? item?.imageUrl
      ?? '';
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
    this.selectedFlights.forEach((flight) => {
      items.push({
        itemType: 4,
        description: this.flightName(flight),
        quantity: Math.max(1, this.travelerCount),
        costPrice: Number(flight.costPrice ?? flight.cost ?? 0),
        sellingPrice: this.flightPrice(flight),
        discount: 0,
        sortOrder: sortOrder++,
        flightId: Number(flight.id),
      });
    });
    this.transfersArray.getRawValue().forEach((transfer: any) => {
      const from = String(transfer.from ?? '').trim();
      const to = String(transfer.to ?? '').trim();
      items.push({
        itemType: 5,
        description: `${from} - ${to}`,
        quantity: 1,
        costPrice: 0,
        sellingPrice: 0,
        discount: 0,
        sortOrder: sortOrder++,
        from,
        to,
        transferDate: transfer.transferDate,
        fromTime: this.toApiTime(transfer.fromTime),
        arrivalTime: this.toApiTime(transfer.arrivalTime),
      });
    });
    return items;
  }

  saveQuotation(): void {
    if (this.isLoading) return;
    if (this.quotationForm.controls.discount.value > this.subTotal) {
      this.errorMessage = 'discountExceedsSubtotal';
      return;
    }
    if (this.quotationForm.invalid || !this.hasTravelItems) {
      this.quotationForm.markAllAsTouched();
      if (!this.hasTravelItems) this.errorMessage = 'selectAtLeastOneTravelItem';
      return;
    }

    const form = this.quotationForm.getRawValue();
    const payload: any = {
      customerId: Number(form.customerId),
      currencyId: Number(form.currencyId),
      travelStartDate: form.travelStartDate,
      travelEndDate: form.travelEndDate,
      adults: form.adults,
      children: form.children,
      infants: form.infants,
      subTotal: this.subTotal,
      discount: form.discount,
      taxRate: form.taxRate,
      tax: this.tax,
      totalAmount: this.totalAmount,
      totalCost: this.totalCost,
      status: form.status,
      validUntil: form.validUntil,
      notes: form.notes.trim() || null,
      policies: form.policies.map((policy: any) => ({
        id: Number(policy.id) || 0,
        value: String(policy.value ?? '').trim(),
      })),
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
      flights: this.apiService.get('Flights/GetAll?page=1&pageSize=100').pipe(catchError(() => { this.optionsLoadError = true; return of([]); })),
    }).pipe(finalize(() => {
      this.optionsLoading = false;
      this.cdr.markForCheck();
    })).subscribe(({ customers, packages, tours, flights }) => {
      this.customers = this.rows(customers, 'customers');
      this.packages = this.rows(packages, 'packages');
      this.tours = this.rows(tours, 'tours');
      this.flights = this.rows(flights, 'flights');
      if (this.selectedQuotation) this.selectCatalogItems(this.selectedQuotation.items);
    });
  }

  retryOptions(): void { this.loadOptions(); }

  private populateForm(quotation: QuotationDTO): void {
    this.quotationForm.patchValue({
      customerId: quotation.customerId ?? '',
      currencyId: quotation.currencyId ?? '',
      travelStartDate: quotation.travelStartDate ?? '',
      travelEndDate: quotation.travelEndDate ?? '',
      adults: quotation.adults ?? 1,
      children: quotation.children ?? 0,
      infants: quotation.infants ?? 0,
      discount: quotation.discount ?? 0,
      taxRate: quotation.taxRate ?? 0,
      status: quotation.status ?? QuotationStatusEnum.Draft,
      validUntil: quotation.validUntil ?? '',
      notes: quotation.notes ?? '',
    });
    this.setPolicies(quotation.policies ?? []);
    this.setTransfers(quotation.items ?? []);
    this.selectCatalogItems(quotation.items);
  }

  private selectCatalogItems(items: any[] | undefined): void {
    this.selectedPackageIds = new Set(
      (items ?? []).filter((item) => item.packageId ?? item.package?.id)
        .map((item) => Number(item.packageId ?? item.package?.id)),
    );
    this.selectedTourIds = new Set(
      (items ?? []).filter((item) => item.tourId ?? item.tour?.id)
        .map((item) => Number(item.tourId ?? item.tour?.id)),
    );
    this.selectedFlightIds = new Set(
      (items ?? []).filter((item) => item.flightId ?? item.flight?.id)
        .map((item) => Number(item.flightId ?? item.flight?.id)),
    );
  }

  private setPolicies(policies: Array<{ id?: number; value?: string } | string>): void {
    this.policiesArray.clear();
    policies.forEach((policy) => {
      const normalized = typeof policy === 'string' ? { value: policy } : policy;
      this.policiesArray.push(this.createPolicyGroup(normalized));
    });
  }

  private setTransfers(items: any[]): void {
    this.transfersArray.clear();
    items
      .filter((item) => Number(item?.itemType) === 5 || item?.itemTypeName === 'Transfer')
      .forEach((item) => this.transfersArray.push(this.createTransferGroup(item)));
  }

  private resetForm(emitCancel: boolean): void {
    const today = this.today;
    this.selectedPackageIds.clear();
    this.selectedTourIds.clear();
    this.selectedFlightIds.clear();
    this.policiesArray.clear();
    this.transfersArray.clear();
    this.quotationForm.reset({
      customerId: '',
      currencyId: this.currencies[0].id,
      travelStartDate: today,
      travelEndDate: today,
      adults: 1,
      children: 0,
      infants: 0,
      discount: 0,
      taxRate: 0,
      status: QuotationStatusEnum.Draft,
      validUntil: today,
      notes: '',
    });
    if (emitCancel) this.editCancelled.emit();
  }

  private rows(response: any, key: string): any[] {
    const payload = response?.data ?? response;
    const rows = payload?.data ?? payload?.items ?? payload?.[key] ?? payload;
    return Array.isArray(rows) ? rows : [];
  }

  private createPolicyGroup(policy: { id?: number; value?: string } = {}): FormGroup {
    return new FormGroup({
      id: new FormControl(Number(policy.id) || 0, { nonNullable: true }),
      value: new FormControl(String(policy.value ?? ''), {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(500)],
      }),
    });
  }

  private createTransferGroup(transfer: any = {}): FormGroup {
    const defaults = this.defaultTransferSchedule();
    return new FormGroup({
      id: new FormControl(Number(transfer?.id) || 0, { nonNullable: true }),
      from: new FormControl(String(transfer?.from ?? ''), {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(250)],
      }),
      to: new FormControl(String(transfer?.to ?? ''), {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(250)],
      }),
      transferDate: new FormControl(this.toInputDate(transfer?.transferDate) || defaults.date, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      fromTime: new FormControl(this.toInputTime(transfer?.fromTime) || defaults.fromTime, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      arrivalTime: new FormControl(this.toInputTime(transfer?.arrivalTime) || defaults.arrivalTime, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    }, { validators: this.transferScheduleValidator });
  }

  minTimeForTransferDate(value: unknown): string | null {
    return this.toInputDate(value) === this.today ? this.currentTime() : null;
  }

  private toInputDate(value: unknown): string {
    const match = String(value ?? '').match(/^(\d{4}-\d{2}-\d{2})/);
    return match?.[1] ?? '';
  }

  private toInputTime(value: unknown): string {
    const match = String(value ?? '').match(/^(\d{2}):(\d{2})/);
    return match ? `${match[1]}:${match[2]}` : '';
  }

  private toApiTime(value: unknown): string | null {
    const time = this.toInputTime(value);
    return time ? `${time}:00` : null;
  }

  private createForm() {
    const today = this.today;
    return new FormGroup({
      customerId: new FormControl<number | ''>('', { nonNullable: true, validators: [Validators.required] }),
      currencyId: new FormControl<number | ''>(this.currencies[0].id, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      travelStartDate: new FormControl(today, { nonNullable: true, validators: [Validators.required] }),
      travelEndDate: new FormControl(today, { nonNullable: true, validators: [Validators.required] }),
      adults: new FormControl(1, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
      children: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }),
      infants: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }),
      discount: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }),
      taxRate: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }),
      status: new FormControl(QuotationStatusEnum.Draft, { nonNullable: true, validators: [Validators.required] }),
      validUntil: new FormControl(today, { nonNullable: true, validators: [Validators.required] }),
      notes: new FormControl('', { nonNullable: true }),
      policies: new FormArray<FormGroup>([]),
      transfers: new FormArray<FormGroup>([]),
    }, { validators: this.quotationDatesValidator });
  }

  private localDate(value: Date): string {
    return [
      value.getFullYear().toString().padStart(4, '0'),
      (value.getMonth() + 1).toString().padStart(2, '0'),
      value.getDate().toString().padStart(2, '0'),
    ].join('-');
  }

  private currentTime(): string {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  }

  private defaultTransferSchedule(): { date: string; fromTime: string; arrivalTime: string } {
    const pickup = new Date(Date.now() + 15 * 60_000);
    const arrival = new Date(pickup.getTime() + 60 * 60_000);
    if (pickup.getDate() !== arrival.getDate()) {
      pickup.setDate(pickup.getDate() + 1);
      pickup.setHours(9, 0, 0, 0);
      arrival.setTime(pickup.getTime() + 60 * 60_000);
    }
    const time = (value: Date) => `${value.getHours().toString().padStart(2, '0')}:${value.getMinutes().toString().padStart(2, '0')}`;
    return { date: this.localDate(pickup), fromTime: time(pickup), arrivalTime: time(arrival) };
  }

  private transferScheduleValidator(control: AbstractControl): ValidationErrors | null {
    const date = String(control.get('transferDate')?.value ?? '');
    const fromTime = String(control.get('fromTime')?.value ?? '');
    const arrivalTime = String(control.get('arrivalTime')?.value ?? '');
    if (!date || !fromTime || !arrivalTime) return null;

    const pickup = new Date(`${date}T${fromTime}:00`);
    const arrival = new Date(`${date}T${arrivalTime}:00`);
    if (Number.isNaN(pickup.getTime()) || Number.isNaN(arrival.getTime())) return { invalidTransferSchedule: true };
    if (pickup.getTime() < Date.now()) return { transferTimeInPast: true };
    if (arrival.getTime() <= pickup.getTime()) return { invalidTransferTimeRange: true };
    return null;
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
