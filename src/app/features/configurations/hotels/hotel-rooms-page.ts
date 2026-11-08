import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';
import { LanguageService } from '../../../core/services/language.service';
import { HotelRoomsManager } from './hotel-rooms-manager/hotel-rooms-manager';

@Component({
  selector: 'app-hotel-rooms-page',
  standalone: true,
  imports: [FormsModule, TranslatePipe, HotelRoomsManager],
  templateUrl: './hotel-rooms-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelRoomsPage implements OnInit {
  destinations: any[] = [];
  hotels: any[] = [];
  hotelSearch = '';
  hotelMenuOpen = false;
  selectedDestinationId: number | null = null;
  selectedHotelId: number | null = null;
  loading = false;
  error = '';

  constructor(
    private readonly api: ApiService,
    private readonly language: LanguageService,
    private readonly cdr: ChangeDetectorRef,
    private readonly elementRef: ElementRef<HTMLElement>,
  ) {}

  get isArabic(): boolean { return this.language.currentLanguage() === 'ar'; }

  get suggestions(): any[] {
    const destinationId = this.selectedDestinationId;
    if (!destinationId) return [];
    const destinationHotels = this.hotels.filter(
      (hotel) => Number(hotel?.destinationId) === destinationId,
    );
    const query = this.hotelSearch.trim().toLowerCase();
    if (!query) return destinationHotels.slice(0, 10);
    return destinationHotels.filter((hotel) =>
      [hotel.nameEng, hotel.nameAr, hotel.name].some((value) =>
        String(value ?? '').toLowerCase().includes(query),
      ),
    ).slice(0, 10);
  }

  get selectedHotel(): any | undefined { return this.hotels.find((hotel) => Number(hotel.id) === this.selectedHotelId); }

  @HostListener('document:click', ['$event'])
  closeHotelMenuOnOutsideClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) this.hotelMenuOpen = false;
  }

  ngOnInit(): void {
    this.loading = true;
    this.api.get('Destinations/GetAll?page=1&pageSize=500').pipe(
      catchError(() => {
        this.error = 'destinationServiceUnavailable';
        return of(null);
      }),
      finalize(() => {
        this.loading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      this.destinations = this.rows(response).filter((destination) => destination?.isActive !== false);
    });
  }

  onDestinationChange(event: Event): void {
    const destinationId = Number((event.target as HTMLSelectElement).value);
    this.selectedDestinationId = Number.isInteger(destinationId) && destinationId > 0 ? destinationId : null;
    this.clearHotel();
    this.hotels = [];
    if (this.selectedDestinationId) this.loadHotels(this.selectedDestinationId);
  }

  destinationName(destination: any): string {
    return this.isArabic
      ? (destination?.nameAr || destination?.nameEng || destination?.name || '')
      : (destination?.nameEng || destination?.nameAr || destination?.name || '');
  }

  private loadHotels(destinationId: number): void {
    this.loading = true;
    this.error = '';
    this.api.get(`Hotels/GetAll?page=1&pageSize=500&destinationId=${destinationId}`).pipe(
      catchError(() => {
        this.error = 'hotelServiceUnavailable';
        return of(null);
      }),
      finalize(() => {
        this.loading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (this.selectedDestinationId !== destinationId) return;
      this.hotels = this.rows(response).filter(
        (hotel) => Number(hotel?.destinationId) === destinationId,
      );
    });
  }

  selectHotel(hotel: any): void {
    if (!this.selectedDestinationId || Number(hotel?.destinationId) !== this.selectedDestinationId) return;
    this.selectedHotelId = Number(hotel?.id) || null;
    this.hotelSearch = '';
    this.hotelMenuOpen = false;
  }

  toggleHotelMenu(): void {
    if (!this.selectedDestinationId || this.loading) return;
    this.hotelMenuOpen = !this.hotelMenuOpen;
    if (this.hotelMenuOpen) this.hotelSearch = '';
  }

  clearHotel(): void { this.selectedHotelId = null; this.hotelSearch = ''; this.hotelMenuOpen = false; }
  hotelName(hotel: any): string { return this.isArabic ? (hotel?.nameAr || hotel?.nameEng || hotel?.name || '') : (hotel?.nameEng || hotel?.nameAr || hotel?.name || ''); }
  hotelMeta(hotel: any): string { return [hotel?.destinationName, hotel?.addressEng || hotel?.address].filter(Boolean).join(' · '); }
  private rows(response: any): any[] { const data = response?.data ?? response; const rows = Array.isArray(data) ? data : data?.data ?? data?.items ?? []; return Array.isArray(rows) ? rows : []; }
}
