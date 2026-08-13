using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TravelAgency.InfraStructure.Migrations
{
    /// <inheritdoc />
    public partial class addnationality : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Nationality",
                table: "Travelers");

            migrationBuilder.DropColumn(
                name: "PreferredLanguage",
                table: "Customers");

            migrationBuilder.AddColumn<int>(
                name: "NationalityId",
                table: "Travelers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "Customers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "FirstName",
                table: "Customers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Travelers_NationalityId",
                table: "Travelers",
                column: "NationalityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Travelers_Countries_NationalityId",
                table: "Travelers",
                column: "NationalityId",
                principalTable: "Countries",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Travelers_Countries_NationalityId",
                table: "Travelers");

            migrationBuilder.DropIndex(
                name: "IX_Travelers_NationalityId",
                table: "Travelers");

            migrationBuilder.DropColumn(
                name: "NationalityId",
                table: "Travelers");

            migrationBuilder.AddColumn<string>(
                name: "Nationality",
                table: "Travelers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "Customers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "FirstName",
                table: "Customers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "PreferredLanguage",
                table: "Customers",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
