using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TravelAgency.InfraStructure.Migrations
{
    /// <inheritdoc />
    public partial class PackageItinerary : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PackageItineraries_PackageItineraries_ParentItineraryId",
                table: "PackageItineraries");

            migrationBuilder.DropForeignKey(
                name: "FK_TourItineraries_TourItineraries_ParentItineraryId",
                table: "TourItineraries");

            migrationBuilder.DropIndex(
                name: "IX_TourItineraries_ParentItineraryId",
                table: "TourItineraries");

            migrationBuilder.DropIndex(
                name: "IX_PackageItineraries_ParentItineraryId",
                table: "PackageItineraries");

            migrationBuilder.DropColumn(
                name: "ParentItineraryId",
                table: "TourItineraries");

            migrationBuilder.DropColumn(
                name: "ParentItineraryId",
                table: "PackageItineraries");

            migrationBuilder.CreateIndex(
                name: "IX_TourItineraries_ParentId",
                table: "TourItineraries",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_PackageItineraries_ParentId",
                table: "PackageItineraries",
                column: "ParentId");

            migrationBuilder.AddForeignKey(
                name: "FK_PackageItineraries_PackageItineraries_ParentId",
                table: "PackageItineraries",
                column: "ParentId",
                principalTable: "PackageItineraries",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_TourItineraries_TourItineraries_ParentId",
                table: "TourItineraries",
                column: "ParentId",
                principalTable: "TourItineraries",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
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

            migrationBuilder.DropIndex(
                name: "IX_TourItineraries_ParentId",
                table: "TourItineraries");

            migrationBuilder.DropIndex(
                name: "IX_PackageItineraries_ParentId",
                table: "PackageItineraries");

            migrationBuilder.AddColumn<int>(
                name: "ParentItineraryId",
                table: "TourItineraries",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ParentItineraryId",
                table: "PackageItineraries",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TourItineraries_ParentItineraryId",
                table: "TourItineraries",
                column: "ParentItineraryId",
                unique: true,
                filter: "[ParentItineraryId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_PackageItineraries_ParentItineraryId",
                table: "PackageItineraries",
                column: "ParentItineraryId",
                unique: true,
                filter: "[ParentItineraryId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_PackageItineraries_PackageItineraries_ParentItineraryId",
                table: "PackageItineraries",
                column: "ParentItineraryId",
                principalTable: "PackageItineraries",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TourItineraries_TourItineraries_ParentItineraryId",
                table: "TourItineraries",
                column: "ParentItineraryId",
                principalTable: "TourItineraries",
                principalColumn: "Id");
        }
    }
}
