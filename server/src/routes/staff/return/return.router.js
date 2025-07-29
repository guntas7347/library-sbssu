import { Router } from "express";
import crs from "../../../utils/crs/crs.js";
import { createLog } from "../../../utils/log.js";
import prisma from "../../../services/prisma.js";
import { processReturn } from "./return.middlewares.js";
import { findReturnedBooks } from "../../../controllers/return/findReturnedBooks.js";
import { fetchReturnDetails } from "../../../controllers/return/fetchReturnDetails.js";
import { findIssuedBookForReturn } from "../../../controllers/return/findIssuedBookForReturn.js";

const returnRouter = Router();

returnRouter.get("/fetch", async (req, res) => {
  try {
    const issuedBook = await findIssuedBookForReturn(req.query.number);
    if (!issuedBook) return res.status(200).json(crs.DATA_204_NOT_FOUND());
    return res.status(200).json(crs.RETURN_200_FETCHED(issuedBook));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
});

returnRouter.post("/return", processReturn, async (req, res) => {
  try {
    return res.status(201).json(crs.RETURN_201_BOOK_ISSUED());
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
});

returnRouter.get("/all", async (req, res) => {
  try {
    const returns = await findReturnedBooks(req.query);
    return res.status(200).json(crs.RETURN_200_FETCHED(returns));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
});

returnRouter.get("/one", async (req, res) => {
  try {
    const returned = await fetchReturnDetails(req.query.id);
    return res.status(200).json(crs.RETURN_200_FETCHED(returned));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
});
export default returnRouter;
