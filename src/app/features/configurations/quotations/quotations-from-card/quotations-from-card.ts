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
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, forkJoin, of } from 'rxjs';
import Swal from 'sweetalert2';
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

  quotationForm :any;
  customers: any[] = [];
  readonly currencies = [
    { id: 2, code: 'USD', symbol: '$', labelKey: 'currencyUsd' },
    { id: 1, code: 'EGP', symbol: 'EGP', labelKey: 'currencyEgp' },
  ];
  packages: any[] = [];
  tours: any[] = [];
  hotels: any[] = [];
  flights: any[] = [];
  selectedPackageIds = new Set<number>();
  selectedTourIds = new Set<number>();
  selectedHotelIds = new Set<number>();
  selectedFlightIds = new Set<number>();
  isLoading = false;
  optionsLoading = false;
  optionsLoadError = false;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
  ) {
    this.quotationForm = this.createForm();
    this.quotationForm.controls.travelEndDate.updateValueAndValidity({ emitEvent: false });
    this.quotationForm.controls.validUntil.updateValueAndValidity({ emitEvent: false });
    this.quotationForm.controls.travelStartDate.valueChanges.subscribe(() => {
      this.quotationForm.controls.travelEndDate.updateValueAndValidity({ emitEvent: false });
      this.quotationForm.controls.validUntil.updateValueAndValidity({ emitEvent: false });
      this.quotationForm.updateValueAndValidity({ emitEvent: false });
    });
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

  get selectedHotels(): any[] {
    return this.hotels.filter((hotel) => this.selectedHotelIds.has(Number(hotel.id)));
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
      + this.selectedHotels.reduce((sum, hotel) => sum + this.hotelTotal(hotel), 0)
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
      || this.selectedHotelIds.size > 0
      || this.selectedFlightIds.size > 0
      || this.transfersArray.length > 0;
  }

  get travelServicesInvalid(): boolean {
    return !this.optionsLoading && !this.hasTravelItems;
  }

  get tax(): number {
    const discountedSubtotal = Math.max(0, this.subTotal - this.quotationForm.controls.discount.value);
    return discountedSubtotal * this.quotationForm.controls.taxRate.value / 100;
  }

  get totalAmount(): number {
    return Math.max(0, this.subTotal - this.quotationForm.controls.discount.value) + this.tax;
  }

  get canSave(): boolean {
    return !this.isLoading
      && !this.optionsLoading
      && this.quotationForm.valid
      && this.hasTravelItems
      && this.quotationForm.controls.discount.value <= this.subTotal;
  }

  get today(): string { return this.localDate(new Date()); }

  get defaultTravelStartDate(): string { return this.addDays(this.today, 1); }

  get defaultTravelEndDate(): string { return this.addDays(this.today, 2); }

  get defaultValidUntil(): string { return this.addDays(this.today, 1); }

  get minimumTravelEndDate(): string {
    return this.addDays(this.quotationForm.controls.travelStartDate.value || this.today, 1);
  }

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

  isHotelSelected(id: number): boolean {
    return this.selectedHotelIds.has(Number(id));
  }

  toggleHotel(hotel: any, checked: boolean): void {
    const id = Number(hotel.id);
    if (checked) this.selectedHotelIds.add(id);
    else this.selectedHotelIds.delete(id);
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

  hotelRoom(hotel: any): any | null {
    const rooms = Array.isArray(hotel?.rooms) ? hotel.rooms : [];
    return rooms
      .filter((room: any) => room?.isActive !== false)
      .sort((left: any, right: any) => Number(left?.sellingPrice ?? 0) - Number(right?.sellingPrice ?? 0))[0]
      ?? rooms[0]
      ?? null;
  }

  hotelPrice(hotel: any): number {
    return Number(this.hotelRoom(hotel)?.sellingPrice ?? hotel?.sellingPrice ?? hotel?.price ?? 0);
  }

  hotelNights(): number {
    const start = this.quotationForm.controls.travelStartDate.value;
    const end = this.quotationForm.controls.travelEndDate.value;
    if (!start || !end) return 1;
    const milliseconds = new Date(`${end}T00:00:00`).getTime() - new Date(`${start}T00:00:00`).getTime();
    return Math.max(1, Math.round(milliseconds / 86_400_000));
  }

  hotelTotal(hotel: any): number {
    return this.hotelPrice(hotel) * this.hotelNights();
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
    this.selectedHotels.forEach((hotel) => {
      const room = this.hotelRoom(hotel);
      const hotelName = this.itemName(hotel);
      const roomName = String(room?.name ?? room?.roomTypeName ?? '').trim();
      items.push({
        itemType: 3,
        description: [hotelName, roomName].filter(Boolean).join(' - '),
        quantity: this.hotelNights(),
        costPrice: Number(room?.costPrice ?? hotel?.costPrice ?? 0),
        sellingPrice: this.hotelPrice(hotel),
        discount: 0,
        sortOrder: sortOrder++,
        hotelId: Number(hotel.id),
        serviceStartDate: this.quotationForm.controls.travelStartDate.value,
        serviceEndDate: this.quotationForm.controls.travelEndDate.value,
        roomType: (room?.roomTypeName ?? roomName) || null,
        numberOfRooms: 1,
        occupancy: room ? `${Number(room.maxAdults ?? 0)} adults, ${Number(room.maxChildren ?? 0)} children` : null,
        mealPlan: room?.mealPlanName ?? null,
      });
    });
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
    this.quotationForm.updateValueAndValidity();
    if (this.quotationForm.controls.discount.value > this.subTotal) {
      this.quotationForm.controls.discount.markAsTouched();
      this.showToast('warning', 'discountExceedsSubtotal');
      return;
    }
    if (this.quotationForm.invalid || !this.hasTravelItems) {
      this.quotationForm.markAllAsTouched();
      this.showToast('warning', !this.hasTravelItems ? 'selectAtLeastOneTravelItem' : 'quotationValidationError');
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
    const request$ = this.selectedQuotation
      ? this.apiService.put('Quotations', payload)
      : this.apiService.post('Quotations', payload);

    request$.pipe(
      catchError((error) => {
        this.showToast('error', this.apiMessage(error, 'quotationSaveError'));
        return of(null);
      }),
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      if (response?.isSuccess === false) {
        this.showToast('error', this.apiMessage(response, 'quotationSaveError'));
        return;
      }
      this.showToast('success', response?.message ?? 'quotationSaved');
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
      hotels: this.apiService.get('Hotels?page=1&pageSize=100').pipe(catchError(() => { this.optionsLoadError = true; return of([]); })),
      flights: this.apiService.get('Flights/GetAll?page=1&pageSize=100').pipe(catchError(() => { this.optionsLoadError = true; return of([]); })),
    }).pipe(finalize(() => {
      this.optionsLoading = false;
      if (this.optionsLoadError) this.showToast('error', 'quotationOptionsLoadError');
      this.cdr.markForCheck();
    })).subscribe(({ customers, packages, tours, hotels, flights }) => {
      this.customers = this.rows(customers, 'customers');
      this.packages = this.rows(packages, 'packages');
      this.tours = this.rows(tours, 'tours');
      this.hotels = this.rows(hotels, 'hotels');
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
    this.selectedHotelIds = new Set(
      (items ?? []).filter((item) => item.hotelId ?? item.hotel?.id)
        .map((item) => Number(item.hotelId ?? item.hotel?.id)),
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
    this.selectedPackageIds.clear();
    this.selectedTourIds.clear();
    this.selectedHotelIds.clear();
    this.selectedFlightIds.clear();
    this.policiesArray.clear();
    this.transfersArray.clear();
    this.quotationForm.reset({
      customerId: '',
      currencyId: this.currencies[0].id,
      travelStartDate: this.defaultTravelStartDate,
      travelEndDate: this.defaultTravelEndDate,
      adults: 1,
      children: 0,
      infants: 0,
      discount: 0,
      taxRate: 0,
      validUntil: this.defaultValidUntil,
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
    return new FormGroup({
      customerId: new FormControl<number | ''>('', { nonNullable: true, validators: [Validators.required] }),
      currencyId: new FormControl<number | ''>(this.currencies[0].id, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      travelStartDate: new FormControl(this.defaultTravelStartDate, { nonNullable: true, validators: [Validators.required, this.validDateValidator, this.travelStartDateValidator] }),
      travelEndDate: new FormControl(this.defaultTravelEndDate, { nonNullable: true, validators: [Validators.required, this.validDateValidator, this.travelEndDateValidator] }),
      adults: new FormControl(1, { nonNullable: true, validators: [Validators.required, Validators.min(1), this.integerValidator] }),
      children: new FormControl(0, { nonNullable: true, validators: [Validators.min(0), this.integerValidator] }),
      infants: new FormControl(0, { nonNullable: true, validators: [Validators.min(0), this.integerValidator] }),
      discount: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }),
      taxRate: new FormControl(0, { nonNullable: true, validators: [Validators.min(0), Validators.max(100)] }),
      validUntil: new FormControl(this.defaultValidUntil, { nonNullable: true, validators: [Validators.required, this.validDateValidator, this.validUntilValidator] }),
      notes: new FormControl('', { nonNullable: true }),
      policies: new FormArray<FormGroup>([]),
      transfers: new FormArray<FormGroup>([]),
    }, { validators: this.quotationDatesValidator });
  }

  private readonly validDateValidator = (control: AbstractControl): ValidationErrors | null => {
    const value = String(control.value ?? '');
    if (!value) return null;
    const date = new Date(`${value}T00:00:00`);
    return /^\d{4}-\d{2}-\d{2}$/.test(value)
      && !Number.isNaN(date.getTime())
      && this.localDate(date) === value
      ? null
      : { invalidDate: true };
  };

  private readonly travelStartDateValidator = (control: AbstractControl): ValidationErrors | null => {
    const value = String(control.value ?? '');
    return value && /^\d{4}-\d{2}-\d{2}$/.test(value) && value < this.today
      ? { dateInPast: true }
      : null;
  };

  private readonly travelEndDateValidator = (control: AbstractControl): ValidationErrors | null => {
    const value = String(control.value ?? '');
    const start = String(control.parent?.get('travelStartDate')?.value ?? '');
    return value && start && value <= start ? { dateNotAfterStart: true } : null;
  };

  private readonly validUntilValidator = (control: AbstractControl): ValidationErrors | null => {
    const value = String(control.value ?? '');
    const start = String(control.parent?.get('travelStartDate')?.value ?? '');
    if (value && value <= this.today) return { validityNotFuture: true };
    return value && start && value > start ? { invalidValidityDate: true } : null;
  };

  private readonly integerValidator = (control: AbstractControl): ValidationErrors | null =>
    Number.isInteger(Number(control.value)) ? null : { integerRequired: true };

  private addDays(value: string, days: number): string {
    const date = new Date(`${value}T00:00:00`);
    date.setDate(date.getDate() + days);
    return this.localDate(date);
  }

  private apiMessage(source: any, fallback: string): string {
    const payload = source?.error ?? source;
    const errors = Array.isArray(payload?.errors)
      ? payload.errors.filter((error: unknown) => typeof error === 'string' && error.trim())
      : [];
    return errors.length ? errors.join(' ') : payload?.message || fallback;
  }

  private showToast(icon: 'success' | 'error' | 'warning', message: string): void {
    void Swal.fire({
      toast: true,
      position: 'top-end',
      icon,
      iconColor: icon === 'success' ? '#00d492' : undefined,
      title: this.translate.instant(message),
      showConfirmButton: false,
      timer: icon === 'success' ? 2500 : 4500,
      timerProgressBar: true,
    });
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

  private readonly transferScheduleValidator = (control: AbstractControl): ValidationErrors | null => {
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
  };

  private readonly quotationDatesValidator = (control: AbstractControl): ValidationErrors | null => {
    const start = String(control.get('travelStartDate')?.value ?? '');
    const end = String(control.get('travelEndDate')?.value ?? '');
    const validUntil = String(control.get('validUntil')?.value ?? '');
    if (start && end && end <= start) return { invalidTravelDateRange: true };
    if (validUntil && validUntil <= this.today) return { invalidValidityPeriod: true };
    if (start && validUntil && validUntil > start) return { invalidValidityDate: true };
    return null;
  };
}
