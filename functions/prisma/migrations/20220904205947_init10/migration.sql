
-- CreateTable
CREATE TABLE "StateCounty" (
    "id" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fips" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "population" INTEGER NOT NULL,
    "year" TEXT NOT NULL,
    "drugType" TEXT NOT NULL,

    CONSTRAINT "StateCounty_pkey" PRIMARY KEY ("id")
);
