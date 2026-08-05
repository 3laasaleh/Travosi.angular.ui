import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ApiService } from '../../../../core/services/apiservice.service';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-destinations-section',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './destinations-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestinationsSection implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly languageService = inject(LanguageService);

  destinations: any[] = [];
  isLoading = true;
  hasError = false;

  ngOnInit(): void {
    this.loadDestinations();
  }

  loadDestinations(): void {
    this.isLoading = true;
    this.hasError = false;

    this.apiService
      .getUnauthntecated('destinations?page=1&pageSize=6')
      .pipe(
        catchError(() => {
          this.hasError = true;
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((response: any) => {
        if (response === null) {
          this.destinations = [];
          return;
        }

        const pageData = response?.data ?? response;
        const rows = pageData?.data ?? pageData?.items ?? pageData?.destinations ?? pageData;
        this.destinations = Array.isArray(rows) ? rows.slice(0, 6) : [];
      });
  }

  destinationName(destination: any): string {
    const isArabic = this.languageService.getCurrentLanguage() === 'ar';
    return isArabic
      ? destination?.nameAr ?? destination?.nameEng ?? destination?.name ?? ''
      : destination?.nameEng ?? destination?.name ?? destination?.nameAr ?? '';
  }

  imageUrl(destination: any): string {
    const image = Array.isArray(destination?.images) ? destination.images[0] : null;
    const url =
      image?.imageUrl ??
      image?.url ??
      image?.path ??
      destination?.coverImageUrl ??
      destination?.imageUrl ??
      '';

    if (!url) return 'assets/images/bg/2.jpg';
    if (/^(blob:|data:|https?:\/\/)/i.test(url)) return url;

    return `${environment.imageUrl.replace(/\/+$/, '')}/${String(url).replace(/^\/+/, '')}`;
  }
}
