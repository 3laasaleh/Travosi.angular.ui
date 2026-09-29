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
  DestroyRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
import { customerPdfDownloadName } from '../../../../shared/utils/pdf-download-name.util';

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
  images?: Array<{ data: string; contentType: string; sortOrder: number }>;
  imagesAtTop?: boolean;
}

@Component({
  selector: 'app-quotations-from-card',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, DecimalPipe, TranslatePipe, DatePicker, TimePicker],
  templateUrl: './quotations-from-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotationsFromCard implements OnInit, OnChanges {
  private readonly destroyRef = inject(DestroyRef);
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
  selectedRoomIds = new Set<number>();
  roomsByHotel = new Map<number, any[]>();
  roomsLoading = new Set<number>();
  roomsErrors = new Set<number>();
  images: Array<{ data: string; contentType: string; sortOrder: number }> = [];
  imagesAtTop = false;
  imagesLoading = false;
  selectedFlightIds = new Set<number>();
  isLoading = false;
  optionsLoading = false;
  optionsLoadError = false;
  validationSubmitted = false;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
  ) {
    this.quotationForm = this.createForm();
    this.quotationForm.controls.travelEndDate.updateValueAndValidity({ emitEvent: false });
    this.quotationForm.controls.validUntil.updateValueAndValidity({ emitEvent: false });
    this.quotationForm.controls.travelStartDate.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
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
    return this.money(this.buildQuotationItems().reduce((sum, item) => sum + item.totalPrice, 0));
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
      || this.selectedRoomIds.size > 0
      || this.selectedFlightIds.size > 0
      || this.transfersArray.length > 0;
  }

  get travelServicesInvalid(): boolean {
    return this.validationSubmitted && !this.optionsLoading && !this.hasTravelItems;
  }

  get tax(): number {
    const discountedSubtotal = Math.max(0, this.subTotal - this.quotationForm.controls.discount.value);
    return this.money(discountedSubtotal * this.quotationForm.controls.taxRate.value / 100);
  }

  get totalAmount(): number {
    return this.money(Math.max(0, this.subTotal - this.quotationForm.controls.discount.value) + this.tax);
  }

  get canSave(): boolean {
    return !this.isLoading
      && !this.optionsLoading
      && !this.imagesLoading
      && !this.hotelSelectionInvalid
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
    if (checked) {
      this.selectedHotelIds.add(id);
      this.loadHotelRooms(id);
    } else {
      this.selectedHotelIds.delete(id);
      this.hotelRooms(id).forEach(room => this.selectedRoomIds.delete(Number(room.id)));
    }
  }

  hotelRooms(id: number): any[] { return this.roomsByHotel.get(Number(id)) ?? []; }

  loadHotelRooms(id: number): void {
    if (this.roomsLoading.has(id) || this.roomsByHotel.has(id)) return;
    this.roomsLoading.add(id);
    this.roomsErrors.delete(id);
    this.apiService.get(`HotelRooms/ByHotel/${id}`).pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => { this.roomsLoading.delete(id); this.cdr.markForCheck(); }),
    ).subscribe({
      next: (response: any) => {
        if (response?.isSuccess === false) { this.roomsErrors.add(id); return; }
        this.roomsByHotel.set(id, this.rows(response, 'rooms'));
      },
      error: () => this.roomsErrors.add(id),
    });
  }

  toggleRoom(room: any, checked: boolean): void {
    if (checked) this.selectedRoomIds.add(Number(room.id));
    else this.selectedRoomIds.delete(Number(room.id));
  }

  get hotelSelectionInvalid(): boolean {
    return [...this.selectedHotelIds].some(id => this.roomsLoading.has(id) || this.roomsErrors.has(id)
      || !this.hotelRooms(id).some(room => this.selectedRoomIds.has(Number(room.id)))
      || this.hotelRooms(id).some(room => this.selectedRoomIds.has(Number(room.id)) && (room.isActive === false || this.roomRates(room) === null)));
  }

  // Group nights by rate, keeping each period's exact price instead of rounding an average.
  roomRates(room: any): Array<{ quantity: number; price: number }> | null {
    const start = this.quotationForm.controls.travelStartDate.value;
    const end = this.quotationForm.controls.travelEndDate.value;
    if (!start || !end || end <= start) return null;
    const saved = this.selectedQuotation;
    if (saved && saved.travelStartDate === start && saved.travelEndDate === end) {
      const lines = saved.items.filter(item => Number(item.hotelRoomId) === Number(room.id));
      if (lines.length) return lines.map(item => ({ quantity: Number(item.quantity), price: Number(item.pricePerItem ?? item.sellingPrice) }));
    }
    const periods = (room.roomPeriodPrices ?? []).filter((p: any) => p.isActive !== false);
    const rates = new Map<number, number>();
    for (let date = start, count = 0; date < end; date = this.addDays(date, 1), count++) {
      if (count >= 3660) return null;
      const period = periods.find((p: any) => String(p.startDate).slice(0, 10) <= date && String(p.endDate).slice(0, 10) >= date);
      const raw = period?.price ?? (!periods.length ? room.sellingPrice : null);
      if (raw == null || !Number.isFinite(Number(raw)) || Number(raw) < 0) return null;
      const price = this.money(Number(raw));
      rates.set(price, (rates.get(price) ?? 0) + 1);
    }
    return [...rates].map(([price, quantity]) => ({ price, quantity }));
  }

  roomTotal(room: any): number | null {
    const rates = this.roomRates(room);
    return rates ? this.money(rates.reduce((sum, rate) => sum + rate.quantity * rate.price, 0)) : null;
  }

  private money(value: number): number { return Math.round((value + Number.EPSILON) * 100) / 100; }

  async selectImages(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    input.value = '';
    if (!files.length || this.imagesLoading) return;
    if (this.images.length + files.length > 5) { this.showToast('warning', 'quotationImagesLimit'); return; }
    this.imagesLoading = true;
    try {
      const images = [];
      for (const file of files) {
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 10 * 1024 * 1024) throw new Error();
        const bitmap = await createImageBitmap(file);
        try {
          const scale = Math.min(1, 1200 / Math.max(bitmap.width, bitmap.height));
          const canvas = document.createElement('canvas');
          canvas.width = Math.max(1, Math.round(bitmap.width * scale));
          canvas.height = Math.max(1, Math.round(bitmap.height * scale));
          const context = canvas.getContext('2d');
          if (!context) throw new Error();
          context.fillStyle = '#ffffff';
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
          const data = canvas.toDataURL('image/jpeg', 0.82).split(',')[1];
          if (data.length > 2 * 1024 * 1024 * 4 / 3) throw new Error();
          images.push({ data, contentType: 'image/jpeg', sortOrder: 0 });
        } finally { bitmap.close(); }
      }
      if (!this.destroyRef.destroyed) this.images = [...this.images, ...images];
    } catch { this.showToast('error', 'quotationImageInvalid'); }
    finally { this.imagesLoading = false; this.cdr.markForCheck(); }
  }

  removeImage(index: number): void { this.images = this.images.filter((_, i) => i !== index); }

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

  infantPrice(item: any): number {
    return Number(item.pricePerInfant ?? 0);
  }

  catalogTotal(item: any): number {
    return this.packagePrice(item) * this.quotationForm.controls.adults.value
      + this.childPrice(item) * this.quotationForm.controls.children.value
      + this.infantPrice(item) * this.quotationForm.controls.infants.value;
  }

  flightAdultPrice(flight: any): number {
    return Number(flight?.pricePerPerson ?? flight?.price ?? 0);
  }

  flightChildPrice(flight: any): number {
    return Number(flight?.pricePerChild ?? 0);
  }

  flightInfantPrice(flight: any): number {
    return Number(flight?.pricePerInfant ?? 0);
  }

  flightTotal(flight: any): number {
    const form = this.quotationForm.controls;
    return this.flightAdultPrice(flight) * form.adults.value
      + this.flightChildPrice(flight) * form.children.value
      + this.flightInfantPrice(flight) * form.infants.value;
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
    return this.hotelRooms(hotel.id).filter(room => this.selectedRoomIds.has(Number(room.id)))
      .reduce((sum, room) => sum + (this.roomTotal(room) ?? 0), 0);
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
    const arabic = this.translate.getCurrentLang?.() === 'ar';
    return item?.name || (arabic ? item?.nameAr || item?.nameEng : item?.nameEng || item?.nameAr) || item?.title || '';
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
      const adultItem = this.savedCatalogItem(itemType, reference, item.id, 'adults');
      const childItem = this.savedCatalogItem(itemType, reference, item.id, 'children');
      const infantItem = this.savedCatalogItem(itemType, reference, item.id, 'infants');
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
      const infants = this.quotationForm.controls.infants.value;
      if (adults > 0) items.push({
        ...base,
        ...this.savedLineDetails(adultItem),
        description: adultItem?.description || `${base.description} - Adults`,
        quantity: adults,
        costPrice: Number(adultItem?.costPrice ?? base.costPrice),
        sellingPrice: Number(adultItem?.pricePerItem ?? adultItem?.sellingPrice ?? this.packagePrice(item)),
        sortOrder: base.sortOrder,
      });
      if (children > 0) items.push({
        ...base,
        ...this.savedLineDetails(childItem),
        description: childItem?.description || `${base.description} - Children`,
        quantity: children,
        costPrice: Number(childItem?.costPrice ?? base.costPrice),
        sellingPrice: Number(childItem?.pricePerItem ?? childItem?.sellingPrice ?? this.childPrice(item)),
        sortOrder: sortOrder++,
      });
      if (infants > 0) items.push({
        ...base,
        ...this.savedLineDetails(infantItem),
        description: infantItem?.description || `${base.description} - Infants`,
        quantity: infants,
        costPrice: Number(infantItem?.costPrice ?? base.costPrice),
        sellingPrice: Number(infantItem?.pricePerItem ?? infantItem?.sellingPrice ?? this.infantPrice(item)),
        sortOrder: sortOrder++,
      });
    };
    this.selectedPackages.forEach((item) => addCatalogItem(item, 1, 'packageId'));
    this.selectedTours.forEach((item) => addCatalogItem(item, 2, 'tourId'));
    this.selectedHotels.forEach((hotel) => {
      this.hotelRooms(hotel.id).filter(room => this.selectedRoomIds.has(Number(room.id))).forEach(room => {
        for (const rate of this.roomRates(room) ?? []) items.push({
          itemType: 3,
          hotelId: Number(hotel.id),
          hotelRoomId: Number(room.id),
          description: `${this.itemName(hotel)} - ${this.itemName(room)}`,
          quantity: rate.quantity,
          sellingPrice: rate.price,
          sortOrder: sortOrder++,
          serviceStartDate: this.quotationForm.controls.travelStartDate.value,
          serviceEndDate: this.quotationForm.controls.travelEndDate.value,
          roomType: room.roomTypeName ?? this.itemName(room),
          numberOfRooms: 1,
          mealPlan: room.mealPlanName ?? null,
        });
      });
    });
    this.selectedFlights.forEach((flight) => {
      const addFlightLine = (audience: 'adults' | 'children' | 'infants', quantity: number, price: number) => {
        const savedItem = this.savedCatalogItem(4, 'flightId', flight.id, audience);
        if (quantity <= 0) return;
        items.push({
          ...this.flightLineDetails(flight),
          ...this.savedLineDetails(savedItem),
          itemType: 4,
          description: savedItem?.description || `${this.flightName(flight)} - ${audience[0].toUpperCase()}${audience.slice(1)}`,
          quantity,
          costPrice: Number(savedItem?.costPrice ?? flight.costPrice ?? flight.cost ?? 0),
          sellingPrice: Number(savedItem?.pricePerItem ?? savedItem?.sellingPrice ?? price),
          discount: Number(savedItem?.discount ?? 0),
          sortOrder: sortOrder++,
          flightId: Number(flight.id),
        });
      };
      const form = this.quotationForm.controls;
      addFlightLine('adults', form.adults.value, this.flightAdultPrice(flight));
      addFlightLine('children', form.children.value, this.flightChildPrice(flight));
      addFlightLine('infants', form.infants.value, this.flightInfantPrice(flight));
    });
    this.transfersArray.getRawValue().forEach((transfer: any) => {
      const from = String(transfer.from ?? '').trim();
      const to = String(transfer.to ?? '').trim();
      const savedItem = this.savedItemById(transfer.id);
      items.push({
        ...this.savedLineDetails(savedItem),
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
    return items.map((item) => {
      const quantity = Math.max(1, Number(item.quantity) || 1);
      const sellingPrice = Number(item.sellingPrice);
      const pricePerItem = Number.isFinite(sellingPrice) ? sellingPrice : 0;
      const transfer = item.itemType === 5 ? {
        from: item.from,
        to: item.to,
        transferDate: item.transferDate,
        fromTime: item.fromTime,
        arrivalTime: item.arrivalTime,
        price: pricePerItem,
        isQuoteIncludePrice: true,
      } : undefined;

      return {
        ...item,
        quantity,
        pricePerItem,
        totalPrice: this.money(pricePerItem * quantity),
        ...(transfer ? { quotationTransfer: transfer } : {}),
      };
    });
  }

  private savedCatalogItem(itemType: number, reference: 'packageId' | 'tourId' | 'hotelId' | 'flightId', id: number, audience?: 'adults' | 'children' | 'infants'): any | undefined {
    const candidates = (this.selectedQuotation?.items ?? []).filter((item: any) =>
      this.itemTypeNumber(item) === itemType && Number(item?.[reference]) === Number(id));
    if (!audience) return candidates[0];

    const marker = audience === 'adults'
      ? /\badult(s)?\b/i
      : audience === 'children' ? /\bchild(ren)?\b/i : /\binfant(s)?\b/i;
    return candidates.find((item: any) => marker.test(String(item?.description ?? '')))
      ?? (audience === 'adults' ? candidates[0] : undefined);
  }

  private savedItemById(id: unknown): any | undefined {
    const itemId = Number(id);
    return itemId > 0 ? (this.selectedQuotation?.items ?? []).find((item: any) => Number(item?.id) === itemId) : undefined;
  }

  private savedLineDetails(item: any): Record<string, unknown> {
    if (!item) return {};
    const fields = [
      'returnFlightId', 'isRoundTrip', 'bookingStatus', 'baggageAllowance', 'departureTerminal', 'arrivalTerminal', 'fareConditions',
      'roomType', 'numberOfRooms', 'occupancy', 'bedType', 'mealPlan', 'chargesNotIncluded', 'vehicleType', 'passengerCapacity',
      'baggageCapacity', 'meetingInstructions', 'contactInformation',
    ];
    return fields.reduce((details: Record<string, unknown>, field) => {
      if (item[field] !== undefined) details[field] = item[field];
      return details;
    }, {});
  }

  private flightLineDetails(flight: any): Record<string, unknown> {
    const legs = Array.isArray(flight?.legs) ? flight.legs : [];
    const segments = legs.flatMap((leg: any) => Array.isArray(leg?.segments) ? leg.segments : []);
    const firstSegment = segments[0] ?? {};
    const lastSegment = segments[segments.length - 1] ?? firstSegment;
    const baggageKg = Number(flight?.baggageAllowanceKg);
    const tripType = String(flight?.flightType ?? flight?.tripType ?? '').toLowerCase();
    return {
      returnFlightId: Number(flight?.returnFlightId) || null,
      isRoundTrip: flight?.isRoundTrip === true || tripType === 'roundtrip' || tripType === 'round-trip',
      bookingStatus: flight?.bookingStatus ?? null,
      baggageAllowance: flight?.baggageAllowance ?? (Number.isFinite(baggageKg) && baggageKg >= 0 ? `${baggageKg} kg checked baggage` : null),
      departureTerminal: firstSegment?.departureTerminal ?? flight?.departureTerminal ?? null,
      arrivalTerminal: lastSegment?.arrivalTerminal ?? flight?.arrivalTerminal ?? null,
      fareConditions: flight?.fareConditions ?? null,
      serviceStartDate: firstSegment?.departureLocal ?? flight?.departureTime ?? null,
      serviceEndDate: lastSegment?.arrivalLocal ?? flight?.arrivalTime ?? null,
    };
  }

  private itemTypeNumber(item: any): number {
    const raw = item?.itemType;
    if (typeof raw === 'number') return raw;
    const types: Record<string, number> = { package: 1, tour: 2, hotel: 3, flight: 4, transfer: 5 };
    return types[String(raw ?? item?.itemTypeName ?? '').toLowerCase()] ?? Number(raw);
  }

  saveQuotation(download = false): void {
    if (this.isLoading || this.imagesLoading || this.optionsLoading) return;
    this.validationSubmitted = true;
    this.quotationForm.updateValueAndValidity();
    if (this.hotelSelectionInvalid) {
      this.showToast('warning', 'quotationSelectRooms');
      return;
    }
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
      imagesAtTop: this.imagesAtTop,
      images: this.images.map((image, sortOrder) => ({ ...image, sortOrder })),
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
      if (download && response?.data?.id) this.downloadSavedPdf(response.data);
      this.resetForm(false);
      this.quotationSaved.emit();
    });
  }

  cancelEdit(): void {
    this.resetForm(true);
  }

  private downloadSavedPdf(quote: any): void {
    // Keep the request alive when the parent closes this form after saving.
    this.apiService.getFile(`Quotations/${quote.id}/Pdf`).subscribe({
      next: (blob: Blob) => {
        if (!blob.size || !blob.type.includes('pdf')) { this.showToast('error', 'quotationPdfError'); return; }
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = customerPdfDownloadName(quote.customerName, quote.quotationNo);
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      },
      error: () => this.showToast('error', 'quotationPdfError'),
    });
  }

  private loadOptions(): void {
    this.optionsLoading = true;
    this.optionsLoadError = false;
    forkJoin({
      customers: this.apiService.get('Customers?page=1&pageSize=100').pipe(catchError(() => { this.optionsLoadError = true; return of([]); })),
      packages: this.apiService.get('Packages?page=1&pageSize=100').pipe(catchError(() => { this.optionsLoadError = true; return of([]); })),
      tours: this.apiService.get('Tours/GetAll?page=1&pageSize=100').pipe(catchError(() => { this.optionsLoadError = true; return of([]); })),
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
    this.validationSubmitted = false;
    this.images = [...(quotation.images ?? [])];
    this.imagesAtTop = quotation.imagesAtTop ?? false;
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
    this.selectedRoomIds = new Set((items ?? []).filter(item => item.hotelRoomId).map(item => Number(item.hotelRoomId)));
    this.selectedHotelIds.forEach(id => this.loadHotelRooms(id));
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
    this.validationSubmitted = false;
    this.selectedPackageIds.clear();
    this.selectedTourIds.clear();
    this.selectedHotelIds.clear();
    this.selectedRoomIds.clear();
    this.images = [];
    this.imagesAtTop = false;
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
        validators: [Validators.required, this.validDateValidator],
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
