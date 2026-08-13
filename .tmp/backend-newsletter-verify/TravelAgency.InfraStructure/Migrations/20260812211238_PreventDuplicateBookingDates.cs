using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TravelAgency.InfraStructure.Migrations
{
    /// <inheritdoc />
    public partial class PreventDuplicateBookingDates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP INDEX IF EXISTS [IX_Bookings_UserId] ON [Bookings];");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_UserId_PackageId_DateFrom_DateTo",
                table: "Bookings",
                columns: new[] { "UserId", "PackageId", "DateFrom", "DateTo" },
                unique: true,
                filter: "[PackageId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_UserId_TourId_DateFrom_DateTo",
                table: "Bookings",
                columns: new[] { "UserId", "TourId", "DateFrom", "DateTo" },
                unique: true,
                filter: "[TourId] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Bookings_UserId_PackageId_DateFrom_DateTo",
                table: "Bookings");

            migrationBuilder.DropIndex(
                name: "IX_Bookings_UserId_TourId_DateFrom_DateTo",
                table: "Bookings");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_UserId",
                table: "Bookings",
                column: "UserId");
        }
    }
}
