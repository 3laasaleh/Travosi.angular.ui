using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TravelAgency.InfraStructure.Migrations
{
    /// <inheritdoc />
    public partial class AddItineraryChildRelationships : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PackageItineraries_PackageItineraries_ParentId",
                table: "PackageItineraries");

            migrationBuilder.DropForeignKey(
                name: "FK_TourItineraries_TourItineraries_ParentId",
                table: "TourItineraries");

            migrationBuilder.AddForeignKey(
                name: "FK_PackageItineraries_PackageItineraries_ParentId",
                table: "PackageItineraries",
                column: "ParentId",
                principalTable: "PackageItineraries",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TourItineraries_TourItineraries_ParentId",
                table: "TourItineraries",
                column: "ParentId",
                principalTable: "TourItineraries",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PackageItineraries_PackageItineraries_ParentId",
                table: "PackageItineraries");

            migrationBuilder.DropForeignKey(
                name: "FK_TourItineraries_TourItineraries_ParentId",
                table: "TourItineraries");

            migrationBuilder.AddForeignKey(
                name: "FK_PackageItineraries_PackageItineraries_ParentId",
                table: "PackageItineraries",
                column: "ParentId",
                principalTable: "PackageItineraries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TourItineraries_TourItineraries_ParentId",
                table: "TourItineraries",
                column: "ParentId",
                principalTable: "TourItineraries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
