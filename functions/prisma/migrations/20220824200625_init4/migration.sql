

-- CreateTable
CREATE TABLE "ManufacturerTopPayment" (
    "id" TEXT NOT NULL,
    "manufacturerId" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ManufacturerTopPayment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ManufacturerTopPayment" ADD CONSTRAINT "ManufacturerTopPayment_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManufacturerTopPayment" ADD CONSTRAINT "ManufacturerTopPayment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
