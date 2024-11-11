-- CreateTable
CREATE TABLE "TrackedCrypto" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "TrackedCrypto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trade" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "trackedCryptoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trade_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TrackedCrypto" ADD CONSTRAINT "TrackedCrypto_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_trackedCryptoId_fkey" FOREIGN KEY ("trackedCryptoId") REFERENCES "TrackedCrypto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
