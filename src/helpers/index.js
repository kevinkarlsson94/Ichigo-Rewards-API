import filestream from "fs";

// takes users array and user id and check if there is any user id match within the users object
export const userExistInDb = (users, userId) =>
  users.some((item) => item.id === userId);

// Adds the specified amount of days to the provided date
export const addDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// saves specified users to users.json by filestream
export const saveUser = (users) =>
  filestream.writeFile("users.json", JSON.stringify(users), (err) => {
    if (err) throw err;
  });

// remove duplicate values from provided array
export const filterDuplicates = (array) =>
  [...new Set(array.map((o) => JSON.stringify(o)))]
    .sort((a, b) => a - b)
    .map((i) => JSON.parse(i));

// get the full week as an array of the specified date
export const getFullWeek = (inputDate) => {
  const providedDate = new Date(inputDate);
  const sunday = new Date(
    providedDate.setDate(providedDate.getDate() - providedDate.getDay())
  );
  let result = [new Date(sunday)];
  while (sunday.setDate(sunday.getDate() + 1) && sunday.getDay() !== 0) {
    result = [...result, new Date(sunday)];
  }
  return result;
};

export const generateRewardsData = (date) =>
  getFullWeek(date).map((weekday) => ({
    availableAt: weekday,
    redeemedAt: null,
    expiresAt: addDays(weekday, 7),
  }));
