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
import { DatePipe } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../../../core/services/apiservice.service';
import { FLIGHT_CLASS_OPTIONS } from '../flight-class.enum';
import { PaginationOne } from '../../../../shared/components/listing/tour-grid/pagination-one/pagination-one';
import Swal from 'sweetalert2';

interface PaginationInfoDTO {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

@Component({
  selector: 'app-configurations-flights-list',
  standalone: true,
  imports: [TranslatePipe, DatePipe, PaginationOne],
  templateUrl: './flights-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightsList implements OnInit, OnChanges {
  readonly pageSizeOptions = [10, 20, 50];
  @Input() viewMode: 'table' | 'grid' = 'table';
  @Input() refreshToken = 0;
  @Output() editRequested = new EventEmitter<any>();

  flights: any[] = [];
  isLoading = false;
  errorMessage = '';
  statusUpdatingId: number | null = null;
  deletingId: number | null = null;
  paginationInfo: PaginationInfoDTO = { page: 1, pageSize: 10, totalCount: 0, totalPages: 0 };

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.loadFlights();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['refreshToken'] && !changes['refreshToken'].firstChange) {
      this.paginationInfo.page = 1;
      this.loadFlights();
    }
  }

  loadFlights(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.apiService.get(`Flights/GetAll?page=${this.paginationInfo.page}&pageSize=${this.paginationInfo.pageSize}`).pipe(
      catchError(() => {
        this.errorMessage = 'flightServiceUnavailable';
        return of(null);
      }),
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      const pageData = response?.data ?? response;
      const rows = pageData?.data ?? pageData?.items ?? pageData?.flights ?? pageData;
      this.flights = Array.isArray(rows) ? rows : [];
      this.paginationInfo = {
        page: Number(pageData?.page ?? this.paginationInfo.page),
        pageSize: Number(pageData?.pageSize ?? this.paginationInfo.pageSize),
        totalCount: Number(pageData?.totalCount ?? this.flights.length),
        totalPages: Math.max(1, Number(pageData?.totalPages ?? 1)),
      };
    });
  }

  previousPage(): void {
    if (this.paginationInfo.page > 1) {
      this.paginationInfo.page--;
      this.loadFlights();
    }
  }

  onPageChange(page: number): void {
    if (page === this.paginationInfo.page || page < 1 || page > this.paginationInfo.totalPages) return;
    this.paginationInfo.page = page;
    this.loadFlights();
  }

  onPageSizeChange(event: Event): void {
    const pageSize = Number((event.target as HTMLSelectElement).value);
    if (!this.pageSizeOptions.includes(pageSize)) return;
    this.paginationInfo.pageSize = pageSize;
    this.paginationInfo.page = 1;
    this.loadFlights();
  }

  nextPage(): void {
    if (this.paginationInfo.page < this.paginationInfo.totalPages) {
      this.paginationInfo.page++;
      this.loadFlights();
    }
  }

  flightClassKey(value: number): string {
    return FLIGHT_CLASS_OPTIONS.find((option) => option.value === Number(value))?.labelKey ?? '';
  }

  async toggleFlightStatus(flight: any): Promise<void> {
    if (this.statusUpdatingId !== null) return;
    const result = await Swal.fire({
      title: this.translate.instant('confirmStatusChange'),
      text: this.translate.instant(flight.isActive === false ? 'confirmActivateFlight' : 'confirmDeactivateFlight'),
      icon: 'warning', showCancelButton: true,
      confirmButtonText: this.translate.instant('confirm'), cancelButtonText: this.translate.instant('cancel'),
      confirmButtonColor: flight.isActive === false ? '#059669' : '#e11d48', reverseButtons: true,
    });
    if (!result.isConfirmed) return;
    this.statusUpdatingId = Number(flight.id);
    this.apiService.patch(`Flights/${flight.id}/ChangeStatus`, {}).pipe(
      catchError(() => { Swal.fire({ icon: 'error', title: this.translate.instant('statusUpdateError') }); return of(null); }),
      finalize(() => { this.statusUpdatingId = null; this.cdr.markForCheck(); }),
    ).subscribe((response: any) => {
      if (response?.isSuccess === false || response === null) return;
      flight.isActive = flight.isActive === false;
      this.cdr.markForCheck();
    });
  }

  async deleteFlight(flight: any): Promise<void> {
    if (this.deletingId !== null) return;
    const result = await Swal.fire({ title: this.translate.instant('confirmDeleteRecord'), text: this.translate.instant('recordDeleteWarning'), icon: 'warning', showCancelButton: true, confirmButtonText: this.translate.instant('delete'), cancelButtonText: this.translate.instant('cancel'), confirmButtonColor: '#e11d48', reverseButtons: true });
    if (!result.isConfirmed) return;
    this.deletingId = Number(flight.id);
    this.apiService.deleteRequest(`Flights/${flight.id}`).pipe(
      catchError(() => { Swal.fire({ icon: 'error', title: this.translate.instant('recordDeleteError') }); return of(null); }),
      finalize(() => { this.deletingId = null; this.cdr.markForCheck(); }),
    ).subscribe((response: any) => { if (response?.isSuccess === false || response === null) return; this.loadFlights(); });
  }
}
