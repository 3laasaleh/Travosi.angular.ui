using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TravelAgency.InfraStructure.Migrations
{
    /// <inheritdoc />
    public partial class AddCustomerTravelerHouseholds : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Travelers_Customers_CustomerId",
                table: "Travelers");

 

    

            migrationBuilder.AddColumn<bool>(
                name: "IsPrimary",
                table: "Travelers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Relationship",
                table: "Travelers",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.Sql(@"
                UPDATE Travelers SET Relationship = 'Companion' WHERE CustomerId IS NOT NULL;
                UPDATE t
                SET t.IsPrimary = 1, t.Relationship = 'Primary'
                FROM Travelers t
                INNER JOIN (
                    SELECT CustomerId, MIN(Id) AS PrimaryTravelerId
                    FROM Travelers
                    WHERE CustomerId IS NOT NULL
                    GROUP BY CustomerId
                ) p ON p.PrimaryTravelerId = t.Id;");

            migrationBuilder.AddForeignKey(
                name: "FK_Travelers_Customers_CustomerId",
                table: "Travelers",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Travelers_Customers_CustomerId",
                table: "Travelers");

            migrationBuilder.DropColumn(
                name: "IsPrimary",
                table: "Travelers");

            migrationBuilder.DropColumn(
                name: "Relationship",
                table: "Travelers");

            migrationBuilder.AddColumn<int>(
                name: "CustomerId1",
                table: "Travelers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Travelers_CustomerId1",
                table: "Travelers",
                column: "CustomerId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Travelers_Customers_CustomerId",
                table: "Travelers",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Travelers_Customers_CustomerId1",
                table: "Travelers",
                column: "CustomerId1",
                principalTable: "Customers",
                principalColumn: "Id");
        }
    }
}
