/*
  Warnings:

  - You are about to drop the column `issueCondition` on the `ReturnedBook` table. All the data in the column will be lost.
  - You are about to drop the column `returnCondition` on the `ReturnedBook` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ReturnedBook" DROP COLUMN "issueCondition",
DROP COLUMN "returnCondition";
