/*
  Warnings:

  - A unique constraint covering the columns `[memberId]` on the table `Auth` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Auth" DROP CONSTRAINT "Auth_staffId_fkey";

-- AlterTable
ALTER TABLE "Auth" ADD COLUMN     "memberId" TEXT,
ADD COLUMN     "userType" TEXT,
ALTER COLUMN "staffId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Auth_memberId_key" ON "Auth"("memberId");

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;
