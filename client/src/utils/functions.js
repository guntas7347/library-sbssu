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
