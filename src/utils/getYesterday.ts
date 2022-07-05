const getYesterday = (date: Date) => {
  const dayCopy = new Date(date);

  return new Date(dayCopy.setDate(dayCopy.getDate() - 1));
};

export default getYesterday;
