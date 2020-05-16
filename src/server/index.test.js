const {
  checkIfPort
} = require("./index");


describe("(checkIfPort) function", () => {
  test("should be defined", async () => {
    expect(checkIfPort).toBeDefined();
  });
  test("should be a function",
    async () => {
      expect(typeof checkIfPort).toBe("checkIfPort");
    });
});