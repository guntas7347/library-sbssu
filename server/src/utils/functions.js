const fs = require("fs");
var xl = require("excel4node");
const { v4: uuidv4 } = require("uuid");
const { fetchSettings } = require("../models/setting/setting.controller");
const { default: puppeteer } = require("puppeteer");
const path = require("path");

// const { books1 } = require("../../books1");

const checkDateGap = (initialDate, finalDate) => {
  const startingDate = new Date(
    new Date(initialDate).toISOString().split("T")[0]
  );
  const endingDate = new Date(new Date(finalDate).toISOString().split("T")[0]);
  const timeGap = endingDate.getTime() - startingDate.getTime();
  const dayGap = timeGap / (1000 * 60 * 60 * 24);
  return dayGap;
};

const formatString = (inputString) => {
  try {
    const trimmedString = inputString.trim();

    const singleSpaceString = trimmedString.replace(/\s+/g, " ");

    const formattedString = singleSpaceString
      .toLowerCase()
      .replace(/\b\w/g, (match) => match.toUpperCase());

    return formattedString;
  } catch (error) {
    return inputString;
  }
};

const createDateGap = (initialDate = new Date(), gap = 0) => {
  return new Date(new Date(initialDate).getTime() + 1000 * 60 * 60 * 24 * gap);
};

const formatObjectValues = (object = {}, keysToIgnore = []) => {
  const newObject = {};
  const objectKeysArray = Object.keys(object);
  const objectValuesArray = Object.values(object);

  const formatedArray = objectValuesArray.map((value) => {
    let flag = false;
    for (let i = 0; i < objectKeysArray.length; i++) {
      if (object[keysToIgnore[i]] === value) {
        flag = true;
        break;
      }
    }
    if (flag) {
      return value;
    } else {
      return formatString(value);
    }
  });

  for (var i = 0; i < objectKeysArray.length; i++) {
    Object.assign(newObject, { [objectKeysArray[i]]: formatedArray[i] });
  }

  return newObject;
};

const formatDate = (date = new Date()) => {
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  return `${yyyy}-${mm}-${dd}`;
};

const createCurrentMonthDateRange = (date = new Date()) => {
  const yyyy = date.getFullYear();
  const mm = date.getMonth();
  const startingDate = formatDate(new Date(yyyy, mm, 1));
  const endingDate = formatDate(new Date(yyyy, mm + 1, 0));
  return { startingDate, endingDate };
};

const createDateRange = (date) => {
  const isValidDateFormat = (date) => /^\d{16}$/.test(date);
  if (!isValidDateFormat(date))
    return {
      startingDate: formatDate(new Date()),
      endingDate: formatDate(new Date()),
    };

  const startingDateYear = date.substring(0, 4);
  const startingDateMonth = date.substring(4, 6);
  const startingDateDay = date.substring(6, 8);
  const EndingDateYear = date.substring(8, 12);
  const EndingDateMonth = date.substring(12, 14);
  const EndingDateDay = date.substring(14, 16);

  const startingDate = formatDate(
    new Date(startingDateYear, Number(startingDateMonth) - 1, startingDateDay)
  );

  const endingDate = formatDate(
    new Date(EndingDateYear, Number(EndingDateMonth) - 1, EndingDateDay)
  );

  return { startingDate, endingDate };
};

const sortObjectUsingKeys = (object = {}, keysArray = []) => {
  const sortedOject = {};

  for (var i = 0; i < keysArray.length; i++) {
    sortedOject[keysArray[i]] = object[keysArray[i]]
      ? object[keysArray[i]]
      : "NULL";
  }

  return sortedOject;
};

