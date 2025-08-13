import { Router } from "express";
import validateRequest from "../../../middlewares/validateRequest.js";
import { createApplicationHandler } from "../../../middlewares/application/createApplication.js";
import { createApplicationSchema } from "../../../schema/application/createApplicationSchema.js";
import { fetchPublicApplicationHandler } from "../../../middlewares/application/fetchPublicApplication.js";
import { fetchApplicationSchema } from "../../../schema/application/fetchApplicationSchema.js";
import { deletePublicApplicationHandler } from "../../../middlewares/application/deletePublicApplication.js";
import { deleteApplicationSchema } from "../../../schema/application/deleteApplicationSchema.js";

const applicationRouter = Router();

applicationRouter.post(
  "/create",
  validateRequest(createApplicationSchema),
  createApplicationHandler
);

applicationRouter.post(
  "/fetch",
  validateRequest(fetchApplicationSchema),
  fetchPublicApplicationHandler
);

applicationRouter.post(
  "/delete",
  validateRequest(deleteApplicationSchema),
  deletePublicApplicationHandler
);

export default applicationRouter;
