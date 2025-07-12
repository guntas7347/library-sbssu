import { fetchSettings } from "../../controllers/settings.controller.js";
import { generateLibraryCardId } from "./idGenerator.js";

export const getLibraryCardLimit = async (
  role = "STUDENT UG",
  memberCategory = "GENERAL"
) => {
  try {
    const { value: AALCL } = await fetchSettings("AALCL");
    const keyMap = {
      "STUDENT UG": {
        GENERAL: "",
        "SC/ST": "",
        OTHER: "ug",
      },
      "STUDENT PG": {
        GENERAL: "pg",
        "SC/ST": "pg",
        OTHER: "pg",
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

export const cardNumbersArray = (memberId, lastCardId, numberOfCards) => {
  const cardNumberArray = [];

  for (let index = 0; index < numberOfCards; index++) {
    const card = generateLibraryCardId(lastCardId, memberId);
    cardNumberArray.push(card);
    lastCardId = card;
  }

  return cardNumberArray;
};
