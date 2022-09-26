-- CreateTable
CREATE TABLE "ManufacturerState" (
    "id" TEXT NOT NULL,
    "manufacturerId" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "transactionCount" INTEGER NOT NULL,

    CONSTRAINT "ManufacturerState_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ManufacturerState" ADD CONSTRAINT "ManufacturerState_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
