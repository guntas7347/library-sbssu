import { Router } from "express";
import prisma from "../../../services/prisma.js";
import crs from "../../../utils/crs/crs.js";
import { createLog } from "../../../utils/log.js";
import { decrptText, encryptText } from "../../../utils/encrypt.crypto.js";
import { applicationSchema } from "../../../schema/application.schema.js";
import validateRequest from "../../../middlewares/validate-request.js";
import { generateApplicationId } from "../../../utils/functions/idGenerator.js";

const applicationRouter = Router();

applicationRouter.post(
  "/create",
  validateRequest(applicationSchema),
  async (req, res) => {
    try {
      const lastMember = await prisma.member.findFirst({
        orderBy: { applicationId: "desc" },
        select: { applicationId: true },
      });
      const prevAppId = lastMember?.applicationId;
      const nextApplicationId = generateApplicationId(prevAppId);
      const application = await prisma.member.create({
        data: {
          ...req.vBody,
          applicationId: nextApplicationId,
        },
      });

      const { id } = application;

      const cookieOptions = {
        secure: process.env.NODE_ENV !== "dev",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 28),
        path: "/",
      };

      res.cookie("gh", encryptText(id.toString()), cookieOptions);

      return res.status(201).json(crs.PUBLIC_201_APPLICATION_CREATED({ id }));
    } catch (error) {
      createLog(error);
      return res.status(500).json(crs.SERR_500_INTERNAL(error));
    }
  }
);

applicationRouter.post("/fetch", async (req, res) => {
  try {
    let id = "";
    if (req.body.type === "url") id = req.body.id;
    else id = decrptText(req.body.id);
    const d = await prisma.member.findFirst({
      where: {
        id,
        status: "applied",
      },
    });
    return res.status(200).json(crs.PUBLIC_200_APPLICATION_FETCHED(d));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
});

applicationRouter.post("/delete", async (req, res) => {
  try {
    const id = decrptText(req.body.gh);

    await prisma.member.deleteMany({
      where: {
        id,
        status: "applied",
      },
    });
    // todo:pending image deletion
    return res.status(200).json(crs.PUBLIC_200_APPLICATION_DELETED());
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
});

export default applicationRouter;
