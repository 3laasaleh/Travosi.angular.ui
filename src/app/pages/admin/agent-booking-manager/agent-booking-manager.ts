import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { PaginationOne } from '../../../components/listing/tour-grid/pagination-one/pagination-one';
import { ApiService } from '../../../core/services/apiservice.service';

@Component({
  selector: 'app-agent-booking-manager',
  standalone: true,
  imports: [DatePipe, RouterLink, TranslatePipe, PaginationOne],
  templateUrl: './agent-booking-manager.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentBookingManager implements OnInit {
  readonly pageSizeOptions = [10, 20, 50];
  bookings: any[] = [];
  isLoading = false;
  errorMessage = '';
  page = 1;
  pageSize = 10;
  totalCount = 0;
  totalPages = 1;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.apiService.get(`Booking?page=${this.page}&pageSize=${this.pageSize}`).pipe(
      catchError(() => {
        this.errorMessage = 'bookingsLoadError';
        return of(null);
      }),
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      const pageData = response?.data ?? response;
      const rows = pageData?.data ?? pageData?.items ?? pageData?.bookings ?? pageData;
      this.bookings = Array.isArray(rows) ? rows : [];
      this.totalCount = Number(pageData?.totalCount ?? this.bookings.length);
      this.totalPages = Math.max(1, Number(pageData?.totalPages ?? 1));
    });
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadBookings();
    }
  }

  onPageChange(page: number): void {
    if (page === this.page || page < 1 || page > this.totalPages) return;
    this.page = page;
    this.loadBookings();
  }

  onPageSizeChange(event: Event): void {
    const pageSize = Number((event.target as HTMLSelectElement).value);
    if (!this.pageSizeOptions.includes(pageSize)) return;
    this.pageSize = pageSize;
    this.page = 1;
    this.loadBookings();
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadBookings();
    }
  }
}
