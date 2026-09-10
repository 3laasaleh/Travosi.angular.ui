import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../../../core/services/apiservice.service';
import { CurrencyService } from '../../../../core/services/currency.service';
import { UtilityService } from '../../../../core/services/utilityservice';
import { PaginationModel } from '../../../../core/models/pagination.model';
import { IGenericResponse } from '../../../../core/models/genericReponse.model';
import { TourCard } from '../../../../shared/components/tour-card/tour-card';
export interface TourHomeDTO {
  [key: string]: any;
  id: number;
  routeName?: string | null;
  coverImageUrl: string | null;
  images: TourImageDTO[];
  title: string;
  destinationId: number;
  destinationName: string;
  cityId?: number | null;
  description?: string | null;
  fullDescription?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  pricePerPerson?: number;
  discountedPricePerPerson?: number | null;
  activeDiscount?: { isCurrentlyActive: boolean; percentage: number } | null;
}

export interface TourImageDTO {
  id?: number;
  imageName?: string;
  imageUrl?: string;
  url?: string;
  altEng?: string;
  altAr?: string;
}
@Component({
  selector: 'app-tours-section',
  imports: [RouterLink, TranslatePipe, TourCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tours-section.html',
})
export class ToursSection implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly currencyService = inject(CurrencyService);
  private readonly translate = inject(TranslateService);
  private readonly utilityService = inject(UtilityService);

  tours: TourHomeDTO[] = [];
  isLoading = false;
  hasError = false;

  ngOnInit(): void {
    this.loadTours();
  }

  loadTours(): void {
    this.isLoading = true;
    this.hasError = false;
    this.apiService
      .getUnauthntecated('tours/GetHomePage')
      .pipe(
        catchError(() => {
          this.hasError = true;
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe((response: IGenericResponse<PaginationModel<TourHomeDTO>>) => {
        var res = response?.data;
        this.tours = res?.data ?? [];
        this.isLoading = false;
        this.cdr.markForCheck();
      });
  }

  formattedPrice(item: any): string {
    return this.utilityService.formattedPrice(this.currencyService, item);
  }

  formattedOriginalPrice(item: any): string {
    return this.utilityService.formattedOriginalPrice(this.currencyService, item);
  }

  imageUrl(item: any): string {
    return this.utilityService.imageUrl(item?.coverImageUrl ?? item?.imageUrl ?? '');
  }

  tourTitle(item: any): string {
    return item?.title ?? item?.name ?? '';
  }

  tourDescription(item: any): string {
    return item?.description ?? item?.fullDescription ?? item?.subDescription ?? '';
  }

  private get isArabic(): boolean {
    return this.utilityService.isArabic(this.translate);
  }
}
