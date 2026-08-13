export var TaskStatusEnum;
(function (TaskStatusEnum) {
    TaskStatusEnum[TaskStatusEnum["Pending"] = 0] = "Pending";
    TaskStatusEnum[TaskStatusEnum["InProgress"] = 1] = "InProgress";
    TaskStatusEnum[TaskStatusEnum["Completed"] = 2] = "Completed";
    TaskStatusEnum[TaskStatusEnum["Returned"] = 3] = "Returned";
    TaskStatusEnum[TaskStatusEnum["Closed"] = 4] = "Closed";
})(TaskStatusEnum || (TaskStatusEnum = {}));
export const TASK_STATUS_OPTIONS = [
    { value: TaskStatusEnum.Pending, labelKey: 'taskStatusPending' },
    { value: TaskStatusEnum.InProgress, labelKey: 'taskStatusInProgress' },
    { value: TaskStatusEnum.Completed, labelKey: 'taskStatusCompleted' },
    { value: TaskStatusEnum.Returned, labelKey: 'taskStatusReturned' },
    { value: TaskStatusEnum.Closed, labelKey: 'taskStatusClosed' },
];