const createExcel = (jsonData = [{}], keys = [[]], excelOptions = {}) => {
  const keysName = keys.map((element) => (element[0] ? element[0] : "NULL"));
  const keysValue = keys.map((element) =>
    element[1] ? element[1] : element[0] ? element[0] : "NUll"
  );

  const keyValueLength = (index = 0) => {
    const length = keysValue[index].length;
    if (length < 8.43) return 8.43;
    return length + 2;
  };

  const keysWidth = keys.map((element, index) =>
    element[2] ? element[2] : keyValueLength(index)
  );

  if (!excelOptions.sheetName || !(typeof excelOptions.sheetName === "string"))
    excelOptions.sheetName = "Sheet 1";

  const { sheetName } = excelOptions;
  const wb = new xl.Workbook();
  const ws = wb.addWorksheet(sheetName);

  keysValue.forEach((title, index) => {
    ws.cell(1, index + 1)
      .string(title.toString())
      .style({ font: { bold: true } });
  });

  jsonData.forEach((object, index) => {
    const sortedObject = sortObjectUsingKeys(object, keysName);
    Object.keys(sortedObject).forEach((key, columnIndex) => {
      const cellRef = ws.cell(index + 2, columnIndex + 1);
      if (typeof sortedObject[key] === "number") {
        cellRef
          .number(sortedObject[key])
          .style({ alignment: { horizontal: "left" } });
      } else {
        cellRef.string(sortedObject[key].toString()).style({});
      }
    });
  });

  keysWidth.forEach((width, index) => {
    ws.column(index + 1).setWidth(width);
  });

  return wb;
};

const dateTimeString = (date = new Date()) => {
  date = new Date(date);
  const yyyy = date.getFullYear().toString();
  const mm = (date.getMonth() + 1).toString();
  const dd = date.getDate().toString();
  const hh = date.getHours().toString();
  const mn = date.getMinutes().toString();
  const ss = date.getSeconds().toString();
  return yyyy + mm + dd + hh + mn + ss;
};

const generateRandomNumber = (length = 6, exclusionArray = []) => {
  const endRange = Math.pow(10, length) - 1;
  const startRange = Math.pow(10, length - 1);
  let rmn = 0;
  const condition = () => {
    if (rmn.toString().length != length) return true;
    if (exclusionArray.includes(rmn)) return true;
    else return false;
  };
  do {
    rmn = Math.floor(startRange + Math.random() * endRange);
  } while (condition());

  return rmn;
};

const uuidGenerator = (length = 1) => {
  let uuid = "";
  for (let index = 0; index < length; index++) {
    uuid = uuid + uuidv4();
  }
  return uuid.replace(/-/g, "");
};

const cardNumberGenerator = (
  membershipId,
  numberOfCards = 2,
  startingNumber = 0
) => {
  const cardNumberArray = [];
  for (
    let index = Number(startingNumber);
    index < Number(numberOfCards) + Number(startingNumber);
    index++
  ) {
    let numberToAdd = index + 1;
    if (numberToAdd < 10) numberToAdd = "0" + numberToAdd.toString();
    else numberToAdd = numberToAdd.toString();

    const cardNumber = membershipId.toString() + numberToAdd;

    cardNumberArray.push(cardNumber);
  }

  return cardNumberArray;
};

const getLibraryCardLimit = async (
  role = "STUDENT UG",
  memberCategory = "GENERAL"
) => {
  try {
    const { value: AALCL } = await fetchSettings("AALCL");
    const keyMap = {
      "STUDENT UG": {
        GENERAL: "ug_gen",
        "SC/ST": "ug_scst",
        OTHER: "ug_other",
      },
      "STUDENT PG": {
        GENERAL: "pg_gen",
        "SC/ST": "pg_scst",
        OTHER: "pg_other",
      },
      "TEACHER REGULAR": "teacher_regular",
      "TEACHER ADHOC": "teacher_adhoc",
      "NON TEACHING STAFF": "non_teaching_staff",
    };

    const key =
      role === "STUDENT UG" || role === "STUDENT PG"
        ? keyMap[role]?.[memberCategory]
        : keyMap[role];

    return AALCL[key] ?? 0;
  } catch (error) {
    console.error("Error fetching library cards auto allotment limit:", error);
    return 0;
  }
};

const getFinePerDay = async (
  role = "STUDENT UG",
  memberCategory = "GENERAL"
) => {
  try {
    const { value: finePerDayRates } = await fetchSettings(
      "LATE-FEE-FINE-PER-DAY"
    );

    const keyMap = {
      "STUDENT UG": {
        GENERAL: "ug_gen",
        "SC/ST": "ug_scst",
        OTHER: "ug_other",
      },
      "STUDENT PG": {
        GENERAL: "pg_gen",
        "SC/ST": "pg_scst",
        OTHER: "pg_other",
      },
      "TEACHER REGULAR": "teacher_regular",
      "TEACHER ADHOC": "teacher_adhoc",
      "NON TEACHING STAFF": "non_teaching_staff",
    };

    if (role === "STUDENT UG" || role === "STUDENT PG") {
      const key = keyMap[role]?.[memberCategory];
      return finePerDayRates[key] ?? 0;
    }

    const key = keyMap[role];
    return finePerDayRates[key] ?? 0;
  } catch (error) {
    console.error("Error fetching fine per day:", error);
    return 0;
  }
};

