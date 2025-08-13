import prisma from "../../services/prisma.js";
import { hashPassword } from "../../utils/bycrypt.js";
import { generateMemberId } from "../../utils/functions/idGenerator.js";
import { getCardExpiry, getLCAAL } from "../libraryCards/cards.controller.js";
import crypto from "crypto";
import { getNextSequenceValue } from "../getNextSequenceValue.js";
import { cardNumbersArray } from "../../utils/functions/cardNumbersArray .js";

/**
 * Approves a member application, creating a membership ID, auth record, and library cards.
 * @param {string} applicationId - The ID of the member application to approve.
 * @param {string} staffId - The ID of the staff member approving the application.
 * @returns {Promise<object>} An object containing the details of the approved member.
 * @throws {Error} If any step in the approval process fails.
 */
export const approveApplication = async (applicationId, staffId) => {
  return await prisma.$transaction(async (tx) => {
    // 1. Update member status and generate a new membership ID.
    const yearSuffix = new Date().getFullYear().toString().slice(-2);
    const sequenceName = `membershipId_${yearSuffix}`;

    // Get the next unique number for the current year.
    const newSequenceValue = await getNextSequenceValue(tx, sequenceName);

    // Format the number into the final ID string (e.g., "MEM-25-001").
    const generatedMembershipId = generateMemberId(newSequenceValue);
    const updatedMember = await tx.member.update({
      where: { id: applicationId },
      data: {
        status: "active",
        membershipId: generatedMembershipId,
      },
    });

    // 2. Determine card allotment based on settings.
    const expiry = await getCardExpiry(
      updatedMember.batch,
      updatedMember.program
    );
    var { cardLimit, cardType } = await getLCAAL(updatedMember.memberType);

    if (!cardLimit || cardLimit <= 0) {
      cardLimit = 0;
    }

    const cardNumbers = cardNumbersArray(generatedMembershipId, cardLimit);

    // 3. Create a new auth record for the member.
    await tx.auth.create({
      data: {
        username: generatedMembershipId,
        password: await hashPassword(crypto.randomUUID()), // Secure random password
        email: updatedMember.email,
        role: "member",
        rights: ["member"],
        userType: "member",
        memberId: updatedMember.id,
        twoFaSecret: crypto.randomUUID(), // Simplified for example
      },
    });

    // 4. Create the allotted library cards.
    for (const cardNumber of cardNumbers) {
      await tx.libraryCard.create({
        data: {
          cardNumber,
          member: {
            connect: { id: updatedMember.id },
          },
          staff: {
            connect: { id: staffId },
          },
          autoAlloted: true,
          type: cardType,
          expiry,
        },
      });
    }

    // 5. Return the result object for the controller.
    return {
      fullName: updatedMember.fullName,
      email: updatedMember.email,
      membershipId: generatedMembershipId,
      libraryCards: cardNumbers,
    };
  });
};
