import crs from "../utils/crs.js";
import { comparePassword } from "../utils/bycrypt.js";
import { createLog } from "../utils/functions.js";
import prisma from "../services/prisma.js";
import { createJWT, verifyJwt } from "../utils/jwt.js";
import { decrptText, encryptText } from "../utils/encrypt.crypto.js";

const TOKEN_EXPIRY_MINUTES = 60;

export const verifyPassword = async (req, res, next) => {
  try {
    const { password, hash } = req.cust;
    const result = await comparePassword(password, hash);
    if (!result) return res.status(401).json(crs.AUTH401VPASS());
    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

export const setJwtCookie = async (req, res, next) => {
  try {
    const { _id } = req.cust;
    const jwtCredentials = { uid: _id };
    const jwt = createJWT(jwtCredentials);
    const cookieOptions = {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * TOKEN_EXPIRY_MINUTES),
      path: "/",
    };

    const jwtCookie = encryptText(jwt);

    res.cookie("session", jwtCookie, cookieOptions);
    req.cust = { ...req.cust, jwtCookie };
    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

export const authorisationLevel = (rights = ["open"]) => {
  return function (req, res, next) {
    try {
      if (!Array.isArray(rights)) rights = [rights];
      if (
        req.user.rights.some((right) => rights.includes(right)) ||
        req.user.rights.includes("admin") ||
        rights[0] === "open"
      )
        next();
      else return res.status(403).json(crs.ADM403JWT());
    } catch (error) {
      createLog(error);
      return res.status(500).json(crs.ERR500JWT(error));
    }
  };
};

export const createFingerprint = async (req, res, next) => {
  try {
    const fingerprintHash = req.body.fingerprint;
    if (!fingerprintHash) throw Error("fingerprintHash is required");

    const authId = req.cust._id;

    await prisma.sessionFingerprint.updateMany({
      where: { authId, fingerprintHash: { not: fingerprintHash } },
      data: { isActive: false },
    });
    const existing = await prisma.sessionFingerprint.findFirst({
      where: { authId, fingerprintHash },
    });

    if (!existing)
      await prisma.sessionFingerprint.create({
        data: { authId, fingerprintHash, isActive: true },
      });
    else
      await prisma.sessionFingerprint.update({
        where: { id: existing.id },
        data: { lastUsedAt: new Date(), isActive: true },
      });
    return next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

export const verifyFingerprint = async (req, res, next) => {
  try {
    const fingerprintHash = req.headers["x-fingerprint"];

    if (!fingerprintHash) return res.status(401).json(crs.AUTH401FP());

    const record = await prisma.sessionFingerprint.findFirst({
      where: { authId: req.user.uid, fingerprintHash, isActive: true },
    });
    if (!record) return res.status(401).json(crs.AUTH401FP());

    return next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
};

export const verifyJwtMiddleware = (req, res, next) => {
  try {
    const jwt = req.cookies.session
      ? verifyJwt(decrptText(req.cookies.session))
      : null;

    if (!jwt) {
      res.cookie("session", null, {
        expires: new Date(0),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      return res.status(401).json(crs.AUTH401JWT());
    }
    req.user = jwt;
    next();
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.ERR500JWT(error));
  }
};

export const verifyStaff = async (req, res, next) => {
  try {
    const auth = await prisma.auth.findUnique({
      where: { id: req.user.uid },
      select: {
        role: true,
        rights: true,
      },
    });

    if (!auth?.role) return res.status(401).json(crs.ADM401JWT());

    req.user.role = auth.role;
    req.user.rights = auth.rights ?? [];

    if (auth.role === "STAFF") return next();
    else return res.status(401).json(crs.ADM401JWT());
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.ERR500JWT(error));
  }
};
