const nodemailer = require("nodemailer");

const config = {
  service: "gmail",
  auth: {
    user: "librarysbssu@gmail.com",
    pass: process.env.NODEMAILER_PASSWORD,
  },
};
//sandhugameswithJoy vszebtreekxlwsxu

const transporter = nodemailer.createTransport(config);

module.exports = { transporter };
