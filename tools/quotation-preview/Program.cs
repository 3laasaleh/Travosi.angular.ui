using QuestPDF.Fluent;
using QuestPDF.Infrastructure;
using TravelAgency.Application.DTOs.CrmDocuments;
using TravelAgency.Application.DTOs.Quotations;
using TravelAgency.Application.Pdf;
using TravelAgency.Domain.Enums;

QuestPDF.Settings.License = LicenseType.Community;

var outputPath = args.Length > 0
    ? Path.GetFullPath(args[0])
    : Path.GetFullPath(Path.Combine("artifacts", "QT-DEMO-2026-MINYA-corrected.pdf"));
Directory.CreateDirectory(Path.GetDirectoryName(outputPath)!);

var travelStart = new DateOnly(2026, 10, 25);
var travelEnd = new DateOnly(2026, 10, 30);
var checkIn = new DateTime(2026, 10, 25, 14, 0, 0);
var checkout = new DateTime(2026, 10, 30, 11, 0, 0);

var quotation = new QuotationDTO
{
    QuotationNo = "QT-DEMO-2026-MINYA",
    CustomerName = "Mona Hassan",
    CustomerEmail = "mona.hassan@example.com",
    CustomerMobile = "+20 100 555 0142",
    CustomerTypeName = "Family",
    SalesAgentName = "Sea World Travel Consultant",
    CurrencySign = "$",
    CurrencyCode = "USD",
    TravelStartDate = travelStart,
    TravelEndDate = travelEnd,
    ValidUntil = new DateOnly(2026, 10, 20),
    CreatedDate = new DateTime(2026, 8, 25),
    Adults = 2,
    Status = QuotationStatusEnum.Sent,
    SubTotal = 3_600m,
    Discount = 500m,
    ServiceFees = 50m,
    TotalAmount = 3_150m,
    DepositRequired = 1_000m,
    PaidAmount = 500m,
    RemainingBalance = 2_650m,
    PaymentDeadline = new DateOnly(2026, 10, 20),
    AcceptedPaymentMethods = ["Visa", "Mastercard", "Bank transfer", "InstaPay"],
    AvailabilityNotice = "Flights, rooms and transfers remain subject to supplier availability until the required deposit is received and written confirmation is issued.",
    Notes = "Please verify that passenger names match their passports before confirmation.",
    AcceptanceInstructions = "To accept this quotation, sign below and return it to your travel consultant with proof of the required deposit before the payment deadline.",
    Agency = new AgencyInformationDTO
    {
        BusinessName = "Sea World Holidays",
        Address = "Cairo, Egypt",
        Phone = "+20 100 555 0100",
        Email = "reservations@seaworld-holidays.com",
        Website = "www.seaworld-holidays.com",
        TaxRegistrationNumber = "Available on request"
    },
    Items =
    [
        new QuotationItemDTO
        {
            ItemType = QuotationItemTypeEnum.Package,
            Description = "Six-day Upper Egypt discovery package",
            Quantity = 1,
            SellingPrice = 2_500m,
            Total = 2_500m,
            SortOrder = 1,
            ServiceStartDate = travelStart.ToDateTime(TimeOnly.MinValue),
            ServiceEndDate = travelEnd.ToDateTime(TimeOnly.MaxValue),
            ImageUrl = "destinations/360_F_210079817_gGKIuYd5UsFhv20uwf3bVQS5oHsU22KZ.jpg",
            Details = new TravelServiceDetailsDTO
            {
                ServiceTypeName = "Package",
                Title = "Upper Egypt Discovery — Luxor & Minya",
                Summary = "A private six-day journey combining Luxor's ancient sites with a Minya cultural extension.",
                ImageUrl = "https://localhost:5152/images/destinations/360_F_210079817_gGKIuYd5UsFhv20uwf3bVQS5oHsU22KZ.jpg",
                StartDateTime = travelStart.ToDateTime(TimeOnly.MinValue),
                EndDateTime = travelEnd.ToDateTime(TimeOnly.MaxValue),
                Destinations = ["Luxor", "Minya"],
                Highlights = ["East and West Bank heritage sites", "Minya cultural extension", "Private guided sightseeing"],
                Includes = ["Five hotel nights", "Arrival airport transfer listed in this quotation", "Private guided sightseeing described in the itinerary", "Daily breakfast"],
                Excludes = ["International flights", "Departure airport transfer unless separately confirmed", "Personal expenses and gratuities"],
                Meals = ["Breakfast on Days 2–6"],
                GuideLanguages = ["English", "Arabic"],
                OptionalActivities = ["Hot-air balloon flight in Luxor, subject to weather and separate confirmation"],
                RequiredDocuments = ["Passport valid for at least six months from travel date"],
                Itinerary =
                [
                    Day(1, "Arrival in Luxor", "Arrive on the confirmed outbound flight, meet the representative and take the listed transfer to the Luxor hotel."),
                    Day(2, "Luxor East Bank", "Guided visits to Karnak Temple and Luxor Temple."),
                    Day(3, "Luxor West Bank", "Guided visits to the Valley of the Kings and selected West Bank monuments."),
                    Day(4, "Travel to Minya", "Private overland journey to Minya with comfort stops; timing confirmed locally."),
                    Day(5, "Minya cultural visits", "Private guided sightseeing according to the final confirmed operating schedule."),
                    Day(6, "Program completion", "Breakfast and checkout. No departure airport transfer is included unless separately confirmed in writing.")
                ]
            }
        },
        new QuotationItemDTO
        {
            ItemType = QuotationItemTypeEnum.Flight,
            Description = "Air Cairo outbound flight — Cairo to Luxor",
            Quantity = 1,
            SellingPrice = 495m,
            Total = 495m,
            SortOrder = 2,
            IsRoundTrip = false,
            BookingStatus = "On request",
            BaggageAllowance = "1 checked bag up to 23 kg; 1 cabin bag up to 8 kg",
            DepartureTerminal = "Terminal to be reconfirmed",
            ArrivalTerminal = "Luxor Airport main terminal",
            FareConditions = "Subject to airline availability, fare rules and ticketing deadline.",
            ImageUrl = "airlines/air-cairo-logo-png_seeklogo-487542.png",
            Details = new TravelServiceDetailsDTO
            {
                ServiceTypeName = "Flight",
                Title = "Outbound flight — Cairo to Luxor",
                TripType = "One-way",
                Provider = "Air Cairo",
                ImageUrl = "https://localhost:5152/images/airlines/air-cairo-logo-png_seeklogo-487542.png",
                BookingStatus = "On request",
                FlightLegs =
                [
                    new FlightLegDTO
                    {
                        LegName = "Outbound",
                        Airline = "Air Cairo",
                        FlightNumber = "SM060",
                        DepartureAirport = "Cairo International Airport (CAI)",
                        ArrivalAirport = "Luxor International Airport (LXR)",
                        DepartureDateTime = new DateTime(2026, 10, 25, 8, 30, 0),
                        ArrivalDateTime = new DateTime(2026, 10, 25, 9, 40, 0),
                        CabinClass = "Economy",
                        BaggageAllowance = "1 checked bag up to 23 kg; 1 cabin bag up to 8 kg",
                        DepartureTerminal = "To be reconfirmed",
                        ArrivalTerminal = "Main terminal",
                        BookingStatus = "On request",
                        FareConditions = "Changes and cancellation are subject to airline fare rules."
                    }
                ]
            }
        },
        new QuotationItemDTO
        {
            ItemType = QuotationItemTypeEnum.Hotel,
            Description = "Nile Garden Hotel, Luxor — five nights",
            Quantity = 1,
            SellingPrice = 550m,
            Total = 550m,
            SortOrder = 3,
            ServiceStartDate = checkIn,
            ServiceEndDate = checkout,
            RoomType = "Deluxe Nile-view room",
            NumberOfRooms = 1,
            Occupancy = "2 adults",
            BedType = "Double bed",
            MealPlan = "Bed and breakfast",
            ChargesNotIncluded = "Incidental charges, minibar and personal expenses",
            Details = new TravelServiceDetailsDTO
            {
                ServiceTypeName = "Hotel",
                Title = "Nile Garden Hotel — Luxor",
                Address = "Luxor, Egypt",
                StartDateTime = checkIn,
                EndDateTime = checkout,
                NumberOfNights = 5,
                RoomType = "Deluxe Nile-view room",
                NumberOfRooms = 1,
                Occupancy = "2 adults",
                BedType = "Double bed",
                MealPlan = "Bed and breakfast",
                BookingStatus = "On request",
                ChargesNotIncluded = "Incidental charges, minibar and personal expenses"
            }
        },
        new QuotationItemDTO
        {
            ItemType = QuotationItemTypeEnum.Transfer,
            Description = "Private arrival transfer — Luxor Airport to Luxor hotel",
            Quantity = 1,
            SellingPrice = 55m,
            Total = 55m,
            SortOrder = 4,
            From = "Luxor International Airport (LXR)",
            To = "Nile Garden Hotel, Luxor",
            TransferDate = travelStart,
            FromTime = new TimeOnly(10, 15),
            ArrivalTime = new TimeOnly(11, 30),
            VehicleType = "Private air-conditioned sedan",
            PassengerCapacity = 3,
            BaggageCapacity = 3,
            MeetingInstructions = "Meet the representative in the arrivals hall after baggage collection. Look for a Sea World Holidays name sign.",
            ContactInformation = "+20 100 555 0100",
            Details = new TravelServiceDetailsDTO
            {
                ServiceTypeName = "Transfer",
                Title = "Private arrival transfer",
                Route = "Luxor International Airport (LXR) → Nile Garden Hotel, Luxor",
                TripType = "One-way arrival transfer",
                StartDateTime = new DateTime(2026, 10, 25, 10, 15, 0),
                EndDateTime = new DateTime(2026, 10, 25, 11, 30, 0),
                VehicleType = "Private air-conditioned sedan",
                PassengerCapacity = 3,
                BaggageCapacity = 3,
                MeetingInstructions = "Meet the representative in the arrivals hall after baggage collection. Look for a Sea World Holidays name sign.",
                ContactInformation = "+20 100 555 0100",
                BookingStatus = "On request"
            }
        }
    ],
    Policies =
    [
        Policy(QuotationPolicyTypeEnum.Cancellation, "All services", "Cancellation charges follow the confirmed supplier terms and may reach 100% after ticketing or inside the supplier's penalty period."),
        Policy(QuotationPolicyTypeEnum.Amendment, "All services", "Date, name and service changes are subject to availability, supplier approval and any fare or handling difference."),
        Policy(QuotationPolicyTypeEnum.NoShow, "Flights, hotel and transfers", "A no-show may result in 100% cancellation charges for the affected service."),
        Policy(QuotationPolicyTypeEnum.Refund, "All services", "Approved refunds are returned through the original payment channel after supplier processing, less applicable charges."),
        Policy(QuotationPolicyTypeEnum.RequiredDocument, "All travellers", "Passenger names must match passports. Travellers are responsible for passport, visa, health and entry requirements."),
        Policy(QuotationPolicyTypeEnum.General, "Quotation", "Quoted services are not confirmed until the deposit is received and Sea World Holidays issues written confirmation.")
    ]
};

var document = new QuotationPdfDocument(quotation, demoMode: true);
document.GeneratePdf(outputPath);

var previewDirectory = Path.Combine(Path.GetDirectoryName(outputPath)!, "QT-DEMO-2026-MINYA-pages");
Directory.CreateDirectory(previewDirectory);
var pageNumber = 0;
foreach (var page in document.GenerateImages())
{
    pageNumber++;
    File.WriteAllBytes(Path.Combine(previewDirectory, $"page-{pageNumber:00}.png"), page);
}

Console.WriteLine(outputPath);
Console.WriteLine($"Rendered {pageNumber} preview pages to {previewDirectory}");

static TravelServiceItineraryDTO Day(int day, string title, string description) => new()
{
    DayNumber = day,
    Title = title,
    Description = description
};

static QuotationPolicyDTO Policy(QuotationPolicyTypeEnum type, string appliesTo, string value) => new()
{
    PolicyType = type,
    AppliesTo = appliesTo,
    Value = value
};
