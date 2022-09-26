/*
  Warnings:

  - Added the required column `drugType` to the `StateDoctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `drugType` to the `StateItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `drugType` to the `StateManufacturer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `drugType` to the `StateSummary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StateDoctor" ADD COLUMN     "drugType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StateItem" ADD COLUMN     "drugType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StateManufacturer" ADD COLUMN     "drugType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StateSummary" ADD COLUMN     "drugType" TEXT NOT NULL;
