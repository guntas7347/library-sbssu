/*
  Warnings:

  - You are about to drop the column `category` on the `LibraryCard` table. All the data in the column will be lost.
  - Added the required column `type` to the `LibraryCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Accession" ALTER COLUMN "category" DROP NOT NULL,
ALTER COLUMN "category" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Auth" ALTER COLUMN "role" SET DEFAULT 'staff';

-- AlterTable
ALTER TABLE "IssuedBook" ALTER COLUMN "issueRemark" DROP NOT NULL,
ALTER COLUMN "issueRemark" DROP DEFAULT;

-- AlterTable
ALTER TABLE "LibraryCard" DROP COLUMN "category",
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ReturnedBook" ALTER COLUMN "issueRemark" DROP NOT NULL,
ALTER COLUMN "issueRemark" DROP DEFAULT,
ALTER COLUMN "returnRemark" DROP NOT NULL,
ALTER COLUMN "returnRemark" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "remark" DROP NOT NULL,
ALTER COLUMN "remark" DROP DEFAULT;
