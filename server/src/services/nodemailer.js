const nodemailer = require("nodemailer");

const config = {
  service: "gmail",
  auth: { user: "sandhugameswithjoy@gmail.com", pass: "vszebtreekxlwsxu" },
};
const transporter = nodemailer.createTransport(config);

module.exports = { transporter };
