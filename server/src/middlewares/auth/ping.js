import prisma from "../../services/prisma.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

export const handleUserPing = async (req, res) => {
  try {
    const { userType } = req.body;
    const authDoc = await prisma.auth.findUnique({
      where: { id: req.user.uid },
      select: {
        username: true,
        email: true,
        role: true,
        active: true,
        userType: true,
        staff: { select: { fullName: true, photo: true } },
        member: { select: { fullName: true, photo: true } },
      },
    });

    // Check for failure conditions: user doesn't exist, is not active, or type mismatch.
    if (!authDoc || !authDoc.active || userType !== authDoc.userType) {
      res.cookie("session", null, { expires: new Date(0) });
      return res.status(401).json(crs.AUTH_401_PING_UNAUTHORIZED());
    }

    // If all checks pass, format and send the success payload.
    const fullName =
      authDoc.member?.fullName ?? authDoc.staff?.fullName ?? null;
    const photo = authDoc.staff?.photo || authDoc.member?.photo || null;

    const userAuthPayload = {
      email: authDoc.email,
      role: authDoc.role,
      fullName: fullName,
      username: authDoc.username,
      photo: photo,
    };

    return res.status(200).json(crs.AUTH_200_PING_SUCCESS(userAuthPayload));
  } catch (error) {
    createLog(error);
    return res.status(401).json(crs.AUTH_401_PING_UNAUTHORIZED());
  }
};
