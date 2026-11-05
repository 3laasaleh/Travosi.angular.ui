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
import { RichTextContent } from '../../../../shared/components/rich-text-content/rich-text-content';
import { customerPdfDownloadName } from '../../../../shared/utils/pdf-download-name.util';
import { CurrencyService } from '../../../../core/services/currency.service';

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
  adminFees?: number | null;
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

type QuotationAudience = 'adults' | 'children' | 'infants';
type QuotationPriceSet = Record<QuotationAudience, number> & { currencyId: number };
type QuotationCatalogType = 'package' | 'tour' | 'hotel' | 'room' | 'destination';

interface QuotationDetailField {
  key: string;
  label: string;
  value: string;
  richText?: boolean;
}

@Component({
  selector: 'app-quotations-from-card',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, DecimalPipe, TranslatePipe, DatePicker, TimePicker, RichTextContent],
  templateUrl: './quotations-from-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotationsFromCard implements OnInit, OnChanges {
  private readonly destroyRef = inject(DestroyRef);
  private readonly currencyService = inject(CurrencyService);
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
  destinations: any[] = [];
  cities: any[] = [];
  citiesLoading = false;
  readonly destinationFilter = new FormControl<number | null>(null);
  readonly cityFilter = new FormControl<number | null>({ value: null, disabled: true });
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
  private readonly quotationPrices = new Map<string, QuotationPriceSet>();
  isLoading = false;
  optionsLoading = false;
  optionsLoadError = false;
  validationSubmitted = false;
  detailItem: any | null = null;
  detailParent: any | null = null;
  detailType: QuotationCatalogType | null = null;
  detailFields: QuotationDetailField[] = [];
  detailImages: string[] = [];

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
    this.currencyService.loadExchangeRate().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.cdr.markForCheck());
  }

  formatPrice(value: unknown): string { return this.currencyService.formatDocumentPrice(value, this.quotationForm.controls.currencyId.value); }

  openCatalogDetails(type: QuotationCatalogType, item: any, parent: any | null = null): void {
    this.detailType = type;
    this.detailItem = item;
    this.detailParent = parent;
    this.detailFields = this.catalogDetailFields(type, item);
    this.detailImages = this.catalogImages(item);
  }

  closeCatalogDetails(): void {
    this.detailItem = null;
    this.detailParent = null;
    this.detailType = null;
    this.detailFields = [];
    this.detailImages = [];
  }

  detailTitle(): string {
    return this.itemName(this.detailItem);
  }

  detailTypeLabel(): string {
    if (!this.detailType) return 'viewDetails';
    const type = this.detailType[0].toUpperCase() + this.detailType.slice(1);
    return `quotation${type}Details`;
  }

  detailFieldLabel(key: string): string {
    const translated = this.translate.instant(key);
    if (translated !== key) return translated;
    return key.split('.').map(part => part
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replace(/[_-]+/g, ' ')
      .replace(/\b\w/g, character => character.toUpperCase())).join(' / ');
  }

  private catalogDetailFields(type: QuotationCatalogType, item: any): QuotationDetailField[] {
    const fields: QuotationDetailField[] = [];
    const add = (labelKey: string, value: unknown, richText = false): void => {
      if (value === null || value === undefined || value === '') return;
      fields.push({
        key: `${labelKey}-${fields.length}`,
        label: this.detailFieldLabel(labelKey),
        richText,
        value: typeof value === 'boolean'
          ? this.translate.instant(value ? 'yes' : 'no')
          : String(value),
      });
    };

    add('nameEnglish', item?.nameEng ?? item?.name);
    add('nameArabic', item?.nameAr);
    add('englishDescription', item?.fullDescriptionEng ?? item?.descriptionEng ?? item?.description, true);
    add('arabicDescription', item?.fullDescriptionAr ?? item?.descriptionAr, true);

    if (type === 'package' || type === 'tour') {
      const duration = this.durationText(item);
      add('duration', duration);
      add('destination', this.destinationText(item));
      add('dateFrom', item?.dateFrom ?? item?.startDate);
      add('dateTo', item?.dateTo ?? item?.endDate);
      add(type === 'package' ? 'maxCapacity' : 'maxSeats', item?.maxCapacity ?? item?.maxSeats);
      add('pricePerPerson', this.formatPrice(this.packagePrice(item)));
      add('pricePerChild', this.formatPrice(this.childPrice(item)));
      add('pricePerInfant', this.formatPrice(this.infantPrice(item)));
      add('freeCancellation', item?.isFreeCancelation);
      add('highlights', this.localizedList(item?.highlights));
      add('includes', this.localizedList(item?.includes));
      add('excludes', this.localizedList(item?.excludes));
      add('cancellationPolicies', this.localizedList(item?.cancellationPolicies));
      add('itinerary', this.itineraryText(item?.itinerary ?? item?.itineraries));
      if (type === 'package') add('transportations', this.transportationText(item?.transportations));
    } else if (type === 'hotel') {
      add('starRating', item?.starRating);
      add('destination', this.destinationText(item));
      add('address', item?.addressEng ?? item?.address);
      add('addressArabic', item?.addressAr);
      add('distanceFromDowntown', item?.distanceFromDowntownKm);
      add('phone', item?.phoneNumber ?? item?.phone);
      add('email', item?.email);
      add('website', item?.website);
      add('googleMapsUrl', item?.googleMapsUrl);
      add('freeAirportTaxi', item?.hasFreeAirportTaxi);
      add('freeCancellation', item?.isFreeCancelation);
      add('hotelFacilities', this.namedList(item?.amenities ?? item?.facilities));
      add('cancellationPolicies', this.localizedList(
        item?.cancellationPolicies ?? this.hotelPolicies(item),
      ));
    } else if (type === 'destination') {
      add('shortDescriptionEnglish', item?.subDescriptionEng ?? item?.subDescription, true);
      add('shortDescriptionArabic', item?.subDescriptionAr, true);
      add('metaTitleEnglish', item?.metaTitleEng);
      add('metaTitleArabic', item?.metaTitleAr);
    } else {
      add('roomType', this.roomTypeName(item));
      add('mealPlan', this.namedValue(item?.mealPlanName ?? item?.mealPlanDetails ?? item?.mealPlan));
      add('roomSize', item?.roomSize == null ? null : `${item.roomSize} m²`);
      add('bedTypeEnglish', item?.bedTypeEng ?? item?.bedType);
      add('bedTypeArabic', item?.bedTypeAr);
      add('bedSize', item?.bedSize);
      add('availableRoomsCount', item?.avilableRoomsCount ?? item?.availableRoomsCount);
      add('adults', item?.maxAdults);
      add('children', item?.maxChildren);
      add('infants', item?.maxInfants);
      add('maxTotalOccupancy', item?.maxTotalOccupancy);
      add('hasBalcony', item?.hasBalcony);
      add('smokingAllowed', item?.smokingAllowed);
      add('roomFacilities', this.namedList(item?.amenities ?? item?.facilities));
      add('childrenPolicies', this.localizedList(item?.childrenPolicies));
      add('roomRates', this.roomRateText(item));
      const total = this.roomTotal(item);
      if (total !== null) add('totalPrice', this.formatPrice(total));
    }

    return fields;
  }

  private durationText(item: any): string | null {
    const days = Number(item?.durationDays ?? item?.duration ?? 0);
    const hours = Number(item?.durationHours ?? 0);
    const parts: string[] = [];
    if (days) parts.push(`${days} ${this.translate.instant('days')}`);
    if (hours) parts.push(`${hours} ${this.translate.instant('hours')}`);
    return parts.length ? parts.join(' ') : null;
  }

  private destinationText(item: any): string | null {
    const destinations = Array.isArray(item?.destinations) ? item.destinations : [];
    const names = destinations.map((destination: any) => this.namedValue(
      destination?.destination ?? destination?.destinationName ?? destination,
    )).filter(Boolean);
    const destination = this.namedValue(item?.destination);
    if (destination) names.push(destination);
    if (item?.destinationName && !names.includes(String(item.destinationName))) names.push(String(item.destinationName));
    return names.length ? [...new Set(names)].join(', ') : null;
  }

  private namedValue(value: any): string | null {
    if (typeof value === 'string') return value || null;
    if (!value || typeof value !== 'object') return null;
    const localized = this.translate.getCurrentLang?.() === 'ar'
      ? value.nameAr ?? value.nameEng ?? value.name ?? value.title
      : value.nameEng ?? value.nameAr ?? value.name ?? value.title;
    return typeof localized === 'string' ? localized : null;
  }

  private namedList(value: any): string | null {
    if (!Array.isArray(value)) return null;
    const names = value.map(item => this.namedValue(item)).filter(Boolean);
    return names.length ? [...new Set(names)].join(', ') : null;
  }

  private localizedList(value: any): string | null {
    if (!Array.isArray(value)) return typeof value === 'string' ? value : null;
    const entries = value.map((item: any) => {
      if (typeof item === 'string') return item;
      if (!item || typeof item !== 'object') return '';
      const english = item.valueEng ?? item.nameEng ?? item.value ?? item.name ?? '';
      const arabic = item.valueAr ?? item.nameAr ?? '';
      return [english, arabic].filter(Boolean).filter((entry, index, list) => list.indexOf(entry) === index).join(' / ');
    }).filter(Boolean);
    return entries.length ? entries.join('\n') : null;
  }

  private itineraryText(value: any): string | null {
    if (!Array.isArray(value)) return null;
    const lines: string[] = [];
    const addItems = (items: any[], depth: number): void => {
      items.forEach(item => {
        const title = [item?.nameEng ?? item?.title, item?.nameAr]
          .filter(Boolean).filter((entry, index, list) => list.indexOf(entry) === index).join(' / ');
        const description = [item?.valueEng ?? item?.value, item?.valueAr]
          .filter(Boolean).filter((entry, index, list) => list.indexOf(entry) === index).join(' / ');
        const notes = [item?.notesEng, item?.notesAr]
          .filter(Boolean).filter((entry, index, list) => list.indexOf(entry) === index).join(' / ');
        const timing = [item?.arrivalDate, item?.startTime, item?.endTime].filter(Boolean).join(' · ');
        const content = [title, description, notes, timing].filter(Boolean).join(' — ');
        if (content) lines.push(`${'  '.repeat(depth)}• ${content}`);
        const children = item?.childs ?? item?.children ?? item?.childItineraries;
        if (Array.isArray(children)) addItems(children, depth + 1);
      });
    };
    addItems(value, 0);
    return lines.length ? lines.join('\n') : null;
  }

  private transportationText(value: any): string | null {
    if (!Array.isArray(value)) return null;
    const lines = value.map((item: any) => {
      const from = item?.fromEng ?? item?.fromAr ?? item?.from ?? '';
      const to = item?.toEng ?? item?.toAr ?? item?.to ?? '';
      const type = item?.transportationTypeEng ?? item?.transportationTypeAr ?? item?.transportationType ?? '';
      const timing = [item?.fromTime, item?.arrivalTime].filter(Boolean).join(' – ');
      const baggage = item?.numberOfBags ? `${item.numberOfBags} × ${item.maxKgPerBag ?? 0} kg` : '';
      return [type, [from, to].filter(Boolean).join(' → '), timing, baggage].filter(Boolean).join(' · ');
    }).filter(Boolean);
    return lines.length ? lines.join('\n') : null;
  }

  private hotelPolicies(hotel: any): any[] {
    const english = String(hotel?.cancellationPolicyEng ?? hotel?.policiesEng ?? '').split(';');
    const arabic = String(hotel?.cancellationPolicyAr ?? hotel?.policiesAr ?? '').split(';');
    return english.map((value, index) => ({
      valueEng: value.trim(),
      valueAr: arabic[index]?.trim() ?? '',
    })).filter(policy => policy.valueEng || policy.valueAr);
  }

  private roomTypeName(room: any): string | null {
    const roomType = room?.roomTypeName ?? room?.roomType?.nameEng ?? room?.roomType?.nameAr;
    if (typeof roomType === 'string' && roomType) return roomType;
    const typeLabels = ['', 'singleRoom', 'doubleRoom', 'twinRoom', 'tripleRoom', 'familyRoom', 'suiteRoom', 'juniorSuiteRoom', 'deluxeRoom'];
    const index = Number(room?.roomType);
    return Number.isInteger(index) && index > 0 && index < typeLabels.length
      ? this.translate.instant(typeLabels[index])
      : null;
  }

  private roomRateText(room: any): string | null {
    const rates = this.roomRates(room);
    if (rates?.length) {
      return rates.map(rate => `${rate.quantity} ${this.translate.instant('nights')}: ${this.formatPrice(rate.price)}`).join('\n');
    }
    const periods = (room?.roomPeriodPrices ?? []).filter((period: any) => period?.isActive !== false);
    const entries = periods.map((period: any) => {
      const start = period?.startDate ? String(period.startDate).slice(0, 10) : '';
      const end = period?.endDate ? String(period.endDate).slice(0, 10) : '';
      return [start && end ? `${start} – ${end}` : start || end, period?.price == null ? '' : this.formatPrice(this.quotedPrice(period.price, room?.currencyId ?? 2))]
        .filter(Boolean).join(': ');
    }).filter(Boolean);
    return entries.length ? entries.join('\n') : null;
  }

  private catalogImages(item: any): string[] {
    const images = Array.isArray(item?.images) ? item.images : [];
    const urls: string[] = [];
    images.forEach((image: any) => {
      const url = typeof image === 'string' ? image : image?.imageUrl ?? image?.url ?? image?.path;
      if (typeof url === 'string' && url) urls.push(url);
    });
    const cover = item?.coverImageUrl ?? item?.imageUrl;
    if (typeof cover === 'string' && cover) urls.unshift(cover);
    return [...new Set(urls)].map(url => this.catalogImageUrl(url));
  }

  private catalogImageUrl(url: string): string {
    if (/^(blob:|data:|https?:\/\/)/i.test(url)) return url;
    return `${environment.imageUrl.replace(/\/+$/, '')}/${url.replace(/^\/+/, '').replace(/^images\//i, '')}`;
  }

  private quotedPrice(value: unknown, source: unknown = 2): number {
    return this.currencyService.convertForDocument(value, source, this.quotationForm.controls.currencyId.value) ?? Number.NaN;
  }

  get currencyConversionUnavailable(): boolean {
    const sources = [...this.selectedPackages, ...this.selectedTours, ...this.selectedHotels, ...this.selectedFlights].map(item => item.currencyId ?? 2);
    if (this.selectedQuotation) sources.push(this.selectedQuotation.currencyId);
    return sources.some(source => !Number.isFinite(this.quotedPrice(1, source)));
  }

  retryCurrencyRate(): void {
    this.currencyService.loadExchangeRate(true).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.cdr.markForCheck());
  }

  private savedPrice(item: any, fallback: number): number {
    const value = item?.pricePerItem ?? item?.sellingPrice;
    return value == null ? fallback : this.quotedPrice(value, this.selectedQuotation?.currencyId ?? 2);
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
    return this.money(Math.max(0, this.subTotal - this.quotationForm.controls.discount.value) + this.tax + this.adminFees);
  }

  get adminFees(): number { return Number(this.quotationForm.controls.adminFees.value ?? 0); }

  get filteredPackages(): any[] {
    return this.filterCatalog(this.packages, this.selectedPackageIds, item => this.packageMatchesFilters(item));
  }

  get filteredTours(): any[] {
    return this.filterCatalog(this.tours, this.selectedTourIds, item => this.entityMatchesFilters(item));
  }

  get filteredHotels(): any[] {
    return this.filterCatalog(this.hotels, this.selectedHotelIds, item => this.entityMatchesFilters(item));
  }

  get filteredFlights(): any[] {
    return this.filterCatalog(this.flights, this.selectedFlightIds, item => this.flightMatchesFilters(item));
  }

  get selectedDestinationForDetails(): any | null {
    const destinationId = Number(this.destinationFilter.value);
    if (!Number.isInteger(destinationId) || destinationId <= 0) return null;
    return this.destinations.find(destination => Number(destination.id ?? destination.destinationId) === destinationId) ?? null;
  }

  onDestinationFilterChange(value: unknown): void {
    const destinationId = Number(value);
    this.cityFilter.reset(null, { emitEvent: false });
    this.cities = [];
    if (!Number.isInteger(destinationId) || destinationId <= 0) {
      this.destinationFilter.setValue(null, { emitEvent: false });
      this.cityFilter.disable({ emitEvent: false });
      return;
    }

    this.destinationFilter.setValue(destinationId, { emitEvent: false });
    this.cityFilter.disable({ emitEvent: false });
    this.citiesLoading = true;
    this.apiService.get(`Cities/GetAll?destinationId=${destinationId}&page=1&pageSize=500`).pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => {
        if (Number(this.destinationFilter.value) === destinationId) this.citiesLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe({
      next: (response: any) => {
        if (Number(this.destinationFilter.value) !== destinationId) return;
        this.cities = this.rows(response, 'cities');
        this.cityFilter.enable({ emitEvent: false });
      },
      error: () => {
        if (Number(this.destinationFilter.value) !== destinationId) return;
        this.cityFilter.enable({ emitEvent: false });
        this.showToast('error', 'citiesLoadError');
      },
    });
  }

  clearCatalogFilters(): void {
    this.destinationFilter.setValue(null, { emitEvent: false });
    this.cityFilter.reset(null, { emitEvent: false });
    this.cityFilter.disable({ emitEvent: false });
    this.cities = [];
    this.citiesLoading = false;
  }

  get canSave(): boolean {
    return !this.isLoading
      && !this.optionsLoading
      && !this.imagesLoading
      && !this.hotelSelectionInvalid
      && this.pricesValid
      && !this.currencyConversionUnavailable
      && !this.missingSelections
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
      if (lines.length) return lines.map(item => ({ quantity: Number(item.quantity), price: this.quotedPrice(item.pricePerItem ?? item.sellingPrice, saved.currencyId) }));
    }
    const periods = (room.roomPeriodPrices ?? []).filter((p: any) => p.isActive !== false);
    const rates = new Map<number, number>();
    for (let date = start, count = 0; date < end; date = this.addDays(date, 1), count++) {
      if (count >= 3660) return null;
      const period = periods.find((p: any) => String(p.startDate).slice(0, 10) <= date && String(p.endDate).slice(0, 10) >= date);
      const raw = period?.price ?? (!periods.length ? room.sellingPrice : null);
      if (raw == null || !Number.isFinite(Number(raw)) || Number(raw) < 0) return null;
      const price = this.quotedPrice(raw, room.currencyId ?? 2);
      if (!Number.isFinite(price)) return null;
      rates.set(price, (rates.get(price) ?? 0) + 1);
    }
    return [...rates].map(([price, quantity]) => ({ price, quantity }));
  }

  roomTotal(room: any): number | null {
    const rates = this.roomRates(room);
    return rates ? this.money(rates.reduce((sum, rate) => sum + rate.quantity * rate.price, 0)) : null;
  }

  private money(value: number): number { return Math.round((value + Number.EPSILON) * 100) / 100; }

  get pricesValid(): boolean { return this.buildQuotationItems().every(item => Number.isFinite(item.pricePerItem) && item.pricePerItem >= 0); }

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
    return this.quotedPrice(pkg.pricePerPerson ?? pkg.price ?? pkg.totalAmount ?? 0, pkg.currencyId ?? 2);
  }

  childPrice(item: any): number {
    return this.quotedPrice(item.pricePerChild ?? 0, item.currencyId ?? 2);
  }

  infantPrice(item: any): number {
    return this.quotedPrice(item.pricePerInfant ?? 0, item.currencyId ?? 2);
  }

  catalogTotal(itemType: 1 | 2, item: any): number {
    return this.quotationServiceTotal(itemType, item);
  }

  flightAdultPrice(flight: any): number {
    return this.quotedPrice(flight?.pricePerPerson ?? flight?.price ?? 0, flight?.currencyId ?? 2);
  }

  flightChildPrice(flight: any): number {
    return this.quotedPrice(flight?.pricePerChild ?? 0, flight?.currencyId ?? 2);
  }

  flightInfantPrice(flight: any): number {
    return this.quotedPrice(flight?.pricePerInfant ?? 0, flight?.currencyId ?? 2);
  }

  flightTotal(flight: any): number {
    return this.quotationServiceTotal(4, flight);
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
      .reduce((sum, room) => sum + this.quotationServiceTotal(3, room), 0);
  }

  quotationPrice(itemType: number, item: any, audience: QuotationAudience): number {
    const override = this.currentPriceSet(itemType, item);
    if (override) return override[audience];

    const saved = this.savedAudienceItem(itemType, item, audience);
    if (saved) return this.savedPrice(saved, 0);

    if (itemType === 3) {
      if (audience !== 'adults') return 0;
      return this.money((this.roomTotal(item) ?? 0) / Math.max(1, Number(this.quotationForm.controls.adults.value) || 1));
    }
    if (itemType === 4) {
      return audience === 'adults' ? this.flightAdultPrice(item)
        : audience === 'children' ? this.flightChildPrice(item) : this.flightInfantPrice(item);
    }
    return audience === 'adults' ? this.packagePrice(item)
      : audience === 'children' ? this.childPrice(item) : this.infantPrice(item);
  }

  setQuotationPrice(itemType: number, item: any, audience: QuotationAudience, rawValue: unknown): void {
    const current = this.priceSet(itemType, item);
    const text = String(rawValue ?? '').trim();
    current[audience] = text === '' ? Number.NaN : Number(text);
    this.quotationPrices.set(this.priceKey(itemType, item), current);
  }

  quotationPriceInvalid(itemType: number, item: any, audience: QuotationAudience): boolean {
    const value = this.quotationPrice(itemType, item, audience);
    return !Number.isFinite(value) || value < 0;
  }

  quotationServiceTotal(itemType: number, item: any): number {
    const form = this.quotationForm.controls;
    return this.money(
      this.quotationPrice(itemType, item, 'adults') * Number(form.adults.value)
      + this.quotationPrice(itemType, item, 'children') * Number(form.children.value)
      + this.quotationPrice(itemType, item, 'infants') * Number(form.infants.value),
    );
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
        sellingPrice: this.quotationPrice(itemType, item, 'adults'),
        travelerType: 1,
        sortOrder: base.sortOrder,
      });
      if (children > 0) items.push({
        ...base,
        ...this.savedLineDetails(childItem),
        description: childItem?.description || `${base.description} - Children`,
        quantity: children,
        costPrice: Number(childItem?.costPrice ?? base.costPrice),
        sellingPrice: this.quotationPrice(itemType, item, 'children'),
        travelerType: 2,
        sortOrder: sortOrder++,
      });
      if (infants > 0) items.push({
        ...base,
        ...this.savedLineDetails(infantItem),
        description: infantItem?.description || `${base.description} - Infants`,
        quantity: infants,
        costPrice: Number(infantItem?.costPrice ?? base.costPrice),
        sellingPrice: this.quotationPrice(itemType, item, 'infants'),
        travelerType: 3,
        sortOrder: sortOrder++,
      });
    };
    this.selectedPackages.forEach((item) => addCatalogItem(item, 1, 'packageId'));
    this.selectedTours.forEach((item) => addCatalogItem(item, 2, 'tourId'));
    this.selectedHotels.forEach((hotel) => {
      this.hotelRooms(hotel.id).filter(room => this.selectedRoomIds.has(Number(room.id))).forEach(room => {
        if (!this.usesHotelPassengerPrices(room)) {
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
          return;
        }
        const addHotelLine = (audience: QuotationAudience, quantity: number, travelerType: number) => {
          if (quantity <= 0) return;
          const savedItem = this.savedAudienceItem(3, room, audience);
          items.push({
            ...this.savedLineDetails(savedItem),
            itemType: 3,
            hotelId: Number(hotel.id),
            hotelRoomId: Number(room.id),
            description: savedItem?.description || `${this.itemName(hotel)} - ${this.itemName(room)} - ${audience[0].toUpperCase()}${audience.slice(1)}`,
            quantity,
            sellingPrice: this.quotationPrice(3, room, audience),
            travelerType,
            sortOrder: sortOrder++,
            serviceStartDate: this.quotationForm.controls.travelStartDate.value,
            serviceEndDate: this.quotationForm.controls.travelEndDate.value,
            roomType: room.roomTypeName ?? this.itemName(room),
            numberOfRooms: 1,
            mealPlan: room.mealPlanName ?? null,
          });
        };
        const form = this.quotationForm.controls;
        addHotelLine('adults', Number(form.adults.value), 1);
        addHotelLine('children', Number(form.children.value), 2);
        addHotelLine('infants', Number(form.infants.value), 3);
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
          sellingPrice: price,
          travelerType: audience === 'adults' ? 1 : audience === 'children' ? 2 : 3,
          discount: Number(savedItem?.discount ?? 0),
          sortOrder: sortOrder++,
          flightId: Number(flight.id),
        });
      };
      const form = this.quotationForm.controls;
      addFlightLine('adults', form.adults.value, this.quotationPrice(4, flight, 'adults'));
      addFlightLine('children', form.children.value, this.quotationPrice(4, flight, 'children'));
      addFlightLine('infants', form.infants.value, this.quotationPrice(4, flight, 'infants'));
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
        sellingPrice: Number(transfer.price ?? 0),
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
      const pricePerItem = sellingPrice;
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

    const travelerType = audience === 'adults' ? 1 : audience === 'children' ? 2 : 3;
    const typed = candidates.find((item: any) => Number(item?.travelerType) === travelerType);
    if (typed) return typed;
    const marker = audience === 'adults'
      ? /\badult(s)?\b/i
      : audience === 'children' ? /\bchild(ren)?\b/i : /\binfant(s)?\b/i;
    return candidates.find((item: any) => marker.test(String(item?.description ?? '')))
      ?? (audience === 'adults' ? candidates[0] : undefined);
  }

  private savedAudienceItem(itemType: number, item: any, audience: QuotationAudience): any | undefined {
    if (itemType === 1) return this.savedCatalogItem(1, 'packageId', item.id, audience);
    if (itemType === 2) return this.savedCatalogItem(2, 'tourId', item.id, audience);
    if (itemType === 4) return this.savedCatalogItem(4, 'flightId', item.id, audience);

    const candidates = (this.selectedQuotation?.items ?? []).filter((line: any) =>
      this.itemTypeNumber(line) === 3 && Number(line?.hotelRoomId) === Number(item?.id));
    const travelerType = audience === 'adults' ? 1 : audience === 'children' ? 2 : 3;
    const typed = candidates.find((line: any) => Number(line?.travelerType) === travelerType);
    if (typed) return typed;
    const marker = audience === 'adults' ? /\badult(s)?\b/i
      : audience === 'children' ? /\bchild(ren)?\b/i : /\binfant(s)?\b/i;
    return candidates.find((line: any) => marker.test(String(line?.description ?? '')));
  }

  private usesHotelPassengerPrices(room: any): boolean {
    if (this.quotationPrices.has(this.priceKey(3, room))) return true;
    return (this.selectedQuotation?.items ?? []).some((line: any) =>
      this.itemTypeNumber(line) === 3
      && Number(line?.hotelRoomId) === Number(room?.id)
      && (line?.travelerType != null || /\b(adult(s)?|child(ren)?|infant(s)?)\b/i.test(String(line?.description ?? ''))));
  }

  private priceKey(itemType: number, item: any): string { return `${itemType}:${Number(item?.id)}`; }

  private currentPriceSet(itemType: number, item: any): QuotationPriceSet | undefined {
    const key = this.priceKey(itemType, item);
    const prices = this.quotationPrices.get(key);
    if (!prices) return undefined;
    const currencyId = Number(this.quotationForm.controls.currencyId.value);
    if (prices.currencyId === currencyId) return prices;
    const convert = (value: number) => this.currencyService.convertForDocument(value, prices.currencyId, currencyId) ?? Number.NaN;
    const converted: QuotationPriceSet = {
      adults: convert(prices.adults),
      children: convert(prices.children),
      infants: convert(prices.infants),
      currencyId,
    };
    this.quotationPrices.set(key, converted);
    return converted;
  }

  private priceSet(itemType: number, item: any): QuotationPriceSet {
    return this.currentPriceSet(itemType, item) ?? {
      adults: this.quotationPrice(itemType, item, 'adults'),
      children: this.quotationPrice(itemType, item, 'children'),
      infants: this.quotationPrice(itemType, item, 'infants'),
      currencyId: Number(this.quotationForm.controls.currencyId.value),
    };
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
    if (this.missingSelections) {
      this.showToast('error', 'quotationOptionsLoadError');
      return;
    }
    if (this.currencyConversionUnavailable || !this.pricesValid) {
      this.showToast('error', 'currencyRateLoadError');
      return;
    }
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
      children: Number(form.children ?? 0),
      infants: Number(form.infants ?? 0),
      subTotal: this.subTotal,
      discount: Number(form.discount ?? 0),
      taxRate: Number(form.taxRate ?? 0),
      tax: this.tax,
      adminFees: form.adminFees == null || form.adminFees === '' ? null : Number(form.adminFees),
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
        document.body.appendChild(link);
        link.click();
        link.remove();
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
      destinations: this.apiService.get('Destinations/GetAll?page=1&pageSize=500').pipe(catchError(() => { this.optionsLoadError = true; return of([]); })),
    }).pipe(takeUntilDestroyed(this.destroyRef), finalize(() => {
      this.optionsLoading = false;
      if (this.optionsLoadError) this.showToast('error', 'quotationOptionsLoadError');
      this.cdr.markForCheck();
    })).subscribe(({ customers, packages, tours, hotels, flights, destinations }) => {
      if ([customers, packages, tours, hotels, flights, destinations].some((response: any) => response?.isSuccess === false)) this.optionsLoadError = true;
      this.customers = this.rows(customers, 'customers');
      this.packages = this.rows(packages, 'packages');
      this.tours = this.rows(tours, 'tours');
      this.hotels = this.rows(hotels, 'hotels');
      this.flights = this.rows(flights, 'flights');
      this.destinations = this.rows(destinations, 'destinations');
      if (this.selectedQuotation) this.selectCatalogItems(this.selectedQuotation.items);
    });
  }

  retryOptions(): void { this.loadOptions(); }

  private get missingSelections(): boolean {
    return this.selectedPackages.length !== this.selectedPackageIds.size
      || this.selectedTours.length !== this.selectedTourIds.size
      || this.selectedHotels.length !== this.selectedHotelIds.size
      || this.selectedFlights.length !== this.selectedFlightIds.size
      || [...this.selectedRoomIds].some(id => !this.selectedHotels.some(hotel => this.hotelRooms(hotel.id).some(room => Number(room.id) === id)));
  }

  private populateForm(quotation: QuotationDTO): void {
    this.validationSubmitted = false;
    this.quotationPrices.clear();
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
      adminFees: quotation.adminFees ?? null,
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
    this.quotationPrices.clear();
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
      adminFees: null,
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

  private filterCatalog(items: any[], selectedIds: Set<number>, matches: (item: any) => boolean): any[] {
    if (!this.destinationFilter.value) return items;
    return items.filter(item => selectedIds.has(Number(item.id)) || matches(item));
  }

  private entityMatchesFilters(item: any): boolean {
    const destinationId = Number(this.destinationFilter.value);
    const cityId = Number(this.cityFilter.value);
    if (Number(item?.destinationId ?? item?.destination?.id) !== destinationId) return false;
    return !cityId || Number(item?.cityId ?? item?.city?.id) === cityId;
  }

  private packageMatchesFilters(item: any): boolean {
    const destinationId = Number(this.destinationFilter.value);
    const cityId = Number(this.cityFilter.value);
    const destinationIds = [item?.destinationId, ...(item?.destinations ?? []).map((value: any) => value?.destinationId ?? value?.id)]
      .map(Number).filter(Number.isFinite);
    if (!destinationIds.includes(destinationId)) return false;
    if (!cityId) return true;
    const related = [...(item?.tours ?? []), ...(item?.hotelRooms ?? []).map((value: any) => value?.hotel ?? value)];
    return related.some(value => Number(value?.cityId ?? value?.city?.id) === cityId)
      || this.textMatchesLocation(item, this.selectedCity());
  }

  private flightMatchesFilters(item: any): boolean {
    const city = this.selectedCity();
    if (city) return this.textMatchesLocation(item, city);
    const destination = this.destinations.find(value => Number(value?.id ?? value?.destinationId) === Number(this.destinationFilter.value));
    if (this.textMatchesLocation(item, destination)) return true;
    return this.cities.some(value => this.textMatchesLocation(item, value));
  }

  private selectedCity(): any | null {
    return this.cities.find(value => Number(value?.id ?? value?.cityId) === Number(this.cityFilter.value)) ?? null;
  }

  private textMatchesLocation(item: any, location: any): boolean {
    if (!location) return false;
    const route = this.normalizeText([
      item?.departureAirport, item?.departureAirportName, item?.arrivalAirport, item?.arrivalAirportName,
      item?.descEn, item?.descAr, item?.name, item?.nameEng, item?.nameAr,
    ].filter(Boolean).join(' '));
    const names = [location?.name, location?.nameEng, location?.nameAr, location?.routeName]
      .map((value: unknown) => this.normalizeText(value)).filter(Boolean);
    return names.some((name: string) => route.includes(name));
  }

  private normalizeText(value: unknown): string {
    return String(value ?? '').normalize('NFKD').toLocaleLowerCase().replace(/[\u064B-\u065F\u0670]/g, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  }

  private createPolicyGroup(policy: { id?: number; value?: string } = {}): FormGroup {
    return new FormGroup({
      id: new FormControl(Number(policy.id) || 0, { nonNullable: true }),
      value: new FormControl(String(policy.value ?? ''), {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(1000)],
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
      price: new FormControl(Number(transfer?.pricePerItem ?? transfer?.sellingPrice ?? transfer?.quotationTransfer?.price ?? 0), {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0)],
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
      adminFees: new FormControl<number | null>(null, { validators: [Validators.min(0)] }),
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
    const values = Array.isArray(payload?.errors) ? payload.errors
      : payload?.errors && typeof payload.errors === 'object' ? Object.values(payload.errors).flat() : [];
    const errors = values.filter((error: unknown) => typeof error === 'string' && error.trim());
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
