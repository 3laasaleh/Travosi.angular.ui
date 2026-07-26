export enum TaskStatusEnum {
  Pending = 0,
  InProgress,
  Completed,
}

export const TASK_STATUS_OPTIONS = [
  { value: TaskStatusEnum.Pending, labelKey: 'taskStatusPending' },
  { value: TaskStatusEnum.InProgress, labelKey: 'taskStatusInProgress' },
  { value: TaskStatusEnum.Completed, labelKey: 'taskStatusCompleted' },
];
