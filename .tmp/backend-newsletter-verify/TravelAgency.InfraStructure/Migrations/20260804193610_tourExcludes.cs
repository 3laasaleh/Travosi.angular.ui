using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TravelAgency.InfraStructure.Migrations
{
    /// <inheritdoc />
    public partial class tourExcludes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsFreeCancel",
                table: "Tours");

            migrationBuilder.CreateTable(
                name: "TourExcludes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TourId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TourExcludes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TourExcludes_Tours_TourId",
                        column: x => x.TourId,
                        principalTable: "Tours",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TourExcludes_TourId",
                table: "TourExcludes",
                column: "TourId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TourExcludes");

            migrationBuilder.AddColumn<bool>(
                name: "IsFreeCancel",
                table: "Tours",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
