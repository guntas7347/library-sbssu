import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

export const handleSignOut = async (req, res) => {
  try {
    // Call the service to deactivate all session fingerprints in the database.
    await prisma.sessionFingerprint.updateMany({
      where: { authId: req.user.uid, isActive: true },
      data: { isActive: false },
    });
    // Clear the session cookie on the client-side.
    res.cookie("session", null, { expires: new Date(0), httpOnly: true });

    return res.status(200).json(crs.AUTH_200_SIGNOUT_SUCCESS());
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL());
  }
};
