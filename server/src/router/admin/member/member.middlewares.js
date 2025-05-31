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
  createLog,
} = require("../../../utils/functions");

const { transporter } = require("../../../services/nodemailer");
const { generateEmailTemplate } = require("../../../services/email-templates");
const libraryCards = require("../../../models/library-cards/library-cards.schema");
const Member = require("../../../models/member/member.schema");
const Auth = require("../../../models/auth/auth.schema");
const LibraryCard = require("../../../models/library-cards/library-cards.schema");

const fetchStudentByRollNumber = async (req, res, next) => {
  try {
    const memberDoc = await getMember({ rollNumber: req.body.rollNumber });
    console.log(memberDoc);
    if (!memberDoc) return res.status(404).json(crs.STU404FSBRN());
    if (!req.cust) req.cust = {};
    req.cust.memberDoc = memberDoc;
    next();
  } catch (error) {
    createLog(error);
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
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST());
  }
};

const verifyRollNumberAvailability = async (req, res, next) => {
  try {
    const memberDoc = await getMember({ rollNumber: req.body.rollNumber });
    if (memberDoc) return res.status(409).json(crs.CONFL409CNS());
    next();
  } catch (error) {
    createLog(error);
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
  } catch (error) {
    createLog(error);
    if (session.inTransaction()) await session.abortTransaction();
    if (error.code === 11000) return res.status(409).json(crs.STU4091ALCTS());
    return res.status(500).json(crs.SERR500REST(error));
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
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST());
  }
};

// const processDecision = async (req, res, next) => {
//   const session = await mongoose.startSession();
//   try {
//     const { applicantionDocId: Id } = req.cust;
//     if (req.body.decision === "REJECT") {
//       const memberDoc = await Member.findByIdAndUpdate(
//         Id,
//         { status: "REJECTED" },
//         { session }
//       );
//       const { fullName, email } = memberDoc;
//       req.cust.decision = false;
//       req.cust.fullName = fullName;
//       req.cust.email = email;
//       return next();
//     } else {
//       await session.withTransaction(async () => {
//         const memberDoc = await Member.findByIdAndUpdate(
//           Id,
//           {
//             status: "ACTIVE",
//             membershipId: generateMembershipId(await getLatestMembershipId()),
//           },
//           { session, new: true }
//         );

//         // auto assigning library cards
//         const { membershipId, fullName, email, role, category } = memberDoc;
//         const cardLimit = await getLibraryCardLimit(role, category);
//         const cardNumbers = cardNumberGenerator(membershipId, cardLimit);
//         req.cust.fullName = fullName;
//         req.cust.membershipId = membershipId;
//         req.cust.email = email;
//         req.cust.libraryCards = cardNumbers;

//         const { staffId } = await Auth.findById(req.user.uid)
//           .select("staffId -_id")
//           .lean();

//         for (const cardNumber of cardNumbers) {
//           const libraryCardDoc = await createLibraryCard(
//             {
//               cardNumber,
//               memberId: memberDoc.id,
//               createdBy: staffId,
//               autoAlloted: true,
//             },
//             session
//           );
//           await addLibraryCardToMember(
//             libraryCardDoc[0].memberId,
//             libraryCardDoc[0]._id,
//             session
//           );
//         }
//       });
//       await session.commitTransaction();
//     }
//     req.cust.decision = true;
//     next();
//   } catch (error) {
//     createLog(error);
//     if (session.inTransaction()) await session.abortTransaction();
//     return res.status(500).json(crs.SERR500REST(error));
//   } finally {
//     await session.endSession();
//   }
// };

