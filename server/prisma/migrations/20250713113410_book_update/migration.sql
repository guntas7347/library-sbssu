-- AlterTable
ALTER TABLE "Accession" ADD COLUMN     "condition" TEXT DEFAULT 'unknown',
ALTER COLUMN "status" SET DEFAULT 'available',
ALTER COLUMN "category" SET DEFAULT 'general';

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "description" TEXT,
ADD COLUMN     "edition" TEXT,
ADD COLUMN     "location" TEXT,
ALTER COLUMN "publicationYear" SET DATA TYPE TEXT,
ALTER COLUMN "pages" SET DATA TYPE TEXT,
ALTER COLUMN "volume" SET DATA TYPE TEXT,
ALTER COLUMN "cost" SET DATA TYPE TEXT,
ALTER COLUMN "callNumber" SET DATA TYPE TEXT;
