import speakeasy from "speakeasy";
import { fetchSettings } from "../../controllers/settings.controller.js";
import prisma from "../../services/prisma.js";
import { comparePassword } from "../../utils/bycrypt.js";
import crs from "../../utils/crs/crs.js";
import { encryptText } from "../../utils/encrypt.crypto.js";
import { createJWT } from "../../utils/jwt.js";
import { createLog } from "../../utils/log.js";

export const verifyUsernameForLogin = async (req, res, next) => {
  try {
    const authDoc = await prisma.auth.findUnique({
      where: { username: req.vBody.username.toLowerCase() },
      select: {
        id: true,
        password: true,
        role: true,
        twoFaSecret: true,
        userType: true,
        rights: true,
      },
    });

    if (!authDoc)
      return res.status(404).json(crs.AUTH_401_INVALID_CREDENTIALS());

    // const { value } = await fetchSettings("LOGIN-PERMISSION");
    // if (!value) throw Error("login permission settings fetch error");

    // let proceed = false;
    // if (
    //   (authDoc.role === "STAFF" &&
    //     (authDoc.rights.includes("admin") || value.staff)) ||
    //   (authDoc.role === "MEMBER" && value.members)
    // ) {
    //   proceed = true;
    // }
    // if (!proceed) return res.status(500).json(crs.AUTH_403_FORBIDDEN());

    req.context = {
      password: req.vBody.password,
      hash: authDoc.password,
      id: authDoc.id,
      role: authDoc.role,
      secret: authDoc.twoFaSecret,
      userType: authDoc.userType,
    };

    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};

export const verifyPassword = async (req, res, next) => {
  try {
    const { password, hash } = req.context;
    const result = await comparePassword(password, hash);
    if (!result)
      return res.status(401).json(crs.AUTH_401_INVALID_CREDENTIALS());

    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};

export const verify2FA = async (req, res, next) => {
  try {
    const verified = speakeasy.totp.verify({
      secret: req.context.secret,
      encoding: "base32",
      token: req.vBody.totp,
      window: 1,
    });

    if (!verified)
      return res.status(401).json(crs.AUTH_401_INVALID_CREDENTIALS());
    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};

export const setJwtCookie = async (req, res, next) => {
  const TOKEN_EXPIRY_MINUTES = 60;
  try {
    const { id } = req.context;
    const jwtCredentials = { uid: id };
    const jwt = createJWT(jwtCredentials);
    const cookieOptions = {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * TOKEN_EXPIRY_MINUTES),
      path: "/",
    };

    const jwtCookie = encryptText(jwt);

    res.cookie("session", jwtCookie, cookieOptions);
    req.context = { ...req.context, jwtCookie };
    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};

export const fetchAuthUserByUserName = async (req, res, next) => {
  try {
    const authAdminDoc = await prisma.auth.findUnique({
      where: { username: req.vBody.username },
    });

    if (!authAdminDoc)
      return res.status(409).json(crs.AUTH_401_INVALID_CREDENTIALS());

    req.context = { authAdminDoc };
    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};

export const createLink = async (req, res, next) => {
  try {
    const code = crypto.randomUUID();
    const link = `${req.vBody.url}${code}`;
    req.context = { ...req.context, code, link };
    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};

export const processLink = async (req, res, next) => {
  try {
    await prisma.auth.update({
      where: { id: req.context.authAdminDoc.id },
      data: {
        resetCode: req.context.code,
        resetCodeTime: new Date(),
      },
    });
    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};

export const verifyResetLink = async (req, res, next) => {
  try {
    const { code } = req.body;
    const authAdmin = await prisma.auth.findFirst({
      where: { resetCode: code },
    });
    if (!authAdmin)
      return res.status(404).json(crs.AUTH_400_INVALID_RESET_LINK());
    const resetCodeTime = new Date(authAdmin.resetCodeTime);
    const timePassed = (Date.now() - resetCodeTime.getTime()) / 1000 / 60;
    if (timePassed > 15)
      return res.status(404).json(crs.AUTH_400_INVALID_RESET_LINK());

    req.context = {
      ...authAdmin,
    };
    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};

export const create2FA = async (req, res, next) => {
  try {
    let name = "Library SBSSU";
    if (req.context?.username) name = `${name}: ${req.context.username}`;

    const { base32, otpauth_url } = speakeasy.generateSecret({
      name,
    });

    req.context.otpauth_url = otpauth_url;
    req.context.base32 = base32;

    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};

export const populate2FaSecret = async (req, res, next) => {
  try {
    const authDoc = await prisma.auth.findFirst({
      where: { resetCode: req.vBody.code },
      select: {
        twoFaSecret: true,
        id: true,
      },
    });

    req.context.secret = authDoc.twoFaSecret;
    req.context.authDocId = authDoc.id;
    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
};
