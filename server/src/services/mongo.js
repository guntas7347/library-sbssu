const mongoose = require("mongoose");

mongoose.connection.once("open", () => {
  console.log("Mongo is running...");
});

mongoose.connection.on("error", (error) => {
  console.log(error);
});

const mongoConnect = async () => {
  await mongoose.connect("mongodb://0.0.0.0:27017/LIBRARY-SBSSU");
};

module.exports = { mongoConnect };
