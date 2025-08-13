import { Router } from "express";
import validate from "../../../middlewares/validateRequest.js";
import { catalogueSearchSchema } from "../../../schema/public/catalogueSearchSchema.js";
import { catalogueSearchHandler } from "../../../middlewares/public/catalogueSearch.js";

const catalogueRouter = Router();

catalogueRouter.get(
  "/search",
  validate(catalogueSearchSchema),
  catalogueSearchHandler
);

export default catalogueRouter;
