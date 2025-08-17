import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";
import { emailService } from "../../services/emailService.js"; // Adjust path as needed

/**
 * A self-contained handler to process a No-Due Certificate request.
 */
export const issueNoDueHandler = async (req, res) => {
  try {
    const { id: memberId } = req.body;

    // --- 1. PRE-CHECKS: Verify eligibility ---

    // CHANGE: Check for active circulations (unreturned books) instead of issuedBooks.
    const activeCirculationsCount = await prisma.circulation.count({
      where: {
        libraryCard: { memberId: memberId },
        returnDate: null, // This is the key condition for an active loan
      },
    });
    if (activeCirculationsCount > 0) {
      return res
        .status(409)
        .json(
          crs(`Member has ${activeCirculationsCount} book(s) currently issued.`)
        );
    }

    const member = await prisma.member.findUnique({
      where: { id: memberId },
      select: {
        balance: true,
        fullName: true,
        email: true,
        membershipId: true,
        status: true,
      },
    });

    if (!member) {
      return res.status(404).json(crs("Member not found."));
    }
    if (member.status !== "active") {
      return res
        .status(409)
        .json(crs(`Member is not active. Current status: ${member.status}.`));
    }
    // In the new system, a positive balance is a DEBIT (money owed).
    // A member must have a balance of 0 to have no dues.
    if (member.balance > 0) {
      return res
        .status(409)
        .json(
          crs(`Member has an outstanding balance of ₹${member.balance / 100}.`)
        );
    }

    // --- 2. ATOMIC TRANSACTION: Update database ---
    await prisma.$transaction(async (tx) => {
      await tx.libraryCard.updateMany({
        where: { memberId: memberId },
        data: { status: "blocked" },
      });
      await tx.member.update({
        where: { id: memberId },
        data: { status: "cleared" },
      });
    });

    // --- 3. SEND NOTIFICATION (Non-blocking) ---
    emailService.sendNoDueConfirmationEmail(
      member.email,
      member.fullName,
      member.membershipId
    );

    // --- 4. FETCH FINAL DATA for the slip ---
    const clearedMemberData = await prisma.member.findUnique({
      where: { id: memberId },
      select: {
        fullName: true,
        membershipId: true,
        program: true,
        specialization: true,
        fatherName: true,
        updatedAt: true, // This will be the clearance date
      },
    });

    return res.status(200).json(crs.MEMBER_200_NO_DUE_SLIP(clearedMemberData));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};
