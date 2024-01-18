const express = require("express");
const { emailSignOnRouter } = require("./email-sign-on/email-sign-on.router");
const {
  changePassword,
  findUserById,
  findUser,
} = require("../../models/auth/auth.controllers");
const { verifyJwt } = require("./passport/jwt");
const { checkPassword } = require("../../models/auth/functions");
const {
  applicantsAuthRouter,
} = require("./applicants/applicants.email-sign-on.auth.router");
const { studentRouter } = require("./students/students-router.auth.router");
const { adminRouter } = require("./admin/admin-router.auth.router");

const authRouter = express.Router();

authRouter.use("/email-sign-on", emailSignOnRouter);

authRouter.use("/applicants", applicantsAuthRouter);
authRouter.use("/admin", adminRouter);
authRouter.use("/students", studentRouter);

authRouter.post("/forgot-password", async (req, res) => {
  try {
    const user = await findUser(req.body.email);

    if (user === null) {
      return res
        .status(400)
        .json({ status: "User does not exists", payload: null });
    }

    await changePassword(user._doc._id, req.body.password);

    return res.status(200).json({ status: "Password Changed", payload: null });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "Change Password Failed", payload: error });
  }
});

// const verifyJwtMiddleware = (req, res, next) => {
//   try {
//     const jwt = verifyJwt(req.cookies.session);
//     if (jwt === null) {
//       res.cookie("session", null, { expires: new Date(0) });
//       return res
//         .status(401)
//         .json({ status: "Authenticaltion Failed", payload: null });
//     } else {
//       req.user = jwt;

//       next();
//     }
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(401)
//       .json({ status: "Authenticaltion Failed", payload: null });
//   }
// };
// authRouter.use(verifyJwtMiddleware);

// authRouter.post("/change-password", async (req, res) => {
//   try {
//     const { currentPassword, newPassword, confirmNewPassword } = req.body;

//     if (newPassword !== confirmNewPassword) {
//       return res.status(400).json({
//         status: "New Password and Confirm New Password are not same",
//         payload: null,
//       });
//     }

//     const user = await findUserById(req.user.id);
//     if (user === null) {
//       return res
//         .status(400)
//         .json({ status: "User does not exists", payload: null });
//     }
//     const verifyPassword = await checkPassword(currentPassword, user.password);
//     if (!verifyPassword) {
//       return res
//         .status(400)
//         .json({ status: "Invalid Current Password", payload: null });
//     }

//     await changePassword(req.user.id, req.body.newPassword);

//     return res.status(200).json({ status: "Password Changed", payload: null });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ status: "Change Password Failed", payload: error });
//   }
// });

module.exports = { authRouter };
