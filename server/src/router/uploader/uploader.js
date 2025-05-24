const express = require("express");
const multer = require("multer");
const crs = require("../../utils/custom-response-codes");
const { createLog, uuidGenerator } = require("../../utils/functions");

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/profile/",
  filename: function (req, file, cb) {
    cb(null, uuidGenerator() + ".jpg");
  },
});

const upload = multer({ storage });

module.exports = { uploadRouter };

uploadRouter.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    const path = "/profile/" + req.file.filename;
    return res.status(201).json(crs.ULD201IMG(path));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR500REST(error));
  }
});

uploadRouter.post("/delete-image");
