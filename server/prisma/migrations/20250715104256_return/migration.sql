/*
  Warnings:

  - A unique constraint covering the columns `[issueRefNumber]` on the table `ReturnedBook` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `issueRefNumber` to the `ReturnedBook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReturnedBook" ADD COLUMN     "issueRefNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ReturnedBook_issueRefNumber_key" ON "ReturnedBook"("issueRefNumber");
