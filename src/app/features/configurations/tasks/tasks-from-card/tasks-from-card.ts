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
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../../../core/services/apiservice.service';
import { TASK_STATUS_OPTIONS, TaskStatusEnum } from '../task-status.enum';

export interface TaskDTO {
  id: number;
  title: string;
  description?: string;
  agentId: string;
  dueDate?: string;
  status: TaskStatusEnum;
  taskType: number;
  priority: number;
}

@Component({
  selector: 'app-tasks-from-card',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './tasks-from-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksFromCard implements OnInit, OnChanges {
  @Input() selectedTask: TaskDTO | null = null;
  @Output() taskSaved = new EventEmitter<void>();
  @Output() editCancelled = new EventEmitter<void>();

  taskForm = this.createForm();
  agents: any[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  readonly taskStatusOptions = TASK_STATUS_OPTIONS;
  readonly taskTypeOptions = [
    { value: 1, labelKey: 'taskTypeFollowUpCustomer' }, { value: 2, labelKey: 'taskTypePrepareQuotation' },
    { value: 3, labelKey: 'taskTypeConfirmBooking' }, { value: 4, labelKey: 'taskTypeCollectPayment' },
    { value: 5, labelKey: 'taskTypeDocumentRequest' }, { value: 6, labelKey: 'taskTypeCustomerSupport' },
    { value: 7, labelKey: 'taskTypeGeneral' },
  ];
  readonly priorityOptions = [
    { value: 1, labelKey: 'priorityLow' }, { value: 2, labelKey: 'priorityMedium' },
    { value: 3, labelKey: 'priorityHigh' }, { value: 4, labelKey: 'priorityUrgent' },
  ];

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadAgents();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['selectedTask']) return;
    if (this.selectedTask) this.populateForm(this.selectedTask);
    else this.resetForm(false);
  }

  loadAgents(): void {
    this.apiService.get('Account/GetAgents').pipe(
      catchError(() => of(null)),
      finalize(() => this.cdr.markForCheck()),
    ).subscribe((response: any) => {
      if (response === null) return;
      const rows = response?.data ?? response;
      this.agents = Array.isArray(rows) ? rows : [];
    });
  }

  saveTask(): void {
    if (this.isLoading) return;
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    const form = this.taskForm.getRawValue();
    const payload: any = {
      title: form.title.trim(),
      description: form.description.trim(),
      agentId: form.agentId,
      dueDate: form.dueDate || null,
      status: Number(form.status),
      taskType: Number(form.taskType),
      priority: Number(form.priority),
    };
    if (this.selectedTask?.id) payload.id = this.selectedTask.id;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    const request$ = this.selectedTask
      ? this.apiService.put('Tasks', payload)
      : this.apiService.post('Tasks', payload);
    request$
      .pipe(
        catchError(() => {
          this.errorMessage = 'taskSaveError';
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe((res: any) => {
        if (res === null) return;
        if (!res.isSuccess) {
          this.errorMessage = res.message;
          return;
        }
        this.successMessage = res.message;
        this.resetForm(false);
        this.taskSaved.emit();
      });
  }

  cancelEdit(): void {
    this.resetForm(true);
  }

  private populateForm(task: TaskDTO): void {
    this.taskForm.setValue({
      title: task.title ?? '',
      description: task.description ?? '',
      agentId: task.agentId ?? null,
      dueDate: task.dueDate ? task.dueDate.substring(0, 10) : '',
      status: task.status ?? TaskStatusEnum.Pending,
      taskType: task.taskType ?? 7,
      priority: task.priority ?? 2,
    });
  }

  private resetForm(emitCancel: boolean): void {
    this.taskForm.reset({
      title: '',
      description: '',
      agentId: null,
      dueDate: '',
      status: TaskStatusEnum.Pending,
      taskType: 7,
      priority: 2,
    });
    if (emitCancel) this.editCancelled.emit();
  }

  private createForm() {
    return new FormGroup({
      title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      description: new FormControl('', { nonNullable: true }),
      agentId: new FormControl<string | null>(null, { validators: [Validators.required] }),
      dueDate: new FormControl('', { nonNullable: true }),
      status: new FormControl(TaskStatusEnum.Pending, { nonNullable: true, validators: [Validators.required] }),
      taskType: new FormControl(7, { nonNullable: true, validators: [Validators.required] }),
      priority: new FormControl(2, { nonNullable: true, validators: [Validators.required] }),
    });
  }
}
