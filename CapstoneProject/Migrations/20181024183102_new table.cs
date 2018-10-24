using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CapstoneProject.Migrations
{
    public partial class newtable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GroupTravellers_Groups_GroupId",
                table: "GroupTravellers");

            migrationBuilder.DropForeignKey(
                name: "FK_GroupTravellers_Travellers_TravellerId",
                table: "GroupTravellers");

            migrationBuilder.DropForeignKey(
                name: "FK_TravellerJournals_Journals_JournalId",
                table: "TravellerJournals");

            migrationBuilder.DropForeignKey(
                name: "FK_TravellerJournals_Travellers_TravellerId",
                table: "TravellerJournals");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TravellerJournals",
                table: "TravellerJournals");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GroupTravellers",
                table: "GroupTravellers");

            migrationBuilder.RenameTable(
                name: "TravellerJournals",
                newName: "TravellerJournal");

            migrationBuilder.RenameTable(
                name: "GroupTravellers",
                newName: "GroupTraveller");

            migrationBuilder.RenameIndex(
                name: "IX_TravellerJournals_JournalId",
                table: "TravellerJournal",
                newName: "IX_TravellerJournal_JournalId");

            migrationBuilder.RenameIndex(
                name: "IX_GroupTravellers_TravellerId",
                table: "GroupTraveller",
                newName: "IX_GroupTraveller_TravellerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TravellerJournal",
                table: "TravellerJournal",
                columns: new[] { "TravellerId", "JournalId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_GroupTraveller",
                table: "GroupTraveller",
                columns: new[] { "GroupId", "TravellerId" });

            migrationBuilder.CreateTable(
                name: "GroupMembers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    GroupId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    TravellerId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupMembers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GroupMembers_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_GroupMembers_Travellers_TravellerId",
                        column: x => x.TravellerId,
                        principalTable: "Travellers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GroupMembers_GroupId",
                table: "GroupMembers",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_GroupMembers_TravellerId",
                table: "GroupMembers",
                column: "TravellerId");

            migrationBuilder.AddForeignKey(
                name: "FK_GroupTraveller_Groups_GroupId",
                table: "GroupTraveller",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_GroupTraveller_Travellers_TravellerId",
                table: "GroupTraveller",
                column: "TravellerId",
                principalTable: "Travellers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TravellerJournal_Journals_JournalId",
                table: "TravellerJournal",
                column: "JournalId",
                principalTable: "Journals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TravellerJournal_Travellers_TravellerId",
                table: "TravellerJournal",
                column: "TravellerId",
                principalTable: "Travellers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GroupTraveller_Groups_GroupId",
                table: "GroupTraveller");

            migrationBuilder.DropForeignKey(
                name: "FK_GroupTraveller_Travellers_TravellerId",
                table: "GroupTraveller");

            migrationBuilder.DropForeignKey(
                name: "FK_TravellerJournal_Journals_JournalId",
                table: "TravellerJournal");

            migrationBuilder.DropForeignKey(
                name: "FK_TravellerJournal_Travellers_TravellerId",
                table: "TravellerJournal");

            migrationBuilder.DropTable(
                name: "GroupMembers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TravellerJournal",
                table: "TravellerJournal");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GroupTraveller",
                table: "GroupTraveller");

            migrationBuilder.RenameTable(
                name: "TravellerJournal",
                newName: "TravellerJournals");

            migrationBuilder.RenameTable(
                name: "GroupTraveller",
                newName: "GroupTravellers");

            migrationBuilder.RenameIndex(
                name: "IX_TravellerJournal_JournalId",
                table: "TravellerJournals",
                newName: "IX_TravellerJournals_JournalId");

            migrationBuilder.RenameIndex(
                name: "IX_GroupTraveller_TravellerId",
                table: "GroupTravellers",
                newName: "IX_GroupTravellers_TravellerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TravellerJournals",
                table: "TravellerJournals",
                columns: new[] { "TravellerId", "JournalId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_GroupTravellers",
                table: "GroupTravellers",
                columns: new[] { "GroupId", "TravellerId" });

            migrationBuilder.AddForeignKey(
                name: "FK_GroupTravellers_Groups_GroupId",
                table: "GroupTravellers",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GroupTravellers_Travellers_TravellerId",
                table: "GroupTravellers",
                column: "TravellerId",
                principalTable: "Travellers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TravellerJournals_Journals_JournalId",
                table: "TravellerJournals",
                column: "JournalId",
                principalTable: "Journals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TravellerJournals_Travellers_TravellerId",
                table: "TravellerJournals",
                column: "TravellerId",
                principalTable: "Travellers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