const isIssueAllowed = async (
  role = "STUDENT UG",
  memberCategory = "GENERAL"
) => {
  try {
    const { value: issuePermission } = await fetchSettings("ISSUE-PERMISSION");

    const keyMap = {
      "STUDENT UG": {
        GENERAL: "ug_gen",
        "SC/ST": "ug_scst",
        OTHER: "ug_other",
      },
      "STUDENT PG": {
        GENERAL: "pg_gen",
        "SC/ST": "pg_scst",
        OTHER: "pg_other",
      },
      "TEACHER REGULAR": "teacher_regular",
      "TEACHER ADHOC": "teacher_adhoc",
      "NON TEACHING STAFF": "non_teaching_staff",
    };

    const key =
      role === "STUDENT UG" || role === "STUDENT PG"
        ? keyMap[role]?.[memberCategory]
        : keyMap[role];

    return issuePermission[key] === true;
  } catch (error) {
    console.error("Error fetching issue permission:", error);
    return false;
  }
};

const generateMembershipId = (previousId = 200000) => {
  const previousIdYear = Number(previousId.toString().substring(0, 2));
  const currentYear = Number(
    new Date().getFullYear().toString().substring(2, 4)
  );
  if (currentYear > previousIdYear) return currentYear * 10000 + 1;
  else return previousId + 1;
};

const createLog = (e) => {
  console.log(e);
};

function handleMongoError(error) {
  if (error.code === 11000) {
    // Get the field name from the error message using regex
    const fieldMatch = error.message.match(/index:\s+([^\s]+)_\d+\s/);
    const valueMatch = error.message.match(/dup key:\s+\{ :\s+"(.+?)" \}/);

    const field = fieldMatch ? fieldMatch[1] : "field";
    const value = valueMatch ? valueMatch[1] : "value";

    return `${
      field.charAt(0).toUpperCase() + field.slice(1)
    } "${value}" already exists. Please use a different ${field}.`;
  }
  // Return generic error if not 11000
  return "Something went wrong. Please try again.";
}

const addLibraryCardsValueToObject = (obj) => {
  const array = [];
  for (let i = 0; i < obj.libraryCards.length; i++) {
    array.push({
      fullName: obj.fullName,
      membershipId: obj.membershipId,
      cardNumber: obj.libraryCards[i].cardNumber,
      cardStatus: obj.libraryCards[i].status,
      category: obj.libraryCards[i].category,
    });
  }

  return array;
};

