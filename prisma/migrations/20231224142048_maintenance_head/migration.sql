/*
  Warnings:

  - Added the required column `accountHeadId` to the `maintenances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maintenanceHeadId` to the `maintenances` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "maintenances" ADD COLUMN     "accountHeadId" TEXT NOT NULL,
ADD COLUMN     "maintenanceHeadId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "maintenances" ADD CONSTRAINT "maintenances_accountHeadId_fkey" FOREIGN KEY ("accountHeadId") REFERENCES "accountHeads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenances" ADD CONSTRAINT "maintenances_maintenanceHeadId_fkey" FOREIGN KEY ("maintenanceHeadId") REFERENCES "maintenanceHeads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
