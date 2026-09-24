import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, forkJoin, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SeoService } from '../../../core/services/seo.service';
import { LanguageService } from '../../../core/services/language.service';
import { ApiService } from '../../../core/services/apiservice.service';
import { CurrencyService } from '../../../core/services/currency.service';
import { Breadcrumbs } from '../../../shared/components/breadcrumbs/breadcrumbs';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { DatePicker } from '../../../shared/components/date-picker/date-picker';
import { mdiIconClass } from '../../../shared/utils/mdi-icon.util';
import { formatHomePrice } from '../home-price.util';

type HotelSort = 'recommended' | 'price-asc' | 'distance' | 'stars-desc';

@Component({
  selector: 'app-hotel-catalog',
  standalone: true,
  imports: [Breadcrumbs, DatePicker, FooterOne, FormsModule, HomeNavbar, RouterLink, TranslatePipe],
  templateUrl: './hotel-catalog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelCatalog implements OnInit {
  readonly iconClass = mdiIconClass;
  @ViewChild('destinationControl') private destinationControl?: ElementRef<HTMLElement>;
  @ViewChild('guestControl') private guestControl?: ElementRef<HTMLElement>;
  private readonly api = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly seo = inject(SeoService);
  private readonly language = inject(LanguageService);
  private readonly currency = inject(CurrencyService);
  private readonly route = inject(ActivatedRoute);
  hotels: any[] = [];
  destinations: any[] = [];
  loading = true;
  searching = false;
  destinationQuery = '';
  selectedDestinationId: number | null = null;
  checkInDate = '';
  checkOutDate = '';
  adults = 1;
  children = 0;
  infants = 0;
  roomCount = 1;
  destinationMenuOpen = false;
  guestMenuOpen = false;
  availability = new Map<number, any[]>();
  availabilitySearchApplied = false;
  mobileFiltersOpen = false;
  freeTaxiOnly = false;
  featuredOnly = false;
  selectedStars = new Set<number>();
  sortOption: HotelSort = 'recommended';
  readonly starOptions = [5, 4, 3, 2, 1];
  readonly guestTypes = [
    { key: 'adults' as const, label: 'adults', minimum: 1 },
    { key: 'children' as const, label: 'children', minimum: 0 },
    { key: 'infants' as const, label: 'infants', minimum: 0 },
  ];
  get isArabic(): boolean {
    return this.language.currentLanguage() === 'ar';
  }
  get suggestions(): Array<{ kind: 'destination' | 'hotel'; item: any }> {
    const query = this.destinationQuery.trim().toLocaleLowerCase();
    const destinations = (query
      ? this.destinations.filter((destination) => this.destinationSearchable(destination).includes(query))
      : this.destinations
    )
      .slice(0, 4)
      .map((item) => ({ kind: 'destination' as const, item }));
    const hotels = (query
      ? this.hotels.filter((hotel) => this.searchable(hotel).includes(query))
      : this.hotels
    )
      .slice(0, 6)
      .map((item) => ({ kind: 'hotel' as const, item }));
    return [...destinations, ...hotels].slice(0, 8);
  }
  get results(): any[] {
    let filtered = this.unfilteredResults();
    if (this.availabilitySearchApplied) {
      filtered = filtered.filter((hotel) => this.availability.has(Number(hotel.id)));
    }
    if (this.selectedStars.size) {
      filtered = filtered.filter((hotel) => this.selectedStars.has(Number(hotel.starRating)));
    }
    if (this.freeTaxiOnly) filtered = filtered.filter((hotel) => this.hasFreeAirportTaxi(hotel));
    if (this.featuredOnly) filtered = filtered.filter((hotel) => hotel?.showAsDefault === true);

    return [...filtered].sort((left, right) => {
      if (this.sortOption === 'stars-desc') {
        return Number(right?.starRating ?? 0) - Number(left?.starRating ?? 0);
      }
      if (this.sortOption === 'distance') {
        return this.distanceValue(left) - this.distanceValue(right);
      }
      if (this.sortOption === 'price-asc') {
        return this.priceValue(left) - this.priceValue(right);
      }
      return Number(right?.showAsDefault === true) - Number(left?.showAsDefault === true)
        || Number(right?.starRating ?? 0) - Number(left?.starRating ?? 0);
    });
  }
  get hasActiveFilters(): boolean {
    return this.freeTaxiOnly || this.featuredOnly || this.selectedStars.size > 0;
  }
  get today(): string {
    const date = new Date();
    return [
      date.getFullYear().toString().padStart(4, '0'),
      (date.getMonth() + 1).toString().padStart(2, '0'),
      date.getDate().toString().padStart(2, '0'),
    ].join('-');
  }
  ngOnInit(): void {
    this.applyQueryParameters();
    this.seo.updateFrom(
      {
        titleEng: 'Hotels',
        titleAr: 'الفنادق',
        descriptionEng: 'Search hotels and room availability with Sea World Holidays.',
        descriptionAr: 'ابحث عن الفنادق وتوفر الغرف مع سي وورلد هوليدايز.',
      },
      { schemaType: 'Place' },
    );
    forkJoin({
      hotels: this.api
        .getUnauthntecated('Hotels/Public?page=1&pageSize=100')
        .pipe(catchError(() => of(null))),
      destinations: this.api
        .getUnauthntecated('destinations?page=1&pageSize=500')
        .pipe(catchError(() => of(null))),
    })
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe((response: any) => {
        this.hotels = this.rows(response?.hotels);
        this.destinations = this.rows(response?.destinations).filter(
          (destination) => destination?.isActive !== false,
        );
        if (this.hasValidStayDates()) this.applySearch();
      });
  }
  @HostListener('document:click', ['$event'])
  closeMenusOnOutsideClick(event: MouseEvent): void {
    const target = event.target as Node;
    if (!this.destinationControl?.nativeElement.contains(target))
      this.destinationMenuOpen = false;
    if (!this.guestControl?.nativeElement.contains(target)) this.guestMenuOpen = false;
  }
  openDestinationMenu(): void {
    this.destinationMenuOpen = true;
  }
  onDestinationQueryChange(): void {
    this.selectedDestinationId = null;
    this.destinationMenuOpen = true;
    this.invalidateAvailability();
  }
  toggleDestinationMenu(): void {
    this.destinationMenuOpen = !this.destinationMenuOpen;
  }
  toggleGuestMenu(): void {
    this.guestMenuOpen = !this.guestMenuOpen;
  }
  updateGuestCount(type: 'adults' | 'children' | 'infants', change: number): void {
    const guestType = this.guestTypes.find((item) => item.key === type)!;
    this[type] = Math.max(guestType.minimum, this[type] + change);
    this.invalidateAvailability();
  }
  onCheckInDateChange(date: string): void {
    this.checkInDate = date;
    if (this.checkOutDate && this.checkOutDate <= date) this.checkOutDate = '';
    this.invalidateAvailability();
  }
  onCheckOutDateChange(date: string): void {
    this.checkOutDate = date;
    this.invalidateAvailability();
  }
  onRoomCountChange(value: number): void {
    this.roomCount = Math.max(1, Number(value) || 1);
    this.invalidateAvailability();
  }
  applySearch(): void {
    this.destinationMenuOpen = false;
    this.guestMenuOpen = false;
    if (!this.checkInDate || !this.checkOutDate || this.checkOutDate <= this.checkInDate) {
      this.availability.clear();
      this.availabilitySearchApplied = false;
      this.cdr.markForCheck();
      return;
    }
    const candidates = this.unfilteredResults();
    this.searching = true;
    this.availability.clear();
    forkJoin(
      candidates.map((hotel) =>
        this.api
          .getUnauthntecated(
            `HotelAvailability?${new URLSearchParams({ hotelId: String(hotel.id), checkInDate: this.checkInDate, checkOutDate: this.checkOutDate, adults: String(this.adults), children: String(this.children), infants: String(this.infants), roomCount: String(this.roomCount) })}`,
          )
          .pipe(catchError(() => of(null))),
      ),
    )
      .pipe(
        finalize(() => {
          this.searching = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe((responses) => {
        responses.forEach((response: any, index) => {
          const rooms = response?.data;
          if (Array.isArray(rooms) && rooms.length)
            this.availability.set(Number(candidates[index].id), rooms);
        });
        this.availabilitySearchApplied = true;
        this.cdr.markForCheck();
      });
  }
  selectHotel(hotel: any): void {
    this.destinationQuery = this.hotelName(hotel);
    this.selectedDestinationId = null;
    this.destinationMenuOpen = false;
    this.invalidateAvailability();
    this.cdr.markForCheck();
  }
  selectDestination(destination: any): void {
    this.destinationQuery = this.destinationName(destination);
    const id = Number(destination?.id ?? destination?.destinationId);
    this.selectedDestinationId = Number.isFinite(id) ? id : null;
    this.destinationMenuOpen = false;
    this.invalidateAvailability();
    this.cdr.markForCheck();
  }
  destinationName(destination: any): string {
    return this.isArabic
      ? destination?.titleAr || destination?.title || destination?.titleEng || destination?.nameAr || destination?.nameEng || destination?.name || ''
      : destination?.titleEng || destination?.title || destination?.nameEng || destination?.name || destination?.titleAr || destination?.nameAr || '';
  }
  hotelName(hotel: any): string {
    return this.isArabic
      ? hotel?.nameAr || hotel?.nameEng || hotel?.name
      : hotel?.nameEng || hotel?.name || hotel?.nameAr || '';
  }
  hotelAddress(hotel: any): string {
    return this.isArabic
      ? hotel?.addressAr || hotel?.addressEng || hotel?.address || hotel?.destinationName || ''
      : hotel?.addressEng || hotel?.address || hotel?.addressAr || hotel?.destinationName || '';
  }
  hotelDescription(hotel: any): string {
    return hotel?.description || (this.isArabic
      ? hotel?.descriptionAr || hotel?.descriptionEng
      : hotel?.descriptionEng || hotel?.descriptionAr) || '';
  }
  hotelDestinationName(hotel: any): string {
    const destinationId = Number(hotel?.destinationId);
    const destination = this.destinations.find(
      (item) => Number(item?.id ?? item?.destinationId) === destinationId,
    );
    return hotel?.destinationName || this.destinationName(destination);
  }
  image(hotel: any): string | null {
    const image = hotel?.images?.find((value: any) => value.isMain) ?? hotel?.images?.[0];
    const url = image?.imageUrl ?? image?.url ?? image;
    return !url
      ? null
      : /^(https?:\/\/|blob:|data:)/i.test(url)
        ? url
        : `${environment.imageUrl.replace(/\/+$/, '')}/${String(url).replace(/^\/?(?:images\/)?/i, '')}`;
  }
  stayPrice(hotel: any): any | null {
    const prices = (this.availability.get(Number(hotel.id)) ?? []).flatMap(
      (room) => room.ratePlans ?? [],
    );
    return (
      prices.sort((left, right) => Number(left.grandTotal) - Number(right.grandTotal))[0] ?? null
    );
  }
  startingNightlyPrice(hotel: any): { value: number; currencyCode: string } | null {
    const roomPrices = (hotel?.rooms ?? []).flatMap((room: any) => [
      ...(room?.roomPeriodPrices ?? []).map((period: any) => ({
        value: Number(period?.price),
        currencyCode: period?.currencyCode ?? room?.currencyCode ?? 'USD',
      })),
      ...(room?.ratePlans ?? []).map((plan: any) => ({
        value: Number(plan?.baseNightlyRate),
        currencyCode: plan?.currencyCode ?? 'USD',
      })),
    ]).filter((price: any) => Number.isFinite(price.value) && price.value >= 0);
    return roomPrices.sort((left: any, right: any) => left.value - right.value)[0] ?? null;
  }
  formatPrice(value: unknown, source: any): string {
    return formatHomePrice(this.currency, value, source);
  }
  recommendedRoom(hotel: any): any | null {
    const availableRoomId = this.availability.get(Number(hotel?.id))?.[0]?.hotelRoomId;
    return (hotel?.rooms ?? []).find((room: any) => Number(room?.id) === Number(availableRoomId))
      ?? hotel?.rooms?.[0]
      ?? null;
  }
  roomName(room: any): string {
    return room?.name || (this.isArabic ? room?.nameAr || room?.nameEng : room?.nameEng || room?.nameAr) || '';
  }
  bedType(room: any): string {
    return this.isArabic
      ? room?.bedTypeAr || room?.bedTypeEng || room?.roomTypeName || ''
      : room?.bedTypeEng || room?.bedTypeAr || room?.roomTypeName || '';
  }
  amenityName(amenity: any): string {
    return amenity?.name || (this.isArabic ? amenity?.nameAr || amenity?.nameEng : amenity?.nameEng || amenity?.nameAr) || '';
  }
  starRange(hotel: any): number[] {
    const count = Math.min(5, Math.max(0, Math.floor(Number(hotel?.starRating) || 0)));
    return Array.from({ length: count }, (_, index) => index);
  }
  availableQuantity(hotel: any): number {
    const rooms = this.availability.get(Number(hotel?.id)) ?? [];
    if (!rooms.length) return Number.MAX_SAFE_INTEGER;
    return rooms.reduce((total, room) => total + Math.max(0, Number(room?.availableQuantity) || 0), 0);
  }
  toggleStar(stars: number): void {
    const next = new Set(this.selectedStars);
    next.has(stars) ? next.delete(stars) : next.add(stars);
    this.selectedStars = next;
  }
  clearFilters(): void {
    this.selectedStars = new Set<number>();
    this.freeTaxiOnly = false;
    this.featuredOnly = false;
  }
  starHotelCount(stars: number): number {
    return this.unfilteredResults().filter((hotel) => Number(hotel?.starRating) === stars).length;
  }
  get numberOfNights(): number {
    if (!this.checkInDate || !this.checkOutDate) return 0;
    const start = new Date(`${this.checkInDate}T00:00:00`);
    const end = new Date(`${this.checkOutDate}T00:00:00`);
    const nights = Math.round((end.getTime() - start.getTime()) / 86_400_000);
    return nights > 0 ? nights : 0;
  }
  get numberOfDays(): number {
    return this.numberOfNights ? this.numberOfNights + 1 : 0;
  }
  hasFreeAirportTaxi(hotel: any): boolean {
    return hotel?.hasFreeAirportTaxi === true || (hotel?.amenities ?? []).some((amenity: any) => {
      const value = [amenity?.nameEng, amenity?.nameAr, amenity?.name, amenity?.descriptionEng, amenity?.descriptionAr]
        .filter(Boolean).join(' ').toLocaleLowerCase();
      return value.includes('airport') && (value.includes('taxi') || value.includes('shuttle') || value.includes('transfer'));
    });
  }
  featuredLabel(hotel: any): string {
    return hotel?.badgeEng || hotel?.badgeAr || 'featured';
  }
  private invalidateAvailability(): void {
    this.availabilitySearchApplied = false;
    this.availability.clear();
  }
  private hasValidStayDates(): boolean {
    return Boolean(this.checkInDate && this.checkOutDate && this.checkOutDate > this.checkInDate);
  }
  private distanceValue(hotel: any): number {
    const value = Number(hotel?.distanceFromDowntownKm);
    return Number.isFinite(value) ? value : Number.MAX_SAFE_INTEGER;
  }
  private priceValue(hotel: any): number {
    const stayPrice = Number(this.stayPrice(hotel)?.grandTotal);
    if (Number.isFinite(stayPrice)) return stayPrice;
    return this.startingNightlyPrice(hotel)?.value ?? Number.MAX_SAFE_INTEGER;
  }
  private applyQueryParameters(): void {
    const query = this.route.snapshot.queryParamMap;
    this.checkInDate = query.get('checkIn') ?? query.get('checkin') ?? '';
    this.checkOutDate = query.get('checkOut') ?? query.get('checkout') ?? '';
    this.adults = this.positiveInteger(query.get('adults') ?? query.get('group_adults'), 1);
    this.children = this.nonNegativeInteger(query.get('children') ?? query.get('group_children'));
    this.infants = this.nonNegativeInteger(query.get('infants'));
    this.roomCount = this.positiveInteger(query.get('rooms') ?? query.get('no_rooms'), 1);
    this.destinationQuery = query.get('destination') ?? query.get('query') ?? '';
    const destinationId = Number(query.get('destinationId'));
    this.selectedDestinationId = Number.isFinite(destinationId) && destinationId > 0 ? destinationId : null;
  }
  private positiveInteger(value: string | null, fallback: number): number {
    const parsed = Math.floor(Number(value));
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
  }
  private nonNegativeInteger(value: string | null): number {
    const parsed = Math.floor(Number(value));
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
  }
  private unfilteredResults(): any[] {
    if (this.selectedDestinationId !== null) {
      return this.hotels.filter(
        (hotel) => Number(hotel?.destinationId) === this.selectedDestinationId,
      );
    }
    const query = this.destinationQuery.trim().toLocaleLowerCase();
    return query
      ? this.hotels.filter((hotel) => this.searchable(hotel).includes(query))
      : this.hotels;
  }
  private searchable(hotel: any): string {
    return [
      hotel?.nameEng,
      hotel?.nameAr,
      hotel?.name,
      this.hotelDestinationName(hotel),
      hotel?.addressEng,
      hotel?.addressAr,
      hotel?.address,
    ]
      .filter(Boolean)
      .join(' ')
      .toLocaleLowerCase();
  }
  private destinationSearchable(destination: any): string {
    return [
      destination?.title,
      destination?.titleEng,
      destination?.titleAr,
      destination?.name,
      destination?.nameEng,
      destination?.nameAr,
    ]
      .filter(Boolean)
      .join(' ')
      .toLocaleLowerCase();
  }
  private rows(response: any): any[] {
    const data = response?.data ?? response;
    return Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.items)
          ? data.items
          : [];
  }
}
