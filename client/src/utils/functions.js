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

export const rowsArray = (array, keysArray) => {
  return array.map((obj) => {
    return Object.values(sortObjectUsingKeys(obj, keysArray));
  });
};

// export const handleErrors = (statusCode, status, payload) => {
//   switch (statusCode) {
//     case 200:
//       resolve(status);

//       break;

//     default:
//       break;
//   }
// };
