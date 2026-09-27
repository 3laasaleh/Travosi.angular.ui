import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
import { ImageViewerModal } from '../../../shared/components/image-viewer-modal/image-viewer-modal';
import { ProductReviews } from '../../../shared/components/product-reviews/product-reviews';
import { DescriptionPreview } from '../../../shared/components/description-preview/description-preview';
import { mdiIconClass } from '../../../shared/utils/mdi-icon.util';
import { AuthService } from '../../user/_services/auth.service';
import { formatHomePrice } from '../home-price.util';

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [Breadcrumbs, DescriptionPreview, FooterOne, HomeNavbar, ImageViewerModal, ProductReviews, ReactiveFormsModule, TranslatePipe],
  templateUrl: './room-details.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomDetails implements OnInit {
  readonly iconClass = mdiIconClass;
  hotel: any = null;
  room: any = null;
  loading = true;
  booking = false;
  checkingAvailability = false;
  availabilityStatus: 'available' | 'unavailable' | null = null;
  roomUnavailable = false;
  guestBookingOpen = false;
  error = '';
  imageViewerOpen = false;
  selectedImageIndex = 0;

  guestBookingForm = new FormGroup({
    firstName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(100)],
    }),
    lastName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(100)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email, Validators.maxLength(254)],
    }),
    mobile: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\+?[0-9\s()-]{7,20}$/)],
    }),
  });

  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);
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

  get isArabic(): boolean { return this.language.currentLanguage() === 'ar'; }
  get isLoggedIn(): boolean {
    return this.auth.getCurentUser() !== null && !this.auth.isTokenExpired();
  }
  get today(): string {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }
  get images(): any[] {
    const images = Array.isArray(this.room?.images) ? this.room.images : [];
    return [...images].sort((left, right) => Number(right?.isMain) - Number(left?.isMain));
  }
  get resolvedImages(): string[] { return this.images.map((image) => this.utility.imageUrl(image)); }
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

  loadRoom(routeName: string, roomRouteName: string): void {
    if (!routeName || !roomRouteName) {
      this.hotel = null; this.room = null; this.loading = false; this.seo.markNotFound('Hotel room not found'); this.cdr.markForCheck(); return;
    }
    this.loading = true;
    this.error = '';
    this.booking = false;
    this.checkingAvailability = false;
    this.availabilityStatus = null;
    this.roomUnavailable = false;
    this.guestBookingOpen = false;
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
      this.seo.updateFrom(
        {
          ...room,
          name: this.roomName,
          descriptionEng: this.roomSeoDescription('en'),
          descriptionAr: this.roomSeoDescription('ar'),
          description: this.roomSeoDescription(this.language.currentLanguage()),
          hotelName: hotel.name || hotel.nameEng || hotel.nameAr,
          hotelUrl: `/${this.language.currentLanguage()}/hotels/${encodeURIComponent(routeName)}`,
          price: this.currentPeriod()?.price,
          currencyCode: this.currency.currentCurrency().code ?? "USD",
        },
        { image: this.images[0], imageUrl: this.resolvedImages[0], schemaType: 'HotelRoom' },
      );
    });
  }

  reserve(): void {
    if (this.booking || this.checkingAvailability || this.roomUnavailable || !this.hotel || !this.room) return;

    const payload = this.createBookingPayload();
    if (!payload) return;

    this.checkingAvailability = true;
    this.availabilityStatus = null;
    this.error = '';
    this.api.postUnauthenticated('Bookings/CheckAvailability', payload)
      .pipe(
        catchError((requestError) => {
          this.error = this.bookingErrorMessage(requestError?.error?.message);
          return of(null);
        }),
        finalize(() => {
          this.checkingAvailability = false;
          this.cdr.markForCheck();
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((response: any) => {
        if (response === null) {
          this.showAvailabilityError(this.error || 'hotelRoomUnavailable', false);
          return;
        }

        const data = response?.data ?? response;
        if (response?.isSuccess === false || data?.isAvailable !== true) {
          this.showAvailabilityError(response?.message || 'hotelRoomUnavailable');
          return;
        }

        this.availabilityStatus = 'available';
        if (this.isLoggedIn) {
          void this.confirmAndBook(payload);
        } else {
          this.guestBookingOpen = true;
        }
        this.cdr.markForCheck();
      });
  }

  goToSignIn(): void {
    this.guestBookingOpen = false;
    void this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url || '/' } });
  }

  closeGuestBookingModal(): void {
    if (this.booking) return;
    this.guestBookingOpen = false;
    this.cdr.markForCheck();
  }

  submitGuestBooking(): void {
    if (this.booking || this.roomUnavailable) return;
    if (this.guestBookingForm.invalid) {
      this.guestBookingForm.markAllAsTouched();
      return;
    }

    const payload = this.createBookingPayload();
    if (!payload) return;
    const guest = this.guestBookingForm.getRawValue();
    this.submitBooking({
      ...payload,
      GuestFirstName: guest.firstName.trim(),
      GuestLastName: guest.lastName.trim(),
      GuestEmail: guest.email.trim(),
      GuestMobile: guest.mobile.trim(),
    }, true);
  }

  private async confirmAndBook(payload: Record<string, unknown>): Promise<void> {
    const price = this.currentPeriod()?.price;
    const confirmation = await Swal.fire({
      title: this.translate.instant('hotelBookingRequest'),
      text: `${this.roomName}${price != null ? ` — ${price} USD` : ''}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('confirm'),
      cancelButtonText: this.translate.instant('cancel'),
      confirmButtonColor: '#0891b2',
    });
    if (confirmation.isConfirmed) this.submitBooking(payload, false);
  }

  private submitBooking(payload: Record<string, unknown>, guestBooking: boolean): void {
    this.booking = true;
    this.error = '';
    const request = guestBooking
      ? this.api.postUnauthenticated('Bookings/Guest', payload)
      : this.api.post('Bookings', payload);

    request.pipe(
      catchError((requestError) => {
        const message = this.bookingErrorMessage(requestError?.error?.message);
        this.handleBookingError(message);
        return of(null);
      }),
      finalize(() => {
        this.booking = false;
        this.cdr.markForCheck();
      }),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(async (response: any) => {
      if (response === null) return;
      if (response?.isSuccess === false) {
        this.handleBookingError(this.bookingErrorMessage(response?.message));
        return;
      }

      this.guestBookingOpen = false;
      this.guestBookingForm.reset({ firstName: '', lastName: '', email: '', mobile: '' });
      this.availabilityStatus = null;
      await this.showBookingConfirmation(response?.data ?? response);
    });
  }

  private createBookingPayload(): Record<string, unknown> | null {
    const hotelRoomId = Number(this.room?.id);
    if (!Number.isInteger(hotelRoomId) || hotelRoomId <= 0) {
      this.error = 'bookingCreateError';
      return null;
    }
    return {
      HotelRoomId: hotelRoomId,
    };
  }

  private showAvailabilityError(message: unknown, unavailable = true): void {
    const key = this.bookingErrorMessage(message) || 'hotelRoomUnavailable';
    this.error = key;
    this.availabilityStatus = 'unavailable';
    this.roomUnavailable = unavailable;
    void Swal.fire({ icon: 'error', text: this.translate.instant(key) });
  }

  private bookingErrorMessage(message: unknown): string {
    const value = typeof message === 'string' ? message.trim() : '';
    return value || 'hotelRoomUnavailable';
  }

  private isRoomUnavailableMessage(message: string): boolean {
    return /hotelRoomUnavailable|room.*(unavailable|available)|unavailable|no room|inventory/i.test(message);
  }

  private handleBookingError(message: string): void {
    this.error = message;
    if (this.isRoomUnavailableMessage(message)) {
      this.availabilityStatus = 'unavailable';
      this.roomUnavailable = true;
    }
    void Swal.fire({ icon: 'error', text: this.translate.instant(message) });
  }

  private async showBookingConfirmation(booking: any): Promise<void> {
    const createdAt = booking?.createdDate ? new Date(booking.createdDate) : new Date();
    const locale = (this.translate.currentLang?.() ?? '').toLowerCase().startsWith('ar') ? 'ar-EG' : 'en-GB';
    const bookingTime = new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' }).format(createdAt);
    const messageKey = booking?.acknowledgementEmailSent === false
      ? 'bookingConfirmationEmailPending'
      : 'bookingConfirmationMessage';
    await Swal.fire({
      icon: 'success',
      iconColor: '#00d492',
      title: this.translate.instant('bookingRequestReceived'),
      text: this.translate.instant(messageKey, { time: bookingTime }),
      confirmButtonText: this.translate.instant('ok'),
      confirmButtonColor: '#0891b2',
    });
  }

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

  private applyQuery(): void {
    const query = this.route.snapshot.queryParamMap;
    const state = this.location.getState() as { hotelBooking?: { adults?: unknown; children?: unknown; infants?: unknown; childrenAges?: unknown } };
    const selection = state?.hotelBooking;
    const stateAges = Array.isArray(selection?.childrenAges) ? selection.childrenAges.map((value) => String(value)) : [];
    const rawAges = stateAges.length ? stateAges : query.getAll('childrenAges').flatMap((value) => value.split(','));
   
  }

  private roomRouteName(room: any): string {
    const storedRouteName = String(room?.routeName ?? '').trim();
    if (storedRouteName) return storedRouteName.toLocaleLowerCase();
    return String(room?.nameEng ?? room?.name ?? '').trim().toLocaleLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }

  private roomSeoDescription(language: 'en' | 'ar'): string {
    const source = String(language === 'ar'
      ? this.room?.descriptionAr || this.room?.descriptionEng || this.room?.description || ''
      : this.room?.descriptionEng || this.room?.descriptionAr || this.room?.description || '').trim();
    if (source.length >= 40) return source;

    const roomName = String(language === 'ar'
      ? this.room?.nameAr || this.room?.nameEng || this.room?.name || ''
      : this.room?.nameEng || this.room?.nameAr || this.room?.name || '').trim();
    const hotelName = String(language === 'ar'
      ? this.hotel?.nameAr || this.hotel?.nameEng || this.hotel?.name || ''
      : this.hotel?.nameEng || this.hotel?.nameAr || this.hotel?.name || '').trim();
    return language === 'ar'
      ? `اطّلع على تفاصيل ومرافق وسعة وتوفر غرفة ${roomName} في ${hotelName} واحجز مع سي وورلد هوليدايز.`
      : `View ${roomName} details, amenities, occupancy and availability at ${hotelName}, and book with Sea World Holidays.`;
  }
}
