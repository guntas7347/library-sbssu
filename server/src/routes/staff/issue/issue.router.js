import { Router } from "express";
import crs from "../../../utils/crs/crs.js";
import { createLog } from "../../../utils/log.js";
import prisma from "../../../services/prisma.js";
import { processIssue, verifyAvailability } from "./issue.middlewares.js";
import validateRequest from "../../../middlewares/validate-request.js";
import { IssueSchema } from "../../../schema/issue.schema.js";
import { findIssuedBooks } from "../../../controllers/issue/findIssuedBooks.js";
import { fetchIssueDetails } from "../../../controllers/issue/fetchIssueDetails.js";

const issueRouter = Router();

issueRouter.get("/member", async (req, res) => {
  try {
    const number = req.query.number;

    if (!number || typeof number !== "string" || number.length !== 6) {
      return res.status(400).json(crs.DATA_400_INVALID("Invalid member ID."));
    }

    const membershipId = `MEM-${number}`;

    const member = await prisma.member.findFirst({
      where: { membershipId },
      select: {
        id: true,
        fullName: true,
        photo: true,
        program: true,
        specialization: true,
        email: true,
        membershipId: true,
        memberType: true,
        libraryCards: {
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            cardNumber: true,
            status: true,
            expiry: true,
            type: true,
            remark: true,
          },
        },
      },
    });

    if (!member) {
      return res.status(404).json(crs.DATA_204_NOT_FOUND("Member not found."));
    }

    return res.status(200).json(crs.ISSUE_200_MEMBER_FETCHED(member));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
});

issueRouter.get("/book", async (req, res) => {
  try {
    const accessionNumber = Number(req.query.number);
    if (!accessionNumber || isNaN(accessionNumber)) {
      return res
        .status(400)
        .json(crs.ERR_400_INVALID_REQUEST("Invalid accession number"));
    }

    const accession = await prisma.accession.findUnique({
      where: { accessionNumber },
      select: {
        accessionNumber: true,
        category: true,
        status: true,
        book: {
          select: {
            title: true,
            author: true,
            location: true,
            accessions: {
              select: { status: true },
            },
          },
        },
      },
    });

    if (!accession || !accession.book) {
      return res.status(200).json(crs.DATA_204_NOT_FOUND());
    }

    const totalCopies = accession.book.accessions.length;
    const availableCount = accession.book.accessions.filter(
      (a) => a.status === "available"
    ).length;

    const payload = {
      accessionNumber: accession.accessionNumber,
      category: accession.category ?? "Unknown",
      status: accession.status,
      book: {
        title: accession.book.title ?? "Untitled",
        author: accession.book.author ?? "Unknown Author",
        location: accession.book.location ?? "Unknown Location",
      },
      totalCopies,
      availableCount,
    };

    return res.status(200).json(
      crs.ISSUE_200_BOOK_FETCHED(payload) // Will become: { message, data: payload, code }
    );
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
});

issueRouter.post(
  "/issue",
  validateRequest(IssueSchema),
  verifyAvailability,
  processIssue,
  async (req, res) => {
    try {
      return res.status(201).json(crs.ISSUE_201_BOOK_ISSUED());
    } catch (error) {
      createLog(error);
      return res.status(500).json(crs.SERR_500_INTERNAL(error));
    }
  }
);

issueRouter.get("/all", async (req, res) => {
  try {
    const issues = await findIssuedBooks(req.query);
    if (!issues) return res.status(404).json(crs.DATA_204_NOT_FOUND());

    return res.status(200).json(crs.ISSUE_200_ALL_FETCHED(issues));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
});

issueRouter.get("/one", async (req, res) => {
  try {
    const issue = await fetchIssueDetails(req.query.id);

    return res.status(200).json(crs.ISSUE_200_BOOK_FETCHED(issue));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
});

export default issueRouter;
