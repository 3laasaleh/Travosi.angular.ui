import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import Swal from 'sweetalert2';
import { ApiService } from '../../../../core/services/apiservice.service';
import { PaginationOne } from '../../../../shared/components/listing/tour-grid/pagination-one/pagination-one';

export interface ContactMessageDTO {
  id: number;
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  question: string;
  submittedAtUtc: string;
  isRead: boolean;
  readAtUtc?: string | null;
}

interface PaginationInfoDTO {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

@Component({
  selector: 'app-configurations-contact-messages-list',
  standalone: true,
  imports: [TranslatePipe, DatePipe, PaginationOne],
  templateUrl: './contact-messages-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactMessagesList implements OnInit, OnChanges {
  readonly pageSizeOptions = [10, 20, 50];
  @Input() viewMode: 'table' | 'grid' = 'table';
  @Input() refreshToken = 0;
  @Input() readFilter: 'all' | 'unread' | 'read' = 'all';

  messages: ContactMessageDTO[] = [];
  isLoading = false;
  updatingId: number | null = null;
  errorMessage = '';
  paginationInfo: PaginationInfoDTO = { page: 1, pageSize: 10, totalCount: 0, totalPages: 1 };

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const refreshed = changes['refreshToken'] && !changes['refreshToken'].firstChange;
    const filtered = changes['readFilter'] && !changes['readFilter'].firstChange;
    if (refreshed || filtered) {
      this.paginationInfo.page = 1;
      this.loadMessages();
    }
  }

  loadMessages(): void {
    this.isLoading = true;
    this.errorMessage = '';
    const readQuery =
      this.readFilter === 'all' ? '' : `&isRead=${this.readFilter === 'read'}`;
    this.apiService
      .get(
        `ContactMessages/GetAll?page=${this.paginationInfo.page}&pageSize=${this.paginationInfo.pageSize}${readQuery}`,
      )
      .pipe(
        catchError(() => {
          this.errorMessage = 'contactMessagesLoadError';
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe((response: any) => {
        if (response === null) return;
        const pageData = response?.data ?? response;
        const rows = pageData?.data ?? pageData?.items ?? pageData;
        this.messages = Array.isArray(rows) ? rows : [];
        this.paginationInfo = {
          page: Number(pageData?.page ?? this.paginationInfo.page),
          pageSize: Number(pageData?.pageSize ?? this.paginationInfo.pageSize),
          totalCount: Number(pageData?.totalCount ?? this.messages.length),
          totalPages: Math.max(1, Number(pageData?.totalPages ?? 1)),
        };
      });
  }

  onPageChange(page: number): void {
    if (page === this.paginationInfo.page || page < 1 || page > this.paginationInfo.totalPages) return;
    this.paginationInfo.page = page;
    this.loadMessages();
  }

  onPageSizeChange(event: Event): void {
    const pageSize = Number((event.target as HTMLSelectElement).value);
    if (!this.pageSizeOptions.includes(pageSize)) return;
    this.paginationInfo.pageSize = pageSize;
    this.paginationInfo.page = 1;
    this.loadMessages();
  }

  async markAsRead(message: ContactMessageDTO): Promise<void> {
    if (this.updatingId !== null || message.isRead) return;
    const confirmation = await Swal.fire({
      icon: 'question',
      title: this.translate.instant('confirmStatusChange'),
      text: this.translate.instant('statusChangeConfirmation', {
        status: this.translate.instant('read'),
      }),
      showCancelButton: true,
      confirmButtonText: this.translate.instant('confirm'),
      cancelButtonText: this.translate.instant('cancel'),
      confirmButtonColor: '#00d492',
      reverseButtons: true,
    });
    if (!confirmation.isConfirmed) return;

    this.updatingId = Number(message.id);
    this.apiService
      .patch(`ContactMessages/${message.id}/MarkAsRead`, {})
      .pipe(
        catchError(() => {
          Swal.fire({ icon: 'error', title: this.translate.instant('contactMessageUpdateError') });
          return of(null);
        }),
        finalize(() => {
          this.updatingId = null;
          this.cdr.markForCheck();
        }),
      )
      .subscribe((response: any) => {
        if (response === null || response?.isSuccess === false) return;
        message.isRead = true;
        message.readAtUtc = new Date().toISOString();
        if (this.readFilter === 'unread') this.loadMessages();
        this.cdr.markForCheck();
      });
  }

  async deleteMessage(message: ContactMessageDTO): Promise<void> {
    if (this.updatingId !== null) return;
    const result = await Swal.fire({
      title: this.translate.instant('confirmDelete'),
      text: this.translate.instant('confirmDeleteContactMessage'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('confirm'),
      cancelButtonText: this.translate.instant('cancel'),
      confirmButtonColor: '#e11d48',
      reverseButtons: true,
    });
    if (!result.isConfirmed) return;

    this.updatingId = Number(message.id);
    this.apiService
      .delete('ContactMessages', message.id)
      .pipe(
        catchError(() => {
          Swal.fire({ icon: 'error', title: this.translate.instant('contactMessageDeleteError') });
          return of(null);
        }),
        finalize(() => {
          this.updatingId = null;
          this.cdr.markForCheck();
        }),
      )
      .subscribe((response: any) => {
        if (response === null || response?.isSuccess === false) return;
        this.loadMessages();
      });
  }
}
