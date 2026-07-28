import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { PaginationOne } from '../../../components/listing/tour-grid/pagination-one/pagination-one';
import { ApiService } from '../../../core/services/apiservice.service';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';
import { environment } from '../../../../environments/environment';

interface PaginationInfo {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

@Component({
  selector: 'app-home-destinations-list',
  standalone: true,
  imports: [RouterLink, TranslatePipe, HomeNavbar, FooterOne, PaginationOne],
  templateUrl: './destinations-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeDestinationsList implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly pageSizeOptions = [10, 20, 50];
  readonly heroImage = 'assets/images/bg/cta.jpg';

  destinations: any[] = [];
  isLoading = false;
  errorMessage = '';
  paginationInfo: PaginationInfo = {
    page: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 1,
  };

  ngOnInit(): void {
    this.loadDestinations();
  }

  loadDestinations(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.apiService
      .getUnauthntecated(
        `destinations?page=${this.paginationInfo.page}&pageSize=${this.paginationInfo.pageSize}`,
      )
      .pipe(
        catchError(() => {
          this.errorMessage = 'destinationsLoadError';
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe((response: any) => {
        if (response === null) {
          this.destinations = [];
          return;
        }

        const pageData = response?.data ?? response;
        const rows = pageData?.data ?? pageData?.items ?? pageData?.destinations ?? pageData;
        this.destinations = Array.isArray(rows) ? rows : [];

        const totalCount = Number(pageData?.totalCount ?? this.destinations.length);
        const pageSize = Number(pageData?.pageSize ?? this.paginationInfo.pageSize);
        this.paginationInfo = {
          page: Number(pageData?.page ?? this.paginationInfo.page),
          pageSize,
          totalCount,
          totalPages: Math.max(
            1,
            Number(pageData?.totalPages ?? Math.ceil(totalCount / Math.max(1, pageSize))),
          ),
        };
      });
  }

  onPageChange(page: number): void {
    if (
      page === this.paginationInfo.page ||
      page < 1 ||
      page > this.paginationInfo.totalPages
    ) {
      return;
    }

    this.paginationInfo.page = page;
    this.loadDestinations();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onPageSizeChange(event: Event): void {
    const pageSize = Number((event.target as HTMLSelectElement).value);
    if (!this.pageSizeOptions.includes(pageSize)) return;

    this.paginationInfo.pageSize = pageSize;
    this.paginationInfo.page = 1;
    this.loadDestinations();
  }

  imageUrl(destination: any): string {
    const image = Array.isArray(destination?.images) ? destination.images[0] : null;
    const url = image?.imageUrl ?? image?.url ?? image?.path ?? destination?.imageUrl ?? '';
    if (!url) return 'assets/images/bg/2.jpg';
    if (/^(blob:|data:|https?:\/\/)/i.test(url)) return url;
    return `${environment.imageUrl}${String(url).replace(/^\/+/, '')}`;
  }
}
