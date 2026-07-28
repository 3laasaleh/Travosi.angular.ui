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
import { ApiService } from '../../../../core/services/apiservice.service';
import Swal from 'sweetalert2';

interface PaginationInfoDTO {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

@Component({
  selector: 'app-admin-hotels-list',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './hotels-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelsList implements OnInit, OnChanges {
  readonly pageSizeOptions = [10, 20, 50];
  @Input() viewMode: 'table' | 'grid' = 'table';
  @Input() refreshToken = 0;
  @Output() editRequested = new EventEmitter<any>();

  hotels: any[] = [];
  isLoading = false;
  statusUpdatingId: number | null = null;
  errorMessage = '';
  successMessage = '';
  paginationInfo: PaginationInfoDTO = { page: 1, pageSize: 10, totalCount: 0, totalPages: 0 };

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.loadHotels();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['refreshToken'] && !changes['refreshToken'].firstChange) {
      this.paginationInfo.page = 1;
      this.loadHotels();
    }
  }

  loadHotels(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.apiService.get(`Hotels/GetAll?page=${this.paginationInfo.page}&pageSize=${this.paginationInfo.pageSize}`).pipe(
      catchError(() => {
        this.errorMessage = 'hotelServiceUnavailable';
        return of(null);
      }),
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      const pageData = response?.data ?? response;
      const rows = pageData?.data ?? pageData?.items ?? pageData?.hotels ?? pageData;
      this.hotels = Array.isArray(rows) ? rows : [];
      this.paginationInfo = {
        page: Number(pageData?.page ?? this.paginationInfo.page),
        pageSize: Number(pageData?.pageSize ?? this.paginationInfo.pageSize),
        totalCount: Number(pageData?.totalCount ?? this.hotels.length),
        totalPages: Math.max(1, Number(pageData?.totalPages ?? 1)),
      };
    });
  }

  previousPage(): void {
    if (this.paginationInfo.page > 1) {
      this.paginationInfo.page--;
      this.loadHotels();
    }
  }

  onPageSizeChange(event: Event): void {
    const pageSize = Number((event.target as HTMLSelectElement).value);
    if (!this.pageSizeOptions.includes(pageSize)) return;
    this.paginationInfo.pageSize = pageSize;
    this.paginationInfo.page = 1;
    this.loadHotels();
  }

  nextPage(): void {
    if (this.paginationInfo.page < this.paginationInfo.totalPages) {
      this.paginationInfo.page++;
      this.loadHotels();
    }
  }

  async toggleHotelStatus(hotel: any): Promise<void> {
    if (this.statusUpdatingId !== null) return;
    const result = await Swal.fire({
      title: this.translate.instant('confirmStatusChange'),
      text: this.translate.instant(
        hotel.isActive ? 'confirmDeactivateHotel' : 'confirmActivateHotel',
      ),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('confirm'),
      cancelButtonText: this.translate.instant('cancel'),
      confirmButtonColor: hotel.isActive ? '#e11d48' : '#059669',
      reverseButtons: true,
    });
    if (!result.isConfirmed) return;

    this.statusUpdatingId = Number(hotel.id);
    this.apiService.put(`Hotels/${hotel.id}/ChangeStatus`, {}).pipe(
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
      hotel.isActive = !hotel.isActive;
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: this.translate.instant('statusUpdated'),
        showConfirmButton: false,
        timer: 2200,
        timerProgressBar: true,
      });
      this.cdr.markForCheck();
    });
  }

  stars(count: number): number[] {
    return Array.from({ length: Number(count) || 0 });
  }
}
