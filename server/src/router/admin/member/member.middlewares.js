const mongoose = require("mongoose");
const crs = require("../../../utils/custom-response-codes");
const {
  addLibraryCardToMember,
  getMember,
  updateMemberById,
  getLatestMembershipId,
  getApplicationById,
  getMemberById,
} = require("../../../models/member/member.controllers");

const {
  createLibraryCard,
  getLibraryCard,
  getLibraryCardsByStudentId,
} = require("../../../models/library-cards/library-cards.controllers");
const {
  cardNumberGenerator,
  getLibraryCardLimit,
  generateMembershipId,
} = require("../../../utils/functions");

const { transporter } = require("../../../services/nodemailer");
const { generateEmailTemplate } = require("../../../services/email-templates");
const libraryCards = require("../../../models/library-cards/library-cards.schema");
const Member = require("../../../models/member/member.schema");

const fetchStudentByRollNumber = async (req, res, next) => {
  try {
    const memberDoc = await getMember({ rollNumber: req.body.rollNumber });
    console.log(memberDoc);
    if (!memberDoc) return res.status(404).json(crs.STU404FSBRN());
    if (!req.cust) req.cust = {};
    req.cust.memberDoc = memberDoc;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST());
  }
};
const fetchStudentByMembershipId = async (req, res, next) => {
  try {
    const memberDoc = await getMember({
      membershipId: req.body.membershipId,
      status: "ACTIVE",
    });
    if (!memberDoc) return res.status(404).json(crs.STU404FSBRN());
    if (!req.cust) req.cust = {};
    req.cust.memberDoc = memberDoc;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST());
  }
};

const verifyRollNumberAvailability = async (req, res, next) => {
  try {
    const memberDoc = await getMember({ rollNumber: req.body.rollNumber });
    if (memberDoc) return res.status(409).json(crs.CONFL409CNS());
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST());
  }
};

const allotLibraryCard = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    const { _id, libraryCards } = req.cust.memberDoc;

    // Check if Student already has maximum Library Cards
    if (libraryCards.length >= 10)
      return res.status(409).json(crs.STU409ALCTS());

    await session.withTransaction(async () => {
      const libraryCardDoc = await createLibraryCard(
        {
          cardNumber: req.body.cardNumber,
          memberId: _id,
        },
        session
      );
      await addLibraryCardToMember(
        libraryCardDoc[0].memberId,
        libraryCardDoc[0]._id,
        session
      );
    });
    await session.commitTransaction();
    return res.status(200).json(crs.STU200ALCTS());
  } catch (err) {
    console.log(err);
    if (session.inTransaction()) await session.abortTransaction();
    if (err.code === 11000) return res.status(409).json(crs.STU4091ALCTS());
    return res.status(500).json(crs.SERR500REST(err));
  } finally {
    await session.endSession();
  }
};

const fetchApplicationById = async (req, res, next) => {
  try {
    const applicantionDoc = await getApplicationById(req.body._id);
    if (applicantionDoc === null) return res.status(404).json(crs.APP404FA());
    if (!req.cust) req.cust = {};
    req.cust.applicantionDoc = applicantionDoc;
    req.cust.applicantionDocId = applicantionDoc._doc._id;

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST());
  }
};

const processDecision = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    const { applicantionDocId: Id } = req.cust;
    if (req.body.decision === "REJECT") {
      await session.withTransaction(async () => {
        await updateMemberById(Id, { status: "REJECTED" });
      });
      await session.commitTransaction();
      return res.status(200).json(crs.APP200RPA());
    } else {
      await session.withTransaction(async () => {
        const memberDoc = await updateMemberById(
          Id,
          {
            status: "ACTIVE",
            membershipId: generateMembershipId(await getLatestMembershipId()),
          },
          session
        );

        // auto assigning library cards
        const { membershipId, fullName, email, role, category } = memberDoc;
        const cardLimit = getLibraryCardLimit(role, category);
        const cardNumbers = cardNumberGenerator(membershipId, cardLimit);

        if (!req.cust) req.cust = {};
        req.cust.fullName = fullName;
        req.cust.membershipId = membershipId;
        req.cust.email = email;
        req.cust.libraryCards = cardNumbers;

        for (const cardNumber of cardNumbers) {
          const libraryCard = await getLibraryCard({ cardNumber });
          if (libraryCard) continue;

          if (
            role === "STUDENT UG" &&
            category === "SCST" &&
            cardNumber % 10 > 2
          ) {
            const libraryCardDoc = await createLibraryCard(
              { cardNumber, memberId: memberDoc.id, category: "BOOK BANK" },
              session
            );
            await addLibraryCardToMember(
              libraryCardDoc[0].memberId,
              libraryCardDoc[0]._id,
              session
            );
          } else {
            const libraryCardDoc = await createLibraryCard(
              { cardNumber, memberId: memberDoc.id },
              session
            );
            await addLibraryCardToMember(
              libraryCardDoc[0].memberId,
              libraryCardDoc[0]._id,
              session
            );
          }
        }
      });
      await session.commitTransaction();
    }
    next();
  } catch (err) {
    console.log(err);
    if (session.inTransaction()) await session.abortTransaction();
    return res.status(500).json(crs.SERR500REST(err));
  } finally {
    await session.endSession();
  }
};

const sendApprovalEmail = (req, res, next) => {
  try {
    transporter.sendMail({
      from: "librarysbssu@gmail.com",
      to: req.cust.email,
      subject: "Your Library Account is Approved – Start Issuing Books Now!",
      html: generateEmailTemplate.approvalEmail(
        req.cust.fullName,
        req.cust.membershipId,
        req.cust.libraryCards
      ),
    });
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.MDW500APM(err));
  }
};

const checkIssues = async (req, res, next) => {
  try {
    //
    const a = await libraryCards.find({ memberId: req.body._id });
    const available = !a.some((card) => card.status !== "available");
    if (available) return next();
    return res.status(500).json(crs.MEB409MILU());
  } catch (error) {
    console.log(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

const checkPendingDues = async (req, res, next) => {
  try {
    //
    const m = await Member.findById(req.body._id).select("balance -_id");
    if (m.balance === 0) return next();
    return res.status(500).json(crs.MEB409MIPD());
  } catch (error) {
    console.log(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

module.exports = {
  fetchApplicationById,
  processDecision,
  fetchStudentByRollNumber,
  allotLibraryCard,
  verifyRollNumberAvailability,
  fetchStudentByMembershipId,
  sendApprovalEmail,
  checkIssues,
  checkPendingDues,
};
