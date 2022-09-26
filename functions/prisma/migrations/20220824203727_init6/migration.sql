-- CreateTable
CREATE TABLE "StateSummary" (
    "id" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "year" TEXT NOT NULL,

    CONSTRAINT "StateSummary_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StateSummary" ADD CONSTRAINT "StateSummary_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
