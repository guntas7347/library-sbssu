import { Router } from "express";
import { authorisationLevel } from "../../../middlewares/auth.middlewares.js";
import { createLog } from "../../../utils/log.js";
import prisma from "../../../services/prisma.js";
import crs from "../../../utils/crs/crs.js";

const settingsRouter = Router();

settingsRouter.post("/fetch", authorisationLevel(), async (req, res) => {
  try {
    const doc = await prisma.setting.findUnique({
      where: { key: req.body.key },
    });
    return res.status(200).json(crs.SETTINGS_200_FETCHED(doc));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
});

const a = async () => {
  await prisma.setting.create({
    data: { key: "PRO-SPZ-LIST", value: {} },
  });
};
// a();

settingsRouter.post(
  "/update",
  authorisationLevel(["admin"]),
  async (req, res) => {
    try {
      await prisma.setting.upsert({
        where: { key: req.body.key },
        update: {
          value: req.body.value,
        },
        create: {
          key: req.body.key,
          value: req.body.value,
        },
      });

      return res.status(200).json(crs.SETTINGS_200_UPDATED());
    } catch (error) {
      createLog(error);
      return res.status(500).json(crs.SERR_500_INTERNAL(error));
    }
  }
);

export default settingsRouter;
