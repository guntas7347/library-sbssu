const bookAccountsMongo = require("./book-accounts.mongo");

const addBookAccount = async (bookAccountDetails) => {
  return await bookAccountsMongo.create(bookAccountDetails);
};

const fetchBookAccountByAccountNumber = async (accountNumber) => {
  return await bookAccountsMongo.findOne({ accountNumber: accountNumber });
};

module.exports = { addBookAccount, fetchBookAccountByAccountNumber };
