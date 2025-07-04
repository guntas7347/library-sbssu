-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('CREDIT', 'DEBIT');

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "membershipId" INTEGER,
    "applicationId" INTEGER NOT NULL,
    "authId" TEXT,
    "rollNumber" INTEGER,
    "fullName" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'GENERAL',
    "gender" "Gender" NOT NULL DEFAULT 'MALE',
    "dob" TIMESTAMP(3) NOT NULL,
    "program" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "batch" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'STUDENT UG',
    "status" TEXT NOT NULL DEFAULT 'APPLIED',
    "balance" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LibraryCard" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "cardNumber" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'AVAILABLE',
    "category" TEXT NOT NULL DEFAULT 'GENERAL',
    "createdBy" TEXT NOT NULL,
    "autoAlloted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LibraryCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL,
    "idNumber" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "authId" TEXT,
    "phoneNumber" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "gender" TEXT,
    "address" TEXT,
    "emergencyContact" TEXT,
    "employeeId" TEXT,
    "department" TEXT,
    "designation" TEXT,
    "joiningDate" TIMESTAMP(3),
    "employmentStatus" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Auth" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'STAFF',
    "rights" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resetCode" TEXT,
    "resetCodeTime" TIMESTAMP(3),
    "twoFaSecret" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "userType" TEXT NOT NULL,
    "staffId" TEXT,
    "memberId" TEXT,

    CONSTRAINT "Auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionFingerprint" (
    "id" TEXT NOT NULL,
    "authId" TEXT NOT NULL,
    "fingerprintHash" VARCHAR(64) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUsedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SessionFingerprint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "isbn" INTEGER,
    "title" TEXT,
    "author" TEXT,
    "placeAndPublishers" TEXT,
    "publicationYear" INTEGER,
    "pages" INTEGER,
    "volume" INTEGER,
    "source" TEXT,
    "cost" DOUBLE PRECISION,
    "callNumber" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accession" (
    "id" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "accessionNumber" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'AVAILABLE',
    "category" TEXT NOT NULL DEFAULT 'GENERAL',

    CONSTRAINT "Accession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IssuedBook" (
    "id" TEXT NOT NULL,
    "bookAccessionId" TEXT NOT NULL,
    "libraryCardId" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "issuedById" TEXT NOT NULL,
    "issueRemark" TEXT NOT NULL DEFAULT 'None',

    CONSTRAINT "IssuedBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReturnedBook" (
    "id" TEXT NOT NULL,
    "bookAccessionId" TEXT NOT NULL,
    "libraryCardId" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "returnDate" TIMESTAMP(3) NOT NULL,
    "fineId" TEXT,
    "issuedById" TEXT NOT NULL,
    "returnedById" TEXT NOT NULL,
    "issueRemark" TEXT NOT NULL DEFAULT 'None',
    "returnRemark" TEXT NOT NULL DEFAULT 'None',

    CONSTRAINT "ReturnedBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "returnedBookId" TEXT,
    "transactionType" "TransactionType" NOT NULL,
    "category" TEXT NOT NULL,
    "remark" TEXT NOT NULL DEFAULT 'NONE',
    "amount" DOUBLE PRECISION NOT NULL,
    "receiptNumber" TEXT,
    "paymentMethod" TEXT NOT NULL,
    "closingBalance" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setting" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "lastModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_membershipId_key" ON "Member"("membershipId");

-- CreateIndex
CREATE UNIQUE INDEX "Member_applicationId_key" ON "Member"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "LibraryCard_cardNumber_key" ON "LibraryCard"("cardNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_idNumber_key" ON "Staff"("idNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_userName_key" ON "Auth"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_staffId_key" ON "Auth"("staffId");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_memberId_key" ON "Auth"("memberId");

-- CreateIndex
CREATE INDEX "SessionFingerprint_authId_fingerprintHash_isActive_idx" ON "SessionFingerprint"("authId", "fingerprintHash", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Accession_accessionNumber_key" ON "Accession"("accessionNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ReturnedBook_fineId_key" ON "ReturnedBook"("fineId");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_receiptNumber_key" ON "Transaction"("receiptNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Setting_key_key" ON "Setting"("key");

-- AddForeignKey
ALTER TABLE "LibraryCard" ADD CONSTRAINT "LibraryCard_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LibraryCard" ADD CONSTRAINT "LibraryCard_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionFingerprint" ADD CONSTRAINT "SessionFingerprint_authId_fkey" FOREIGN KEY ("authId") REFERENCES "Auth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accession" ADD CONSTRAINT "Accession_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IssuedBook" ADD CONSTRAINT "IssuedBook_bookAccessionId_fkey" FOREIGN KEY ("bookAccessionId") REFERENCES "Accession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IssuedBook" ADD CONSTRAINT "IssuedBook_libraryCardId_fkey" FOREIGN KEY ("libraryCardId") REFERENCES "LibraryCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IssuedBook" ADD CONSTRAINT "IssuedBook_issuedById_fkey" FOREIGN KEY ("issuedById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReturnedBook" ADD CONSTRAINT "ReturnedBook_bookAccessionId_fkey" FOREIGN KEY ("bookAccessionId") REFERENCES "Accession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReturnedBook" ADD CONSTRAINT "ReturnedBook_libraryCardId_fkey" FOREIGN KEY ("libraryCardId") REFERENCES "LibraryCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReturnedBook" ADD CONSTRAINT "ReturnedBook_fineId_fkey" FOREIGN KEY ("fineId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReturnedBook" ADD CONSTRAINT "ReturnedBook_issuedById_fkey" FOREIGN KEY ("issuedById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReturnedBook" ADD CONSTRAINT "ReturnedBook_returnedById_fkey" FOREIGN KEY ("returnedById") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_returnedBookId_fkey" FOREIGN KEY ("returnedBookId") REFERENCES "ReturnedBook"("id") ON DELETE SET NULL ON UPDATE CASCADE;
