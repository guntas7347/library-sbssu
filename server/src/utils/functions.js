const fs = require("fs");
var xl = require("excel4node");
const { v4: uuidv4 } = require("uuid");

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

const cardNumberGenerator = (membershipId, numberOfCards = 2) => {
  const cardNumberArray = [];
  for (let index = 0; index < numberOfCards; index++) {
    let numberToAdd = index + 1;
    if (numberToAdd < 10) numberToAdd = "0" + numberToAdd.toString();
    else numberToAdd = numberToAdd.toString();

    const cardNumber = membershipId.toString() + numberToAdd;

    cardNumberArray.push(cardNumber);
  }

  return cardNumberArray;
};

const generateMembershipId = (previousId = 200000) => {
  const previousIdYear = Number(previousId.toString().substring(0, 2));
  const currentYear = Number(
    new Date().getFullYear().toString().substring(2, 4)
  );
  if (currentYear > previousIdYear) return currentYear * 10000 + 1;
  else return previousId + 1;
};

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
};
