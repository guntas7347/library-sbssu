import { Router } from "express";
import { authorisationLevel } from "../../../middlewares/auth.middlewares.js";
import crs from "../../../utils/crs/crs.js";
import { createLog } from "../../../utils/log.js";
import { getMembers } from "../../../controllers/member.controller.js";
import prisma from "../../../services/prisma.js";

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
      const studentDoc = await prisma.member.findUnique({
        where: { id: req.query.id },
        include: { libraryCards: true },
      });

      if (!studentDoc) return res.status(204).json(crs.DATA_204_NOT_FOUND());
      return res.status(200).json(crs.MEMBER_200_FETCHED(studentDoc));
    } catch (error) {
      createLog(error);
      return res.status(500).json(crs.SERR_500_INTERNAL(error));
    }
  }
);

export default memberRouter;
