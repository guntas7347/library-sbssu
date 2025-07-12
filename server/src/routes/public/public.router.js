import { Router } from "express";
import uploadRouter from "../uploader/uploader.router.js";
import publicSettings from "./settings/public.router.js";
import applicationRouter from "./application/application-public.router.js";

const publicRouter = new Router();

publicRouter.use("/upload", uploadRouter);
publicRouter.use("/application", applicationRouter);
publicRouter.use("/settings", publicSettings);

export default publicRouter;
