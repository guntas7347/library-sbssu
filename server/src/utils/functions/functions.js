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
