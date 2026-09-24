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
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, forkJoin, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SeoService } from '../../../core/services/seo.service';
import { LanguageService } from '../../../core/services/language.service';
import { ApiService } from '../../../core/services/apiservice.service';
import { Breadcrumbs } from '../../../shared/components/breadcrumbs/breadcrumbs';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { DatePicker } from '../../../shared/components/date-picker/date-picker';
import { mdiIconClass } from '../../../shared/utils/mdi-icon.util';

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
    const filtered = this.unfilteredResults();
    return this.availability.size
      ? filtered.filter((hotel) => this.availability.has(Number(hotel.id)))
      : filtered;
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
        .getUnauthntecated('Hotels/Public/Default?page=1&pageSize=100')
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
  }
  onCheckInDateChange(date: string): void {
    this.checkInDate = date;
    if (this.checkOutDate && this.checkOutDate <= date) this.checkOutDate = '';
  }
  applySearch(): void {
    this.destinationMenuOpen = false;
    this.guestMenuOpen = false;
    if (!this.checkInDate || !this.checkOutDate || this.checkOutDate <= this.checkInDate) {
      this.availability.clear();
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
      });
  }
  selectHotel(hotel: any): void {
    this.destinationQuery = this.hotelName(hotel);
    this.selectedDestinationId = null;
    this.destinationMenuOpen = false;
    this.cdr.markForCheck();
  }
  selectDestination(destination: any): void {
    this.destinationQuery = this.destinationName(destination);
    const id = Number(destination?.id ?? destination?.destinationId);
    this.selectedDestinationId = Number.isFinite(id) ? id : null;
    this.destinationMenuOpen = false;
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