async function generateAndSavePDF(applicationData, gh, req) {
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    applicationData.imageUrl
  }`;

  const htmlContent = generateLibraryFormHTML(applicationData, imageUrl);

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
    "..",
    "uploads",
    `application/${gh}.pdf`
  );
  await fs.promises.writeFile(filePath, pdfBuffer);

  return `application/${gh}.pdf`;
}

function generateLibraryFormHTML(data, imagePath) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    @page { size: A4; margin: 20mm; }
    body {
      font-family: Arial, sans-serif;
      background: white;
      color: black;
      margin: 0;
      padding: 0;
      width: 210mm;
      height: 297mm;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
    }
    .container {
      padding: 40px 40px;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .header img {
      height: 40px;
    }
    .header h1 {
      color: #4c51bf; /* indigo-900 */
      font-weight: bold;
      font-size: 24px;
      margin: 0;
    }
    hr {
      border: 1px solid black;
      margin: 12px 0 24px 0;
    }
    .title {
      font-size: 36px;
      font-weight: bold;
      margin-top: 20px;
      text-align: center;
    }
    .print-date {
      margin-top: 20px;
      text-align: right;
      font-weight: 600;
    }
    .content-flex {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      gap: 20px;
    }
    .table-wrapper {
      flex-grow: 1;
    }.rules {
  page-break-before: always;
  page-break-inside: avoid;
}

table, .signature-section {
  page-break-inside: avoid;
}

    table {
      border-collapse: collapse;
      width: 100%;
    }
    td {
      border: 1px solid black;
      padding: 8px 12px;
      text-align: left;
      width: 50%;
    }
    .image-wrapper {
      width: 33%;
      border: 1px solid black;
      overflow: hidden;
    }
    .image-wrapper img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .signature-section {
      display: flex;
      justify-content: space-between;
      margin-top: 120px;
      font-weight: bold;
    }
    .signature-box {
      width: 180px;
      text-align: center;
    }
    .signature-box hr {
      border: 1px solid black;
      margin-bottom: 8px;
    }
    .rules {
      margin-top: 80px;
      font-weight: normal;
      font-size: 14px;
      text-align: left;
    }
    .rules h2 {
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 10px;
    }
    .rules p {
      margin: 6px 0;
    }
    .rules span {
      font-weight: bold;
    }
    .footer {
      margin-top: auto;
      border-top: 1px solid black;
      padding: 20px 0 0 0;
      font-weight: bold;
      text-align: center;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://your-domain.com/sbssu-logo.png" alt="sbssu logo" />
      <h1>SBSSU Central Library</h1>
    </div>
    <hr />
    <div class="title">Library Form</div>
    <div class="print-date">Print Date: ${new Date().toLocaleDateString()}</div>

    <div class="content-flex">
      <div class="table-wrapper">
        <table>
          <tbody>
            <tr><td>Application ID</td><td>${data.applicationId}</td></tr>
            <tr><td>User Type</td><td>${data.role}</td></tr>
            <tr><td>Roll Number</td><td>${data.rollNumber}</td></tr>
            <tr><td>Name</td><td>${data.fullName}</td></tr>
            <tr><td>Father's Name</td><td>${data.fatherName}</td></tr>
            <tr><td>Gender</td><td>${data.gender}</td></tr>
            <tr><td>Date Of Birth</td><td>${new Date(
              data.dob
            ).toDateString()}</td></tr>
            <tr><td>${
              data.role === "STUDENT UG" || data.role === "STUDENT PG"
                ? "Program"
                : "Designation"
            }</td><td>${data.program}</td></tr>
            <tr><td>Specialization</td><td>${data.specialization}</td></tr>
            <tr><td>Batch</td><td>${data.batch}</td></tr>
            <tr><td>Email</td><td>${data.email}</td></tr>
            <tr><td>Phone Number</td><td>${data.phoneNumber}</td></tr>
            <tr><td>Application Date</td><td>${new Date(
              data.createdAt
            ).toDateString()}</td></tr>
          </tbody>
        </table>
      </div>
      <div class="image-wrapper">
        <img src="${imagePath}" alt="Applicant Image" crossorigin="anonymous" />
      </div>
    </div>

    <div class="signature-section">
      <div class="signature-box">
        <hr />
        <p>${data.fullName}</p>
      </div>
      <div class="signature-box">
        <hr />
        <p>HOD</p>
      </div>
    </div>

    <div class="rules">
      <h2>Library Rules:-</h2>
      <p><span>1.</span> Books are issued for 14 days.</p>
      <p><span>2.</span> A fine of ₹1 per day is charged for late returns.</p>
      <p><span>3.</span> Each student can have up to two library cards, with one book issued per card.</p>
      <p><span>4.</span> Borrowers must replace any damaged or lost books.</p>
      <p><span>5.</span> Books can be renewed once, provided there are no reservations.</p>
      <p><span>6.</span> Library cards are for the exclusive use of the student to whom they are issued.</p>
      <p><span>7.</span> Please maintain silence and respectful behavior in the library.</p>
      <p><span>8.</span> Report lost library cards immediately; a fee may be charged for a replacement.</p>
    </div>

    <div class="footer">
      SHAHEED BHAGAT SINGH STATE UNIVERSITY CENTRAL LIBRARY
    </div>
  </div>
</body>
</html>
  `;
}

module.exports = {
  checkDateGap,
  createDateGap,
  formatString,
  formatObjectValues,
  createCurrentMonthDateRange,
  createDateRange,
  createExcel,
  dateTimeString,
  generateRandomNumber,
  uuidGenerator,
  cardNumberGenerator,
  generateMembershipId,
  getLibraryCardLimit,
  getFinePerDay,
  createLog,
  isIssueAllowed,
  handleMongoError,
  addLibraryCardsValueToObject,
  generateAndSavePDF,
};
