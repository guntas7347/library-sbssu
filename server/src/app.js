const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rfs = require("rotating-file-stream");

const { router } = require("./router/router");

const app = express();

///
// const readXlsxFile = require("read-excel-file/node");
// const schema = {
//   "Roll No.": { prop: "rollNumber" },
//   "MST-1 Roll No.": { prop: "mst1RollNo" },
//   Name: { prop: "name" },
// };

// readXlsxFile("./src/list.xlsx", { schema }).then(({ rows, errors }) => {
//   console.log(rows);
// });
///

const stream = rfs.createStream("morgan.log", {
  size: "10M", // rotate every 10 MegaBytes written
  interval: "30d", // rotate daily
  compress: "gzip", // compress rotated files
});

app.use(cookieParser());

app.use(morgan("combined", { stream }));
app.use(morgan("combined"));

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());

app.use("/api", router);

module.exports = { app };
