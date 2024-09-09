import queryString from "query-string";

export const sortObjectUsingKeys = (object, keysArray) => {
  const sortedOject = {};
  for (var i = 0; i < keysArray.length; i++) {
    sortedOject[keysArray[i]] = object[keysArray[i]];
  }
  return sortedOject;
};

export const renameObjectKeys = (object, keysArray) => {
  const newObject = {};
  const objectValuesArray = Object.values(object);

  for (var i = 0; i < keysArray.length; i++) {
    const newKey = keysArray[i];
    Object.assign(newObject, { [newKey]: objectValuesArray[i] });
  }

  return newObject;
};
export const formatObjectValues = (object, keysArray) => {
  const newObject = {};
  const objectKeysArray = Object.keys(object);
  const objectValuesArray = Object.values(object);

  const formatedArray = objectValuesArray.map((value) => {
    const trimmedString = value.trim();
    const singleSpaceString = trimmedString.replace(/\s+/g, " ");
    const formattedString = singleSpaceString.replace(/\b\w/g, (match) =>
      match.toUpperCase()
    );
    return formattedString;
  });

  for (var i = 0; i < keysArray.length; i++) {
    Object.assign(newObject, { [objectKeysArray[i]]: formatedArray[i] });
  }

  return newObject;
};

export const formatDate = (date = new Date()) => {
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  return `${yyyy}-${mm}-${dd}`;
};

const options = {
  timeZone: "Asia/Kolkata", // IST time zone
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

export const formatTime = (dateString) =>
  new Date(dateString).toLocaleString("en-US", options);

export const rowsArray = (array = [], keysArray = []) => {
  return array.map((obj) => {
    return Object.values(sortObjectUsingKeys(obj, keysArray));
  });
};

export const createURLQuery = (customParam, currentQueryString) => {
  const object = {};
  Object.keys(customParam).map((key) => {
    if (customParam[key] === "") return;
    object[key] = customParam[key];
  });

  return queryString.stringify({
    ...queryString.parse(currentQueryString),
    ...object,
  });
};

export const getCroppedImg = (image, crop) => {
  const canvas = document.createElement("canvas");

  // Calculate the scale between the displayed image and the original image size
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  // Adjust canvas size to match the crop size in the original image's resolution
  canvas.width = crop.width * scaleX;
  canvas.height = crop.height * scaleY;

  const ctx = canvas.getContext("2d");

  if (ctx) {
    // Draw the cropped portion of the image onto the canvas at full resolution
    ctx.drawImage(
      image,
      crop.x * scaleX, // Crop starting x coordinate
      crop.y * scaleY, // Crop starting y coordinate
      crop.width * scaleX, // Crop width in original resolution
      crop.height * scaleY, // Crop height in original resolution
      0, // Canvas starting x coordinate
      0, // Canvas starting y coordinate
      canvas.width, // Canvas width (full resolution)
      canvas.height // Canvas height (full resolution)
    );
  }

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        resolve(blob);
      },
      "image/jpeg",
      1.0 // Set quality to 1.0 for maximum quality
    );
  });
};

export const processData = (array, sortArray = []) => {
  return array.map((obj) => {
    return Object.values(sortObjectUsingKeys({ ...obj }, sortArray));
  });
};

export const processDataForBooks = (array, sortArray = []) => {
  const mergeArrayElementsToString = (array = []) => {
    let string = "";
    let isFirst = true;
    array.forEach((element) => {
      if (isFirst) {
        string += `(${array.length}) ` + element.accessionNumber;
        isFirst = false;
      } else {
        string += ", " + element.accessionNumber;
      }
    });
    return string;
  };
  return array.map((obj) => {
    return Object.values(
      sortObjectUsingKeys(
        {
          ...obj,
          accessionNumber: mergeArrayElementsToString(obj.accessionNumbers),
        },
        sortArray
      )
    );
  });
};
