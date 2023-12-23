/*
  Warnings:

  - Added the required column `dateId` to the `Aporte` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Aporte" ADD COLUMN     "dateId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Aporte" ADD CONSTRAINT "Aporte_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "Date"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
