using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TravelAgency.InfraStructure.Migrations
{
    /// <inheritdoc />
    public partial class Namig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "TourItineraries",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "PackageItineraries",
                newName: "Title");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Title",
                table: "TourItineraries",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "PackageItineraries",
                newName: "Name");
        }
    }
}
