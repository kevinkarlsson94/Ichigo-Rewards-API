import {
  userExistInDb,
  filterDuplicates,
  generateRewardsData,
  saveUser,
} from "../helpers/index.js";

import users from "../../users.json" assert { type: "json" };

export const getRewards = (req, res) => {
  const {
    query: { at: atParam },
    params: { id: userId },
  } = req;

  const rewardsData = generateRewardsData(atParam);

  // User exist in DB - edit current users data
  if (userExistInDb(users, userId)) {
    const updatedUsers = users.map((user) => {
      // map through users - when we have a match we will spread the old user data with the new generated fields
      if (user.id === userId) {
        const newUserData = filterDuplicates([...user.data, ...rewardsData]);
        res.send({ data: newUserData });
        return {
          ...user,
          data: newUserData,
        };
      }
      return user;
    });

    // Save all users with the updated values for the specified user
    saveUser(updatedUsers);
  }

  // User does not exist in DB - create new userId with Data
  else {
    const newUserData = {
      id: userId,
      data: rewardsData,
    };
    saveUser([...users, newUserData]);
    res.send({ data: newUserData.data });
  }
};

export const patchRewards = (req, res) => {
  const {
    params: { id: userId, date },
  } = req;
  let returnValue;
  // If time has passed, just return a HTTP status
  if (date < new Date()) {
    return res.send({ error: { message: "This reward is already expired" } });
  }

  const currentUser = users.find((user) => user.id === userId);
  const patchedData = currentUser.data.map((item) => {
    // Don't take time in consideration
    const noTimeDate = date.split("T")[0];
    const noTimeCurrentUserDataDate = item.availableAt.toString().split("T")[0];
    // if date param match availableAt field in DB -> updated redeemedAt current time
    const currentTime = new Date().toLocaleTimeString();
    if (noTimeDate === noTimeCurrentUserDataDate) {
      returnValue = { ...item, redeemedAt: currentTime };
    } else {
      returnValue = item;
    }
    return returnValue;
  });

  // update current user id with new data
  const dataToBeUpdated = users.map((user) => {
    if (user.id === userId) {
      return {
        ...user,
        data: patchedData,
      };
    }
    return user;
  });
  saveUser(dataToBeUpdated);
  res.send(users);
};
