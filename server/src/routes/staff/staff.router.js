import { Router } from "express";
import settingsRouter from "./settings/settings.router.js";
import applicationRouter from "./application/application.router.js";
import manageStaffRouter from "./manage-staff/manageStaff.router.js";
import memberRouter from "./member/member.router.js";

const staffRouter = new Router();

staffRouter.use("/application", applicationRouter);
staffRouter.use("/member", memberRouter);
staffRouter.use("/staff", manageStaffRouter);
staffRouter.use("/settings", settingsRouter);

export default staffRouter;
