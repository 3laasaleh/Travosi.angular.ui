using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TravelAgency.InfraStructure.Migrations
{
    /// <inheritdoc />
    public partial class AddPackageSeatAccounting : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SeatsBooked",
                table: "Packages",
                type: "int",
                nullable: false,
                defaultValue: 0);

            // Pending bookings do not reserve capacity. Reconcile legacy counters so only
            // confirmed/completed bookings occupy seats when this workflow is introduced.
            migrationBuilder.Sql(@"
                UPDATE p
                SET p.SeatsBooked = ISNULL((
                    SELECT SUM(b.NumberOfTravelers)
                    FROM Bookings b
                    WHERE b.PackageId = p.Id AND b.Status IN (1, 3)
                ), 0)
                FROM Packages p;

                UPDATE t
                SET t.SeatsBooked = ISNULL((
                    SELECT SUM(b.NumberOfTravelers)
                    FROM Bookings b
                    WHERE b.TourId = t.Id AND b.Status IN (1, 3)
                ), 0)
                FROM Tours t;");

            migrationBuilder.AlterColumn<string>(
                name: "StatusNote",
                table: "Bookings",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SeatsBooked",
                table: "Packages");

            migrationBuilder.AlterColumn<string>(
                name: "StatusNote",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(1000)",
                oldMaxLength: 1000,
                oldNullable: true);
        }
    }
}
