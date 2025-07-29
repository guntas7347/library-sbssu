-- AlterTable
ALTER TABLE "LibraryCard" ADD COLUMN     "remark" TEXT,
ALTER COLUMN "status" SET DEFAULT 'available',
ALTER COLUMN "category" SET DEFAULT 'general';
