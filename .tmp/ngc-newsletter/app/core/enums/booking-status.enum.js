export var BookingStatusEnum;
(function (BookingStatusEnum) {
    BookingStatusEnum[BookingStatusEnum["Pending"] = 0] = "Pending";
    BookingStatusEnum[BookingStatusEnum["Confirmed"] = 1] = "Confirmed";
    BookingStatusEnum[BookingStatusEnum["Cancelled"] = 2] = "Cancelled";
    BookingStatusEnum[BookingStatusEnum["Completed"] = 3] = "Completed";
})(BookingStatusEnum || (BookingStatusEnum = {}));
export const BOOKING_STATUS_OPTIONS = [
    { value: BookingStatusEnum.Pending, labelKey: 'bookingStatusPending' },
    { value: BookingStatusEnum.Confirmed, labelKey: 'bookingStatusConfirmed' },
    { value: BookingStatusEnum.Cancelled, labelKey: 'bookingStatusCancelled' },
    { value: BookingStatusEnum.Completed, labelKey: 'bookingStatusCompleted' },
];
