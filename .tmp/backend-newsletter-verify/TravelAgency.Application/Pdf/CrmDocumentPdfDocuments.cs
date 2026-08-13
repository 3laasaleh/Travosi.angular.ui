using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using TravelAgency.Application.DTOs.CrmDocuments;

namespace TravelAgency.Application.Pdf
{
    internal static class CrmDocumentPdfStyle
    {
        public static byte[]? Logo()
        {
            var paths = new[]
            {
                Path.Combine(AppContext.BaseDirectory, "Email", "Templates", "main-logo.png"),
                Path.Combine(Directory.GetCurrentDirectory(), "TravelAgency.InfraStructure", "Email", "Templates", "main-logo.png"),
                Path.Combine(Directory.GetCurrentDirectory(), "..", "TravelAgency.InfraStructure", "Email", "Templates", "main-logo.png")
            };
            foreach (var path in paths) try { if (File.Exists(path)) return File.ReadAllBytes(path); } catch { }
            return null;
        }

        public static void Header(IContainer container, byte[]? logo, string title, string number, DateOnly date) => container.Column(column =>
        {
            column.Item().Row(row =>
            {
                row.ConstantItem(110).Height(60).Element(c => { if (logo != null) c.Image(logo).FitArea(); else c.Text("SEA WORLD").Bold(); });
                row.RelativeItem().PaddingLeft(15).AlignMiddle().Text(title).FontSize(22).Bold().FontColor(Colors.Blue.Darken2);
                row.ConstantItem(180).AlignRight().Column(c => { c.Item().Text(number).Bold(); c.Item().Text(date.ToString("MMMM dd, yyyy")); });
            });
            column.Item().PaddingTop(8).LineHorizontal(2).LineColor(Colors.Blue.Darken2);
        });

        public static void Footer(IContainer container) => container.Column(c =>
        {
            c.Item().LineHorizontal(1).LineColor(Colors.Blue.Darken2);
            c.Item().PaddingTop(5).Row(r => { r.RelativeItem().Text("Sea World Holidays").FontSize(8); r.RelativeItem().AlignRight().Text(t => { t.Span("Page "); t.CurrentPageNumber(); }); });
        });
    }

    public class InvoicePdfDocument : IDocument
    {
        private readonly InvoiceDTO _invoice;
        private readonly byte[]? _logo = CrmDocumentPdfStyle.Logo();
        public InvoicePdfDocument(InvoiceDTO invoice) => _invoice = invoice;
        public DocumentMetadata GetMetadata() => new() { Title = $"Invoice {_invoice.InvoiceNo}", Author = "Sea World Holidays" };
        public void Compose(IDocumentContainer container) => container.Page(page =>
        {
            page.Size(PageSizes.A4); page.Margin(32); page.DefaultTextStyle(x => x.FontSize(9).FontColor(Colors.Grey.Darken3));
            page.Header().Element(c => CrmDocumentPdfStyle.Header(c, _logo, "INVOICE", _invoice.InvoiceNo, _invoice.InvoiceDate));
            page.Content().PaddingVertical(14).Column(column =>
            {
                column.Spacing(12);
                column.Item().Border(1).BorderColor(Colors.Grey.Lighten2).Padding(10).Row(r =>
                {
                    r.RelativeItem().Column(c => { c.Item().Text("BILL TO").Bold().FontColor(Colors.Blue.Darken2); c.Item().Text(_invoice.CustomerName).Bold(); c.Item().Text(_invoice.CustomerNumber); });
                    r.RelativeItem().AlignRight().Column(c => { c.Item().Text($"Invoice date: {_invoice.InvoiceDate:MMMM dd, yyyy}"); c.Item().Text($"Due date: {_invoice.DueDate:MMMM dd, yyyy}"); });
                });
                column.Item().Table(table =>
                {
                    table.ColumnsDefinition(c => { c.RelativeColumn(3); c.ConstantColumn(45); c.ConstantColumn(85); c.ConstantColumn(75); c.ConstantColumn(90); });
                    table.Header(h => { Cell(h.Cell(), true).Text("Tour / Package"); Cell(h.Cell(), true).AlignRight().Text("Qty"); Cell(h.Cell(), true).AlignRight().Text("Price"); Cell(h.Cell(), true).AlignRight().Text("Discount"); Cell(h.Cell(), true).AlignRight().Text("Total"); });
                    foreach (var item in _invoice.Items)
                    {
                        Cell(table.Cell()).Text(item.Description); Cell(table.Cell()).AlignRight().Text(item.Quantity.ToString());
                        Cell(table.Cell()).AlignRight().Text($"{_invoice.CurrencySign}{item.UnitPrice:N2}"); Cell(table.Cell()).AlignRight().Text($"{_invoice.CurrencySign}{item.Discount:N2}"); Cell(table.Cell()).AlignRight().Text($"{_invoice.CurrencySign}{item.Total:N2}").Bold();
                    }
                });
                column.Item().AlignRight().Width(280).Border(1).BorderColor(Colors.Grey.Lighten2).Padding(10).Column(c =>
                {
                    c.Item().Row(r => { r.RelativeItem().Text("Subtotal"); r.RelativeItem().AlignRight().Text($"{_invoice.CurrencySign}{_invoice.SubTotal:N2}"); });
                    c.Item().Row(r => { r.RelativeItem().Text("Discount"); r.RelativeItem().AlignRight().Text($"- {_invoice.CurrencySign}{_invoice.Discount:N2}"); });
                    c.Item().Row(r => { r.RelativeItem().Text($"Tax ({_invoice.TaxRate:N2}%)"); r.RelativeItem().AlignRight().Text($"{_invoice.CurrencySign}{_invoice.Tax:N2}"); });
                    c.Item().PaddingTop(5).LineHorizontal(1).LineColor(Colors.Blue.Darken2);
                    c.Item().PaddingTop(5).Row(r => { r.RelativeItem().Text("TOTAL").FontSize(12).Bold(); r.RelativeItem().AlignRight().Text($"{_invoice.CurrencySign}{_invoice.TotalAmount:N2}").FontSize(12).Bold().FontColor(Colors.Blue.Darken2); });
                });
            });
            page.Footer().Element(CrmDocumentPdfStyle.Footer);
        });
        private static IContainer Cell(IContainer c, bool header = false) => header ? c.Background(Colors.Blue.Darken2).Padding(6).DefaultTextStyle(x => x.FontColor(Colors.White).Bold()) : c.BorderBottom(1).BorderColor(Colors.Grey.Lighten2).Padding(6);
    }

