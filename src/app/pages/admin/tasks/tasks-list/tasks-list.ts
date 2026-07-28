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
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { PaginationOne } from '../../../../components/listing/tour-grid/pagination-one/pagination-one';
import { ApiService } from '../../../../core/services/apiservice.service';
import { AuthService } from '../../../user/_services/auth.service';
import { TASK_STATUS_OPTIONS, TaskStatusEnum } from '../task-status.enum';

interface PaginationInfoDTO {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

@Component({
  selector: 'app-admin-tasks-list',
  standalone: true,
  imports: [TranslatePipe, DatePipe, PaginationOne],
  templateUrl: './tasks-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksList implements OnInit, OnChanges {
  readonly pageSizeOptions = [10, 20, 50];
  @Input() viewMode: 'table' | 'grid' = 'table';
  @Input() refreshToken = 0;
  @Output() editRequested = new EventEmitter<any>();

  tasks: any[] = [];
  isLoading = false;
  errorMessage = '';
  paginationInfo: PaginationInfoDTO = { page: 1, pageSize: 10, totalCount: 0, totalPages: 0 };
  readonly taskStatusEnum = TaskStatusEnum;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
  ) {}

  get isAdmin(): boolean {
    return this.authService.getCurrentUserRole() === 'Admin';
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['refreshToken'] && !changes['refreshToken'].firstChange) {
      this.paginationInfo.page = 1;
      this.loadTasks();
    }
  }

  loadTasks(): void {
    this.isLoading = true;
    this.errorMessage = '';
    const url = this.isAdmin
      ? `Tasks/GetAllTasks?page=${this.paginationInfo.page}&pageSize=${this.paginationInfo.pageSize}`
      : `Tasks/GetAgentTasks?page=${this.paginationInfo.page}&pageSize=${this.paginationInfo.pageSize}`;
    this.apiService.get(url).pipe(
      catchError(() => {
        this.errorMessage = 'taskServiceUnavailable';
        return of(null);
      }),
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      const pageData = response?.data ?? response;
      const rows = pageData?.data ?? pageData?.items ?? pageData?.tasks ?? pageData;
      this.tasks = Array.isArray(rows) ? rows : [];
      this.paginationInfo = {
        page: Number(pageData?.page ?? this.paginationInfo.page),
        pageSize: Number(pageData?.pageSize ?? this.paginationInfo.pageSize),
        totalCount: Number(pageData?.totalCount ?? this.tasks.length),
        totalPages: Math.max(1, Number(pageData?.totalPages ?? 1)),
      };
    });
  }

  previousPage(): void {
    if (this.paginationInfo.page > 1) {
      this.paginationInfo.page--;
      this.loadTasks();
    }
  }

  onPageChange(page: number): void {
    if (page === this.paginationInfo.page || page < 1 || page > this.paginationInfo.totalPages) return;
    this.paginationInfo.page = page;
    this.loadTasks();
  }

  onPageSizeChange(event: Event): void {
    const pageSize = Number((event.target as HTMLSelectElement).value);
    if (!this.pageSizeOptions.includes(pageSize)) return;
    this.paginationInfo.pageSize = pageSize;
    this.paginationInfo.page = 1;
    this.loadTasks();
  }

  nextPage(): void {
    if (this.paginationInfo.page < this.paginationInfo.totalPages) {
      this.paginationInfo.page++;
      this.loadTasks();
    }
  }

  taskStatusKey(value: number): string {
    return TASK_STATUS_OPTIONS.find((option) => option.value === Number(value))?.labelKey ?? '';
  }
}
