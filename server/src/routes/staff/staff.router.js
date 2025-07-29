import { Router } from "express";
import settingsRouter from "./settings/settings.router.js";
import applicationRouter from "./application/application.router.js";
import manageStaffRouter from "./manage-staff/manageStaff.router.js";
import memberRouter from "./member/member.router.js";
import BookRouter from "./book/book.router.js";
import issueRouter from "./issue/issue.router.js";
import returnRouter from "./return/return.router.js";
import { dashboardStats } from "../../middlewares/stats.middlewares.js";
import transactionsRouter from "./transactions/transactions.router.js";

const staffRouter = new Router();

staffRouter.get("/stats", dashboardStats);
staffRouter.use("/application", applicationRouter);
staffRouter.use("/member", memberRouter);
staffRouter.use("/book", BookRouter);
staffRouter.use("/issue", issueRouter);
staffRouter.use("/return", returnRouter);
staffRouter.use("/transaction", transactionsRouter);
staffRouter.use("/staff", manageStaffRouter);
staffRouter.use("/setting", settingsRouter);

export default staffRouter;
