import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  hotels: any[] = [];
  hotelQuery = '';
  selectedHotelId: number | null = null;
  loading = false;
  error = '';

  constructor(private readonly api: ApiService, private readonly language: LanguageService, private readonly cdr: ChangeDetectorRef) {}

  get isArabic(): boolean { return this.language.currentLanguage() === 'ar'; }

  get suggestions(): any[] {
    const query = this.hotelQuery.trim().toLowerCase();
    if (!query) return this.hotels.slice(0, 10);
    return this.hotels.filter((hotel) => [hotel.nameEng, hotel.nameAr, hotel.name, hotel.destinationName].some((value) => String(value ?? '').toLowerCase().includes(query))).slice(0, 10);
  }

  ngOnInit(): void {
    this.loading = true;
    this.api.get('Hotels?page=1&pageSize=500').pipe(catchError(() => { this.error = 'hotelServiceUnavailable'; return of(null); }), finalize(() => { this.loading = false; this.cdr.markForCheck(); })).subscribe((response: any) => { this.hotels = this.rows(response); });
  }

  selectHotel(hotel: any): void {
    this.selectedHotelId = Number(hotel?.id) || null;
    this.hotelQuery = this.hotelName(hotel);
  }

  clearHotel(): void { this.selectedHotelId = null; this.hotelQuery = ''; }
  hotelName(hotel: any): string { return this.isArabic ? (hotel?.nameAr || hotel?.nameEng || hotel?.name || '') : (hotel?.nameEng || hotel?.nameAr || hotel?.name || ''); }
  hotelMeta(hotel: any): string { return [hotel?.destinationName, hotel?.addressEng || hotel?.address].filter(Boolean).join(' · '); }
  private rows(response: any): any[] { const data = response?.data ?? response; const rows = Array.isArray(data) ? data : data?.data ?? data?.items ?? []; return Array.isArray(rows) ? rows : []; }
}
