import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

/**
 * Handles clearing the session cookie without touching the database.
 * This is useful for a client-side "force logout".
 */
export const handleClearSession = (req, res) => {
  try {
    res.cookie("session", null, { expires: new Date(0), httpOnly: true });
    return res.status(200).json(crs.AUTH_200_SESSION_CLEARED());
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL());
  }
};
