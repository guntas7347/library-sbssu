import { Router } from "express";
import { authorisationLevel } from "../../../middlewares/auth.middlewares.js";
import crs from "../../../utils/crs/crs.js";
import { createLog } from "../../../utils/log.js";
import { getMembers } from "../../../controllers/member.controller.js";
import prisma from "../../../services/prisma.js";
import { fetchMemberProfile } from "../../../controllers/member/fetchMemberProfile.js";

const memberRouter = Router();

memberRouter.get(
  "/all",
  authorisationLevel(["search-members"]),
  async (req, res) => {
    try {
      const members = await getMembers(req.query);
      //   if (members.studentsArray.length === 0)
      //     return res.status(200).json(crs.SRH404GLB());

      return res.status(200).json(crs.MEMBER_200_ALL_FETCHED(members));
    } catch (error) {
      createLog(error);
      return res.status(500).json(crs.SERR_500_INTERNAL(error));
    }
  }
); //fetch-all-members

memberRouter.get(
  "/one",
  authorisationLevel(["view-member"]),
  async (req, res) => {
    try {
      const member = await fetchMemberProfile(req.query.id);
      if (!member) return res.status(200).json(crs.DATA_204_NOT_FOUND());
      return res.status(200).json(crs.MEMBER_200_FETCHED(member));
    } catch (error) {
      createLog(error);
      return res.status(500).json(crs.SERR_500_INTERNAL(error));
    }
  }
); // fetch one

memberRouter.get("/cards", async (req, res) => {
  try {
    const m = await prisma.member.findUnique({
      where: {
        id: req.query.id,
      },
      select: {
        fullName: true,
        program: true,
        specialization: true,
        rollNumber: true,
        membershipId: true,
        photo: true,
        libraryCards: {
          include: {
            staff: true,
          },
        },
      },
    });

    return res.status(200).json(crs.MEMBER_200_CARDS_FETCHED(m));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
});

memberRouter.get("/search", async (req, res) => {
  try {
    const lastDigits = req.query.number;
    const pattern = `-${lastDigits}`;

    const members = await prisma.member.findMany({
      where: {
        membershipId: {
          endsWith: pattern,
        },
      },
      include: { libraryCards: true },
    });

    return res.status(200).json(crs.MEMBER_200_ALL_FETCHED(members));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
});

export default memberRouter;
