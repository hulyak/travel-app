const { calculateTime } = require("../calculateTime");

test("Check 2020-04-03 2020-04-20", () => {
  expect(calculateTime("2020-04-03", "2020-04-20")).toBe(17);
});

test("Check 2020-04-15 2020-04-20", () => {
  expect(calculateTime("2020-04-15", "2020-04-20")).toBe(5);
});