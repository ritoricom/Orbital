using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class ChangeJsonPropetyFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("ALTER TABLE \"SpecialOffers\" ALTER COLUMN \"ShortDescriptions\" DROP DEFAULT");
            migrationBuilder.Sql("ALTER TABLE \"SpecialOffers\" ALTER COLUMN \"Notes\" DROP DEFAULT");
            migrationBuilder.Sql("ALTER TABLE \"SpecialOffers\" ALTER COLUMN \"Titles\" TYPE jsonb USING (\"Titles\"::jsonb)");
            migrationBuilder.Sql("ALTER TABLE \"SpecialOffers\" ALTER COLUMN \"ShortDescriptions\" TYPE jsonb USING (\"ShortDescriptions\"::jsonb)");
            migrationBuilder.Sql("ALTER TABLE \"SpecialOffers\" ALTER COLUMN \"Descriptions\" TYPE jsonb USING (\"Descriptions\"::jsonb)");
            migrationBuilder.Sql("ALTER TABLE \"SpecialOffers\" ALTER COLUMN \"Notes\"  TYPE jsonb USING (\"Notes\"::jsonb)");
            
            migrationBuilder.Sql("ALTER TABLE \"Rooms\" ALTER COLUMN \"Titles\"  TYPE jsonb USING (\"Titles\"::jsonb)");
            migrationBuilder.Sql("ALTER TABLE \"Rooms\" ALTER COLUMN \"Descriptions\"  TYPE jsonb USING (\"Descriptions\"::jsonb)");
            migrationBuilder.Sql("ALTER TABLE \"Rooms\" ALTER COLUMN \"Peculiarities\"  TYPE jsonb USING (\"Peculiarities\"::jsonb)");
            
            migrationBuilder.Sql("ALTER TABLE \"Reviews\" ALTER COLUMN \"Headers\"  TYPE jsonb USING (\"Headers\"::jsonb)");
            migrationBuilder.Sql("ALTER TABLE \"Reviews\" ALTER COLUMN \"Descriptions\"  TYPE jsonb USING (\"Descriptions\"::jsonb)");
            migrationBuilder.Sql("ALTER TABLE \"Reviews\" ALTER COLUMN \"Authors\"  TYPE jsonb USING (\"Authors\"::jsonb)");
            
            migrationBuilder.Sql("ALTER TABLE \"News\" ALTER COLUMN \"Titles\"  TYPE jsonb USING (\"Titles\"::jsonb)");
            migrationBuilder.Sql("ALTER TABLE \"News\" ALTER COLUMN \"Descriptions\"  TYPE jsonb USING (\"Descriptions\"::jsonb)");
            
            migrationBuilder.Sql("ALTER TABLE \"Leisures\" ALTER COLUMN \"Days\"  TYPE jsonb USING (\"Days\"::jsonb)");
            
            migrationBuilder.Sql("ALTER TABLE \"Contacts\" ALTER COLUMN \"Location\"  TYPE jsonb USING (\"Location\"::jsonb)");
            migrationBuilder.Sql("ALTER TABLE \"Contacts\" ALTER COLUMN \"Addresses\"  TYPE jsonb USING (\"Addresses\"::jsonb)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Titles",
                table: "SpecialOffers",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "jsonb");

            migrationBuilder.AlterColumn<string>(
                name: "ShortDescriptions",
                table: "SpecialOffers",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "jsonb");

            migrationBuilder.AlterColumn<string>(
                name: "Notes",
                table: "SpecialOffers",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "jsonb");

            migrationBuilder.AlterColumn<string>(
                name: "Descriptions",
                table: "SpecialOffers",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "jsonb");

            migrationBuilder.AlterColumn<string>(
                name: "Titles",
                table: "Rooms",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "jsonb");

            migrationBuilder.AlterColumn<string>(
                name: "Peculiarities",
                table: "Rooms",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "jsonb");

            migrationBuilder.AlterColumn<string>(
                name: "Descriptions",
                table: "Rooms",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "jsonb");

            migrationBuilder.AlterColumn<string>(
                name: "Headers",
                table: "Reviews",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "jsonb");

            migrationBuilder.AlterColumn<string>(
                name: "Descriptions",
                table: "Reviews",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "jsonb");

            migrationBuilder.AlterColumn<string>(
                name: "Authors",
                table: "Reviews",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "jsonb");

            migrationBuilder.AlterColumn<string>(
                name: "Titles",
                table: "News",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "jsonb");

            migrationBuilder.AlterColumn<string>(
                name: "Descriptions",
                table: "News",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "jsonb");

            migrationBuilder.AlterColumn<string>(
                name: "Days",
                table: "Leisures",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "jsonb");

            migrationBuilder.AlterColumn<string>(
                name: "Location",
                table: "Contacts",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "jsonb");

            migrationBuilder.AlterColumn<string>(
                name: "Addresses",
                table: "Contacts",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "jsonb");
        }
    }
}
