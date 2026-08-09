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
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of, switchMap, throwError } from 'rxjs';
import { ApiService } from '../../../../core/services/apiservice.service';
import { PaginationOne } from '../../../../shared/components/listing/tour-grid/pagination-one/pagination-one';

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
  readonly pageSizeOptions = [10, 20, 50];
  @Input() viewMode: 'table' | 'grid' = 'table';
  @Input() refreshToken = 0;
  @Output() editRequested = new EventEmitter<any>();

  quotations: any[] = [];
  isLoading = false;
  errorMessage = '';
  sendMessage = '';
  sendingQuotationId: number | null = null;
  paginationInfo: PaginationInfoDTO = { page: 1, pageSize: 10, totalCount: 0, totalPages: 0 };

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
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
      this.quotations = Array.isArray(rows) ? rows : [];
      this.paginationInfo = {
        page: Number(pageData?.page ?? this.paginationInfo.page),
        pageSize: Number(pageData?.pageSize ?? this.paginationInfo.pageSize),
        totalCount: Number(pageData?.totalCount ?? this.quotations.length),
        totalPages: Math.max(1, Number(pageData?.totalPages ?? 1)),
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

  sendQuotation(quotation: any): void {
    const id = Number(quotation.id);
    if (!id || this.sendingQuotationId !== null) return;
    this.sendingQuotationId = id;
    this.errorMessage = '';
    this.sendMessage = '';

    this.apiService.patch(`Quotations/${id}/Send`, {}).pipe(
      switchMap((response: any) => response?.isSuccess === false
        ? throwError(() => new Error(response?.message || 'quotationSendError'))
        : this.apiService.getFile(`Quotations/${id}/Pdf`)),
      catchError(() => {
        this.errorMessage = 'quotationSendError';
        return of(null);
      }),
      finalize(() => {
        this.sendingQuotationId = null;
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
        this.sendMessage = 'quotationPdfDownloaded';
        this.loadQuotations();
        return;
      }
      this.errorMessage = 'quotationPdfInvalid';
    });
  }
}
