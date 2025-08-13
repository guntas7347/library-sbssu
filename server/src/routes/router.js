import { Router } from "express";
import publicRouter from "./public/public.router.js";
import authRouter from "./auth/auth.router.js";
import staffRouter from "./staff/staff.router.js";
import {
  verifyFingerprint,
  verifyJwtMiddleware,
  verifyStaff,
} from "../middlewares/auth/auth.middlewares.js";

const router = new Router();

router.use("/public", publicRouter);
router.use("/auth", authRouter);

router.use(verifyJwtMiddleware);
router.use(verifyFingerprint);

router.use("/staff", verifyStaff, staffRouter);
export default router;
