const {
  checkIfPort
} = require("./index");

test("Check 4000", () => {
  expect(checkIfPort(4000)).toBe(false);
});

test("Check 3030", () => {
  expect(checkIfPort(3030)).toBe(true);
});