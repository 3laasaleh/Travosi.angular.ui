import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import Swal from 'sweetalert2';
import { ApiService } from '../../../../core/services/apiservice.service';

@Component({
  selector: 'app-discount-manager',
  standalone: true,
  imports: [FormsModule, DatePipe, TranslatePipe],
  templateUrl: './discount-manager.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscountManager implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly translate = inject(TranslateService);

  @Input({ required: true }) productType: 'tour' | 'package' = 'tour';
  @Input({ required: true }) product: any;
  @Output() closeRequested = new EventEmitter<void>();
  @Output() discountChanged = new EventEmitter<void>();

  history: any[] = [];
  isLoading = true;
  isSaving = false;
  stoppingId: number | null = null;
  errorMessage = '';
  percentage = 10;
  dateFrom = '';
  dateTo = '';
  restartSource: any = null;

  get productId(): number {
    return Number(this.product?.id ?? this.product?.tourId ?? this.product?.packageId);
  }

  get productName(): string {
    return this.product?.titleEng ?? this.product?.nameEng ?? this.product?.title ?? this.product?.name ?? '';
  }

  get minDateTime(): string {
    return this.toLocalInput(new Date());
  }

  ngOnInit(): void {
    this.resetForm();
    this.loadHistory();
  }

  loadHistory(): void {
    this.isLoading = true;
    this.errorMessage = '';
    const query = this.productType === 'tour'
      ? `tourId=${this.productId}`
      : `packageId=${this.productId}`;
    this.apiService.get(`Discounts?${query}`).pipe(
      catchError(() => {
        this.errorMessage = 'discountHistoryLoadError';
        return of(null);
      }),
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      this.history = Array.isArray(response?.data) ? response.data : [];
    });
  }

  save(): void {
    this.errorMessage = '';
    const from = new Date(this.dateFrom);
    const to = new Date(this.dateTo);
    if (!Number.isFinite(this.percentage) || this.percentage <= 0 || this.percentage >= 100) {
      this.errorMessage = 'discountPercentageInvalid';
      return;
    }
    if (!this.dateFrom || !this.dateTo || Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) {
      this.errorMessage = 'discountDatesRequired';
      return;
    }
    if (from.getTime() < Date.now() - 60_000) {
      this.errorMessage = 'discountStartPast';
      return;
    }
    if (to <= from) {
      this.errorMessage = 'discountEndInvalid';
      return;
    }

    const payload: any = {
      Percentage: Number(this.percentage),
      DateFromUtc: from.toISOString(),
      DateToUtc: to.toISOString(),
    };
    const request = this.restartSource
      ? this.apiService.post(`Discounts/${this.restartSource.id}/restart`, payload)
      : this.apiService.post('Discounts', {
          ...payload,
          TourId: this.productType === 'tour' ? this.productId : null,
          PackageId: this.productType === 'package' ? this.productId : null,
        });

    this.isSaving = true;
    request.pipe(
      catchError((error) => of({
        isSuccess: false,
        message: error?.error?.message ?? this.translate.instant('discountSaveError'),
        errors: error?.error?.errors,
      })),
      finalize(() => {
        this.isSaving = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response?.isSuccess === false) {
        this.errorMessage = this.responseError(response);
        return;
      }
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        iconColor: '#00d492',
        title: this.translate.instant(this.restartSource ? 'discountRestarted' : 'discountCreated'),
        showConfirmButton: false,
        timer: 2600,
        timerProgressBar: true,
      });
      this.restartSource = null;
      this.resetForm();
      this.loadHistory();
      this.discountChanged.emit();
    });
  }

  async stop(discount: any): Promise<void> {
    if (this.stoppingId !== null) return;
    const confirmation = await Swal.fire({
      title: this.translate.instant('stopDiscount'),
      text: this.translate.instant('confirmStopDiscount'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('stop'),
      cancelButtonText: this.translate.instant('cancel'),
      confirmButtonColor: '#e11d48',
      reverseButtons: true,
    });
    if (!confirmation.isConfirmed) return;

    this.stoppingId = Number(discount.id);
    this.apiService.patch(`Discounts/${discount.id}/stop`, {}).pipe(
      catchError((error) => of({
        isSuccess: false,
        message: error?.error?.message ?? this.translate.instant('discountStopError'),
      })),
      finalize(() => {
        this.stoppingId = null;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response?.isSuccess === false) {
        this.errorMessage = this.responseError(response);
        return;
      }
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        iconColor: '#00d492',
        title: this.translate.instant('discountStopped'),
        showConfirmButton: false,
        timer: 2200,
      });
      this.loadHistory();
      this.discountChanged.emit();
    });
  }

  prepareRestart(discount: any): void {
    this.restartSource = discount;
    this.percentage = Number(discount?.percentage ?? 10);
    const start = new Date(Date.now() + 5 * 60_000);
    const end = new Date(start.getTime() + 7 * 24 * 60 * 60_000);
    this.dateFrom = this.toLocalInput(start);
    this.dateTo = this.toLocalInput(end);
    this.errorMessage = '';
  }

  cancelRestart(): void {
    this.restartSource = null;
    this.resetForm();
  }

  canStop(discount: any): boolean {
    return discount?.isEnabled === true && ['Active', 'Scheduled'].includes(discount?.status);
  }

  canRestart(discount: any): boolean {
    return ['Stopped', 'Expired'].includes(discount?.status);
  }

  statusClass(status: string): string {
    switch (status) {
      case 'Active': return 'bg-emerald-100 text-emerald-700';
      case 'Scheduled': return 'bg-blue-100 text-blue-700';
      case 'Stopped': return 'bg-rose-100 text-rose-700';
      default: return 'bg-slate-100 text-slate-600';
    }
  }

  private resetForm(): void {
    const start = new Date(Date.now() + 5 * 60_000);
    const end = new Date(start.getTime() + 7 * 24 * 60 * 60_000);
    this.percentage = 10;
    this.dateFrom = this.toLocalInput(start);
    this.dateTo = this.toLocalInput(end);
    this.errorMessage = '';
  }

  private toLocalInput(value: Date): string {
    const local = new Date(value.getTime() - value.getTimezoneOffset() * 60_000);
    return local.toISOString().slice(0, 16);
  }

  private responseError(response: any): string {
    const errors = Array.isArray(response?.errors) ? response.errors.filter(Boolean) : [];
    return errors.length ? errors.join(' ') : (response?.message || this.translate.instant('discountSaveError'));
  }
}
