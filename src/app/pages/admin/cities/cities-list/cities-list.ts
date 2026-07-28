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
import { PaginationOne } from '../../../../components/listing/tour-grid/pagination-one/pagination-one';
import { ApiService } from '../../../../core/services/apiservice.service';
import { CityDTO } from '../cities-from-card/cities-from-card';

interface PaginationInfoDTO {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

@Component({
  selector: 'app-admin-cities-list',
  standalone: true,
  imports: [TranslatePipe, PaginationOne],
  templateUrl: './cities-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CitiesList implements OnInit, OnChanges {
  readonly pageSizeOptions = [10, 20, 50];
  @Input() viewMode: 'table' | 'grid' = 'table';
  @Input() refreshToken = 0;
  @Output() editRequested = new EventEmitter<CityDTO>();

  cities: CityDTO[] = [];
  isLoading = false;
  statusUpdatingId: number | null = null;
  errorMessage = '';
  paginationInfo: PaginationInfoDTO = { page: 1, pageSize: 10, totalCount: 0, totalPages: 1 };

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.loadCities();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['refreshToken'] && !changes['refreshToken'].firstChange) {
      this.paginationInfo.page = 1;
      this.loadCities();
    }
  }

  loadCities(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.apiService.get(`Cities/GetAll?page=${this.paginationInfo.page}&pageSize=${this.paginationInfo.pageSize}`).pipe(
      catchError(() => {
        this.errorMessage = 'cityServiceUnavailable';
        return of(null);
      }),
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      const pageData = response?.data ?? response;
      const rows = pageData?.data ?? pageData?.items ?? pageData?.cities ?? pageData;
      this.cities = Array.isArray(rows) ? rows : [];
      this.paginationInfo = {
        page: Number(pageData?.page ?? this.paginationInfo.page),
        pageSize: Number(pageData?.pageSize ?? this.paginationInfo.pageSize),
        totalCount: Number(pageData?.totalCount ?? this.cities.length),
        totalPages: Math.max(1, Number(pageData?.totalPages ?? 1)),
      };
    });
  }

  previousPage(): void {
    if (this.paginationInfo.page > 1) {
      this.paginationInfo.page--;
      this.loadCities();
    }
  }

  onPageChange(page: number): void {
    if (page === this.paginationInfo.page || page < 1 || page > this.paginationInfo.totalPages) return;
    this.paginationInfo.page = page;
    this.loadCities();
  }

  onPageSizeChange(event: Event): void {
    const pageSize = Number((event.target as HTMLSelectElement).value);
    if (!this.pageSizeOptions.includes(pageSize)) return;
    this.paginationInfo.pageSize = pageSize;
    this.paginationInfo.page = 1;
    this.loadCities();
  }

  nextPage(): void {
    if (this.paginationInfo.page < this.paginationInfo.totalPages) {
      this.paginationInfo.page++;
      this.loadCities();
    }
  }

  async toggleCityStatus(city: CityDTO): Promise<void> {
    if (this.statusUpdatingId !== null) return;
    const result = await Swal.fire({
      title: this.translate.instant('confirmStatusChange'),
      text: this.translate.instant(
        city.isActive !== false ? 'confirmDeactivateCity' : 'confirmActivateCity',
      ),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('confirm'),
      cancelButtonText: this.translate.instant('cancel'),
      confirmButtonColor: city.isActive !== false ? '#e11d48' : '#059669',
      reverseButtons: true,
    });
    if (!result.isConfirmed) return;

    this.statusUpdatingId = Number(city.id);
    this.apiService.patch(`Cities/${city.id}/ChangeStatus`, {}).pipe(
      catchError(() => {
        Swal.fire({ icon: 'error', title: this.translate.instant('statusUpdateError') });
        return of(null);
      }),
      finalize(() => {
        this.statusUpdatingId = null;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null || response?.isSuccess === false) return;
      city.isActive = !city.isActive;
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: this.translate.instant('cityStatusUpdated'),
        showConfirmButton: false,
        timer: 2200,
        timerProgressBar: true,
      });
      this.cdr.markForCheck();
    });
  }
}
