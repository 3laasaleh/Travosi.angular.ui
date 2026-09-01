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
import { ApiService } from '../../../../core/services/apiservice.service';
import { PaginationOne } from '../../../../shared/components/listing/tour-grid/pagination-one/pagination-one';
import { QuotationStatusEnum } from '../quotations-from-card/quotations-from-card';

interface PaginationInfoDTO {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

@Component({
  selector: 'app-configurations-quotations-list',
  standalone: true,
  imports: [TranslatePipe, PaginationOne],
  templateUrl: './quotations-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotationsList implements OnInit, OnChanges {
  private readonly allowedTransitions: Partial<Record<QuotationStatusEnum, QuotationStatusEnum[]>> = {
    [QuotationStatusEnum.Draft]: [QuotationStatusEnum.Sent, QuotationStatusEnum.Cancelled],
    [QuotationStatusEnum.Sent]: [QuotationStatusEnum.Accepted, QuotationStatusEnum.Rejected, QuotationStatusEnum.Expired, QuotationStatusEnum.Cancelled],
    [QuotationStatusEnum.Expired]: [QuotationStatusEnum.Cancelled],
  };
  readonly pageSizeOptions = [10, 20, 50];
  @Input() viewMode: 'table' | 'grid' = 'table';
  @Input() refreshToken = 0;
  @Output() editRequested = new EventEmitter<any>();
  @Output() duplicateRequested = new EventEmitter<any>();

  quotations: any[] = [];
  isLoading = false;
  errorMessage = '';
  downloadingQuotationId: number | null = null;
  statusUpdatingId: number | null = null;
  deletingQuotationId: number | null = null;
  duplicatingQuotationId: number | null = null;
  paginationInfo: PaginationInfoDTO = { page: 1, pageSize: 10, totalCount: 0, totalPages: 0 };

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.loadQuotations();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['refreshToken'] && !changes['refreshToken'].firstChange) {
      this.paginationInfo.page = 1;
      this.loadQuotations();
    }
  }

