/*
  Warnings:

  - You are about to drop the column `image` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `marketUrl` on the `Item` table. All the data in the column will be lost.
  - Made the column `highlights` on table `Item` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "image",
DROP COLUMN "marketUrl",
ALTER COLUMN "highlights" SET NOT NULL,
ALTER COLUMN "highlights" SET DEFAULT 0;
