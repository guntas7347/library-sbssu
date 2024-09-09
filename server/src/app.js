const express = require("express");
// const morgan = require("morgan");
// const cors = require("cors");
const cookieParser = require("cookie-parser");
// const rfs = require("rotating-file-stream");
const path = require("path");

const { router } = require("./router/router");
// const { booksBulkEntry } = require("./utils/dev-utils/bulk-json-db-entry");
// const {
//   createStaffManualDev,
// } = require("./router/admin/staff/staff.middlewares");

// const fileName = "Rec_BB_65001-65781-acm";

// const fileData = require(`./library-data-json/${fileName}.json`);

const app = express();

// const stream = rfs.createStream("morgan.log", {
//   size: "10M", // rotate every 10 MegaBytes written
//   interval: "30d", // rotate monthly
//   compress: "gzip", // compress rotated files
// });

// booksBulkEntry(fileData, fileName);

// createStaffManualDev({
//   fullName: "Tejpal Singh",
//   email: "tejpal@email.com",
//   password: "123456",
//   idNumber: "101",
//   level: 6,
// });

app.use(cookieParser());

// app.use(morgan("combined", { stream }));
// app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use("/api", router);

module.exports = { app };