    public class VoucherPdfDocument : IDocument
    {
        private readonly VoucherDTO _voucher;
        private readonly byte[]? _logo = CrmDocumentPdfStyle.Logo();
        public VoucherPdfDocument(VoucherDTO voucher) => _voucher = voucher;
        public DocumentMetadata GetMetadata() => new() { Title = $"Voucher {_voucher.VoucherNo}", Author = "Sea World Holidays" };
        public void Compose(IDocumentContainer container) => container.Page(page =>
        {
            page.Size(PageSizes.A4); page.Margin(42); page.DefaultTextStyle(x => x.FontSize(11).FontColor(Colors.Grey.Darken3));
            page.Header().Element(c => CrmDocumentPdfStyle.Header(c, _logo, "TRAVEL VOUCHER", _voucher.VoucherNo, _voucher.ServiceDate));
            page.Content().PaddingVertical(35).AlignCenter().Width(460).Border(1).BorderColor(Colors.Blue.Lighten2).Background(Colors.Blue.Lighten5).Padding(28).Column(c =>
            {
                c.Spacing(18);
                c.Item().AlignCenter().Text(_voucher.ServiceTypeName.ToUpperInvariant()).FontSize(12).Bold().FontColor(Colors.Orange.Darken1);
                c.Item().AlignCenter().Text(_voucher.ServiceName).FontSize(20).Bold().FontColor(Colors.Blue.Darken2);
                c.Item().LineHorizontal(1).LineColor(Colors.Blue.Lighten2);
                Field(c, "CUSTOMER NAME", _voucher.CustomerName);
                Field(c, "CUSTOMER NUMBER", _voucher.CustomerNumber);
                Field(c, "DATE", _voucher.EndDate.HasValue ? $"{_voucher.ServiceDate:MMMM dd, yyyy} - {_voucher.EndDate:MMMM dd, yyyy}" : $"{_voucher.ServiceDate:MMMM dd, yyyy}");
            });
            page.Footer().Element(CrmDocumentPdfStyle.Footer);
        });
        private static void Field(ColumnDescriptor column, string label, string value) => column.Item().Row(r => { r.ConstantItem(150).Text(label).Bold().FontColor(Colors.Blue.Darken2); r.RelativeItem().Text(value).Bold(); });
    }
}
