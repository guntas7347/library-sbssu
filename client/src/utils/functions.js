import queryString from "query-string";

import { UPLOADS_PATH } from "./keys";

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

export const rowsArray = (data = [], config = []) => {
  return data.map((obj) => {
    return config.map(({ key, transform }) => {
      const value = obj[key];
      return transform ? transform(value, obj) : value;
    });
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
  const mergeArrayElementsToString = (arr = []) => {
    if (!arr.length) return "";
    const accessionNumbers = arr.map((el) => el.accessionNumber);
    return `(${accessionNumbers.length}) ${accessionNumbers.join(", ")}`;
  };

  return array.map((obj) => {
    const newObj = {
      ...obj,
      accessionNumber: mergeArrayElementsToString(obj.accessions),
    };
    return Object.values(sortObjectUsingKeys(newObj, sortArray));
  });
};

export const toLowerCamelCase = (str) => {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
};

export const fromLowerCamelCase = (str) => {
  return str
    .replace(/([A-Z])/g, " $1") // Add space before uppercase letters
    .toLowerCase() // Convert everything to lowercase
    .replace(/\b\w/g, (match) => match.toUpperCase()); // Capitalize each word
};

export function getCookieValue(name) {
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1] || null
  );
}

export const imagePathUrl = (imageUrl) => {
  return imageUrl ? UPLOADS_PATH + imageUrl : UPLOADS_PATH + "/sample-user.jpg";
};

export const memberTypeOptions = [
  { label: "Student UG", value: "student_ug" },
  { label: "Student PG", value: "student_pg" },
  { label: "Teacher Regular", value: "teacher_regular" },
  { label: "Teacher Adhoc", value: "teacher_adhoc" },
  { label: "Non Teaching Staff", value: "non_teaching_staff" },
  { label: "Special Member", value: "special_member" },
];

export const autofillTestData = (setFields, programs, specializations) => {
  const roles = [
    "student_ug",
    "student_pg",
    "teacher_regular",
    "teacher_adhoc",
    "non_teaching_staff",
  ];

  const categories = ["general", "sc_st", "other"];

  const genders = ["male", "female", "other"];

  const maleImages = [
    "8c4dc09319b64ad48e596c12e8dc3c82",
    "b8e27991815447b8ab57d2482a498523",
    "9c4dc09319b64ad48e626c12e8dc3c82",
    "42f8a55ca0b54aaf8fae029584a15c4e",
    "a4670ab79f894c23b9f1aeff6bad0194",
  ];

  const femaleImages = [
    "be347704fcd144d6bd657b5d2dc8c03b",
    "ze347704fcd144d6bd657e5d2dc8c03b",
    "3b97e90b6f344dff8f991971d83fc824",
  ];

  const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const getRandomDOB = () => {
    const start = new Date("1990-01-01").getTime();
    const end = new Date("2005-01-01").getTime();
    const randomTime = start + Math.random() * (end - start);
    return new Date(randomTime).toISOString().split("T")[0]; // YYYY-MM-DD
  };

  const gender = getRandomItem(genders);
  const imagePool = gender === "male" ? maleImages : femaleImages;
  const randomProgramIndex = Math.floor(Math.random() * 3);
  const program = programs()[randomProgramIndex] ?? programs()[0];

  const randomSpecializationIndex = Math.floor(Math.random() * 3);
  const specialization =
    specializations()[randomSpecializationIndex] ?? specializations()[0];

  const maleFirstNames = [
    "Arjun",
    "Rajveer",
    "Gurpreet",
    "Harjit",
    "Amrit",
    "Simranjeet",
    "Inder",
    "Jaspreet",
    "Manjeet",
    "Parminder",
  ];

  const femaleFirstNames = [
    "Simran",
    "Gurleen",
    "Harpreet",
    "Jasleen",
    "Navneet",
    "Amrit",
    "Kiran",
    "Rajdeep",
    "Mandeep",
    "Baljeet",
  ];

  const lastNames = [
    "Dhillon",
    "Sidhu",
    "Sandhu",
    "Gill",
    "Brar",
    "Bajwa",
    "Grewal",
    "Chahal",
  ];

  function generateRandomName() {
    const firstNameList = gender === "male" ? maleFirstNames : femaleFirstNames;
    const firstName =
      firstNameList[Math.floor(Math.random() * firstNameList.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName}`;
  }

  setFields({
    fullName: generateRandomName(),
    fatherName: generateRandomName(),
    rollNumber: `${Math.floor(100000 + Math.random() * 900000)}`,
    gender: gender,
    dob: getRandomDOB(),
    category: getRandomItem(categories),
    memberType: getRandomItem(roles),
    program: program,
    specialization: specialization,
    batch: 2025,
    streetAddress: "Ajit Road",
    city: "Ludhiana",
    state: "Punjab",
    pinCode: "141001",
    email: "guntas7347@gmail.com",
    phoneNumber: `${Math.floor(9000000000 + Math.random() * 100000000)}`,
    imageUrl: `/profile/${getRandomItem(imagePool)}.jpg`,
  });
};
