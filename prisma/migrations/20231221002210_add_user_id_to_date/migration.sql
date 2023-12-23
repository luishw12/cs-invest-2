/*
  Warnings:

  - Added the required column `userId` to the `Date` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Date" ADD COLUMN     "userId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Date" ADD CONSTRAINT "Date_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
