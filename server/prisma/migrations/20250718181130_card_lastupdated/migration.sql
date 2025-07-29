/*
  Warnings:

  - Made the column `updatedAt` on table `Auth` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `LibraryCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Auth" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "LibraryCard" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
