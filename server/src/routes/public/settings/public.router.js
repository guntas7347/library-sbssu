import { Router } from "express";
import prisma from "../../../services/prisma.js";
import crs from "../../../utils/crs/crs.js";
import { createLog } from "../../../utils/log.js";

const publicSettings = Router();

publicSettings.get("/programs", async (req, res) => {
  try {
    const { value } = await prisma.setting.findUnique({
      where: { key: "PRO-SPZ-LIST" },
    });

    return res.status(200).json(crs.PUBLIC_200_PROGRAMS_FETCHED(value));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
});

export default publicSettings;
