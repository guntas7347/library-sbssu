import { Router } from "express";
import { authorisationLevel } from "../../../middlewares/auth/auth.middlewares.js";
import { fetchSettingHandler } from "../../../middlewares/settings/fetchSetting.js";
import { updateSettingHandler } from "../../../middlewares/settings/updateSettingHandler.js";
import validate from "../../../middlewares/validateRequest.js";
import { fetchSettingSchema } from "../../../schema/settings/fetchSettingSchema.js";
import { updateSettingSchema } from "../../../schema/settings/updateSettingSchema.js";

const settingsRouter = Router();

settingsRouter.get("/fetch", validate(fetchSettingSchema), fetchSettingHandler);

settingsRouter.post(
  "/update",
  authorisationLevel(["admin"]),
  validate(updateSettingSchema),
  updateSettingHandler
);

export default settingsRouter;