const processDecision = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    const { applicantionDocId: memberId } = req.cust;
    const { decision } = req.body;

    // Handle REJECTION
    if (decision === "REJECT") {
      const memberDoc = await Member.findByIdAndUpdate(
        memberId,
        { status: "REJECTED" },
        { session, new: true }
      );

      if (!memberDoc) {
        throw new Error("Member not found for rejection.");
      }

      const { fullName, email } = memberDoc;

      req.cust = {
        ...req.cust,
        decision: false,
        fullName,
        email,
      };

      return next();
    }

    // Handle APPROVAL
    await session.withTransaction(async () => {
      const latestMembershipId = await getLatestMembershipId();
      const generatedMembershipId = generateMembershipId(latestMembershipId);

      const updatedMember = await Member.findByIdAndUpdate(
        memberId,
        {
          status: "ACTIVE",
          membershipId: generatedMembershipId,
        },
        { session, new: true }
      );

      if (!updatedMember) {
        throw new Error("Member not found for approval.");
      }

      const {
        membershipId,
        fullName,
        email,
        role,
        category,
        id: updatedMemberId,
      } = updatedMember;

      const cardLimit = await getLibraryCardLimit(role, category);
      const cardNumbers = cardNumberGenerator(membershipId, cardLimit);

      const { staffId } = await Auth.findById(req.user.uid)
        .select("staffId -_id")
        .lean();

      for (const cardNumber of cardNumbers) {
        const [libraryCard] = await createLibraryCard(
          {
            cardNumber,
            memberId: updatedMemberId,
            createdBy: staffId,
            autoAlloted: true,
          },
          session
        );

        await addLibraryCardToMember(
          libraryCard.memberId,
          libraryCard._id,
          session
        );
      }

      req.cust = {
        ...req.cust,
        decision: true,
        fullName,
        email,
        membershipId,
        libraryCards: cardNumbers,
      };
    });

    next();
  } catch (error) {
    createLog(error);
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    return res.status(500).json(crs.SERR500REST(error));
  } finally {
    await session.endSession();
  }
};

const sendApprovalRejectionEmail = (req, res, next) => {
  try {
    if (req.cust.decision)
      transporter.sendMail({
        from: process.env.NODEMAILER_EMAIL,
        to: req.cust.email,
        subject:
          "Your Library application is Approved. Start Issuing Books Now!",
        html: generateEmailTemplate.approvalEmail(
          req.cust.fullName,
          req.cust.membershipId,
          req.cust.libraryCards
        ),
      });
    else
      transporter.sendMail({
        from: process.env.NODEMAILER_EMAIL,
        to: req.cust.email,
        subject: "Your Library application has been Rejected",
        html: generateEmailTemplate.rejectionEmail(req.cust.fullName),
      });

    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.MDW500APM(error));
  }
};

const checkIssues = async (req, res, next) => {
  try {
    //
    const a = await libraryCards.find({ memberId: req.body._id });
    const available = !a.some((card) => card.status === "ISSUED");
    if (available) return next();
    return res.status(500).json(crs.MEB409MILU());
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

const checkPendingDues = async (req, res, next) => {
  try {
    const m = await Member.findById(req.body._id).select(
      "balance fullName membershipId email -_id"
    );
    if (m.balance !== 0) return res.status(500).json(crs.MEB409MIPD());
    if (!req.cust) req.cust = {};
    req.cust.email = m.email;
    req.cust.fullName = m.fullName;
    req.cust.membershipId = m.membershipId;
    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

const issueNoDue = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      const m = await Member.findByIdAndUpdate(
        req.body._id,
        { status: "CLEARED" },
        { session }
      ).lean();

      const cardsArray = m.libraryCards;
      for (const cardId of cardsArray)
        await LibraryCard.findByIdAndUpdate(
          cardId,
          { status: "CLEARED" },
          { session }
        );
    });
    await session.commitTransaction();
    next();
  } catch (error) {
    createLog(error);
    if (session.inTransaction()) await session.abortTransaction();
    return res.status(500).json(crs.SERR500REST(error));
  } finally {
    await session.endSession();
  }
};

const sendNoDueConfirmationEmail = (req, res, next) => {
  try {
    transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: req.cust.email,
      subject: "No-Due Clearance Confirmation",
      html: generateEmailTemplate.noDueConfirmationEmail(
        req.cust.fullName,
        req.cust.membershipId
      ),
    });
    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.MAIL500ERR(error));
  }
};

module.exports = {
  fetchApplicationById,
  processDecision,
  fetchStudentByRollNumber,
  allotLibraryCard,
  verifyRollNumberAvailability,
  fetchStudentByMembershipId,
  sendApprovalRejectionEmail,
  checkIssues,
  checkPendingDues,
  issueNoDue,
  sendNoDueConfirmationEmail,
};
