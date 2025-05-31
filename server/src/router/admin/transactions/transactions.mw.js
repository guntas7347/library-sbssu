const { default: mongoose } = require("mongoose");
const crs = require("../../../utils/custom-response-codes");
const {
  addTransaction,
  getTransaction,
} = require("../../../models/transaction/transaction.controllers");
const { transporter } = require("../../../services/nodemailer");
const { generateEmailTemplate } = require("../../../services/email-templates");

const getTransactionMW = async (req, res) => {
  try {
    const r = await getTransaction(req.body._id);

    return res.status(200).json(
      crs.TRN200FTBI({
        ...r._doc,
        fullName: r.memberId.fullName,
        membershipId: r.memberId.membershipId,
      })
    );
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

const addTransactionMW = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      const t = await addTransaction(req.body, session);
      if (!req.cust) req.cust = {};
      req.cust.transactionId = t[0]._id;
    });
    next();
  } catch (error) {
    createLog(error);
    if (session.inTransaction()) await session.abortTransaction();
    return res.status(500).json(crs.SERR500REST(error));
  } finally {
    session.endSession();
  }
};

const sendTransactionEmail = async (req, res, next) => {
  try {
    if (!req.cust.transactionId) return next();

    const r = await getTransaction(req.cust.transactionId);

    const emailContent = {
      fullName: r.memberId.fullName,
      transactionType: r.transactionType,
      amount: r.amount,
      balance: r.closingBalance,
      category: r.category,
      date: new Date(r.createdAt).toDateString(),
    };

    transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: "guntas7347@gmail.com",
      subject: "Transaction detected",
      html: generateEmailTemplate.transactionConfirmation(emailContent),
    });
    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

module.exports = { addTransactionMW, sendTransactionEmail, getTransactionMW };
