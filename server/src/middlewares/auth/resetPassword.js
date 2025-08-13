import prisma from "../../services/prisma.js";
import speakeasy from "speakeasy";
import { hashPassword } from "../../utils/bycrypt.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";
import crypto from "crypto";

/**
 * A single middleware to handle the final step of the password reset process.
 * It verifies the reset code and 2FA token, then updates the user's password.
 */
export const handleResetPassword = async (req, res) => {
  try {
    const { code, password, totp } = req.body;

    // 1. Find the user by the unique reset code.
    const user = await prisma.auth.findFirst({
      where: { resetCode: code },
    });

    // 2. If no user is found, or if the code has expired, the link is invalid.
    if (!user) {
      return res.status(400).json(crs.AUTH_400_INVALID_RESET_LINK());
    }
    // (You can add the 15-minute expiry check here as well if needed)

    // 3. Verify the 2FA token against the user's secret.
    const isTotpValid = speakeasy.totp.verify({
      secret: user.twoFaSecret,
      encoding: "base32",
      token: totp,
      window: 1,
    });

    if (!isTotpValid) {
      return res.status(401).json(crs.AUTH_401_INVALID_CREDENTIALS());
    }

    // 4. Hash the new password.
    const hashedPassword = await hashPassword(password);

    // 5. Update the user's record with the new password and invalidate the reset code.
    await prisma.auth.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        // Invalidate the code so it cannot be used again.
        resetCode: crypto.randomUUID(),
      },
    });

    // 6. Send the final success response.
    return res.status(200).json(crs.AUTH_200_PASSWORD_RESET_SUCCESS());
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL());
  }
};
