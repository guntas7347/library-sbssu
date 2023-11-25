const issueBookMongo = require("./issue-book.mongo");

const issueBook = async (issueBookDetails) => {
  return await issueBookMongo.create(issueBookDetails);
};

module.exports = { issueBook };
