/*
  Warnings:

  - Added the required column `accountHeadId` to the `accidentHistories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountHeadId` to the `equipmentUses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountHeadId` to the `paperWorks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accidentHistories" ADD COLUMN     "accountHeadId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "equipmentUses" ADD COLUMN     "accountHeadId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "paperWorks" ADD COLUMN     "accountHeadId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "equipmentUses" ADD CONSTRAINT "equipmentUses_accountHeadId_fkey" FOREIGN KEY ("accountHeadId") REFERENCES "accountHeads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accidentHistories" ADD CONSTRAINT "accidentHistories_accountHeadId_fkey" FOREIGN KEY ("accountHeadId") REFERENCES "accountHeads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paperWorks" ADD CONSTRAINT "paperWorks_accountHeadId_fkey" FOREIGN KEY ("accountHeadId") REFERENCES "accountHeads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
