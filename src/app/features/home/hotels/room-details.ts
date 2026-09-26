import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, ElementRef, HostListener, OnInit, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, distinctUntilChanged, finalize, map, of } from 'rxjs';
import Swal from 'sweetalert2';
import { ApiService } from '../../../core/services/apiservice.service';
import { CurrencyService } from '../../../core/services/currency.service';
import { LanguageService } from '../../../core/services/language.service';
import { SeoService } from '../../../core/services/seo.service';
import { UtilityService } from '../../../core/services/utilityservice';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';
import { Breadcrumbs } from '../../../shared/components/breadcrumbs/breadcrumbs';
import { DatePicker } from '../../../shared/components/date-picker/date-picker';
import { ImageViewerModal } from '../../../shared/components/image-viewer-modal/image-viewer-modal';
import { ProductReviews } from '../../../shared/components/product-reviews/product-reviews';
import { mdiIconClass } from '../../../shared/utils/mdi-icon.util';
import { AuthService } from '../../user/_services/auth.service';
import { formatHomePrice } from '../home-price.util';

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [Breadcrumbs, DatePicker, FooterOne, FormsModule, HomeNavbar, ImageViewerModal, ProductReviews, TranslatePipe],
  templateUrl: './room-details.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomDetails implements OnInit {
  readonly iconClass = mdiIconClass;
  hotel: any = null;
  room: any = null;
  loading = true;
  searching = false;
  booking = false;
  checkInDate = '';
  checkOutDate = '';
  adults = 1;
  children = 0;
  infants = 0;
  childrenAges: number[] = [];
  specialRequests = '';
  availability: any | null = null;
  availabilitySearched = false;
  validationSubmitted = false;
  error = '';
  imageViewerOpen = false;
  selectedImageIndex = 0;
  readonly travelerMenuOpen = signal(false);
  readonly travelerTypes = [
    { key: 'adults' as const, ageLabel: 'adultsAgeLabel', minimum: 1 },
    { key: 'children' as const, ageLabel: 'childrenAgeLabel', minimum: 0 },
    { key: 'infants' as const, ageLabel: 'infantsAgeLabel', minimum: 0 },
  ];

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly api = inject(ApiService);
  private readonly currency = inject(CurrencyService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly auth = inject(AuthService);
  private readonly language = inject(LanguageService);
  private readonly seo = inject(SeoService);
  private readonly translate = inject(TranslateService);
  private readonly utility = inject(UtilityService);
  private readonly travelerControl = viewChild<ElementRef<HTMLElement>>('travelerControl');

  get isArabic(): boolean { return this.language.currentLanguage() === 'ar'; }
  get today(): string {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }
  get images(): any[] {
    const images = Array.isArray(this.room?.images) ? this.room.images : [];
    return [...images].sort((left, right) => Number(right?.isMain) - Number(left?.isMain));
  }
  get resolvedImages(): string[] { return this.images.map((image) => this.utility.imageUrl(image)); }
  get quote(): any | null { return this.availability?.ratePlans?.[0] ?? null; }
  get travelers(): number { return this.adults + this.children + this.infants; }
  get roomName(): string { return this.room?.name || this.room?.nameEng || this.room?.nameAr || ''; }
  get roomDescription(): string { return this.room?.description || this.room?.descriptionEng || this.room?.descriptionAr || ''; }

  ngOnInit(): void {
    this.applyQuery();
    this.route.paramMap.pipe(
      map((params) => ({ routeName: params.get('routeName')?.trim() ?? '', roomRouteName: params.get('roomRouteName')?.trim() ?? '' })),
      distinctUntilChanged((left, right) => left.routeName === right.routeName && left.roomRouteName === right.roomRouteName),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(({ routeName, roomRouteName }) => this.loadRoom(routeName, roomRouteName));
  }

  @HostListener('document:click', ['$event'])
  closeTravelerMenu(event: MouseEvent): void {
    if (this.travelerMenuOpen() && !this.travelerControl()?.nativeElement.contains(event.target as Node))
      this.travelerMenuOpen.set(false);
  }

  onTravelerFocusOut(event: FocusEvent): void {
    if (!this.travelerControl()?.nativeElement.contains(event.relatedTarget as Node | null))
      this.travelerMenuOpen.set(false);
  }

  loadRoom(routeName: string, roomRouteName: string): void {
    if (!routeName || !roomRouteName) {
      this.hotel = null; this.room = null; this.loading = false; this.seo.markNotFound('Hotel room not found'); this.cdr.markForCheck(); return;
    }
    this.loading = true;
    this.error = '';
    this.hotel = null;
    this.room = null;
    this.api.getUnauthntecated(`Hotels/Public/${encodeURIComponent(routeName)}`).pipe(
      map((response: any) => response?.isSuccess === false ? null : (response?.data?.hotel ?? response?.data ?? response)),
      catchError(() => of(null)),
      finalize(() => { this.loading = false; this.cdr.markForCheck(); }),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((hotel: any) => {
      const room = hotel?.rooms?.find((item: any) => this.roomRouteName(item) === roomRouteName.toLocaleLowerCase()) ?? null;
      this.hotel = hotel;
      this.room = room;
      if (!hotel || !room) { this.seo.markNotFound('Hotel room not found'); return; }
      this.seo.updateFrom({ ...room, name: this.roomName, description: this.roomDescription }, { image: this.images[0], imageUrl: this.resolvedImages[0], schemaType: 'Place' });
      if (this.checkInDate && this.checkOutDate) this.checkAvailability();
    });
  }

  checkAvailability(): void {
    this.validationSubmitted = true;
    this.error = '';
    if (!this.isValidSelection()) { this.availability = null; this.availabilitySearched = false; return; }
    const query = new URLSearchParams({
      hotelId: String(this.hotel.id), checkInDate: this.checkInDate, checkOutDate: this.checkOutDate,
      adults: String(this.adults), children: String(this.children), infants: String(this.infants), roomCount: '1',
    });
    this.childrenAges.forEach((age) => query.append('childrenAges', String(age)));
    this.searching = true;
    this.availability = null;
    this.availabilitySearched = false;
    this.api.getUnauthntecated(`HotelAvailability?${query}`).pipe(
      catchError((error) => { this.error = error?.error?.message || 'hotelAvailabilitySearchFailed'; return of(null); }),
      finalize(() => { this.searching = false; this.cdr.markForCheck(); }),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((response: any) => {
      if (!response || response?.isSuccess === false) { this.error = response?.message || this.error || 'hotelAvailabilitySearchFailed'; return; }
      this.availability = (response?.data ?? []).find((item: any) => Number(item?.hotelRoomId) === Number(this.room.id)) ?? null;
      this.availabilitySearched = true;
      if (!this.availability) this.error = 'hotelRoomUnavailable';
    });
  }

  async reserve(): Promise<void> {
    if (!this.quote || !this.availability || this.availability.availableQuantity < 1) return;
    const user = this.auth.getCurentUser();
    if (!user || this.auth.isTokenExpired()) {
      await this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
      return;
    }
    const confirmation = await Swal.fire({
      title: this.translate.instant('hotelBookingRequest'),
      text: `${this.roomName} — ${this.quote.grandTotal ?? this.quote.total ?? 0} USD`,
      icon: 'question', showCancelButton: true, confirmButtonText: this.translate.instant('confirm'), cancelButtonText: this.translate.instant('cancel'), confirmButtonColor: '#0891b2',
    });
    if (!confirmation.isConfirmed) return;
    this.booking = true;
    this.api.post('Bookings', {
      hotelId: this.hotel.id, hotelRoomId: this.room.id, roomCount: 1, adults: this.adults, children: this.children,
      childrenAges: this.childrenAges, infants: this.infants, numberOfTravelers: this.travelers, dateFrom: this.checkInDate, dateTo: this.checkOutDate, specialRequests: this.specialRequests,
    }).pipe(finalize(() => { this.booking = false; this.cdr.markForCheck(); }), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: async (response: any) => {
          if (!response?.isSuccess) { await Swal.fire({ icon: 'error', text: this.translate.instant(response?.message || 'hotelRoomUnavailable') }); return; }
          await Swal.fire({ icon: 'success', title: this.translate.instant('hotelBookingRequest'), text: this.translate.instant(response?.data?.acknowledgementEmailSent === false ? 'bookingConfirmationEmailPending' : 'hotelBookingConfirmationEmailSent') });
          this.checkAvailability();
        },
        error: async (error) => Swal.fire({ icon: 'error', text: this.translate.instant(error?.error?.message || 'hotelRoomUnavailable') }),
      });
  }

  updateChildren(): void {
    this.children = Math.max(0, Math.min(17, Number(this.children) || 0));
    this.childrenAges = Array.from({ length: this.children }, (_, index) => this.childrenAges[index] ?? 0);
    this.availabilitySearched = false;
  }
  updateTravelerCount(type: 'adults' | 'children' | 'infants', change: number): void {
    const minimum = type === 'adults' ? 1 : 0;
    this[type] = Math.max(minimum, Math.trunc(Number(this[type]) || 0) + change);
    if (type === 'children') this.updateChildren();
    this.availabilitySearched = false;
  }
  travelerCount(type: 'adults' | 'children' | 'infants'): number { return this[type]; }
  imageUrl(image: any): string { return this.utility.imageUrl(image); }
  imageAlt(image: any): string { return this.utility.imageAlt(image, this.roomName); }
  formatPrice(value: unknown, source: any): string { return formatHomePrice(this.currency, value, source); }
  openGallery(index = 0): void { if (this.images.length) { this.selectedImageIndex = index; this.imageViewerOpen = true; } }
  amenityName(amenity: any): string { return amenity?.name || (this.isArabic ? amenity?.nameAr || amenity?.nameEng : amenity?.nameEng || amenity?.nameAr) || ''; }
  policyText(policy: any): string { return typeof policy === 'string' ? policy : policy?.value || (this.isArabic ? policy?.valueAr || policy?.valueEng : policy?.valueEng || policy?.valueAr) || ''; }
  currentPeriod(): any | null {
    const today = this.today;
    return (this.room?.roomPeriodPrices ?? []).find((period: any) => period?.isActive !== false && period.startDate <= today && period.endDate >= today) ?? null;
  }

  private isValidSelection(): boolean {
    return !!this.hotel?.id && !!this.room?.id && !!this.checkInDate && !!this.checkOutDate && this.checkInDate >= this.today && this.checkOutDate > this.checkInDate
      && Number.isInteger(Number(this.adults)) && this.adults >= 1 && Number.isInteger(Number(this.children)) && this.children >= 0
      && Number.isInteger(Number(this.infants)) && this.infants >= 0 && this.childrenAges.length === this.children
      && this.childrenAges.every((age) => Number.isInteger(Number(age)) && Number(age) >= 0 && Number(age) <= 17);
  }
  private applyQuery(): void {
    const query = this.route.snapshot.queryParamMap;
    this.checkInDate = query.get('checkIn') ?? '';
    this.checkOutDate = query.get('checkOut') ?? '';
    this.adults = Math.max(1, Number(query.get('adults')) || 1);
    this.children = Math.max(0, Number(query.get('children')) || 0);
    this.infants = Math.max(0, Number(query.get('infants')) || 0);
    this.updateChildren();
  }
  private roomRouteName(room: any): string {
    const storedRouteName = String(room?.routeName ?? '').trim();
    if (storedRouteName) return storedRouteName.toLocaleLowerCase();
    return String(room?.nameEng ?? room?.name ?? '').trim().toLocaleLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }
}
