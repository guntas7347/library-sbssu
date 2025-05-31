const Member = require("../member/member.schema");
const Transaction = require("./transaction.schema");

const getTotalTransactions = async (q) => await Transaction.countDocuments(q);

const calculateClosingBalance = async (memberId, amount, transactionType) => {
  try {
    const memberDoc = await Member.findById(memberId);
    const currentBalance = memberDoc.balance;
    return transactionType === "DEBIT"
      ? currentBalance - Number(amount)
      : currentBalance + Number(amount);
  } catch (error) {
    createLog(error);
  }
};

const createReturnFine = async (
  { memberId, returnedBookId, amount, remark = "Null" },
  session
) => {
  try {
    const closingBalance = await calculateClosingBalance(
      memberId,
      amount,
      "DEBIT"
    );

    const TransactionDoc = await Transaction.create(
      [
        {
          memberId,
          returnedBookId,
          transactionType: "DEBIT",
          category: "Late Fee",
          remark,
          amount,
          closingBalance,
        },
      ],
      { session }
    );

    await Member.findByIdAndUpdate(
      memberId,
      { $set: { balance: closingBalance } },
      { session }
    );

    return TransactionDoc;
  } catch (error) {
    createLog(error);
  }
};

const getTransactions = async (param) => {
  const { filter, filterValue, page = 1 } = param;
  let totalPages = 1;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  const query = Transaction.find();

  switch (filter) {
    case "allCategories":
      query.where();

      break;

    case "membershipId":
      var a = await Member.findOne({ membershipId: filterValue }).select("_id");
      if (a !== null) query.where({ memberId: a._id });
      else return { data: [], totalPages };
      break;

    default:
      break;
  }

  totalPages = Math.ceil((await getTotalTransactions()) / pageSize);

  query.skip(skip).limit(pageSize);

  query.populate({
    path: "memberId",
    select: "fullName",
  });

  query.select("createdAt category amount transactionType closingBalance");

  query.sort({ createdAt: -1 });

  return { data: await query.exec(), totalPages };
};

const getTransaction = async (id) => {
  return await Transaction.findById(id).populate(
    "memberId",
    "fullName membershipId"
  );
};

const addTransaction = async (p, session) => {
  const {
    category,
    memberId,
    transactionType,
    remark,
    amount,
    paymentMethod,
    receiptNumber,
  } = p;

  const closingBalance = await calculateClosingBalance(
    memberId,
    amount,
    transactionType
  );

  const t = await Transaction.create(
    [
      {
        memberId,
        transactionType,
        category,
        remark,
        amount,
        closingBalance,
        paymentMethod,
        receiptNumber,
      },
    ],
    { session }
  );

  await Member.findByIdAndUpdate(
    memberId,
    { $set: { balance: closingBalance } },
    { session }
  );

  return t;
};

module.exports = {
  createReturnFine,
  getTransactions,
  getTransaction,
  addTransaction,
};
