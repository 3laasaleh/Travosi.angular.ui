using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TravelAgency.InfraStructure.Migrations
{
    /// <inheritdoc />
    public partial class AddWebsiteVisitors : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WebsiteVisitors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VisitorId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FirstVisitedAtUtc = table.Column<DateTime>(type: "datetime2(0)", precision: 0, nullable: false),
                    LastVisitedAtUtc = table.Column<DateTime>(type: "datetime2(0)", precision: 0, nullable: false),
                    VisitCount = table.Column<int>(type: "int", nullable: false, defaultValue: 1)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WebsiteVisitors", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WebsiteVisitors_VisitorId",
                table: "WebsiteVisitors",
                column: "VisitorId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WebsiteVisitors");
        }
    }
}
