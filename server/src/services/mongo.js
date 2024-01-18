const mongoose = require("mongoose");

mongoose.connection.once("open", () => {
  console.log("Mongo is running...");
});

mongoose.connection.on("error", (error) => {
  console.log(error);
});

// mongoose.set("debug", (collectionName, method, query, doc) => {
//   console.log(
//     `${new Date()} ${collectionName}.${method}`,
//     JSON.stringify(query),
//     doc
//   );
// });

const mongoConnect = async () => {
  await mongoose.connect("mongodb://0.0.0.0:27017/LIBRARY-SBSSU");
};

const startTransaction = async () => {
  const session = await mongoose.startSession();
  session.startTransaction({});
  return session;
};

const commitTransaction = async (session) => {
  await session.commitTransaction();
  session.endSession();
};

const abortTransaction = async (session) => {
  await session.abortTransaction();
  session.endSession();
};
module.exports = {
  mongoConnect,
  startTransaction,
  commitTransaction,
  abortTransaction,
};
