const express = require("express");
const puppeteer = require("puppeteer");
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

uploadRouter.get("/view-pdf/:gh", async (req, res) => {
  const gh = req.params.gh;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          @page { size: A4; margin: 20mm; }
          body { font-family: Arial, sans-serif; }
          .title { text-align: center; font-size: 24px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="title">Library Form</div>
        <p>Application ID: ${gh}</p>
        <!-- Add more content here -->
      </body>
    </html>
  `;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": "inline; filename=library-form.pdf",
    "Content-Length": pdfBuffer.length,
  });

  res.send(pdfBuffer);
});
