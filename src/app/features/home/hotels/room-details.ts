import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, inject } from '@angular/core';
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
import { mdiIconClass } from '../../../shared/utils/mdi-icon.util';
import { AuthService } from '../../user/_services/auth.service';
import { formatHomePrice } from '../home-price.util';

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [Breadcrumbs, FooterOne, HomeNavbar, ImageViewerModal, ProductReviews, TranslatePipe],
  templateUrl: './room-details.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomDetails implements OnInit {
  readonly iconClass = mdiIconClass;
  hotel: any = null;
  room: any = null;
  loading = true;
  booking = false;
  adults = 1;
  children = 0;
  infants = 0;
  childrenAges: number[] = [];
  specialRequests = '';
  error = '';
  imageViewerOpen = false;
  selectedImageIndex = 0;

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
    });
  }

  async reserve(): Promise<void> {
    this.error = '';
    if (!this.hotel?.id || !this.room?.id || this.adults < 1 || this.children < 0 || this.infants < 0 ||
      !this.roomCapacityValid() ||
      this.childrenAges.length !== this.children || this.childrenAges.some((age) => !Number.isInteger(Number(age)) || Number(age) < 0 || Number(age) > 17)) {
      this.error = this.roomCapacityValid() ? 'hotelGuestCountsInvalid' : 'hotelOccupancyExceeded';
      this.cdr.markForCheck();
      return;
    }
    const user = this.auth.getCurentUser();
    if (!user || this.auth.isTokenExpired()) {
      await this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
      return;
    }
    const confirmation = await Swal.fire({
      title: this.translate.instant('hotelBookingRequest'),
      text: `${this.roomName}${this.currentPeriod()?.price != null ? ` — ${this.currentPeriod()!.price} USD` : ''}`,
      icon: 'question', showCancelButton: true, confirmButtonText: this.translate.instant('confirm'), cancelButtonText: this.translate.instant('cancel'), confirmButtonColor: '#0891b2',
    });
    if (!confirmation.isConfirmed) return;
    this.booking = true;
    this.api.post('Bookings', {
      hotelId: this.hotel.id, hotelRoomId: this.room.id, roomCount: 1, adults: this.adults, children: this.children,
      childrenAges: this.childrenAges, infants: this.infants, numberOfTravelers: this.travelers, specialRequests: this.specialRequests,
    }).pipe(finalize(() => { this.booking = false; this.cdr.markForCheck(); }), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: async (response: any) => {
          if (!response?.isSuccess) { await Swal.fire({ icon: 'error', text: this.translate.instant(response?.message || 'hotelRoomUnavailable') }); return; }
          await Swal.fire({ icon: 'success', title: this.translate.instant('hotelBookingRequest'), text: this.translate.instant(response?.data?.acknowledgementEmailSent === false ? 'bookingConfirmationEmailPending' : 'hotelBookingConfirmationEmailSent') });
        },
        error: async (error) => Swal.fire({ icon: 'error', text: this.translate.instant(error?.error?.message || 'hotelRoomUnavailable') }),
      });
  }

  updateChildren(): void {
    this.children = Math.max(0, Math.min(17, Number(this.children) || 0));
    this.childrenAges = Array.from({ length: this.children }, (_, index) => this.childrenAges[index] ?? 0);
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
    this.adults = Math.max(1, Number(query.get('adults')) || 1);
    this.children = Math.max(0, Number(query.get('children')) || 0);
    this.infants = Math.max(0, Number(query.get('infants')) || 0);
    const rawAges = query.getAll('childrenAges').flatMap((value) => value.split(','));
    this.childrenAges = rawAges
      .map((value) => Number(value))
      .filter((value) => Number.isFinite(value));
    this.updateChildren();
  }

  private roomCapacityValid(): boolean {
    const maxAdults = this.room?.maxAdults == null ? Number.POSITIVE_INFINITY : Number(this.room.maxAdults);
    const maxChildren = this.room?.maxChildren == null ? Number.POSITIVE_INFINITY : Number(this.room.maxChildren);
    const maxInfants = this.room?.maxInfants == null ? Number.POSITIVE_INFINITY : Number(this.room.maxInfants);
    const maxTotal = this.room?.maxTotalOccupancy == null ? Number.POSITIVE_INFINITY : Number(this.room.maxTotalOccupancy);
    return (!Number.isFinite(maxAdults) || this.adults <= maxAdults) &&
      (!Number.isFinite(maxChildren) || this.children <= maxChildren) &&
      (!Number.isFinite(maxInfants) || this.infants <= maxInfants) &&
      (!Number.isFinite(maxTotal) || maxTotal <= 0 || this.travelers <= maxTotal);
  }
  private roomRouteName(room: any): string {
    const storedRouteName = String(room?.routeName ?? '').trim();
    if (storedRouteName) return storedRouteName.toLocaleLowerCase();
    return String(room?.nameEng ?? room?.name ?? '').trim().toLocaleLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }
}
