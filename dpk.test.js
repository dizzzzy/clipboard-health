const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the literal '0' when input is null", () => {
    const trivialKey = deterministicPartitionKey(null);
    expect(trivialKey).toBe("0");
  });

  it("Returns the literal '0' when input is undefined", () => {
    const trivialKey = deterministicPartitionKey(undefined);
    expect(trivialKey).toBe("0");
  });

  it("Returns a string hash that is not 0 when input is a truthy type other than an object", () => {
    const trivialKey = deterministicPartitionKey(5);
    expect(trivialKey).not.toBe("0");
  });

  it("Returns a string hash that is not 0 when input is an empty object", () => {
    const trivialKey = deterministicPartitionKey({});
    expect(trivialKey).not.toBe("0");
  });

  it("Returns a string hash that is not 0 when input is an object with a string partitionKey variable", () => {
    const trivialKey = deterministicPartitionKey({partitionKey:"hi"});
    expect(trivialKey).not.toBe("0");
  });

  it("Returns a string hash that is not 0 when input is an object with a non-string partitionKey variable", () => {
    const trivialKey = deterministicPartitionKey({partitionKey:5});
    expect(trivialKey).not.toBe("0");
  });


});
