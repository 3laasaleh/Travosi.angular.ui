using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using TravelAgency.Application.DTOs.Quotations;

namespace TravelAgency.Application.Pdf
{
    public class QuotationPdfDocument : IDocument
    {
        private readonly QuotationDTO _quotation;
        private readonly byte[]? _logo;

        public QuotationPdfDocument(QuotationDTO quotation)
        {
            _quotation = quotation;
            _logo = ReadFirstExistingFile(
                Path.Combine(AppContext.BaseDirectory, "Email", "Templates", "main-logo.png"),
                Path.Combine(Directory.GetCurrentDirectory(), "TravelAgency.InfraStructure", "Email", "Templates", "main-logo.png"),
                Path.Combine(Directory.GetCurrentDirectory(), "..", "TravelAgency.InfraStructure", "Email", "Templates", "main-logo.png"));
        }

        public DocumentMetadata GetMetadata() => new()
        {
            Title = $"Quotation {_quotation.QuotationNo}",
            Author = "Sea World Holidays",
            Subject = "Travel quotation and proposal"
        };

        public void Compose(IDocumentContainer container)
        {
            container.Page(page =>
            {
                page.Margin(32);
                page.Size(PageSizes.A4);
                page.DefaultTextStyle(x => x.FontSize(9).FontColor(Colors.Grey.Darken3));
                page.Header().Element(ComposeHeader);
                page.Content().Element(ComposeContent);
                page.Footer().Element(ComposeFooter);
            });
        }

        private void ComposeHeader(IContainer container)
        {
            container.Column(column =>
            {
                column.Item().Row(row =>
                {
                    row.ConstantItem(105).Height(62).Element(c =>
                    {
                        if (_logo != null) c.Image(_logo).FitArea();
                        else c.AlignMiddle().Text("SEA WORLD").FontSize(17).Bold().FontColor(Colors.Blue.Darken2);
                    });

                    row.RelativeItem().PaddingLeft(12).Column(c =>
                    {
                        c.Item().Text("SEA WORLD HOLIDAYS").FontSize(18).Bold().FontColor(Colors.Blue.Darken2);
                        c.Item().Text("Travel Quotation & Proposal").FontSize(11).FontColor(Colors.Orange.Darken1);
                    });

                    row.ConstantItem(190).AlignRight().Column(c =>
                    {
                        c.Item().Text($"Quotation: {_quotation.QuotationNo}").Bold();
                        c.Item().Text($"Date: {DateTime.Today:MMMM dd, yyyy}");
                        c.Item().Text($"Valid until: {_quotation.ValidUntil:MMMM dd, yyyy}");
                       
                    });
                });

                column.Item().PaddingTop(8).LineHorizontal(2).LineColor(Colors.Blue.Darken2);
            });
        }

        private void ComposeContent(IContainer container)
        {
            container.PaddingVertical(12).Column(column =>
            {
                column.Spacing(11);
                column.Item().Element(ComposeCustomerAndTrip);
                column.Item().Text("Selected Travel Services").FontSize(12).Bold().FontColor(Colors.Blue.Darken2);
                column.Item().Element(ComposeItemsTable);
                column.Item().AlignRight().Width(285).Element(ComposeTotals);

                if (!string.IsNullOrWhiteSpace(_quotation.Notes))
                {
                    column.Item().PaddingTop(4).Background(Colors.Grey.Lighten4).Padding(9).Column(c =>
                    {
                        c.Item().Text("Notes").Bold().FontColor(Colors.Blue.Darken2);
                        c.Item().PaddingTop(3).Text(_quotation.Notes!);
                    });
                }
            });
        }

        private void ComposeCustomerAndTrip(IContainer container)
        {
            container.Row(row =>
            {
                row.RelativeItem().Border(1).BorderColor(Colors.Grey.Lighten2).Padding(9).Column(c =>
                {
                    c.Item().Text("CUSTOMER INFORMATION").Bold().FontColor(Colors.Blue.Darken2);
                    c.Item().PaddingTop(4).Text(_quotation.CustomerName ?? "-").Bold();
                    if (!string.IsNullOrWhiteSpace(_quotation.CompanyName)) c.Item().Text(_quotation.CompanyName!);
                    if (!string.IsNullOrWhiteSpace(_quotation.CustomerTypeName)) c.Item().Text($"Type: {_quotation.CustomerTypeName}");
                    if (!string.IsNullOrWhiteSpace(_quotation.CustomerEmail)) c.Item().Text($"Email: {_quotation.CustomerEmail}");
                    if (!string.IsNullOrWhiteSpace(_quotation.CustomerMobile)) c.Item().Text($"Phone: {_quotation.CustomerMobile}");
                });

                row.ConstantItem(10);
                row.RelativeItem().Border(1).BorderColor(Colors.Grey.Lighten2).Padding(9).Column(c =>
                {
                    c.Item().Text("TRAVEL INFORMATION").Bold().FontColor(Colors.Blue.Darken2);
                    c.Item().PaddingTop(4).Text($"{_quotation.TravelStartDate:MMMM dd, yyyy} — {_quotation.TravelEndDate:MMMM dd, yyyy}").Bold();
                    c.Item().Text($"Travelers: {_quotation.Adults} adult(s), {_quotation.Children} child(ren), {_quotation.Infants} infant(s)");
                    c.Item().Text($"Prepared by: {_quotation.SalesAgentName ?? "-"}");
                });
            });
        }

