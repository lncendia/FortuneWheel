using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FortuneWheel.Infrastructure.Storage.Migrations
{
    /// <inheritdoc />
    public partial class Visibility : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Visible",
                table: "participants",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Visible",
                table: "participants");
        }
    }
}
