import { PaginationModel } from './../../../../shared/models/pagination.model';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, inject } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../../../core/services/apiservice.service';
import { CurrencyService } from '../../../../core/services/currency.service';
import { UtilityService } from '../../../../core/services/utilityservice';
import { IGenericResponse } from '../../../../core/models/genericReponse.model';
import { PackageDTO } from './package.model';


@Component({
  selector: 'app-packages-section',
  imports: [TranslatePipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './packages-section.html',
})
export class PackagesSection implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly translate = inject(TranslateService);
  private readonly currencyService = inject(CurrencyService);
  private readonly utilityService = inject(UtilityService);

  packages: any[] = [];
  isLoading = false;
  hasError = false;

  ngOnInit(): void {
    this.loadPackages();
  }

  loadPackages(): void {
    this.isLoading = true;
    this.hasError = false;
    this.apiService.getUnauthntecated('Packages?page=1&pageSize=8').pipe(
      catchError(() => {
        this.hasError = true;
        return of(null);
      }),
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: IGenericResponse<PaginationModel<PackageDTO[]>>) => {
      if (response === null) {
        this.packages = [];
        return;
      }
      const data = response?.data?.data ?? [];
      this.packages = data;
    });
  }

  formattedPrice(item: any): string {
    return this.utilityService.formattedPrice(this.currencyService, item);
  }

  formattedOriginalPrice(item: any): string {
    return this.utilityService.formattedOriginalPrice(this.currencyService, item);
  }

  packageTitle(item: any): string {
    return item?.title ?? item?.name ?? '';
  }

  packageDescription(item: any): string {
    return item?.description ?? item?.fullDescription ?? item?.subDescription ?? '';
  }

  imageUrl(item: any): string {
    const image = Array.isArray(item?.images) ? item.images[0] : null;
    return this.utilityService.imageUrl(image ?? item?.imageUrl ?? '');
  }

  onImageError(event: Event): void {
    this.utilityService.onImageError(event, 'assets/images/bg/2.jpg');
  }
}
