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
import Swal from 'sweetalert2';
import { ApiService } from '../../../../core/services/apiservice.service';
import { TaskNotificationsService } from '../../../../core/services/task-notifications.service';
import { AuthService } from '../../../user/_services/auth.service';
import { TASK_STATUS_OPTIONS, TaskStatusEnum } from '../task-status.enum';
import { PaginationOne } from '../../../../shared/components/listing/tour-grid/pagination-one/pagination-one';

interface PaginationInfoDTO {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

@Component({
  selector: 'app-configurations-tasks-list',
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
  updatingTaskId: number | null = null;
  errorMessage = '';
  paginationInfo: PaginationInfoDTO = { page: 1, pageSize: 10, totalCount: 0, totalPages: 0 };
  readonly taskStatusEnum = TaskStatusEnum;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private taskNotifications: TaskNotificationsService,
    private translate: TranslateService,
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

  canStart(task: any): boolean {
    const status = Number(task?.status);
    return !this.isAdmin && (status === TaskStatusEnum.Pending || status === TaskStatusEnum.Returned);
  }

  canFinish(task: any): boolean {
    return !this.isAdmin && Number(task?.status) === TaskStatusEnum.InProgress;
  }

  canReview(task: any): boolean {
    return this.isAdmin && Number(task?.status) === TaskStatusEnum.Completed;
  }

  startTask(task: any): void {
    this.changeStatus(task, TaskStatusEnum.InProgress);
  }

  async finishTask(task: any): Promise<void> {
    const result = await Swal.fire({
      title: this.translate.instant('finishTask'),
      input: 'textarea',
      inputLabel: this.translate.instant('agentCompletionNote'),
      inputPlaceholder: this.translate.instant('agentCompletionNotePlaceholder'),
      inputValue: task?.agentDescription ?? '',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('finishTask'),
      cancelButtonText: this.translate.instant('cancel'),
      inputValidator: (value) =>
        value?.trim() ? null : this.translate.instant('agentCompletionNoteRequired'),
    });
    if (!result.isConfirmed) return;
    this.changeStatus(task, TaskStatusEnum.Completed, String(result.value).trim());
  }

  closeTask(task: any): void {
    this.changeStatus(task, TaskStatusEnum.Closed);
  }

  async returnTask(task: any): Promise<void> {
    const result = await Swal.fire({
      title: this.translate.instant('returnTask'),
      input: 'textarea',
      inputLabel: this.translate.instant('returnReason'),
      inputPlaceholder: this.translate.instant('returnReasonPlaceholder'),
      showCancelButton: true,
      confirmButtonText: this.translate.instant('returnTask'),
      cancelButtonText: this.translate.instant('cancel'),
    });
    if (!result.isConfirmed) return;
    this.changeStatus(task, TaskStatusEnum.Returned, String(result.value ?? '').trim() || undefined);
  }

  private changeStatus(task: any, status: TaskStatusEnum, description?: string): void {
    const taskId = Number(task?.id);
    if (!Number.isInteger(taskId) || taskId <= 0 || this.updatingTaskId !== null) return;

    const payload: any = { status: Number(status) };
    if (description !== undefined) payload.description = description;

    this.updatingTaskId = taskId;
    this.apiService.patch(`Tasks/${taskId}/ChangeStatus`, payload).pipe(
      catchError(() => {
        Swal.fire({ icon: 'error', title: this.translate.instant('taskStatusUpdateError') });
        return of(null);
      }),
      finalize(() => {
        this.updatingTaskId = null;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      if (response?.isSuccess === false) {
        Swal.fire({ icon: 'error', title: response?.message || this.translate.instant('taskStatusUpdateError') });
        return;
      }
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        iconColor: '#00d492',
        title: response?.message || this.translate.instant('taskStatusUpdated'),
        showConfirmButton: false,
        timer: 2200,
        timerProgressBar: true,
      });
      this.taskNotifications.notifyChanged();
      this.loadTasks();
    });
  }
}
