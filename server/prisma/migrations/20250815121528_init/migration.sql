-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('male', 'female', 'other');

-- CreateEnum
CREATE TYPE "public"."TransactionType" AS ENUM ('CREDIT', 'DEBIT');

-- CreateTable
CREATE TABLE "public"."Member" (
    "id" TEXT NOT NULL,
    "membershipId" TEXT,
    "applicationId" TEXT NOT NULL,
    "authId" TEXT,
    "rollNumber" TEXT,
    "fullName" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "batch" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "cast" TEXT NOT NULL DEFAULT 'general',
    "gender" "public"."Gender" NOT NULL DEFAULT 'male',
    "dob" TIMESTAMP(3) NOT NULL,
    "program" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pinCode" TEXT NOT NULL,
    "subscribeToUpdates" BOOLEAN NOT NULL,
    "memberType" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'applied',
    "balance" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LibraryCard" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'available',
    "type" TEXT NOT NULL,
    "expiry" TIMESTAMP(3) NOT NULL,
    "remark" TEXT,
    "createdBy" TEXT NOT NULL,
    "autoAlloted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LibraryCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Staff" (
    "id" TEXT NOT NULL,
    "idNumber" TEXT NOT NULL,
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
    "photo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Auth" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'staff',
    "rights" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
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
CREATE TABLE "public"."SessionFingerprint" (
    "id" TEXT NOT NULL,
    "authId" TEXT NOT NULL,
    "fingerprintHash" VARCHAR(64) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUsedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SessionFingerprint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Book" (
    "id" TEXT NOT NULL,
    "isbn" TEXT,
    "title" TEXT,
    "author" TEXT,
    "placeAndPublishers" TEXT,
    "publicationYear" TEXT,
    "edition" TEXT,
    "pages" TEXT,
    "volume" TEXT,
    "description" TEXT,
    "source" TEXT,
    "location" TEXT,
    "tags" TEXT[],
    "cost" TEXT,
    "callNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Accession" (
    "id" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "condition" TEXT DEFAULT 'unknown',
    "accessionNumber" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'available',
    "category" TEXT,
    "timesIssued" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Accession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Circulation" (
    "id" TEXT NOT NULL,
    "issueRefNumber" TEXT NOT NULL,
    "bookAccessionId" TEXT NOT NULL,
    "libraryCardId" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "issuedById" TEXT NOT NULL,
    "issueRemark" TEXT,
    "returnDate" TIMESTAMP(3),
    "returnedById" TEXT,
    "returnRemark" TEXT,

    CONSTRAINT "Circulation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Transaction" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "circulationId" TEXT,
    "issuedById" TEXT,
    "transactionType" "public"."TransactionType" NOT NULL,
    "category" TEXT NOT NULL,
    "remark" TEXT,
    "amount" INTEGER NOT NULL,
    "receiptNumber" TEXT,
    "paymentMethod" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Setting" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "lastModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Sequence" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastValue" INTEGER NOT NULL,

    CONSTRAINT "Sequence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_membershipId_key" ON "public"."Member"("membershipId");

-- CreateIndex
CREATE UNIQUE INDEX "Member_applicationId_key" ON "public"."Member"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "LibraryCard_cardNumber_key" ON "public"."LibraryCard"("cardNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_idNumber_key" ON "public"."Staff"("idNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_username_key" ON "public"."Auth"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_staffId_key" ON "public"."Auth"("staffId");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_memberId_key" ON "public"."Auth"("memberId");

-- CreateIndex
CREATE INDEX "SessionFingerprint_authId_fingerprintHash_isActive_idx" ON "public"."SessionFingerprint"("authId", "fingerprintHash", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Accession_accessionNumber_key" ON "public"."Accession"("accessionNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Circulation_issueRefNumber_key" ON "public"."Circulation"("issueRefNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_circulationId_key" ON "public"."Transaction"("circulationId");

-- CreateIndex
CREATE UNIQUE INDEX "Setting_key_key" ON "public"."Setting"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Sequence_name_key" ON "public"."Sequence"("name");

-- AddForeignKey
ALTER TABLE "public"."LibraryCard" ADD CONSTRAINT "LibraryCard_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "public"."Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LibraryCard" ADD CONSTRAINT "LibraryCard_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "public"."Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Auth" ADD CONSTRAINT "Auth_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "public"."Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Auth" ADD CONSTRAINT "Auth_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "public"."Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SessionFingerprint" ADD CONSTRAINT "SessionFingerprint_authId_fkey" FOREIGN KEY ("authId") REFERENCES "public"."Auth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Accession" ADD CONSTRAINT "Accession_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "public"."Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Circulation" ADD CONSTRAINT "Circulation_bookAccessionId_fkey" FOREIGN KEY ("bookAccessionId") REFERENCES "public"."Accession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Circulation" ADD CONSTRAINT "Circulation_libraryCardId_fkey" FOREIGN KEY ("libraryCardId") REFERENCES "public"."LibraryCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Circulation" ADD CONSTRAINT "Circulation_issuedById_fkey" FOREIGN KEY ("issuedById") REFERENCES "public"."Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Circulation" ADD CONSTRAINT "Circulation_returnedById_fkey" FOREIGN KEY ("returnedById") REFERENCES "public"."Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "public"."Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_circulationId_fkey" FOREIGN KEY ("circulationId") REFERENCES "public"."Circulation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_issuedById_fkey" FOREIGN KEY ("issuedById") REFERENCES "public"."Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
