const express = require("express");
const {
  getMemberById,
  getMembers,
  countMemberDocs,
  updateMemberById,
  quickSearchMember,
  findApplications,
  addLibraryCardToMember,
} = require("../../../models/member/member.controllers");
const crs = require("../../../utils/custom-response-codes");
const {
  fetchApplicationById,
  processDecision,
  sendApprovalEmail,
  checkIssues,
  checkPendingDues,
} = require("./member.middlewares");

const { authorisationLevel } = require("../../auth/auth.middlewares");
const Member = require("../../../models/member/member.schema");
const { validateMembershipId } = require("./member.validator");
const {
  addLibraryCardsValueToObject,
  cardNumberGenerator,
  createLog,
} = require("../../../utils/functions");
const LibraryCard = require("../../../models/library-cards/library-cards.schema");
const { default: mongoose } = require("mongoose");
const {
  createLibraryCard,
} = require("../../../models/library-cards/library-cards.controllers");
const Auth = require("../../../models/auth/auth.schema");

const memberRoute = express.Router();

memberRoute.post(
  "/fetch-for-issue",
  authorisationLevel(["issue-book"]),
  validateMembershipId,
  async (req, res) => {
    try {
      const d = await Member.findOne({
        membershipId: req.body.membershipId,
        status: "ACTIVE",
      })
        .populate("libraryCards", "cardNumber status category -_id")
        .select("membershipId fullName imageUrl -_id")
        .lean();

      if (!d) return res.status(404).json(crs.STU404FSBRN());
      const data = addLibraryCardsValueToObject(d);
      return res
        .status(200)
        .json(crs.STU200FSBRN({ imageUrl: d.imageUrl, data }));
    } catch (error) {
      console.log(error);
      return res.status(500).json(crs.SERR500REST(error));
    }
  }
); //fetch-for-issue

memberRoute.post(
  "/fetch-all-applications",
  authorisationLevel(2),
  async (req, res) => {
    try {
      const ApplicantCol = await findApplications(req.body);
      return res.status(200).json(crs.STU200FAA(ApplicantCol));
    } catch (error) {
      console.log(error);
      return res.status(500).json(crs.SERR500REST(error));
    }
  }
);

memberRoute.post(
  "/fetch-all-members",
  authorisationLevel(["search-members"]),
  async (req, res) => {
    try {
      const members = await getMembers({
        filter: req.body.name,
        filterValue: req.body.value,
        page: req.body.page || 1,
      });
      return res.status(200).json(crs.STU200FAS(members));
    } catch (error) {
      console.log(error);
      return res.status(500).json(crs.SERR500REST(error));
    }
  }
);

memberRoute.post(
  "/fetch-one",
  authorisationLevel(["view-member"]),
  async (req, res) => {
    try {
      const studentDoc = await Member.findById(req.body._id)
        .populate("libraryCards")
        .lean();
      if (studentDoc) return res.status(200).json(crs.STU200FSBI(studentDoc));
      return res.status(404).json(crs.STU404FSBI());
    } catch (error) {
      console.log(error);
      return res.status(500).json(crs.SERR500REST(error));
    }
  }
);

memberRoute.post(
  "/fetch-one-application",
  authorisationLevel(2),
  fetchApplicationById,
  async (req, res) => {
    try {
      return res.status(200).json(crs.APP200FA(req.cust.applicantionDoc));
    } catch (error) {
      console.log(error);
      return res.status(500).json(crs.SERR500REST());
    }
  }
); //fetch-one-application

memberRoute.post(
  "/process-application",
  authorisationLevel(3),
  fetchApplicationById,
  processDecision,
  sendApprovalEmail,
  async (req, res) => {
    return res.status(200).json(crs.APP200APA());
  }
); //process-application

memberRoute.post(
  "/count-total-members",
  authorisationLevel(),
  async (req, res) => {
    try {
      const numberOfStudentDocs = await countMemberDocs(req.body.filter);
      return res.status(200).json(crs.STU200CTS(numberOfStudentDocs));
    } catch (error) {
      console.log(error);
      return res.status(500).json(crs.SERR500REST(error));
    }
  }
);

memberRoute.post("/edit", authorisationLevel(4), async (req, res) => {
  try {
    await Member.findByIdAndUpdate(req.body.id, req.body);
    return res.status(200).json(crs.STU200ES());
  } catch (error) {
    console.log(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
});

memberRoute.post("/quick-search", async (req, res) => {
  try {
    //
    const result = await quickSearchMember(req.body);
    if (result.length === 0) return res.status(404).json(crs.SRH404GLB());
    return res.status(200).json(crs.SRH200GLB(result));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
});

memberRoute.post(
  "/mark-inactive",
  checkIssues,
  checkPendingDues,
  async (req, res) => {
    try {
      await updateMemberById(req.body._id, { status: "INACTIVE" });
      return res.status(200).json(crs.MEB200MI());
    } catch (error) {
      console.log(error);
      return res.status(500).json(crs.SERR500REST(error));
    }
  }
);

memberRoute.post(
  "/fetch/for-card",
  authorisationLevel(["create-card"]),
  async (req, res) => {
    try {
      const m = await Member.findOne({
        membershipId: req.body.membershipId,
        status: "ACTIVE",
      })
        .select("fullName imageUrl program role category rollNumber batch")
        .lean();
      if (!m) return res.status(200).json(crs.STU404FSBRN());
      return res.status(200).json(crs.STU200FSBRN(m));
    } catch (error) {
      console.log(error);
      return res.status(500).json(crs.SERR500REST(error));
    }
  }
);

memberRoute.post(
  "/library-cards/create",
  authorisationLevel(["create-card"]),
  async (req, res) => {
    const session = await mongoose.startSession();

    try {
      const m = await Member.findById(req.body._id)
        .select("membershipId")
        .populate("libraryCards", "cardNumber")
        .lean();

      const cardNumbers = (m.libraryCards || []).map((card) => {
        return card.cardNumber % 100;
      });

      const maxCardNumber =
        cardNumbers.length > 0 ? Math.max(...cardNumbers) : 0;

      const newCardNumbers = cardNumberGenerator(
        m.membershipId,
        req.body.cardsCount,
        maxCardNumber
      );

      const { staffId } = await Auth.findById(req.user.uid)
        .select("staffId -_id")
        .lean();

      await session.withTransaction(async () => {
        for (const cardNumber of newCardNumbers) {
          const libraryCardDoc = await createLibraryCard(
            {
              cardNumber,
              memberId: m._id,
              category: req.body.category,
              createdBy: staffId,
            },
            session
          );
          await addLibraryCardToMember(
            libraryCardDoc[0].memberId,
            libraryCardDoc[0]._id,
            session
          );
        }
      });
      await session.commitTransaction();
      return res.status(200).json(crs.STU200ALCTS());
    } catch (error) {
      createLog(error);
      if (session.inTransaction()) await session.abortTransaction();
      return res.status(500).json(crs.SERR500REST(error));
    } finally {
      await session.endSession();
    }
  }
);

memberRoute.post("/library-cards/fetch", async (req, res) => {
  try {
    const m = await Member.findById(req.body._id)
      .select(
        "fullName program specialization rollNumber membershipId imageUrl"
      )
      .populate({ path: "libraryCards", populate: { path: "createdBy" } })
      .lean();

    return res.status(200).json(crs.STU200ALCTS(m));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
});

module.exports = { memberRoute };
