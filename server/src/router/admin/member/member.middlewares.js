const { default: mongoose } = require("mongoose");
const {
  getApplicationById,
  deleteApplicationById,
} = require("../../../models/applications/applications.controllers");
const crs = require("../../../utils/custom-response-codes");
const {
  deleteAuthApplicantById,
  getAuthApplicantById,
} = require("../../../models/auth/applicant/auth_applicant.controllers");
const {
  createMember,
  addLibraryCardToMember,
  getMember,
  updateMemberById,
} = require("../../../models/member/member.controllers");

const {
  createLibraryCard,
  getLibraryCard,
} = require("../../../models/library-cards/library-cards.controllers");
const {
  cardNumberGenerator,
  getLibraryCardLimit,
} = require("../../../utils/functions");
const {
  createAuthMember,
} = require("../../../models/auth/member/auth_member.controllers");

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
    const memberDoc = await getMember({ membershipId: req.body.membershipId });
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
    const { applicantionDoc, applicantionDocId } = req.cust;
    if (req.body.decision === "REJECT") {
      await session.withTransaction(async () => {
        await deleteApplicationById(applicantionDocId, session);
        await deleteAuthApplicantById(applicantionDocId, session);
      });
      await session.commitTransaction();
      return res.status(200).json(crs.APP200RPA());
    } else {
      const applicantAuthDoc = await getAuthApplicantById(applicantionDocId);
      delete applicantionDoc._doc._id;
      delete applicantAuthDoc._doc._id;

      await session.withTransaction(async () => {
        const memberDoc = await createMember(applicantionDoc._doc, session);
        const authStudentDoc = {
          memberId: memberDoc[0].id,
          ...applicantAuthDoc._doc,
        };
        const authDoc = await createAuthMember(authStudentDoc, session);

        await updateMemberById(
          memberDoc[0].id,
          { authId: authDoc[0].id },
          session
        );
        await deleteApplicationById(applicantionDocId, session);
        await deleteAuthApplicantById(applicantionDocId, session);

        // auto assigning library cards
        const { membershipId, role, category } = memberDoc[0];
        const cardLimit = getLibraryCardLimit(role, category);
        const cardNumbers = cardNumberGenerator(membershipId, cardLimit);
        for (const cardNumber of cardNumbers) {
          const libraryCard = await getLibraryCard({ cardNumber });
          if (libraryCard) continue;

          if (
            role === "STUDENT UG" &&
            category === "SCST" &&
            cardNumber % 10 > 2
          ) {
            const libraryCardDoc = await createLibraryCard(
              { cardNumber, memberId: memberDoc[0].id, category: "BOOK BANK" },
              session
            );
            await addLibraryCardToMember(
              libraryCardDoc[0].memberId,
              libraryCardDoc[0]._id,
              session
            );
          } else {
            const libraryCardDoc = await createLibraryCard(
              { cardNumber, memberId: memberDoc[0].id },
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

module.exports = {
  fetchApplicationById,
  processDecision,
  fetchStudentByRollNumber,
  allotLibraryCard,
  verifyRollNumberAvailability,
  fetchStudentByMembershipId,
};
