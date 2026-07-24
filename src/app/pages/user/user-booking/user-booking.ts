import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AccountTab } from '../account-tab/account-tab';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { SwitcherOne } from '../../../components/switcher-one/switcher-one';
import { ApiService } from '../../../core/services/apiservice.service';
import { AuthService } from '../_services/auth.service';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';

interface UserBookingItem {
  bookingId: string;
  tourName: string;
  destination: string;
  bookingDate: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  status: string;
  totalAmount: string;
}

@Component({
  selector: 'app-user-booking',
  standalone: true,
  imports: [CommonModule, HomeNavbar, AccountTab, FooterOne, SwitcherOne],
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

    this.apiService.get(`Booking/user/${userId}`).subscribe({
      next: (data) => {
        this.bookings = Array.isArray(data) ? data : [];
        this.page = 1;
      },
      error: () => {
        this.errorMessage = 'Unable to load your bookings. Please try again later.';
      },
      complete: () => {
        this.isLoading = false;
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
