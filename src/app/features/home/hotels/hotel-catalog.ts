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

@Component({
  selector: 'app-hotel-catalog',
  standalone: true,
  imports: [Breadcrumbs, FooterOne, FormsModule, HomeNavbar, RouterLink, TranslatePipe],
  templateUrl: './hotel-catalog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelCatalog implements OnInit {
  @ViewChild('destinationControl') private destinationControl?: ElementRef<HTMLElement>;
  private readonly api = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly seo = inject(SeoService);
  private readonly language = inject(LanguageService);
  hotels: any[] = [];
  loading = true;
  searching = false;
  destinationQuery = '';
  checkInDate = '';
  checkOutDate = '';
  roomCount = 1;
  destinationMenuOpen = false;
  availability = new Map<number, any[]>();
  get isArabic(): boolean {
    return this.language.currentLanguage() === 'ar';
  }
  get suggestions(): any[] {
    const query = this.destinationQuery.trim().toLocaleLowerCase();
    return (
      query ? this.hotels.filter((hotel) => this.searchable(hotel).includes(query)) : this.hotels
    ).slice(0, 6);
  }
  get results(): any[] {
    const query = this.destinationQuery.trim().toLocaleLowerCase();
    const filtered = query
      ? this.hotels.filter((hotel) => this.searchable(hotel).includes(query))
      : this.hotels;
    return this.availability.size
      ? filtered.filter((hotel) => this.availability.has(Number(hotel.id)))
      : filtered;
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
    this.api
      .getUnauthntecated('Hotels/Public/Default?page=1&pageSize=20')
      .pipe(
        catchError(() => of(null)),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe((response: any) => {
        const payload = response?.data ?? response;
        this.hotels = Array.isArray(payload) ? payload : Array.isArray(payload?.data) ? payload.data : [];
      });
  }
  @HostListener('document:click', ['$event'])
  closeDestinationMenuOnOutsideClick(event: MouseEvent): void {
    if (!this.destinationControl?.nativeElement.contains(event.target as Node))
      this.destinationMenuOpen = false;
  }
  openDestinationMenu(): void {
    this.destinationMenuOpen = true;
  }
  toggleDestinationMenu(): void {
    this.destinationMenuOpen = !this.destinationMenuOpen;
  }
  applySearch(): void {
    this.destinationMenuOpen = false;
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
            `HotelAvailability?${new URLSearchParams({ hotelId: String(hotel.id), checkInDate: this.checkInDate, checkOutDate: this.checkOutDate, adults: '1', children: '0', roomCount: String(this.roomCount) })}`,
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
    this.destinationMenuOpen = false;
    this.cdr.markForCheck();
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
      hotel?.destinationName,
      hotel?.addressEng,
      hotel?.addressAr,
      hotel?.address,
    ]
      .filter(Boolean)
      .join(' ')
      .toLocaleLowerCase();
  }
}
