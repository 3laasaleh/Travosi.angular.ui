using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TravelAgency.InfraStructure.Migrations
{
    /// <inheritdoc />
    public partial class AirlineFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsActived",
                table: "Airlines",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActived",
                table: "Airlines");
        }
    }
}
