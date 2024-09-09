require("dotenv").config();

const express = require("express");
const multer = require("multer");
const crs = require("../utils/custom-response-codes");

const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

const uploadRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

uploadRouter.post("/image", upload.single("file"), async (req, res) => {
  try {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: "images",
      },
      (err, result) => {
        if (err) return res.status(500).json(crs.SERR500REST(err));
        console.log(result);
        return res.status(500).json(crs.ULD201IMG({ imgUrl: result.url }));
      }
    );
    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
});

uploadRouter.post("/delete-image", async (req, res) => {
  try {
    const extractPublicId = (url) => {
      const urlArray = url.split("/");

      const publicIdWithExtention = urlArray[urlArray.length - 1];
      return "images/" + publicIdWithExtention.split(".")[0];
    };

    const publicId = extractPublicId(req.body.imgUrl);

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === "ok") return res.status(500).json(crs.ULD200DELIMG());

    return res.status(500).json(crs.SERR500REST());
  } catch (err) {
    console.log(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
});

module.exports = { uploadRouter };
