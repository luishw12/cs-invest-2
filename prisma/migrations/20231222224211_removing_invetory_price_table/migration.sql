/*
  Warnings:

  - You are about to drop the `InventoryPrice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InventoryPrice" DROP CONSTRAINT "InventoryPrice_dateId_fkey";

-- DropForeignKey
ALTER TABLE "InventoryPrice" DROP CONSTRAINT "InventoryPrice_userId_fkey";

-- DropTable
DROP TABLE "InventoryPrice";
