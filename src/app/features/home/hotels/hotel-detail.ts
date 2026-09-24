import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of, switchMap } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';
import { SeoService } from '../../../core/services/seo.service';
import { LanguageService } from '../../../core/services/language.service';
import { Breadcrumbs } from '../../../shared/components/breadcrumbs/breadcrumbs';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { HotelRoomCard } from '../../../shared/components/hotel-room-card/hotel-room-card';
import { mdiIconClass } from '../../../shared/utils/mdi-icon.util';

@Component({ selector: 'app-hotel-detail', standalone: true, imports: [Breadcrumbs, FooterOne, FormsModule, HomeNavbar, TranslatePipe, HotelRoomCard], templateUrl: './hotel-detail.html', changeDetection: ChangeDetectionStrategy.OnPush })
export class HotelDetail implements OnInit {
  readonly iconClass = mdiIconClass;
  hotel: any; loading = true; searching = false;
  checkInDate = ''; checkOutDate = ''; adults = 1; children = 0; infants = 0; childrenAges: number[] = []; roomCount = 1;
  childPolicies: any[] = [];
  availability = new Map<number, any>();
  private readonly seo = inject(SeoService); private readonly language = inject(LanguageService);
  constructor(private route: ActivatedRoute, private api: ApiService, private cdr: ChangeDetectorRef) {}
  get isArabic(): boolean { return this.language.currentLanguage() === 'ar'; }
  ngOnInit(): void { this.applySearchQuery(); this.route.paramMap.pipe(switchMap(p => this.api.getUnauthntecated(`Hotels/Public/${encodeURIComponent(p.get('routeName') ?? '')}`).pipe(catchError(() => of(null))))).pipe(finalize(() => { this.loading = false; this.cdr.markForCheck(); })).subscribe((r: any) => { this.hotel = r?.data ?? null; if (this.hotel) { this.seo.updateFrom(this.hotel, { image: this.hotel.images?.find((image: any) => image.isMain) ?? this.hotel.images?.[0], schemaType: 'Place' }); this.api.getUnauthntecated(`HotelPublicPolicies/Hotels/${this.hotel.id}`).pipe(catchError(() => of(null))).subscribe((response: any) => { this.childPolicies = response?.data ?? []; this.cdr.markForCheck(); }); } }); }
  searchAvailability(): void {
    if (!this.hotel?.id || !this.checkInDate || !this.checkOutDate || this.checkOutDate <= this.checkInDate) return;
    if (this.childrenAges.length !== Number(this.children) || this.childrenAges.some(age => !Number.isInteger(Number(age)) || Number(age) < 0 || Number(age) > 17)) return;
    const query = new URLSearchParams({ hotelId: String(this.hotel.id), checkInDate: this.checkInDate, checkOutDate: this.checkOutDate, adults: String(this.adults), children: String(this.children), infants: String(this.infants), roomCount: String(this.roomCount) });
    this.childrenAges.forEach(age => query.append('childrenAges', String(age)));
    this.searching = true;
    this.api.getUnauthntecated(`HotelAvailability?${query.toString()}`).pipe(catchError(() => of(null)), finalize(() => { this.searching = false; this.cdr.markForCheck(); })).subscribe((response: any) => {
      this.availability = new Map((response?.data ?? []).map((item: any) => [Number(item.hotelRoomId), item]));
    });
  }
  roomAvailability(roomId: number): any | null { return this.availability.get(Number(roomId)) ?? null; }
  onChildrenChange(): void { const count = Math.max(0, Math.min(17, Number(this.children) || 0)); this.children = count; this.childrenAges = Array.from({ length: count }, (_, index) => this.childrenAges[index] ?? 0); }
  childPolicyText(policy: any): string { return this.localized(policy?.descriptionEng || `Ages ${policy?.minAge}–${policy?.maxAge}`, policy?.descriptionAr || `الأعمار ${policy?.minAge}–${policy?.maxAge}`); }
  hotelName(): string { return this.localized(this.hotel?.nameEng ?? this.hotel?.name, this.hotel?.nameAr); }
  hotelAddress(): string { return this.localized(this.hotel?.addressEng ?? this.hotel?.address, this.hotel?.addressAr); }
  hotelDescription(): string { return this.localized(this.hotel?.descriptionEng ?? this.hotel?.description, this.hotel?.descriptionAr ?? this.hotel?.descriptionAR); }
  amenityName(amenity: any): string { return this.localized(amenity?.nameEng ?? amenity?.name, amenity?.nameAr); }
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
