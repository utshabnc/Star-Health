-- CreateTable
CREATE TABLE "ManufacturerSummary" (
    "id" TEXT NOT NULL,
    "manufacturerId" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "year" TEXT NOT NULL,

    CONSTRAINT "ManufacturerSummary_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ManufacturerSummary" ADD CONSTRAINT "ManufacturerSummary_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
