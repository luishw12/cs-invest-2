-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dateCreate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "sellTax" DOUBLE PRECISION NOT NULL DEFAULT 0.1,
    "phone" TEXT,
    "dateExpire" TIMESTAMP(3),
    "role" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" UUID NOT NULL,
    "duration" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseInfo" (
    "id" UUID NOT NULL,
    "dateBuy" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID NOT NULL,
    "planId" UUID NOT NULL,

    CONSTRAINT "PurchaseInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "dateId" UUID NOT NULL,
    "buyPrice" DOUBLE PRECISION NOT NULL,
    "dateCreate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateSold" TIMESTAMP(3),
    "highlights" INTEGER,
    "image" TEXT,
    "marketUrl" TEXT,
    "name" TEXT NOT NULL,
    "percentage" DOUBLE PRECISION,
    "realProfit" DOUBLE PRECISION,
    "sellPrice" DOUBLE PRECISION,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Date" (
    "id" UUID NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "Date_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aporte" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "dateCreate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Aporte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryPrice" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "lastEdit" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InventoryPrice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "PurchaseInfo" ADD CONSTRAINT "PurchaseInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseInfo" ADD CONSTRAINT "PurchaseInfo_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "Date"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aporte" ADD CONSTRAINT "Aporte_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryPrice" ADD CONSTRAINT "InventoryPrice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
