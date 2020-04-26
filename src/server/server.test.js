const {
    checkIfPort
} = require("./server");

test("Check 4000", async () => {
    await expect(checkIfPort(4000)).toBe(false);
});

test("Check 3000", async () => {
    await expect(checkIfPort(3000)).toBe(true);
});