/*
  Warnings:

  - You are about to drop the column `category` on the `Member` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Member" DROP COLUMN "category",
ADD COLUMN     "cast" TEXT NOT NULL DEFAULT 'general',
ALTER COLUMN "memberType" DROP DEFAULT;
