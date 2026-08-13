using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TravelAgency.InfraStructure.Migrations
{
    /// <inheritdoc />
    public partial class agentId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UpdatedByAdminId",
                table: "Bookings",
                newName: "AgentId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AgentId",
                table: "Bookings",
                newName: "UpdatedByAdminId");
        }
    }
}
