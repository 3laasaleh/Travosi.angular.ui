using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TravelAgency.InfraStructure.Migrations
{
    /// <inheritdoc />
    public partial class AddNewsletterSubscriptions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "NewsletterSubscriptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(254)", maxLength: 254, nullable: false),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(254)", maxLength: 254, nullable: false),
                    SubscribedAtUtc = table.Column<DateTime>(type: "datetime2(0)", precision: 0, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    WelcomeEmailSentAtUtc = table.Column<DateTime>(type: "datetime2(0)", precision: 0, nullable: true),
                    WelcomeEmailLastAttemptAtUtc = table.Column<DateTime>(type: "datetime2(0)", precision: 0, nullable: true),
                    WelcomeEmailAttemptCount = table.Column<int>(type: "int", nullable: false, defaultValue: 0)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NewsletterSubscriptions", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_NewsletterSubscriptions_NormalizedEmail",
                table: "NewsletterSubscriptions",
                column: "NormalizedEmail",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NewsletterSubscriptions");
        }
    }
}
