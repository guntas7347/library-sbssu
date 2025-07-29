/*
  Warnings:

  - A unique constraint covering the columns `[issueRefNumber]` on the table `IssuedBook` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `issueRefNumber` to the `IssuedBook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IssuedBook" ADD COLUMN     "issueRefNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "IssuedBook_issueRefNumber_key" ON "IssuedBook"("issueRefNumber");
