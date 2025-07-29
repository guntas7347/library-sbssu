import { Router } from "express";
import prisma from "../../../services/prisma.js";
import crs from "../../../utils/crs/crs.js";
import { createLog } from "../../../utils/log.js";

const publicSettings = Router();

publicSettings.get("/application", async (req, res) => {
  try {
    const programs = await prisma.setting.findUnique({
      where: { key: "PROGRAMS" },
    });

    const members = await prisma.setting.findUnique({
      where: { key: "MEMBER-TYPES" },
    });

    const data = {
      programs: programs.value,
      members: members.value,
    };

    return res.status(200).json(crs.PUBLIC_200_SETTINGS_FETCHED(data));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
});

export default publicSettings;
