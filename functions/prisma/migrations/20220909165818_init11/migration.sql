-- AlterTable
ALTER TABLE "Doctor" ALTER COLUMN "rank" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Manufacturer" ALTER COLUMN "rank" DROP DEFAULT;

-- AlterTable
ALTER TABLE "StateSummary" ADD COLUMN     "rank" INTEGER;
