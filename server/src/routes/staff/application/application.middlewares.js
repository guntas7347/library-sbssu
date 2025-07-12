import { getLatestMembershipId } from "../../../controllers/member.controller.js";
import prisma from "../../../services/prisma.js";
import { hashPassword } from "../../../utils/bycrypt.js";
import crs from "../../../utils/crs/crs.js";
import {
  cardNumbersArray,
  getLibraryCardLimit,
} from "../../../utils/functions/functions.js";
import { generateMemberId } from "../../../utils/functions/idGenerator.js";
import { createLog } from "../../../utils/log.js";

export const fetchApplicationById = async (req, res, next) => {
  try {
    const applicationDoc = await prisma.member.findUnique({
      where: { id: req.body.id },
    });
    if (!applicationDoc) return res.status(404).json(crs.APP404FA());

    req.context.applicationDoc = applicationDoc;

    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL());
  }
};

export const processDecision = async (req, res, next) => {
  try {
    const memberId = req.context.applicationDoc.id;
    const { decision } = req.body;

    if (decision === "reject") {
      const memberDoc = await prisma.member.update({
        where: { id: memberId },
        data: { status: "rejected" },
      });

      if (!memberDoc) {
        throw new Error("Member not found for rejection.");
      }

      const { fullName, email } = memberDoc;

      req.context = {
        ...req.context,
        decision: false,
        fullName,
        email,
      };

      return next();
    }

    if (decision === "approve") {
      await prisma.$transaction(async (tx) => {
        const latestMembershipId = await getLatestMembershipId(tx);

        const generatedMembershipId = generateMemberId(latestMembershipId);
        const updatedMember = await tx.member.update({
          where: { id: memberId },
          data: {
            status: "active",
            membershipId: generatedMembershipId,
          },
        });

        if (!updatedMember) {
          throw new Error("Member not found for approval.");
        }

        const {
          membershipId,
          fullName,
          email,
          role,
          category,
          id: updatedMemberId,
        } = updatedMember;

        // const cardLimit = await getLibraryCardLimit(role, category);
        const cardLimit = 2;
        const cardNumbers = cardNumbersArray(membershipId, null, cardLimit);

        const auth = await tx.auth.findUnique({
          where: { id: req.user.uid },
          select: { staffId: true },
        });

        if (!auth) throw new Error("Auth document not found for user.");

        const { staffId } = auth;
        const base32 = crypto.randomUUID();

        await tx.auth.create({
          data: {
            username: generatedMembershipId.toString(),
            password: await hashPassword(crypto.randomUUID()),
            email: updatedMember.email,
            role: "member",
            rights: ["member"],
            userType: "member",
            memberId: updatedMemberId,
            twoFaSecret: base32,
          },
        });
        console.log(cardNumbers);
        for (const cardNumber of cardNumbers) {
          await tx.libraryCard.create({
            data: {
              cardNumber,
              memberId: updatedMemberId,
              createdBy: staffId,
              autoAlloted: true,
            },
          });
        }

        req.context = {
          ...req.context,
          decision: true,
          fullName,
          email,
          membershipId,
          libraryCards: cardNumbers,
        };
      });
    }

    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};
