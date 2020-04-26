const {
    checkIfPort
} = require("./server");

test("Check 4000", () => {
    expect(checkIfPort(4000)).toBe(false);
});

test("Check 3000", () => {
    expect(checkIfPort(3000)).toBe(true);
});