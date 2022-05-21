import { userExistInDb, addDays, getFullWeek } from "../src/helpers/index.js";
import { expect } from "chai";

describe("userExistInDb", function () {
  it("should return true if user id exist in object", () => {
    const testUsers = [
      {
        id: 1,
        data: {
          availableAt: "availableAt1",
          redeemedAt: "redeemedAt1",
          expiresAt: "expiresAt1",
        },
      },
      {
        id: 3,
        data: {
          availableAt: "availableAt2",
          redeemedAt: "redeemedAt2",
          expiresAt: "expiresAt2",
        },
      },
    ];
    expect(userExistInDb(testUsers, 1)).to.equal(true);
  });

  it("should return false if user id does not exist in object", () => {
    const users = [
      {
        id: 1,
        data: {
          availableAt: "",
          redeemedAt: "",
          expiresAt: "",
        },
        id: 2,
        data: {
          availableAt: "",
          redeemedAt: "",
          expiresAt: "",
        },
      },
    ];
    expect(userExistInDb(users, 5)).to.equal(false);
  });
});

describe("addDays", () => {
  it("should add 2 days to the current date", () => {
    const startDays = new Date("2022-01-01T00:00:00.000Z");
    const result = addDays(startDays, 2).toISOString();
    expect(result).to.equal("2022-01-03T00:00:00.000Z");
  });
});

describe("getFullWeek", () => {
  it("should", () => {
    const result = getFullWeek(new Date("2022-01-17"));
    const expectedResult = [
      new Date("2022-01-16T00:00:00.000Z"),
      new Date("2022-01-17T00:00:00.000Z"),
      new Date("2022-01-18T00:00:00.000Z"),
      new Date("2022-01-19T00:00:00.000Z"),
      new Date("2022-01-20T00:00:00.000Z"),
      new Date("2022-01-21T00:00:00.000Z"),
      new Date("2022-01-22T00:00:00.000Z"),
    ];

    // We can't compare 2 dates directly in JS - but we can use getTime() to compare, so we need to loop through the result array
    // get the timestamp and compare it to our the corresponding index in our assert-object
    result.forEach((date, index) =>
      expect(date.getTime()).to.equal(expectedResult[index].getTime())
    );
  });
});
