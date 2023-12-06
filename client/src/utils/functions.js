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

// export const handleErrors = (statusCode, status, payload) => {
//   switch (statusCode) {
//     case 200:
//       resolve(status);

//       break;

//     default:
//       break;
//   }
// };
