const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

async function generateAndSavePDF(applicationData, gh) {
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
        <!-- Add more application details here -->
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

  // Save PDF file to uploads folder
  const filePath = path.join(
    __dirname,
    "..",
    "uploads",
    `applications/${gh}.pdf`
  );
  await fs.promises.writeFile(filePath, pdfBuffer);

  return filePath;
}
