const fs = require("fs");
// const { books1 } = require("../../books1");

const checkDateGap = (initialDate, finalDate) => {
  const iy = initialDate.getFullYear();
  const im = initialDate.getMonth();
  const id = initialDate.getDate();

  const fy = finalDate.getFullYear();
  const fm = finalDate.getMonth();
  const fd = finalDate.getDate();
  console.log(iy, im, id, fy, fm, fd);
  const startingDate = new Date(formatDate(new Date(iy, im, id)));
  const endingDate = new Date(formatDate(new Date(fy, fm, fd)));
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

const mergeAccessionNumbers = async () => {
  var title = "";
  let AccessionNumber = [];
  let isNew = true;
  let result = [];
  let prevBook = {};
  books1.forEach((book) => {
    if (title === book.title) {
      AccessionNumber.push(book.accessionNumber);
      prevBook = book;
    } else {
      if (isNew) {
        prevBook = book;
        AccessionNumber.push(book.accessionNumber);
        title = book.title;
        isNew = false;
      } else {
        result.push({ ...prevBook, accessionNumber: AccessionNumber });
        AccessionNumber = [];
        AccessionNumber.push(book.accessionNumber);
        prevBook = book;
        isNew = true;
      }
    }
  });
  // fs.writeFileSync("books1-sorted.json", JSON.stringify(result, null, 2));
};

// mergeAccessionNumbers();

module.exports = {
  checkDateGap,
  createDateGap,
  formatString,
  formatObjectValues,
  createCurrentMonthDateRange,
};
