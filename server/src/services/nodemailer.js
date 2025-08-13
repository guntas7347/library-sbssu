import { createTransport } from "nodemailer";
import { createLog } from "../utils/log.js"; // Assuming you have a logger

const config = {
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
};

const transporter = createTransport(config);

/**
 * Sends an email using the global transporter.
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} body - The HTML body of the email.
 * @returns {Promise<boolean>} True if successful, false otherwise.
 */
const sendMail = async (to, subject, body) => {
  try {
    await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to,
      subject,
      html: body,
    });
    console.log(`Email sent successfully to ${to}`);
    return true;
  } catch (error) {
    // Log the specific email error for better debugging
    createLog(error, `Failed to send email to ${to}`);
    return false;
  }
};

export default sendMail;
