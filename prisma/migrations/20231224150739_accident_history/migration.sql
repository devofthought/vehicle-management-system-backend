-- DropForeignKey
ALTER TABLE "accidentHistories" DROP CONSTRAINT "accidentHistories_accountHeadId_fkey";

-- AlterTable
ALTER TABLE "accidentHistories" ALTER COLUMN "accountHeadId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "accidentHistories" ADD CONSTRAINT "accidentHistories_accountHeadId_fkey" FOREIGN KEY ("accountHeadId") REFERENCES "accountHeads"("id") ON DELETE SET NULL ON UPDATE CASCADE;
