import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from '../../../../../environments/environment';
import { PaginationOne } from '../../../../shared/components/listing/tour-grid/pagination-one/pagination-one';
import { AdminService } from '../../admin.service';

interface PaginationInfoDTO {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

@Component({
  selector: 'app-blogs-list',
  standalone: true,
  imports: [DatePipe, PaginationOne, TranslatePipe],
  templateUrl: './blogs-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogsList implements OnInit, OnChanges {
  private readonly adminService = inject(AdminService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly translate = inject(TranslateService);

  readonly pageSizeOptions = [10, 20, 50];

  @Input() viewMode: 'table' | 'grid' = 'table';
  @Input() refreshToken = 0;
  @Output() editRequested = new EventEmitter<any>();

  blogs: any[] = [];
  isLoading = false;
  statusUpdatingId: number | null = null;
  errorMessage = '';
  paginationInfo: PaginationInfoDTO = {
    page: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 1,
  };

  ngOnInit(): void {
    this.load();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['refreshToken'] && !changes['refreshToken'].firstChange) {
      this.paginationInfo.page = 1;
      this.load();
    }
  }

  load(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.adminService
      .getBlogs(this.paginationInfo.page, this.paginationInfo.pageSize)
      .pipe(
        catchError(() => {
          this.errorMessage = 'blogsLoadError';
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((response: any) => {
        if (response === null) return;

        if (response?.isSuccess === false || response?.IsSuccess === false) {
          this.blogs = [];
          this.errorMessage = response?.message || response?.Message || 'blogsLoadError';
          return;
        }

        const pageData = response?.data ?? response?.Data ?? response;
        const rows =
          pageData?.data ??
          pageData?.Data ??
          pageData?.items ??
          pageData?.Items ??
          pageData?.blogs ??
          pageData?.Blogs ??
          pageData;
        this.blogs = Array.isArray(rows) ? rows : [];

        const page = this.positiveInteger(pageData?.page ?? pageData?.Page, this.paginationInfo.page);
        const pageSize = this.positiveInteger(
          pageData?.pageSize ?? pageData?.PageSize,
          this.paginationInfo.pageSize,
        );
        const totalCount = this.nonNegativeInteger(
          pageData?.totalCount ?? pageData?.TotalCount,
          this.blogs.length,
        );
        const totalPages = this.positiveInteger(
          pageData?.totalPages ?? pageData?.TotalPages,
          Math.max(1, Math.ceil(totalCount / pageSize)),
        );

        this.paginationInfo = { page, pageSize, totalCount, totalPages };
      });
  }

  onPageChange(page: number): void {
    if (page === this.paginationInfo.page || page < 1 || page > this.paginationInfo.totalPages) return;
    this.paginationInfo.page = page;
    this.load();
  }

  onPageSizeChange(event: Event): void {
    const pageSize = Number((event.target as HTMLSelectElement).value);
    if (!this.pageSizeOptions.includes(pageSize)) return;

    this.paginationInfo.pageSize = pageSize;
    this.paginationInfo.page = 1;
    this.load();
  }

  async toggleStatus(blog: any): Promise<void> {
    if (this.statusUpdatingId !== null) return;

    const isActive = this.isActive(blog);
    const confirmation = await Swal.fire({
      title: this.translate.instant('confirmStatusChange'),
      text: this.translate.instant(isActive ? 'confirmDeactivateBlog' : 'confirmActivateBlog'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('confirm'),
      cancelButtonText: this.translate.instant('cancel'),
      confirmButtonColor: isActive ? '#e11d48' : '#059669',
      reverseButtons: true,
    });
    if (!confirmation.isConfirmed) return;

    const blogId = Number(blog?.id ?? blog?.Id);
    if (!Number.isInteger(blogId) || blogId <= 0) {
      await Swal.fire({ icon: 'error', title: this.translate.instant('blogStatusUpdateError') });
      return;
    }

    this.statusUpdatingId = blogId;
    this.adminService
      .changeBlogStatus(blogId)
      .pipe(
        catchError(() => {
          Swal.fire({ icon: 'error', title: this.translate.instant('blogStatusUpdateError') });
          return of({ statusToggleFailed: true });
        }),
        finalize(() => {
          this.statusUpdatingId = null;
          this.cdr.markForCheck();
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((response: any) => {
        if (response?.statusToggleFailed || response?.isSuccess === false || response?.IsSuccess === false) {
          if (!response?.statusToggleFailed) {
            Swal.fire({
              icon: 'error',
              title:
                response?.message ??
                response?.Message ??
                this.translate.instant('blogStatusUpdateError'),
            });
          }
          return;
        }

        blog.isActive = !isActive;
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: this.translate.instant('blogStatusUpdated'),
          showConfirmButton: false,
          timer: 2200,
          timerProgressBar: true,
        });
        this.cdr.markForCheck();
      });
  }

  blogId(blog: any): number | undefined {
    return blog?.id ?? blog?.Id;
  }

  isActive(blog: any): boolean {
    return blog?.isActive ?? blog?.IsActive ?? false;
  }

  titleEng(blog: any): string {
    return blog?.titleEng ?? blog?.TitleEng ?? '';
  }

  titleAr(blog: any): string {
    return blog?.titleAr ?? blog?.TitleAr ?? '';
  }

  summaryEng(blog: any): string {
    return blog?.summaryEng ?? blog?.SummaryEng ?? '';
  }

  publishedAt(blog: any): string | undefined {
    return blog?.publishedAt ?? blog?.PublishedAt;
  }

  imageUrl(blog: any): string {
    const images = blog?.images ?? blog?.Images ?? [];
    const firstImage = Array.isArray(images) ? images[0] : undefined;
    const raw =
      typeof firstImage === 'string'
        ? firstImage
        : firstImage?.imageUrl ?? firstImage?.ImageUrl ?? firstImage?.url ?? firstImage?.Url;

    if (!raw) return '';
    if (/^(https?:|data:|blob:)/i.test(raw)) return raw;

    const path = String(raw).replace(/^\/+/, '').replace(/^images\//i, '');
    return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
  }

  private positiveInteger(value: unknown, fallback: number): number {
    const number = Number(value);
    return Number.isInteger(number) && number > 0 ? number : fallback;
  }

  private nonNegativeInteger(value: unknown, fallback: number): number {
    const number = Number(value);
    return Number.isInteger(number) && number >= 0 ? number : fallback;
  }
}
