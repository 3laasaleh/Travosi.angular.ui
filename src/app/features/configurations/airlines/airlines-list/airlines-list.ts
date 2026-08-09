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

interface PaginationInfoDTO {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

@Component({
  selector: 'app-configurations-airlines-list',
  standalone: true,
  imports: [TranslatePipe, PaginationOne],
  templateUrl: './airlines-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AirlinesList implements OnInit, OnChanges {
  readonly pageSizeOptions = [10, 20, 50];
  @Input() viewMode: 'table' | 'grid' = 'table';
  @Input() refreshToken = 0;
  @Output() editRequested = new EventEmitter<any>();

  airlines: any[] = [];
  isLoading = false;
  statusUpdatingId: number | null = null;
  deletingId: number | null = null;
  errorMessage = '';
  paginationInfo: PaginationInfoDTO = { page: 1, pageSize: 10, totalCount: 0, totalPages: 0 };

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.loadAirlines();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['refreshToken'] && !changes['refreshToken'].firstChange) {
      this.paginationInfo.page = 1;
      this.loadAirlines();
    }
  }

  loadAirlines(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.apiService.get(`Airlines/GetAll?page=${this.paginationInfo.page}&pageSize=${this.paginationInfo.pageSize}`).pipe(
      catchError(() => {
        this.errorMessage = 'airlineServiceUnavailable';
        return of(null);
      }),
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      const pageData = response?.data ?? response;
      const rows = pageData?.data ?? pageData?.items ?? pageData?.airlines ?? pageData;
      this.airlines = Array.isArray(rows) ? rows : [];
      this.paginationInfo = {
        page: Number(pageData?.page ?? this.paginationInfo.page),
        pageSize: Number(pageData?.pageSize ?? this.paginationInfo.pageSize),
        totalCount: Number(pageData?.totalCount ?? this.airlines.length),
        totalPages: Math.max(1, Number(pageData?.totalPages ?? 1)),
      };
    });
  }

  previousPage(): void {
    if (this.paginationInfo.page > 1) {
      this.paginationInfo.page--;
      this.loadAirlines();
    }
  }

  onPageChange(page: number): void {
    if (page === this.paginationInfo.page || page < 1 || page > this.paginationInfo.totalPages) return;
    this.paginationInfo.page = page;
    this.loadAirlines();
  }

  onPageSizeChange(event: Event): void {
    const pageSize = Number((event.target as HTMLSelectElement).value);
    if (!this.pageSizeOptions.includes(pageSize)) return;
    this.paginationInfo.pageSize = pageSize;
    this.paginationInfo.page = 1;
    this.loadAirlines();
  }

  nextPage(): void {
    if (this.paginationInfo.page < this.paginationInfo.totalPages) {
      this.paginationInfo.page++;
      this.loadAirlines();
    }
  }

  async toggleAirlineStatus(airline: any): Promise<void> {
    if (this.statusUpdatingId !== null) return;
    const airlineId = Number(airline?.id);
    if (!Number.isInteger(airlineId) || airlineId <= 0) return;
    const isActive = airline?.isActive !== false;
    const confirmation = await Swal.fire({
      title: this.translate.instant('confirmStatusChange'),
      text: this.translate.instant(isActive ? 'confirmDeactivateAirline' : 'confirmActivateAirline'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('confirm'),
      cancelButtonText: this.translate.instant('cancel'),
      confirmButtonColor: isActive ? '#e11d48' : '#059669',
      reverseButtons: true,
    });
    if (!confirmation.isConfirmed) return;

    this.statusUpdatingId = airlineId;
    this.apiService.patch(`Airlines/${airlineId}/ChangeStatus`, {}).pipe(
      catchError(() => {
        Swal.fire({ icon: 'error', title: this.translate.instant('airlineStatusUpdateError') });
        return of({ statusToggleFailed: true });
      }),
      finalize(() => {
        this.statusUpdatingId = null;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response?.statusToggleFailed || response?.isSuccess === false) {
        if (response?.isSuccess === false) {
          Swal.fire({ icon: 'error', title: response?.message || this.translate.instant('airlineStatusUpdateError') });
        }
        return;
      }
      airline.isActive = !isActive;
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: this.translate.instant('airlineStatusUpdated'),
        showConfirmButton: false,
        timer: 2200,
        timerProgressBar: true,
      });
      this.cdr.markForCheck();
    });
  }

  logoUrl(airline: any): string {
    const url = String(airline?.logoUrl ?? '');
    if (!url || /^(blob:|data:|https?:\/\/)/i.test(url)) return url;
    const path = url.replace(/^\/+/, '').replace(/^images\//i, '');
    return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
  }

  async deleteAirline(airline: any): Promise<void> {
    if (this.deletingId !== null) return;
    const result = await Swal.fire({ title: this.translate.instant('confirmDeleteRecord'), text: this.translate.instant('recordDeleteWarning'), icon: 'warning', showCancelButton: true, confirmButtonText: this.translate.instant('delete'), cancelButtonText: this.translate.instant('cancel'), confirmButtonColor: '#e11d48', reverseButtons: true });
    if (!result.isConfirmed) return;
    this.deletingId = Number(airline.id);
    this.apiService.deleteRequest(`Airlines/${airline.id}`).pipe(
      catchError(() => { Swal.fire({ icon: 'error', title: this.translate.instant('recordDeleteError') }); return of(null); }),
      finalize(() => { this.deletingId = null; this.cdr.markForCheck(); }),
    ).subscribe((response: any) => { if (response?.isSuccess === false || response === null) return; this.loadAirlines(); });
  }
}
