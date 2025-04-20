const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const crs = require("../../utils/custom-response-codes");

const uploadCloudinaryImage = async (req, res) => {
  try {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: "images",
      },
      (err, result) => {
        if (err) return res.status(500).json(crs.SERR500REST(err));
        return res.status(500).json(crs.ULD201IMG({ imageUrl: result.url }));
      }
    );
    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  } catch (err) {
    createLog(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

const destroyImage = async (imageUrl) => {
  try {
    const extractPublicId = (url) => {
      const urlArray = url.split("/");
      const publicIdWithExtention = urlArray[urlArray.length - 1];
      return "images/" + publicIdWithExtention.split(".")[0];
    };

    const publicId = extractPublicId(imageUrl);
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    createLog(err);
  }
};

const deleteCloudinaryImage = async (req, res, next) => {
  try {
    const extractPublicId = (url) => {
      const urlArray = url.split("/");
      const publicIdWithExtention = urlArray[urlArray.length - 1];
      return "images/" + publicIdWithExtention.split(".")[0];
    };

    const publicId = extractPublicId(req.body.imageUrl);

    const result = await cloudinary.uploader.destroy(publicId);

    if (!req.cust) req.cust = {};
    req.cust.result = result;

    return next();
  } catch (err) {
    createLog(err);
    return res.status(500).json(crs.SERR500REST(err));
  }
};

module.exports = { uploadCloudinaryImage, deleteCloudinaryImage, destroyImage };
