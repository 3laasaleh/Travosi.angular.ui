import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PaginationOne } from '../../../../components/listing/tour-grid/pagination-one/pagination-one';
import { AdminService } from '../../admin.service';

interface PaginationInfoDTO {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

@Component({
  selector: 'app-admin-tours-list',
  standalone: true,
  imports: [TranslatePipe, PaginationOne],
  templateUrl: './tours-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToursList implements OnInit, OnChanges {
  readonly pageSizeOptions = [10, 20, 50];
  readonly currencies = [
    { id: 2, code: 'USD' },
    { id: 1, code: 'EGP' },
  ];
  @Input() viewMode: 'table' | 'grid' = 'table';
  @Input() refreshToken = 0;
  @Output() previewRequested = new EventEmitter<any>();
  @Output() editRequested = new EventEmitter<any>();

  tours: any[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  paginationInfo: PaginationInfoDTO = { page: 1, pageSize: 10, totalCount: 0, totalPages: 0 };

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadTours();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['refreshToken'] && !changes['refreshToken'].firstChange) {
      this.paginationInfo.page = 1;
      this.loadTours();
    }
  }

  loadTours(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.adminService.getTours(this.paginationInfo.page, this.paginationInfo.pageSize).pipe(
      catchError(() => {
        this.errorMessage = 'toursLoadError';
        return of(null);
      }),
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      const pageData = response?.data ?? response;
      const rows = pageData?.data ?? pageData?.items ?? pageData?.tours ?? pageData;
      this.tours = Array.isArray(rows) ? rows : [];
      this.paginationInfo = {
        page: Number(pageData?.page ?? this.paginationInfo.page),
        pageSize: Number(pageData?.pageSize ?? this.paginationInfo.pageSize),
        totalCount: Number(pageData?.totalCount ?? this.tours.length),
        totalPages: Math.max(1, Number(pageData?.totalPages ?? 1)),
      };
    });
  }

  onPageChange(page: number): void {
    if (page === this.paginationInfo.page || page < 1 || page > this.paginationInfo.totalPages) return;
    this.paginationInfo.page = page;
    this.loadTours();
  }

  onPageSizeChange(event: Event): void {
    const pageSize = Number((event.target as HTMLSelectElement).value);
    if (!this.pageSizeOptions.includes(pageSize)) return;
    this.paginationInfo.pageSize = pageSize;
    this.paginationInfo.page = 1;
    this.loadTours();
  }

  destinationName(tour: any): string {
    return (
      tour?.destination?.nameEng ??
      tour?.destinationName ??
      `Destination #${tour?.destinationId}`
    );
  }

  tourDuration(tour: any): string {
    const days = Number(tour?.durationDays ?? 0);
    const hours = Number(tour?.durationhours ?? tour?.durationHours ?? 0);
    return `${days}d ${hours}h`;
  }

  tourPrice(tour: any): string {
    const currency = this.currencies.find((item) => item.id === Number(tour?.currencyId));
    return `${tour?.pricePerPerson ?? tour?.price ?? 0} ${currency?.code ?? ''}`.trim();
  }

  getImages(tour: any): any[] {
    if (Array.isArray(tour?.images) && tour.images.length) return tour.images;
    const cover = tour?.coverImageUrl ?? tour?.imageUrl;
    return cover ? [{ url: cover }] : [];
  }

  imageUrl(image: any): string {
    const url = typeof image === 'string' ? image : (image?.imageUrl ?? image?.url ?? image?.path ?? '');
    if (!url || /^(blob:|data:|https?:\/\/)/i.test(url)) return url;
    const path = String(url).replace(/^\/+/, '').replace(/^images\//i, '');
    return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
  }
}
