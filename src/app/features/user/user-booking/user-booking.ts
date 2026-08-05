import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AccountTab } from '../account-tab/account-tab';
import { FooterOne } from '../../../layout/footer-one/footer-one';

import { ApiService } from '../../../core/services/apiservice.service';
import { AuthService } from '../_services/auth.service';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';

interface UserBookingItem {
  id: number;
  tourTitle?: string;
  packageName?: string;
  createdDate: string;
  dateFrom: string;
  dateTo: string;
  numberOfTravelers: number;
  statusName: string;
  totalPrice: number;
  cancellationFeeAmount: number;
}

@Component({
  selector: 'app-user-booking',
  standalone: true,
  imports: [CommonModule, HomeNavbar, AccountTab, FooterOne],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './user-booking.html',
})
export class UserBooking implements OnInit {
  bookings: UserBookingItem[] = [];
  isLoading = false;
  errorMessage = '';
  page = 1;
  pageSize = 10;
  pageSizes = [10, 20, 50];

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurentUser();
    if (!user) {
      this.router.navigate(['login']);
      return;
    }

    this.loadBookings(user.userId);
  }

  get pagedBookings(): UserBookingItem[] {
    const start = (this.page - 1) * this.pageSize;
    return this.bookings.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.bookings.length / this.pageSize));
  }

  loadBookings(userId: string): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.apiService.get(`Bookings/user/${userId}`).subscribe({
      next: (data) => {
        this.bookings = Array.isArray(data) ? data : [];
        this.page = 1;
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.errorMessage = 'Unable to load your bookings. Please try again later.';
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      complete: () => {
        this.isLoading = false;
        this.cdr.markForCheck();
      },
    });
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page -= 1;
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page += 1;
    }
  }

  onPageSizeChange(event: Event): void {
    const value = Number((event.target as HTMLSelectElement).value);
    if (value > 0) {
      this.pageSize = value;
      this.page = 1;
    }
  }
}
