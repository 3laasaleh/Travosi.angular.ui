using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TravelAgency.InfraStructure.Migrations
{
    /// <inheritdoc />
    public partial class AddPackageCurrency : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CurrencyId",
                table: "Packages",
                type: "int",
                nullable: false,
                defaultValue: 2);

            migrationBuilder.CreateIndex(
                name: "IX_Packages_CurrencyId",
                table: "Packages",
                column: "CurrencyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Packages_Currencies_CurrencyId",
                table: "Packages",
                column: "CurrencyId",
                principalTable: "Currencies",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Packages_Currencies_CurrencyId",
                table: "Packages");

            migrationBuilder.DropIndex(
                name: "IX_Packages_CurrencyId",
                table: "Packages");

            migrationBuilder.DropColumn(
                name: "CurrencyId",
                table: "Packages");
        }
    }
}
