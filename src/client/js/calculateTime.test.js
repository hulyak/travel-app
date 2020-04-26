const {
    calculateTime
} = require("./calculateTime");

test("Check 2020-04-10 2020-04-20", () => {
    expect(calculateTime("2020-04-10", "2020-04-20")).toBe(10);
});

test("Check 2020-04-15 2020-04-20", () => {
    expect(calculateTime("2020-04-15", "2020-04-20")).toBe(5);
});