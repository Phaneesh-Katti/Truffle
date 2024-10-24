const Caller = artifacts.require("Caller");
const Receiver = artifacts.require("Receiver");

contract("Call vs DelegateCall Test", (accounts) => {
  let caller;
  let receiver;

  before(async () => {
    caller = await Caller.deployed();
    receiver = await Receiver.deployed();
  });

  it("should demonstrate different behavior between call and delegatecall", async () => {
    const value = 100;

    // Test regular call
    await caller.setVarsCall(receiver.address, value);
    console.log("\nAfter regular call:");
    console.log("Receiver sender:", await receiver.sender());
    console.log("Receiver origin:", await receiver.origin());
    console.log("Receiver from:", await receiver.from());
    console.log("Receiver value:", (await receiver.value()).toString());

    // Test delegatecall
    await caller.setVarsDelegateCall(receiver.address, value);
    console.log("\nAfter delegatecall:");
    console.log("Caller sender:", await caller.sender());
    console.log("Caller origin:", await caller.origin());
    console.log("Caller from:", await caller.from());
    console.log("Caller value:", (await caller.value()).toString());
  });
});