/*
  Warnings:

  - You are about to drop the column `accountHeadId` on the `expenseHeads` table. All the data in the column will be lost.
  - You are about to drop the column `accountHeadId` on the `maintenanceHeads` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "expenseHeads" DROP CONSTRAINT "expenseHeads_accountHeadId_fkey";

-- DropForeignKey
ALTER TABLE "maintenanceHeads" DROP CONSTRAINT "maintenanceHeads_accountHeadId_fkey";

-- AlterTable
ALTER TABLE "expenseHeads" DROP COLUMN "accountHeadId";

-- AlterTable
ALTER TABLE "maintenanceHeads" DROP COLUMN "accountHeadId";
