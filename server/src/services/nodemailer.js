const nodemailer = require("nodemailer");

const config = {
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
};
//sandhugameswithJoy vszebtreekxlwsxu

const transporter = nodemailer.createTransport(config);

module.exports = { transporter };
