using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TravelAgency.InfraStructure.Migrations
{
    /// <inheritdoc />
    public partial class AddDestinationCityHierarchy : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CityId",
                table: "Tours",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DestinationId",
                table: "Cities",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 1,
                column: "DestinationId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 2,
                column: "DestinationId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 3,
                column: "DestinationId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 4,
                column: "DestinationId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 5,
                column: "DestinationId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 6,
                column: "DestinationId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 7,
                column: "DestinationId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 8,
                column: "DestinationId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 9,
                column: "DestinationId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 10,
                column: "DestinationId",
                value: null);

            // Backfill only deterministic legacy matches. Destination names are
            // unique; unmatched country-level cities deliberately remain null.
            migrationBuilder.Sql(@"
                UPDATE city
                SET DestinationId = destination.Id
                FROM Cities AS city
                INNER JOIN Destinations AS destination
                    ON destination.NameEng = city.NameEng
                WHERE city.DestinationId IS NULL
                  AND city.NameEng IS NOT NULL
                  AND (
                      SELECT COUNT(1)
                      FROM Destinations AS matchingDestination
                      WHERE matchingDestination.NameEng = city.NameEng
                  ) = 1;");

            migrationBuilder.CreateIndex(
                name: "IX_Tours_CityId",
                table: "Tours",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_Cities_DestinationId",
                table: "Cities",
                column: "DestinationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cities_Destinations_DestinationId",
                table: "Cities",
                column: "DestinationId",
                principalTable: "Destinations",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Tours_Cities_CityId",
                table: "Tours",
                column: "CityId",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cities_Destinations_DestinationId",
                table: "Cities");

            migrationBuilder.DropForeignKey(
                name: "FK_Tours_Cities_CityId",
                table: "Tours");

            migrationBuilder.DropIndex(
                name: "IX_Tours_CityId",
                table: "Tours");

            migrationBuilder.DropIndex(
                name: "IX_Cities_DestinationId",
                table: "Cities");

            migrationBuilder.DropColumn(
                name: "CityId",
                table: "Tours");

            migrationBuilder.DropColumn(
                name: "DestinationId",
                table: "Cities");
        }
    }
}
