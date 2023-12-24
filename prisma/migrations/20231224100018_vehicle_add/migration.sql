/*
  Warnings:

  - Added the required column `vehicleId` to the `equipmentUses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "equipmentUses" ADD COLUMN     "vehicleId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "equipmentUses" ADD CONSTRAINT "equipmentUses_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
