/*
  Warnings:

  - Added the required column `uomId` to the `equipments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "equipments" ADD COLUMN     "uomId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "uoms" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "uoms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "equipments" ADD CONSTRAINT "equipments_uomId_fkey" FOREIGN KEY ("uomId") REFERENCES "uoms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
