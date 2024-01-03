/*
  Warnings:

  - Made the column `endDate` on table `trips` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `accountHeadId` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trips" ADD COLUMN     "completedTime" TIMESTAMP(3),
ADD COLUMN     "remarks" TEXT,
ADD COLUMN     "startedTime" TIMESTAMP(3),
ALTER COLUMN "endDate" SET NOT NULL;

-- AlterTable
ALTER TABLE "vehicles" ADD COLUMN     "accountHeadId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_accountHeadId_fkey" FOREIGN KEY ("accountHeadId") REFERENCES "accountHeads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
