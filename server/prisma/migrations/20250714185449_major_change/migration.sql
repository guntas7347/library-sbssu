/*
  Warnings:

  - A unique constraint covering the columns `[returnedBookId]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `issueCondition` to the `IssuedBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issueCondition` to the `ReturnedBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `returnCondition` to the `ReturnedBook` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ReturnedBook" DROP CONSTRAINT "ReturnedBook_fineId_fkey";

-- AlterTable
ALTER TABLE "IssuedBook" ADD COLUMN     "issueCondition" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ReturnedBook" ADD COLUMN     "issueCondition" TEXT NOT NULL,
ADD COLUMN     "returnCondition" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "issuedById" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_returnedBookId_key" ON "Transaction"("returnedBookId");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_issuedById_fkey" FOREIGN KEY ("issuedById") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
