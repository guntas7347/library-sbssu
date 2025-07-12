/*
  Warnings:

  - The values [MALE,FEMALE,OTHER] on the enum `Gender` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `role` on the `Member` table. All the data in the column will be lost.
  - Added the required column `pinCode` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streetAddress` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscribeToUpdates` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Gender_new" AS ENUM ('male', 'female', 'other');
ALTER TABLE "Member" ALTER COLUMN "gender" DROP DEFAULT;
ALTER TABLE "Member" ALTER COLUMN "gender" TYPE "Gender_new" USING ("gender"::text::"Gender_new");
ALTER TYPE "Gender" RENAME TO "Gender_old";
ALTER TYPE "Gender_new" RENAME TO "Gender";
DROP TYPE "Gender_old";
ALTER TABLE "Member" ALTER COLUMN "gender" SET DEFAULT 'male';
COMMIT;

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "role",
ADD COLUMN     "memberType" TEXT NOT NULL DEFAULT 'student_ug',
ADD COLUMN     "pinCode" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "streetAddress" TEXT NOT NULL,
ADD COLUMN     "subscribeToUpdates" BOOLEAN NOT NULL,
ALTER COLUMN "category" SET DEFAULT 'general',
ALTER COLUMN "gender" SET DEFAULT 'male',
ALTER COLUMN "status" SET DEFAULT 'applied';
