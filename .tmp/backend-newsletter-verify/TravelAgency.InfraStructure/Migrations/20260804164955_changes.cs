using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TravelAgency.InfraStructure.Migrations
{
    /// <inheritdoc />
    public partial class changes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AgentId",
                table: "Customers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Customers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Customers_AgentId",
                table: "Customers",
                column: "AgentId");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_AgentId",
                table: "Bookings",
                column: "AgentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Users_AgentId",
                table: "Bookings",
                column: "AgentId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Customers_Users_AgentId",
                table: "Customers",
                column: "AgentId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Users_AgentId",
                table: "Bookings");

            migrationBuilder.DropForeignKey(
                name: "FK_Customers_Users_AgentId",
                table: "Customers");

            migrationBuilder.DropIndex(
                name: "IX_Customers_AgentId",
                table: "Customers");

            migrationBuilder.DropIndex(
                name: "IX_Bookings_AgentId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "AgentId",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Customers");
        }
    }
}
