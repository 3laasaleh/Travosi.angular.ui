export enum TaskStatusEnum {
  Pending = 0,
  InProgress,
  Completed,
  Returned,
  Closed,
}

export const TASK_STATUS_OPTIONS = [
  { value: TaskStatusEnum.Pending, labelKey: 'taskStatusPending' },
  { value: TaskStatusEnum.InProgress, labelKey: 'taskStatusInProgress' },
  { value: TaskStatusEnum.Completed, labelKey: 'taskStatusCompleted' },
  { value: TaskStatusEnum.Returned, labelKey: 'taskStatusReturned' },
  { value: TaskStatusEnum.Closed, labelKey: 'taskStatusClosed' },
];
