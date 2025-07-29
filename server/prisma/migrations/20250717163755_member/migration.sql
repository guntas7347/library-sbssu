/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Member` table. All the data in the column will be lost.
  - Added the required column `photo` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member" DROP COLUMN "imageUrl",
ADD COLUMN     "photo" TEXT NOT NULL;