        private void ComposeItemsTable(IContainer container)
        {
            var sign = _quotation.CurrencySign ?? "$";
            container.Table(table =>
            {
                table.ColumnsDefinition(columns =>
                {
                    columns.ConstantColumn(55);
                    columns.RelativeColumn(3.2f);
                    columns.ConstantColumn(105);
                });

                table.Header(header =>
                {
                    header.Cell().Element(HeaderCell).Text("Image");
                    header.Cell().Element(HeaderCell).Text("Tour / Package");
                    header.Cell().Element(HeaderCell).Text("Travel date");
                });

                foreach (var item in _quotation.Items.OrderBy(i => i.SortOrder))
                {
                    var image = ReadCatalogImage(item.ImageUrl);
                    table.Cell().Element(BodyCell).Height(43).Element(c =>
                    {
                        if (image != null) c.Image(image).FitArea();
                        else c.AlignCenter().AlignMiddle().Text(item.ItemTypeName).FontSize(7).FontColor(Colors.Grey.Medium);
                    });
                    table.Cell().Element(BodyCell).Column(c =>
                    {
                        c.Item().Text(item.Description).Bold();
                        c.Item().Text(item.ItemTypeName).FontSize(8).FontColor(Colors.Blue.Darken1);
                        if (item.ServiceStartDate.HasValue)
                        {
                            var end = item.ServiceEndDate ?? item.ServiceStartDate;
                            c.Item().Text($"{item.ServiceStartDate:dd MMM yyyy} — {end:dd MMM yyyy}").FontSize(7);
                        }
                    });
                    table.Cell().Element(BodyCell).Text(item.ServiceStartDate.HasValue
                        ? $"{item.ServiceStartDate:dd MMM yyyy} - {(item.ServiceEndDate ?? item.ServiceStartDate):dd MMM yyyy}"
                        : "Included");
                }
            });
        }

        private void ComposeTotals(IContainer container)
        {
            var sign = _quotation.CurrencySign ?? "$";
            container.Border(1).BorderColor(Colors.Grey.Lighten2).Padding(10).Column(totals =>
            {
                totals.Item().Row(r =>
                {
                    r.RelativeItem().Text("FINAL PRICE").FontSize(12).Bold().FontColor(Colors.Blue.Darken2);
                    r.ConstantItem(120).AlignRight().Text($"{sign}{_quotation.TotalAmount:N2}").FontSize(13).Bold().FontColor(Colors.Blue.Darken2);
                });
            });
        }

        private void ComposeFooter(IContainer container)
        {
            container.Column(column =>
            {
                column.Item().LineHorizontal(1).LineColor(Colors.Blue.Darken2);
                column.Item().PaddingTop(5).Row(row =>
                {
                    row.RelativeItem().Text("Thank you for choosing Sea World Holidays.").FontSize(8).FontColor(Colors.Grey.Darken1);
                    row.RelativeItem().AlignRight().Text(text =>
                    {
                        text.Span("Page ").FontSize(8);
                        text.CurrentPageNumber().FontSize(8);
                        text.Span(" / ").FontSize(8);
                        text.TotalPages().FontSize(8);
                    });
                });
            });
        }

        private static IContainer HeaderCell(IContainer c) =>
            c.Background(Colors.Blue.Darken2).Padding(6).DefaultTextStyle(t => t.FontColor(Colors.White).Bold().FontSize(8));

        private static IContainer BodyCell(IContainer c) =>
            c.BorderBottom(1).BorderColor(Colors.Grey.Lighten2).Padding(5).AlignMiddle();

        private static byte[]? ReadCatalogImage(string? imageUrl)
        {
            if (string.IsNullOrWhiteSpace(imageUrl) || Uri.TryCreate(imageUrl, UriKind.Absolute, out _)) return null;
            var relative = imageUrl.Replace('\\', '/').TrimStart('/');
            var withoutImages = relative.StartsWith("images/", StringComparison.OrdinalIgnoreCase) ? relative[7..] : relative;
            return ReadFirstExistingFile(
                Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", relative.Replace('/', Path.DirectorySeparatorChar)),
                Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", withoutImages.Replace('/', Path.DirectorySeparatorChar)),
                Path.Combine(AppContext.BaseDirectory, "wwwroot", "images", withoutImages.Replace('/', Path.DirectorySeparatorChar)));
        }

        private static byte[]? ReadFirstExistingFile(params string[] paths)
        {
            foreach (var path in paths)
            {
                try { if (File.Exists(path)) return File.ReadAllBytes(path); }
                catch (IOException) { }
                catch (UnauthorizedAccessException) { }
            }
            return null;
        }
    }
}
