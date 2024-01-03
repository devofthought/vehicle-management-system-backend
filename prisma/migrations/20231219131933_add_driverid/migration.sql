/*
  Warnings:

  - A unique constraint covering the columns `[driverId]` on the table `drivers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[helperId]` on the table `helpers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `driverId` to the `drivers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `helperId` to the `helpers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "drivers" ADD COLUMN     "driverId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "helpers" ADD COLUMN     "helperId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "drivers_driverId_key" ON "drivers"("driverId");

-- CreateIndex
CREATE UNIQUE INDEX "helpers_helperId_key" ON "helpers"("helperId");
