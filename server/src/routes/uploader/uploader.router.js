import { Router } from "express";
import multer, { diskStorage } from "multer";
import { UPLOADS_PATH } from "../../config/configs.js";
import crs from "../../utils/crs/crs.js";
import { createLog } from "../../utils/log.js";

const uploadRouter = Router();

const storage = diskStorage({
  destination: UPLOADS_PATH + "/profile",
  filename: function (req, file, cb) {
    cb(null, crypto.randomUUID() + ".jpg");
  },
});

const upload = multer({ storage });

uploadRouter.post("/image", upload.single("image"), async (req, res) => {
  try {
    const path = "/profile/" + req.file.filename;
    return res.status(201).json(crs.UPLOADER_200_IMAGE_UPLOADED(path));
  } catch (error) {
    createLog(error);
    return res.status(500).json(crs.SERR_500_INTERNAL(error));
  }
});

export default uploadRouter;
