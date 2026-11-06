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
import { FormsModule } from '@angular/forms';
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

interface TaskCommentDTO {
  id: number;
  agentTaskId: number;
  authorUserId: number;
  authorName?: string | null;
  authorRole?: string | null;
  comment: string;
  createdDate: string;
}

@Component({
  selector: 'app-configurations-tasks-list',
  standalone: true,
  imports: [TranslatePipe, DatePipe, PaginationOne, FormsModule],
  templateUrl: './tasks-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksList implements OnInit, OnChanges {
  readonly pageSizeOptions = [10, 20, 50];
  readonly maxTaskCommentLength = 4000;
  @Input() viewMode: 'table' | 'grid' = 'table';
  @Input() refreshToken = 0;
  @Output() editRequested = new EventEmitter<any>();

  tasks: any[] = [];
  isLoading = false;
  updatingTaskId: number | null = null;
  errorMessage = '';
  paginationInfo: PaginationInfoDTO = { page: 1, pageSize: 10, totalCount: 0, totalPages: 0 };
  readonly taskStatusEnum = TaskStatusEnum;
  commentsTask: any | null = null;
  taskComments: TaskCommentDTO[] = [];
  commentsLoading = false;
  commentsSaving = false;
  commentsError = '';
  commentDraft = '';

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

  openComments(task: any): void {
    const taskId = Number(task?.id);
    if (!Number.isInteger(taskId) || taskId <= 0) return;
    this.commentsTask = task;
    this.taskComments = [];
    this.commentDraft = '';
    this.commentsError = '';
    this.commentsLoading = true;
    this.apiService.get(`Tasks/${taskId}/Comments`).pipe(
      catchError(() => {
        this.commentsError = 'taskCommentsLoadError';
        return of(null);
      }),
      finalize(() => {
        this.commentsLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      if (response?.isSuccess === false) {
        this.commentsError = 'taskCommentsLoadError';
        this.cdr.markForCheck();
        return;
      }
      const data = response?.data ?? response;
      const rows = Array.isArray(data) ? data : data?.items ?? data?.comments ?? [];
      this.taskComments = Array.isArray(rows) ? rows : [];
      this.cdr.markForCheck();
    });
  }

  closeComments(): void {
    this.commentsTask = null;
    this.taskComments = [];
    this.commentDraft = '';
    this.commentsError = '';
  }

  canComment(task: any | null): boolean {
    return !!task;
  }

  commentAuthorRoleKey(role: string | null | undefined): string {
    if (role?.toLowerCase() === 'admin') return 'taskCommentAdmin';
    if (role?.toLowerCase() === 'agent') return 'taskCommentAgent';
    return 'taskCommentUnknownAuthor';
  }

  addComment(): void {
    const taskId = Number(this.commentsTask?.id);
    const comment = this.commentDraft.trim();
    if (!Number.isInteger(taskId) || taskId <= 0 || !comment || this.commentsSaving || !this.canComment(this.commentsTask)) {
      if (!comment) this.commentsError = 'taskCommentRequired';
      return;
    }
    if (comment.length > this.maxTaskCommentLength) {
      this.commentsError = 'taskCommentTooLong';
      return;
    }

    this.commentsSaving = true;
    this.commentsError = '';
    this.apiService.post(`Tasks/${taskId}/Comments`, { comment }).pipe(
      catchError(() => {
        this.commentsError = 'taskCommentSaveError';
        return of(null);
      }),
      finalize(() => {
        this.commentsSaving = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      if (response?.isSuccess === false) {
        this.commentsError = 'taskCommentSaveError';
        this.cdr.markForCheck();
        return;
      }
      const saved = response?.data;
      if (saved) this.taskComments = [...this.taskComments, saved];
      this.commentDraft = '';
      this.cdr.markForCheck();
    });
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

  async startTask(task: any): Promise<void> {
    if (!await this.confirmStatusChange('taskStatusInProgress')) return;
    this.changeStatus(task, TaskStatusEnum.InProgress);
  }

  async finishTask(task: any): Promise<void> {
    const result = await Swal.fire({
      icon: 'question',
      title: this.translate.instant('finishTask'),
      text: this.translate.instant('statusChangeConfirmation', {
        status: this.translate.instant('taskStatusCompleted'),
      }),
      input: 'textarea',
      inputLabel: this.translate.instant('agentCompletionNote'),
      inputPlaceholder: this.translate.instant('agentCompletionNotePlaceholder'),
      inputValue: task?.agentDescription ?? '',
      inputAttributes: { maxlength: String(this.maxTaskCommentLength) },
      showCancelButton: true,
      confirmButtonText: this.translate.instant('finishTask'),
      cancelButtonText: this.translate.instant('cancel'),
      inputValidator: (value) =>
        value?.trim() ? null : this.translate.instant('agentCompletionNoteRequired'),
    });
    if (!result.isConfirmed) return;
    this.changeStatus(task, TaskStatusEnum.Completed, String(result.value).trim());
  }

  async closeTask(task: any): Promise<void> {
    if (!await this.confirmStatusChange('taskStatusClosed')) return;
    this.changeStatus(task, TaskStatusEnum.Closed);
  }

  async returnTask(task: any): Promise<void> {
    const result = await Swal.fire({
      icon: 'warning',
      title: this.translate.instant('returnTask'),
      text: this.translate.instant('statusChangeConfirmation', {
        status: this.translate.instant('taskStatusReturned'),
      }),
      input: 'textarea',
      inputLabel: this.translate.instant('returnReason'),
      inputPlaceholder: this.translate.instant('returnReasonPlaceholder'),
      inputAttributes: { maxlength: String(this.maxTaskCommentLength) },
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

  private async confirmStatusChange(statusKey: string): Promise<boolean> {
    const result = await Swal.fire({
      icon: 'question',
      title: this.translate.instant('confirmStatusChange'),
      text: this.translate.instant('statusChangeConfirmation', {
        status: this.translate.instant(statusKey),
      }),
      showCancelButton: true,
      confirmButtonText: this.translate.instant('confirm'),
      cancelButtonText: this.translate.instant('cancel'),
      confirmButtonColor: '#00d492',
      reverseButtons: true,
    });
    return result.isConfirmed;
  }
}
