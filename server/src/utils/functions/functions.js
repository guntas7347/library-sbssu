import { generateLibraryCardId } from "./idGenerator.js";

export const cardNumbersArray = (memberId, lastCardId, numberOfCards) => {
  const cardNumberArray = [];

  for (let index = 0; index < numberOfCards; index++) {
    const card = generateLibraryCardId(lastCardId, memberId);
    cardNumberArray.push(card);
    lastCardId = card;
  }

  return cardNumberArray;
};

export const createDateGap = (initialDate = new Date(), gap = 0) => {
  return new Date(new Date(initialDate).getTime() + 1000 * 60 * 60 * 24 * gap);
};

export const checkDateGap = (initialDate, finalDate) => {
  const startingDate = new Date(
    new Date(initialDate).toISOString().split("T")[0]
  );
  const endingDate = new Date(new Date(finalDate).toISOString().split("T")[0]);
  const timeGap = endingDate.getTime() - startingDate.getTime();
  const dayGap = timeGap / (1000 * 60 * 60 * 24);
  return dayGap;
};
