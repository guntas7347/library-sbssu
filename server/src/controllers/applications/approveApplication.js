import prisma from "../../services/prisma.js";
import { hashPassword } from "../../utils/bycrypt.js";
import { generateMemberId } from "../../utils/functions/idGenerator.js";
import { getLatestMembershipId } from "../../controllers/member.controller.js";
import { getCardExpiry, getLCAAL } from "../libraryCards/cards.controller.js";
import { cardNumbersArray } from "../../utils/functions/functions.js";
import crypto from "crypto";

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
    const latestMembershipId = await getLatestMembershipId(tx);
    const generatedMembershipId = generateMemberId(latestMembershipId);

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
    const { cardLimit, cardType } = await getLCAAL(updatedMember.memberType);

    if (!cardLimit || cardLimit <= 0) {
      throw new Error(
        `Invalid card limit for member type: ${updatedMember.memberType}`
      );
    }

    const cardNumbers = cardNumbersArray(
      generatedMembershipId,
      null,
      cardLimit
    );

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
          memberId: updatedMember.id,
          createdBy: staffId,
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
