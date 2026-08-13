using System;
using System.Collections.Generic;
using System.Text;

namespace TravelAgency.Domain.Enums
{
    public enum PaymentStatusEnum
    {
        Pending,
        Paid,
        Failed,
        Refunded
    }
    public enum UserRoleEnum
    {
        Admin,
        Agent,
        Customer,


    }
    public enum CustomerTypeEnum
    {
        Individual = 1,
        Couple,
        Family,
        Company 

    }
    public enum BookingStatusEnum
    {
        Pending,
        Confirmed,
        Cancelled,
        Completed
    }
    public enum PaymentMethodEnum { CreditCard, DebitCard, BankTransfer, Cash, PayPal }
 
    public enum FlightClassEnum
    {
        Economy, PremiumEconomy, Business, First
    }

    public enum TravelerTypeEnum
    {
        Adult = 1,
        Child = 2,
        Infant = 3
    }

    public enum GenderEnum
    {
        Male,
        Famele
    }

    public enum QuotationItemTypeEnum
    {
        Package = 1,
        Tour = 2,
        Hotel = 3,
        Flight = 4,
        Transfer = 5,
        Visa = 6,
        Activity = 7,
        Insurance = 8,
        ServiceFee = 9,
        Other = 10
    }

    public enum VoucherServiceTypeEnum
    {
        Flight = 1,
        Hotel = 2,
        Tour = 3,
        Package = 4
    }
    public enum QuotationStatusEnum
    {
        Draft = 1,
        Sent = 2,
        Accepted = 3,
        Rejected = 4,
        Expired = 5,
        Cancelled = 6
    }
    public enum RoomTypeEnum
    {
        Single = 1,
        Double = 2,
        Twin = 3,
        Triple = 4,
        Family = 5,
        Suite = 6,
        JuniorSuite = 7,
        Deluxe = 8
    }

    public enum MealPlanEnum
    {
        RoomOnly = 1,
        BedAndBreakfast = 2,
        HalfBoard = 3,
        FullBoard = 4,
        AllInclusive = 5,
        UltraAllInclusive = 6
    }

    public enum TaskTypeEnum
    {
        FollowUpCustomer = 1,
        PrepareQuotation = 2,
        ConfirmBooking = 3,
        CollectPayment = 4,
        DocumentRequest = 5,
        CustomerSupport = 6,
        General = 7
    }

    public enum AgentTaskStatusEnum
    {
        Pending = 0,
        InProgress = 1,
        Completed = 2,
        Returned = 3,
        Closed = 4,
        Cancelled = 5
    }

    public enum TaskPriorityEnum
    {
        Low = 1,
        Medium = 2,
        High = 3,
        Urgent = 4
    }

    public enum NotificationTypeEnum
    {
        TaskAssigned = 1,
        TaskUpdated = 2,
        TaskClosed = 3,
        General = 4
    }
}