  loadQuotations(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.apiService.get(`Quotations?page=${this.paginationInfo.page}&pageSize=${this.paginationInfo.pageSize}`).pipe(
      catchError(() => {
        this.errorMessage = 'quotationServiceUnavailable';
        this.showToast('error', 'quotationServiceUnavailable');
        return of(null);
      }),
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      const pageData = response?.data ?? response;
      const rows = pageData?.data ?? pageData?.items ?? pageData?.quotations ?? pageData;
      const allRows = Array.isArray(rows) ? rows : [];
      const serverPaged = !Array.isArray(pageData)
        && (pageData?.page !== undefined || pageData?.pageSize !== undefined || pageData?.totalCount !== undefined);
      const totalCount = Number(pageData?.totalCount ?? allRows.length);
      const totalPages = Math.max(1, Number(pageData?.totalPages ?? Math.ceil(totalCount / this.paginationInfo.pageSize)));
      const page = Math.min(Math.max(1, Number(pageData?.page ?? this.paginationInfo.page)), totalPages);
      this.quotations = serverPaged
        ? allRows
        : allRows.slice((page - 1) * this.paginationInfo.pageSize, page * this.paginationInfo.pageSize);
      this.paginationInfo = {
        page,
        pageSize: Number(pageData?.pageSize ?? this.paginationInfo.pageSize),
        totalCount,
        totalPages,
      };
    });
  }

  previousPage(): void {
    if (this.paginationInfo.page > 1) {
      this.paginationInfo.page--;
      this.loadQuotations();
    }
  }

  onPageChange(page: number): void {
    if (page === this.paginationInfo.page || page < 1 || page > this.paginationInfo.totalPages) return;
    this.paginationInfo.page = page;
    this.loadQuotations();
  }

  onPageSizeChange(event: Event): void {
    const pageSize = Number((event.target as HTMLSelectElement).value);
    if (!this.pageSizeOptions.includes(pageSize)) return;
    this.paginationInfo.pageSize = pageSize;
    this.paginationInfo.page = 1;
    this.loadQuotations();
  }

  nextPage(): void {
    if (this.paginationInfo.page < this.paginationInfo.totalPages) {
      this.paginationInfo.page++;
      this.loadQuotations();
    }
  }

  canEdit(quotation: any): boolean {
    return Number(quotation?.status) === QuotationStatusEnum.Draft;
  }

  canChangeStatus(quotation: any): boolean {
    return (this.allowedTransitions[Number(quotation?.status) as QuotationStatusEnum]?.length ?? 0) > 0;
  }

  canDelete(quotation: any): boolean {
    const status = Number(quotation?.status);
    return status === QuotationStatusEnum.Draft || status === QuotationStatusEnum.Cancelled;
  }

  statusKey(quotation: any): string {
    const status = Number(quotation?.status);
    return QuotationStatusEnum[status]?.toLowerCase() || String(quotation?.statusName ?? 'draft').toLowerCase();
  }

  async changeQuotationStatus(quotation: any): Promise<void> {
    const id = Number(quotation?.id);
    const currentStatus = Number(quotation?.status) as QuotationStatusEnum;
    const allowed = this.allowedTransitions[currentStatus] ?? [];
    if (!id || !allowed.length || this.statusUpdatingId !== null) return;

    const inputOptions = Object.fromEntries(
      allowed.map((status) => [String(status), this.translate.instant(QuotationStatusEnum[status].toLowerCase())]),
    );
    const result = await Swal.fire({
      icon: 'question',
      title: this.translate.instant('confirmStatusChange'),
      text: this.translate.instant('quotationStatusChangePrompt'),
      input: 'select',
      inputOptions,
      inputPlaceholder: this.translate.instant('chooseQuotationStatus'),
      inputValidator: (value) => value ? undefined : this.translate.instant('quotationStatusRequired'),
      showCancelButton: true,
      confirmButtonText: this.translate.instant('confirm'),
      cancelButtonText: this.translate.instant('cancel'),
      confirmButtonColor: '#00d492',
      reverseButtons: true,
    });
    if (!result.isConfirmed) return;

    const nextStatus = Number(result.value) as QuotationStatusEnum;
    if (!allowed.includes(nextStatus)) return;
    this.statusUpdatingId = id;
    const request$ = nextStatus === QuotationStatusEnum.Sent
      ? this.apiService.patch(`Quotations/${id}/Send`, {})
      : this.apiService.patch('Quotations/ChangeStatus', { id, status: nextStatus });
    request$.pipe(
      catchError((error) => {
        this.showToast('error', this.apiMessage(error, 'quotationStatusUpdateError'));
        return of(null);
      }),
      finalize(() => {
        this.statusUpdatingId = null;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      if (response?.isSuccess === false) {
        this.showToast('error', this.apiMessage(response, 'quotationStatusUpdateError'));
        return;
      }
      quotation.status = nextStatus;
      quotation.statusName = QuotationStatusEnum[nextStatus];
      this.showToast('success', response?.message || 'quotationStatusUpdated');
      this.cdr.markForCheck();
    });
  }

  downloadQuotationPdf(quotation: any): void {
    const id = Number(quotation.id);
    if (!id || this.downloadingQuotationId !== null) return;
    this.downloadingQuotationId = id;
    this.errorMessage = '';

    this.apiService.getFile(`Quotations/${id}/Pdf`).pipe(
      catchError((error) => {
        this.showToast('error', this.apiMessage(error, 'pdfDownloadError'));
        return of(null);
      }),
      finalize(() => {
        this.downloadingQuotationId = null;
        this.cdr.markForCheck();
      }),
    ).subscribe((blob: Blob | null) => {
      if (blob === null) return;
      if (blob.type.includes('pdf')) {
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `${quotation.quotationNo ?? `quotation-${id}`}.pdf`;
        anchor.click();
        URL.revokeObjectURL(url);
        this.showToast('success', 'quotationPdfDownloaded');
        return;
      }
      this.showToast('error', 'quotationPdfInvalid');
    });
  }

  async duplicateQuotation(quotation: any): Promise<void> {
    const id = Number(quotation?.id);
    if (!id || this.duplicatingQuotationId !== null) return;
    const result = await Swal.fire({
      icon: 'question',
      title: this.translate.instant('duplicateQuotation'),
      text: this.translate.instant('duplicateQuotationPrompt'),
      showCancelButton: true,
      confirmButtonText: this.translate.instant('duplicate'),
      cancelButtonText: this.translate.instant('cancel'),
      confirmButtonColor: '#00d492',
      reverseButtons: true,
    });
    if (!result.isConfirmed) return;

    this.duplicatingQuotationId = id;
    this.apiService.post(`Quotations/${id}/Duplicate`, {}).pipe(
      catchError((error) => {
        this.showToast('error', this.apiMessage(error, 'quotationDuplicateError'));
        return of(null);
      }),
      finalize(() => {
        this.duplicatingQuotationId = null;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null || response?.isSuccess === false) {
        if (response?.isSuccess === false) this.showToast('error', this.apiMessage(response, 'quotationDuplicateError'));
        return;
      }
      const copy = response?.data ?? response;
      this.showToast('success', response?.message || 'quotationDuplicated');
      this.duplicateRequested.emit(copy);
    });
  }

  async deleteQuotation(quotation: any): Promise<void> {
    const id = Number(quotation?.id);
    if (!id || !this.canDelete(quotation) || this.deletingQuotationId !== null) return;
    const result = await Swal.fire({
      icon: 'warning',
      title: this.translate.instant('confirmDeleteRecord'),
      text: this.translate.instant('recordDeleteWarning'),
      showCancelButton: true,
      confirmButtonText: this.translate.instant('delete'),
      cancelButtonText: this.translate.instant('cancel'),
      confirmButtonColor: '#e11d48',
      reverseButtons: true,
    });
    if (!result.isConfirmed) return;

    this.deletingQuotationId = id;
    this.apiService.delete('Quotations', id).pipe(
      catchError((error) => {
        this.showToast('error', this.apiMessage(error, 'quotationDeleteError'));
        return of(null);
      }),
      finalize(() => {
        this.deletingQuotationId = null;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null || response?.isSuccess === false) {
        if (response?.isSuccess === false) this.showToast('error', this.apiMessage(response, 'quotationDeleteError'));
        return;
      }
      this.showToast('success', response?.message || 'quotationDeleted');
      this.loadQuotations();
    });
  }

  private apiMessage(source: any, fallback: string): string {
    const payload = source?.error ?? source;
    const errors = Array.isArray(payload?.errors)
      ? payload.errors.filter((error: unknown) => typeof error === 'string' && error.trim())
      : [];
    return errors.length ? errors.join(' ') : payload?.message || fallback;
  }

  private showToast(icon: 'success' | 'error', message: string): void {
    void Swal.fire({
      toast: true,
      position: 'top-end',
      icon,
      iconColor: icon === 'success' ? '#00d492' : undefined,
      title: this.translate.instant(message),
      showConfirmButton: false,
      timer: icon === 'success' ? 2500 : 4500,
      timerProgressBar: true,
    });
  }
}
