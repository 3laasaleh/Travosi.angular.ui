import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, distinctUntilChanged, finalize, map, of } from 'rxjs';
import Swal from 'sweetalert2';
import { ApiService } from '../../../core/services/apiservice.service';
import { LanguageService } from '../../../core/services/language.service';
import { SeoService } from '../../../core/services/seo.service';
import { UtilityService } from '../../../core/services/utilityservice';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';
import { Breadcrumbs } from '../../../shared/components/breadcrumbs/breadcrumbs';
import { DatePicker } from '../../../shared/components/date-picker/date-picker';
import { HotelRoomCard } from '../../../shared/components/hotel-room-card/hotel-room-card';
import { ImageViewerModal } from '../../../shared/components/image-viewer-modal/image-viewer-modal';
import { ProductReviews } from '../../../shared/components/product-reviews/product-reviews';
import { mdiIconClass } from '../../../shared/utils/mdi-icon.util';
import { AuthService } from '../../user/_services/auth.service';

@Component({
  selector: 'app-hotel-detail',
  standalone: true,
  imports: [
    Breadcrumbs,
    DatePicker,
    FooterOne,
    FormsModule,
    HomeNavbar,
    TranslatePipe,
    HotelRoomCard,
    ImageViewerModal,
    ProductReviews,
  ],
  templateUrl: './hotel-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelDetail implements OnInit {
  @ViewChild('guestControl') private guestControl?: ElementRef<HTMLElement>;
  readonly iconClass = mdiIconClass;
  hotel: any;
  loading = true;
  searching = false;
  bookingRoomId: number | null = null;
  checkInDate = '';
  checkOutDate = '';
  adults = 1;
  children = 0;
  infants = 0;
  childrenAges: number[] = [];
  roomCount = 1;
  availability = new Map<number, any>();
  availabilitySearched = false;
  availabilityError = '';
  validationSubmitted = false;
  guestMenuOpen = false;
  imageViewerOpen = false;
  selectedImageIndex = 0;
  private readonly seo = inject(SeoService);
  private readonly language = inject(LanguageService);
  private readonly translate = inject(TranslateService);
  private readonly utility = inject(UtilityService);
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly api: ApiService,
    private readonly cdr: ChangeDetectorRef,
    private readonly auth: AuthService,
    private readonly router: Router,
  ) {}

  get isArabic(): boolean {
    return this.language.currentLanguage() === 'ar';
  }
  get images(): any[] {
    const images = Array.isArray(this.hotel?.images) ? this.hotel.images : [];
    return [...images].sort((left, right) => Number(right?.isMain) - Number(left?.isMain));
  }
  get resolvedImages(): string[] {
    return this.images.map((image) => this.utility.imageUrl(image));
  }
  get today(): string {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  }
  get travelers(): number {
    return this.adults + this.children + this.infants;
  }
  get hasSearchedAvailability(): boolean {
    return this.availabilitySearched && !this.searching;
  }
  get availableRooms(): any[] {
    return (this.hotel?.rooms ?? []).filter(
      (room: any) => (this.roomAvailability(room.id)?.availableQuantity ?? 0) >= this.roomCount,
    );
  }
  get mostPopularAmenities(): any[] {
    return (this.hotel?.amenities ?? []).filter((amenity: any) => amenity?.isMostPopular === true);
  }
  get googleMapsUrl(): string | null {
    const url = String(this.hotel?.googleMapsUrl ?? '').trim();
    return /^https:\/\/(?:www\.)?google\.[^/]+\/maps|^https:\/\/maps\.app\.goo\.gl\//i.test(url)
      ? url
      : null;
  }

  ngOnInit(): void {
    this.applySearchQuery();
    this.route.paramMap
      .pipe(
        map((params) => params.get('routeName')?.trim() ?? ''),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((routeName) => {
        if (!routeName) {
          this.hotel = null;
          this.loading = false;
          this.seo.markNotFound('Hotel not found');
          this.cdr.markForCheck();
          return;
        }

        this.loadHotel(routeName);
      });
  }

  private loadHotel(routeName: string): void {
    this.loading = true;
    this.hotel = null;
    this.availability.clear();
    this.availabilitySearched = false;
    this.availabilityError = '';
    this.api
      .getUnauthntecated(`Hotels/Public/${encodeURIComponent(routeName)}`)
      .pipe(
        map((response: any) => this.extractHotel(response)),
        catchError(() => of(null)),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((hotel) => {
        this.hotel = hotel;
        if (!hotel) {
          this.seo.markNotFound('Hotel not found');
          return;
        }

        this.seo.updateFrom(hotel, {
          image: this.images[0],
          imageUrl: this.resolvedImages[0],
          schemaType: 'Place',
        });
        if (this.checkInDate && this.checkOutDate) this.searchAvailability();
      });
  }

  private extractHotel(response: any): any | null {
    if (response?.isSuccess === false) return null;
    const data = response?.data ?? response;
    return data?.hotel ?? data ?? null;
  }

  @HostListener('document:click', ['$event'])
  closeGuestMenuOnOutsideClick(event: MouseEvent): void {
    if (!this.guestControl?.nativeElement.contains(event.target as Node))
      this.guestMenuOpen = false;
  }

  searchAvailability(): void {
    this.validationSubmitted = true;
    this.availabilityError = '';
    if (!this.searchValuesValid()) {
      this.availabilitySearched = false;
      return;
    }
    const query = new URLSearchParams({
      hotelId: String(this.hotel.id),
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
      adults: String(this.adults),
      children: String(this.children),
      infants: String(this.infants),
      roomCount: String(this.roomCount),
    });
    this.childrenAges.forEach((age) => query.append('childrenAges', String(age)));
    this.guestMenuOpen = false;
    this.availabilitySearched = false;
    this.availability.clear();
    this.searching = false;
    this.api
      .getUnauthntecated(`HotelAvailability?${query.toString()}`)
      .pipe(
        catchError((error) => {
          this.availabilityError = error?.error?.message || 'hotelAvailabilitySearchFailed';
          return of(null);
        }),
        finalize(() => {
          this.searching = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe((response: any) => {
        if (!response || response?.isSuccess === false) {
          this.availabilityError =
            response?.message || this.availabilityError || 'hotelAvailabilitySearchFailed';
          return;
        }
        this.availability = new Map(
          (response?.data ?? []).map((item: any) => [Number(item.hotelRoomId), item]),
        );
        this.availabilitySearched = true;
      });
  }

  roomAvailability(roomId: number): any | null {
    return this.availability.get(Number(roomId)) ?? null;
  }

  async reserveRoom(room: any): Promise<void> {
    const availability = this.roomAvailability(room?.id);
    const price = availability?.ratePlans?.[0];
    if (!this.hotel || !availability || !price || availability.availableQuantity < this.roomCount)
      return;
    const user = this.auth.getCurentUser();
    if (!user || this.auth.isTokenExpired()) {
      await this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
      return;
    }
    const confirmation = await Swal.fire({
      title: this.translate.instant('hotelBookingRequest'),
      text: `${this.localized(room?.nameEng ?? room?.name, room?.nameAr)} — ${price.grandTotal ?? price.total ?? 0} USD`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('confirm'),
      cancelButtonText: this.translate.instant('cancel'),
      confirmButtonColor: '#0891b2',
    });
    if (!confirmation.isConfirmed) return;
    this.bookingRoomId = Number(room.id);
    this.cdr.markForCheck();
    this.api
      .post('Bookings', {
        hotelId: this.hotel.id,
        hotelRoomId: room.id,
        roomCount: this.roomCount,
        adults: this.adults,
        children: this.children,
        childrenAges: this.childrenAges,
        infants: this.infants,
        numberOfTravelers: this.travelers,
        dateFrom: this.checkInDate,
        dateTo: this.checkOutDate,
      })
      .pipe(
        finalize(() => {
          this.bookingRoomId = null;
          this.cdr.markForCheck();
        }),
      )
      .subscribe({
        next: async (response: any) => {
          if (!response?.isSuccess) {
            await Swal.fire({
              icon: 'error',
              text: this.translate.instant(response?.message || 'hotelRoomUnavailable'),
            });
            return;
          }
          await Swal.fire({
            icon: 'success',
            title: this.translate.instant('hotelBookingRequest'),
            text: this.translate.instant(
              response?.data?.acknowledgementEmailSent === false
                ? 'bookingConfirmationEmailPending'
                : 'hotelBookingConfirmationEmailSent',
            ),
          });
          this.searchAvailability();
        },
        error: async (error) =>
          Swal.fire({
            icon: 'error',
            text: this.translate.instant(error?.error?.message || 'hotelRoomUnavailable'),
          }),
      });
  }

  onChildrenChange(): void {
    const count = Math.max(0, Math.min(17, Number(this.children) || 0));
    this.children = count;
    this.childrenAges = Array.from({ length: count }, (_, index) => this.childrenAges[index] ?? 0);
    this.availabilitySearched = false;
  }
  updateGuestCount(type: 'adults' | 'children' | 'infants', amount: number): void {
    const minimum = type === 'adults' ? 1 : 0;
    this[type] = Math.max(minimum, Number(this[type] || 0) + amount);
    if (type === 'children') this.onChildrenChange();
    this.availabilitySearched = false;
  }
  updateRoomCount(amount: number): void {
    this.roomCount = Math.max(1, Number(this.roomCount || 0) + amount);
    this.availabilitySearched = false;
  }
  openImageViewer(index = 0): void {
    if (!this.images.length) return;
    this.selectedImageIndex = Math.max(0, Math.min(index, this.images.length - 1));
    this.imageViewerOpen = true;
  }
  closeImageViewer(): void {
    this.imageViewerOpen = false;
  }
  imageUrl(image: any): string {
    return this.utility.imageUrl(image);
  }
  imageAlt(image: any): string {
    return this.utility.imageAlt(image, this.hotelName());
  }
  onImageError(event: Event): void {
    this.utility.onImageError(event);
  }
  childPolicyText(policy: any): string {
    return this.localized(
      policy?.valueEng ?? policy?.descriptionEng,
      policy?.valueAr ?? policy?.descriptionAr,
    );
  }
  hotelName(): string {
    return this.localized(this.hotel?.nameEng ?? this.hotel?.name, this.hotel?.nameAr);
  }
  hotelDescription(): string {
    return this.localized(
      this.hotel?.descriptionEng ?? this.hotel?.description,
      this.hotel?.descriptionAr ?? this.hotel?.descriptionAR,
    );
  }
  hotelAddress(): string {
    return this.localized(
      this.hotel?.addressEng ?? this.hotel?.address ?? this.hotel?.destinationName,
      this.hotel?.addressAr ?? this.hotel?.destinationName,
    );
  }
  amenityName(amenity: any): string {
    return this.localized(amenity?.nameEng ?? amenity?.name, amenity?.nameAr);
  }

  private searchValuesValid(): boolean {
    return (
      !!this.hotel?.id &&
      !!this.checkInDate &&
      !!this.checkOutDate &&
      this.checkInDate >= this.today &&
      this.checkOutDate > this.checkInDate &&
      Number.isInteger(Number(this.roomCount)) &&
      Number(this.roomCount) >= 1 &&
      Number.isInteger(Number(this.adults)) &&
      Number(this.adults) >= 1 &&
      Number.isInteger(Number(this.children)) &&
      Number(this.children) >= 0 &&
      Number.isInteger(Number(this.infants)) &&
      Number(this.infants) >= 0 &&
      this.childrenAges.length === Number(this.children) &&
      this.childrenAges.every(
        (age) => Number.isInteger(Number(age)) && Number(age) >= 0 && Number(age) <= 17,
      )
    );
  }
  private applySearchQuery(): void {
    const query = this.route.snapshot.queryParamMap;
    this.checkInDate = query.get('checkIn') ?? '';
    this.checkOutDate = query.get('checkOut') ?? '';
    this.adults = this.readCount(query.get('adults'), 1);
    this.children = this.readCount(query.get('children'), 0);
    this.infants = this.readCount(query.get('infants'), 0);
    this.roomCount = this.readCount(query.get('rooms'), 1);
    this.onChildrenChange();
  }
  private readCount(value: string | null, minimum: number): number {
    const count = Number(value);
    return Number.isInteger(count) && count >= minimum ? count : minimum;
  }
  private localized(english: unknown, arabic: unknown, fallback = ''): string {
    const value = this.isArabic ? arabic || english || fallback : english || arabic || fallback;
    return typeof value === 'string' ? value : fallback;
  }
}
