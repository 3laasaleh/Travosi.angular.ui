import { DecimalPipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { catchError, finalize, of } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ApiService } from '../../../../core/services/apiservice.service';
import { apiCurrencyLabel, apiPrice } from '../../../../core/utils/api-price.util';

@Component({
  selector: 'app-packages-section',
  imports: [TranslatePipe, RouterLink, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './packages-section.html',
})
export class PackagesSection implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);

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
    ).subscribe((response: any) => {
      if (response === null) {
        this.packages = [];
        return;
      }
      const pageData = response?.data ?? response;
      const rows = pageData?.data ?? pageData?.items ?? pageData?.packages ?? pageData;
      this.packages = Array.isArray(rows) ? rows.slice(0, 8) : [];
    });
  }

  price(item: any): number {
    return apiPrice(item?.pricePerPerson ?? item?.price);
  }

  currencyLabel(item: any): string {
    return apiCurrencyLabel(item);
  }

  imageUrl(item: any): string {
    const image = Array.isArray(item?.images) ? item.images[0] : null;
    const url = image?.imageUrl ?? image?.url ?? item?.imageUrl ?? '';
    if (!url) return 'assets/images/bg/2.jpg';
    return url.startsWith('http') ? url : environment.imageUrl + url;
  }
}
