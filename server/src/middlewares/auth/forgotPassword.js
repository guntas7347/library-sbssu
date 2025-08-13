import { emailService } from "../../services/emailService.js";
import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

/**
 * A single middleware to handle the entire "Forgot Password" process.
 * It finds the user, generates a reset link, updates the database,
 * and triggers the reset email.
 */
export const handleForgotPassword = async (req, res) => {
  try {
    const { username, url } = req.body;

    // 1. Find the user by their username.
    const user = await prisma.auth.findUnique({
      where: { username },
      select: { id: true, email: true, username: true },
    });

    // 2. IMPORTANT: If a user is found, proceed with generating and sending the link.
    // If no user is found, we do nothing but still send a success response.
    // This is a critical security measure to prevent username enumeration attacks.
    if (user) {
      // a. Generate a unique reset code and the full link.
      const resetCode = crypto.randomUUID();
      const resetLink = `${url}${resetCode}`;

      // b. Store the reset code and timestamp in the user's auth record.
      await prisma.auth.update({
        where: { id: user.id },
        data: {
          resetCode: resetCode,
          resetCodeTime: new Date(),
        },
      });

      // c. Send the password reset email.
      // This is done without `await` to avoid making the user wait for the email to send.
      emailService
        .sendPasswordResetEmail(user.email, user.username, resetLink)
        .catch((err) => {
          createLog(err);
        });
    }

    // 3. Always return a success response to the client.
    return res.status(200).json(crs.AUTH_200_PASSWORD_RESET_SENT());
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL());
  }
};
