const express = require("express");
const { authorisationLevel } = require("../../auth/auth.middlewares");
const {
  getTransactions,
} = require("../../../models/transaction/transaction.controllers");
const crs = require("../../../utils/custom-response-codes");
const {
  addTransactionMW,
  sendTransactionEmail,
  getTransactionMW,
} = require("./transactions.mw");
const Member = require("../../../models/member/member.schema");

const transactionsRouter = express.Router();

transactionsRouter.post(
  "/fetch-transactions",
  authorisationLevel(2),
  async (req, res) => {
    try {
      const d = await getTransactions({
        filter: req.body.name,
        filterValue: req.body.value,
        page: req.body.page || 1,
      });
      const data = d.data.map((data) => {
        return {
          _id: data._id,
          createdAt: data.createdAt,
          category: data.category,
          amount: data.amount,
          transactionType: data.transactionType,
          closingBalance: data.closingBalance,
          fullName: data.memberId.fullName,
        };
      });

      return res.status(200).json(
        crs.TRN200FT({
          data,
          totalPages: d.totalPages,
        })
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json(crs.SERR500REST(error));
    }
  }
);

transactionsRouter.post(
  "/fetch-transaction",
  authorisationLevel(2),
  getTransactionMW
);

transactionsRouter.post(
  "/add-transaction",
  authorisationLevel(2),
  addTransactionMW,
  sendTransactionEmail,
  async (req, res) => {
    try {
      return res.status(200).json(crs.TRN200AT());
    } catch (error) {
      console.log(error);
      return res.status(500).json(crs.SERR500REST(error));
    }
  }
);

transactionsRouter.post(
  "/fetch-member",
  authorisationLevel(2),
  async (req, res) => {
    try {
      if (!/^\d{6}$/.test(String(req.body.membershipId))) {
        return res.status(400).json(crs.TRN400FM());
      }
      const m = await Member.findOne({
        membershipId: req.body.membershipId,
        status: "ACTIVE",
      })
        .select("fullName balance")
        .lean();
      console.log(m);
      if (!m) return res.status(404).json(crs.TRN404FM());
      return res.status(200).json(crs.TRN200FM(m));
    } catch (error) {
      console.log(error);
      return res.status(500).json(crs.SERR500REST(error));
    }
  }
);

module.exports = { transactionsRouter };
