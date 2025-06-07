import nodemailer from "nodemailer";

const config = {
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

export const sendMail = async (to: string, subject: string, html: string) => {
  try {
    await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to,
      subject,
      html,
    });
  } catch (error) {
    throw error;
  }
};
