
-- CreateTable
CREATE TABLE "StateItem" (
    "id" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,
    "manufacturerId" TEXT NOT NULL,
    "productName" TEXT,
    "productType" TEXT,
    "year" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "transactionCount" INTEGER NOT NULL,

    CONSTRAINT "StateItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StateDoctor" (
    "id" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "transactionCount" INTEGER NOT NULL,

    CONSTRAINT "StateDoctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StateManufacturer" (
    "id" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,
    "manufacturerId" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "transactionCount" INTEGER NOT NULL,

    CONSTRAINT "StateManufacturer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ManufacturerDoctors" (
    "id" TEXT NOT NULL,
    "manufacturerId" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "transactionCount" INTEGER NOT NULL,

    CONSTRAINT "ManufacturerDoctors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StateItem" ADD CONSTRAINT "StateItem_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StateItem" ADD CONSTRAINT "StateItem_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StateDoctor" ADD CONSTRAINT "StateDoctor_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StateDoctor" ADD CONSTRAINT "StateDoctor_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StateManufacturer" ADD CONSTRAINT "StateManufacturer_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StateManufacturer" ADD CONSTRAINT "StateManufacturer_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManufacturerDoctors" ADD CONSTRAINT "ManufacturerDoctors_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManufacturerDoctors" ADD CONSTRAINT "ManufacturerDoctors_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
