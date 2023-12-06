const bookAccountsMongo = require("./book-accounts.schema");

const addBookAccount = async (bookAccountDetails) => {
  return await bookAccountsMongo.create(bookAccountDetails);
};

const fetchBookAccountByAccountNumber = async (
  accountNumber,
  populate = false
) => {
  const query = bookAccountsMongo.findOne({ accountNumber: accountNumber });

  if (populate) query.populate("bookId");

  return await query.exec();
};

const getBookAccountIdFromBookAccountNumber = async (accountNumber) => {
  return await bookAccountsMongo
    .findOne({ accountNumber: accountNumber })
    .select("_id");
};

const updateBookAccountStatus = async (bookAccountId, status) => {
  return await bookAccountsMongo.updateOne({ _id: bookAccountId }, { status });
};

const getBookIdFromAccountNumber = async (accountNumber) => {
  return await bookAccountsMongo
    .findOne({ accountNumber: accountNumber })
    .select("bookId -_id");
};

module.exports = {
  addBookAccount,
  fetchBookAccountByAccountNumber,
  updateBookAccountStatus,
  getBookAccountIdFromBookAccountNumber,
  getBookIdFromAccountNumber,
};
