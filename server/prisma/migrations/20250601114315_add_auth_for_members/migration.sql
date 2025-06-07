/*
  Warnings:

  - Made the column `userType` on table `Auth` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Auth" ALTER COLUMN "userType" SET NOT NULL;
