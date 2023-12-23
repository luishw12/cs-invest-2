/*
  Warnings:

  - Added the required column `dateId` to the `InventoryPrice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InventoryPrice" ADD COLUMN     "dateId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "InventoryPrice" ADD CONSTRAINT "InventoryPrice_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "Date"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
