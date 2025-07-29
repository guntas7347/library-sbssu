/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Staff` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "imageUrl",
ADD COLUMN     "photo" TEXT;
