const express = require("express");
const multer = require("multer");
const crs = require("../../utils/custom-response-codes");
const {
  deleteCloudinaryImage,
  uploadCloudinaryImage,
} = require("./uploader.middlewares");

const uploadRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

uploadRouter.post("/image", upload.single("file"), uploadCloudinaryImage);

uploadRouter.post("/delete-image", deleteCloudinaryImage, async (req, res) => {
  try {
    if (req.cust.result.result === "ok")
      return res.status(500).json(crs.ULD200DELIMG());
    return res.status(500).json(crs.SERR500REST());
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
});

module.exports = { uploadRouter };
