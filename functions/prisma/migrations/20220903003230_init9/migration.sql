/*
  Warnings:

  - Added the required column `rank` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rank` to the `Manufacturer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "rank" INTEGER NOT NULL DEFAULT 0;
-- AlterTable
ALTER TABLE "Manufacturer" ADD COLUMN     "rank" INTEGER NOT NULL DEFAULT 0;

ALTER TABLE "Payment" ADD COLUMN     "paymentNature" TEXT;
