import { Router } from "express";
import uploadRouter from "../uploader/uploader.router.js";
import publicSettings from "./settings/public.router.js";
import applicationRouter from "./application/application-public.router.js";
import catalogueRouter from "./catalogue/catalogueRouter.js";

const publicRouter = new Router();

publicRouter.use("/upload", uploadRouter);
publicRouter.use("/application", applicationRouter);
publicRouter.use("/settings", publicSettings);
publicRouter.use("/catalogue", catalogueRouter);

export default publicRouter;
