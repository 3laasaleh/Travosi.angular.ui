using QuestPDF.Fluent;
using QuestPDF.Infrastructure;
using TravelAgency.Application.DTOs.Quotations;
using TravelAgency.Application.Pdf;
using TravelAgency.Domain.Enums;

QuestPDF.Settings.License = LicenseType.Community;

var outputPath = args.Length > 0
    ? Path.GetFullPath(args[0])
    : Path.GetFullPath(Path.Combine("artifacts", "sea-world-quotation-sample.pdf"));
Directory.CreateDirectory(Path.GetDirectoryName(outputPath)!);

var quotation = new QuotationDTO
{
    QuotationNo = $"QT-{DateTime.Today:yyyyMMdd}-001",
    CustomerName = "Ahmed Hassan",
    CustomerEmail = "ahmed.hassan@example.com",
    CustomerMobile = "+20 100 123 4567",
    CustomerTypeName = "Family",
    CompanyName = "Hassan Family Travel",
    SalesAgentName = "Mariam Saleh",
    CurrencySign = "$",
    TravelStartDate = DateOnly.FromDateTime(DateTime.Today.AddDays(30)),
    TravelEndDate = DateOnly.FromDateTime(DateTime.Today.AddDays(37)),
    ValidUntil = DateOnly.FromDateTime(DateTime.Today.AddDays(10)),
    Adults = 2,
    Children = 1,
    Infants = 0,
    Status = QuotationStatusEnum.Draft,
    SubTotal = 3350,
    Discount = 250,
    TaxRate = 5,
    Tax = 155,
    TotalAmount = 3255,
    Notes = "Prices are subject to availability until the quotation is confirmed. Passport details may be supplied later.",
    Items =
    [
        new QuotationItemDTO
        {
            ItemType = QuotationItemTypeEnum.Package,
            Description = "Sharm El Sheikh Family Escape — Adults",
            Quantity = 2,
            SellingPrice = 1200,
            Discount = 0,
            Total = 2400,
            SortOrder = 1,
            ImageUrl = "/images/destinations/dubai-tourism.jpg",
            ServiceStartDate = DateTime.Today.AddDays(30),
            ServiceEndDate = DateTime.Today.AddDays(35)
        },
        new QuotationItemDTO
        {
            ItemType = QuotationItemTypeEnum.Package,
            Description = "Sharm El Sheikh Family Escape — Child",
            Quantity = 1,
            SellingPrice = 650,
            Discount = 0,
            Total = 650,
            SortOrder = 2,
            ImageUrl = "/images/destinations/dubai-tourism.jpg",
            ServiceStartDate = DateTime.Today.AddDays(30),
            ServiceEndDate = DateTime.Today.AddDays(35)
        },
        new QuotationItemDTO
        {
            ItemType = QuotationItemTypeEnum.Tour,
            Description = "Ras Mohammed National Park Day Tour",
            Quantity = 3,
            SellingPrice = 100,
            Discount = 0,
            Total = 300,
            SortOrder = 3,
            ImageUrl = "/images/destinations/15486940194b45347ac5037248d2363d27dec5ad-1600x1066.jpg",
            ServiceStartDate = DateTime.Today.AddDays(33),
            ServiceEndDate = DateTime.Today.AddDays(33)
        }
    ]
};

new QuotationPdfDocument(quotation).GeneratePdf(outputPath);
Console.WriteLine(outputPath);
