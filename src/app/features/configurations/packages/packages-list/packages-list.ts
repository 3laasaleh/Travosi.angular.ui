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
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from '../../../../../environments/environment';
import { ApiService } from '../../../../core/services/apiservice.service';
import { PaginationOne } from '../../../../shared/components/listing/tour-grid/pagination-one/pagination-one';

interface PaginationInfo {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

@Component({
  selector: 'app-configurations-packages-list',
  standalone: true,
  imports: [TranslatePipe, PaginationOne],
  templateUrl: './packages-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackagesList implements OnInit, OnChanges {
  @Input() viewMode: 'table' | 'grid' = 'grid';
  @Input() refreshToken = 0;
  @Output() previewRequested = new EventEmitter<any>();
  @Output() editRequested = new EventEmitter<any>();

  readonly pageSizeOptions = [10, 20, 50];
  packages: any[] = [];
  isLoading = false;
  statusUpdatingId: number | null = null;
  errorMessage = '';
  paginationInfo: PaginationInfo = { page: 1, pageSize: 10, totalCount: 0, totalPages: 1 };

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.loadPackages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['refreshToken'] && !changes['refreshToken'].firstChange) {
      this.paginationInfo.page = 1;
      this.loadPackages();
    }
  }

  loadPackages(): void {
    this.isLoading = true;
    this.errorMessage = '';
    const query = `page=${this.paginationInfo.page}&pageSize=${this.paginationInfo.pageSize}`;
    this.apiService.get(`Packages/GetAll?${query}`).pipe(
      catchError(() => this.apiService.get(`Packages?${query}`).pipe(
        catchError(() => {
          this.errorMessage = 'packagesLoadError';
          return of(null);
        }),
      )),
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      const pageData = response?.data ?? response;
      const rows = pageData?.data ?? pageData?.items ?? pageData?.packages ?? pageData;
      this.packages = Array.isArray(rows) ? rows : [];
      const totalCount = Number(pageData?.totalCount ?? this.packages.length);
      const pageSize = Number(pageData?.pageSize ?? this.paginationInfo.pageSize);
      this.paginationInfo = {
        page: Number(pageData?.page ?? this.paginationInfo.page),
        pageSize,
        totalCount,
        totalPages: Math.max(1, Number(pageData?.totalPages ?? Math.ceil(totalCount / Math.max(1, pageSize)))),
      };
    });
  }

  onPageChange(page: number): void {
    if (page === this.paginationInfo.page || page < 1 || page > this.paginationInfo.totalPages) return;
    this.paginationInfo.page = page;
    this.loadPackages();
  }

  onPageSizeChange(event: Event): void {
    const pageSize = Number((event.target as HTMLSelectElement).value);
    if (!this.pageSizeOptions.includes(pageSize)) return;
    this.paginationInfo.pageSize = pageSize;
    this.paginationInfo.page = 1;
    this.loadPackages();
  }

  async togglePackageStatus(travelPackage: any): Promise<void> {
    if (this.statusUpdatingId !== null) return;
    const isActive = travelPackage.isActive !== false;
    const result = await Swal.fire({
      title: this.translate.instant('confirmStatusChange'),
      text: this.translate.instant(isActive ? 'confirmDeactivatePackage' : 'confirmActivatePackage'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('confirm'),
      cancelButtonText: this.translate.instant('cancel'),
      confirmButtonColor: isActive ? '#e11d48' : '#059669',
      reverseButtons: true,
    });
    if (!result.isConfirmed) return;

    this.statusUpdatingId = Number(travelPackage.id ?? travelPackage.packageId);
    this.apiService.patch('Packages/ChangeStatus', {
      Id: this.statusUpdatingId,
      IsActive: !isActive,
    }).pipe(
      catchError(() => {
        Swal.fire({ icon: 'error', title: this.translate.instant('statusUpdateError') });
        return of({ statusToggleFailed: true });
      }),
      finalize(() => {
        this.statusUpdatingId = null;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response?.statusToggleFailed) return;
      travelPackage.isActive = !isActive;
      Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: this.translate.instant('statusUpdated'), showConfirmButton: false, timer: 2200, timerProgressBar: true });
      this.cdr.markForCheck();
    });
  }

  packageTitle(item: any): string {
    return item?.titleEng ?? item?.title ?? item?.nameEng ?? item?.name ?? '';
  }

  destinationName(item: any): string {
    const destinations = Array.isArray(item?.destinations) ? item.destinations : [];
    if (destinations.length) {
      return destinations
        .map((destination: any) => destination?.destinationName ?? destination?.nameEng ?? destination?.name)
        .filter(Boolean)
        .join(', ');
    }
    return item?.destination?.nameEng ?? item?.destinationName ?? `#${item?.destinationId ?? '-'}`;
  }

  imageUrl(item: any): string {
    const image = Array.isArray(item?.images) ? item.images[0] : null;
    const url = image?.imageUrl ?? image?.url ?? image?.path ?? item?.coverImageUrl ?? item?.imageUrl ?? '';
    if (!url || /^(blob:|data:|https?:\/\/)/i.test(url)) return url;
    const path = String(url).replace(/^\/+/, '').replace(/^images\//i, '');
    return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
  }

  packagePrice(item: any): string {
    const price = Number(item?.pricePerPerson ?? item?.price ?? 0);
    return `$${Number.isFinite(price) ? price : 0}`;
  }
}
