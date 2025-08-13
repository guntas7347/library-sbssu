import prisma from "../../services/prisma.js";
import speakeasy from "speakeasy";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

/**
 * A single middleware to handle the "Verify Reset Link" process.
 * It validates the code, checks for expiry, and generates a new 2FA secret.
 */
export const handleVerifyResetLink = async (req, res) => {
  try {
    const { code } = req.body;

    // 1. Find the user by the unique reset code.
    const user = await prisma.auth.findFirst({
      where: { resetCode: code },
    });

    // 2. If no user is found, the link is invalid.
    if (!user) {
      return res.status(400).json(crs.AUTH_400_INVALID_RESET_LINK());
    }

    // 3. Check if the reset code has expired (e.g., after 15 minutes).
    const resetCodeTime = new Date(user.resetCodeTime);
    const timeDifferenceMinutes =
      (Date.now() - resetCodeTime.getTime()) / 1000 / 60;

    if (timeDifferenceMinutes > 15) {
      return res.status(400).json(crs.AUTH_400_INVALID_RESET_LINK());
    }

    // 4. Generate a new 2FA secret for the user.
    const secret = speakeasy.generateSecret({
      name: `Library SBSSU: ${user.username}`,
    });

    // 5. Update the user's record with the new 2FA secret.
    const token = await prisma.auth.update({
      where: { id: user.id },
      data: { twoFaSecret: secret.base32 },
      select: { resetCodeTime: true },
    });

    // 6. Return the necessary 2FA details for the frontend to display.
    const twoFaDetails = {
      base32: secret.base32,
      otpauth_url: secret.otpauth_url,
      resetCodeTime: token.resetCodeTime,
    };

    return res.status(200).json(crs.AUTH_200_LINK_VERIFIED(twoFaDetails));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL());
  }
};
