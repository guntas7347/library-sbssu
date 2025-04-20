const mongoose = require("mongoose");
const { createLog } = require("../utils/functions");

mongoose.connection.once("open", () => {
  console.log("MongoDB is running...");
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

// mongod --replSet rs0 --port 27017 --dbpath "D:\Programming\MongoDB Database\Library-SBSSU\db-replica\rs1"
// mongod --replSet rs0 --port 27018 --dbpath "D:\Programming\MongoDB Database\Library-SBSSU\db-replica\rs2"
// mongod --replSet rs0 --port 27019 --dbpath "D:\Programming\MongoDB Database\Library-SBSSU\db-replica\rs3"

// "mongodb://127.0.0.1:27017,127.0.0.1:27018,127.0.0.1:27019/LIBRARY_SBSSU?replicaSet=rs0";

const mongoURI = process.env.MONGO_URL;

const mongoConnect = async () => {
  try {
    await mongoose.connect(mongoURI);
  } catch (error) {
    console.log("Error connecting to MONGODB.");
    createLog(error);
    process.exit(1);
  }
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
