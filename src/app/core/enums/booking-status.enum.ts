export enum BookingStatusEnum {
  Pending = 0,
  Confirmed,
  Cancelled,
  Completed,
}

export const BOOKING_STATUS_OPTIONS = [
  { value: BookingStatusEnum.Pending, labelKey: 'bookingStatusPending' },
  { value: BookingStatusEnum.Confirmed, labelKey: 'bookingStatusConfirmed' },
  { value: BookingStatusEnum.Cancelled, labelKey: 'bookingStatusCancelled' },
  { value: BookingStatusEnum.Completed, labelKey: 'bookingStatusCompleted' },
];
