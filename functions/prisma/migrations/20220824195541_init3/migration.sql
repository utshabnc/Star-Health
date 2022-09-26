-- CreateTable
CREATE TABLE "ManufacturerItems" (
    "id" TEXT NOT NULL,
    "manufacturerId" TEXT NOT NULL,
    "productName" TEXT,
    "productType" TEXT,
    "year" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "transactionCount" INTEGER NOT NULL,

    CONSTRAINT "ManufacturerItems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ManufacturerItems" ADD CONSTRAINT "ManufacturerItems_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
