import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

export const fetchSettingHandler = async (req, res) => {
  try {
    const { key } = req.validatedQuery;
    const setting = await prisma.setting.findUnique({
      where: { key },
    });

    return res.status(200).json(crs.SETTINGS_200_FETCHED(setting));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL());
  }
};
