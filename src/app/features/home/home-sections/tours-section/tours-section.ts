import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ApiService } from '../../../../core/services/apiservice.service';
import { CurrencyService } from '../../../../core/services/currency.service';
import { PaginationModel } from '../../../../core/models/pagination.model';
import { IGenericResponse } from '../../../../core/models/genericReponse.model';
import { formatHomePrice } from '../../home-price.util';
export interface TourHomeDTO {
  id: number;
  routeName?: string | null;
  coverImageUrl: string | null;
  titleAr: string;
  titleEng: string;
  destinationName: string;
  description?: string | null;
  fullDescription?: string | null;
  descriptionEng?: string | null;
  descriptionAr?: string | null;
  fullDescriptionEng?: string | null;
  fullDescriptionAr?: string | null;
  pricePerPerson?: number;
  discountedPricePerPerson?: number | null;
  activeDiscount?: { isCurrentlyActive: boolean; percentage: number } | null;
  
}
@Component({
  selector: 'app-tours-section',
  imports: [RouterLink, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tours-section.html',
})

export class ToursSection implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly currencyService = inject(CurrencyService);
  private readonly translate = inject(TranslateService);

  tours: TourHomeDTO[] = [];
  isLoading = false;
  hasError = false;

  ngOnInit(): void {
    this.loadTours();
  }

  loadTours(): void {
    this.isLoading = true;
    this.hasError = false;
    this.apiService.getUnauthntecated('tours/GetHomePage').pipe(
      catchError(() => {
        this.hasError = true;
        return of(null);
      }),
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: IGenericResponse<PaginationModel<TourHomeDTO>>) => {
     var res= response?.data;
 
      this.tours = Array.isArray(res?.data ) ? res.data : [];
    });
  }

  formattedPrice(item: any): string {
    return formatHomePrice(this.currencyService, item?.discountedPricePerPerson ?? item?.pricePerPerson ?? item?.price, item);
  }

  formattedOriginalPrice(item: any): string {
    return formatHomePrice(this.currencyService, item?.pricePerPerson ?? item?.price, item);
  }

  imageUrl(item: any): string {
    const url = item?.coverImageUrl ?? item?.imageUrl ?? '';
    if (!url) return 'assets/images/bg/3.jpg';
    if (/^(blob:|data:|https?:\/\/)/i.test(url)) return url;
    const path = String(url).replace(/^\/+/, '').replace(/^images\//i, '');
    return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
  }

  tourTitle(item: any): string {
    return this.isArabic ? (item?.titleAr || item?.titleEng || '') : (item?.titleEng || item?.titleAr || '');
  }

  tourDescription(item: any): string {
    return this.isArabic
      ? (item?.descriptionAr || item?.fullDescriptionAr || item?.descriptionEng || item?.fullDescriptionEng || item?.description || item?.fullDescription || '')
      : (item?.descriptionEng || item?.fullDescriptionEng || item?.description || item?.fullDescription || item?.descriptionAr || item?.fullDescriptionAr || '');
  }

  private get isArabic(): boolean { return (this.translate.currentLang?.() ?? '').toLowerCase().startsWith('ar'); }
}
