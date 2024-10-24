const PensionFund = artifacts.require("PensionFund");
const { time } = require("@openzeppelin/test-helpers");

contract("PensionFund", (accounts) => {
  let pensionFund;
  const owner = accounts[0];
  const depositAmount = web3.utils.toWei("1", "ether");

  beforeEach(async () => {
    // Deploy without any parameters (because unlock time is handled internally)
    pensionFund = await PensionFund.new();
  });

  it("should allow deposits", async () => {
    await pensionFund.deposit({ from: owner, value: depositAmount });
    const balance = await pensionFund.getBalance();
    assert.equal(balance.toString(), depositAmount);
  });

  it("should prevent early withdrawals", async () => {
    await pensionFund.deposit({ from: owner, value: depositAmount });
    
    try {
      await pensionFund.withdraw(depositAmount, { from: owner });
      assert.fail("Withdrawal should have failed");
    } catch (error) {
      assert(error.message.includes("Fund is still locked"));
    }
  });

  it("should allow withdrawal after unlock time", async () => {
    await pensionFund.deposit({ from: owner, value: depositAmount });
    
    // Advance time by 21 seconds (since the contract locks for 20 seconds)
    await time.increase(21);
    
    await pensionFund.withdraw(depositAmount, { from: owner });
    const balance = await pensionFund.getBalance();
    assert.equal(balance.toString(), "0");
  });
});


// const PensionFund = artifacts.require("PensionFund");
// const { time } = require("@openzeppelin/test-helpers");

// contract("PensionFund", (accounts) => {
//   let pensionFund;
//   const owner = accounts[0];
//   const depositAmount = web3.utils.toWei("1", "ether");

//   beforeEach(async () => {
//     // Deploy with 5 seconds lock time for testing
//     // pensionFund = await PensionFund.new(5);
//     pensionFund = await PensionFund.new();
//   });

//   it("should allow deposits", async () => {
//     await pensionFund.deposit({ from: owner, value: depositAmount });
//     const balance = await pensionFund.getBalance();
//     assert.equal(balance.toString(), depositAmount);
//   });

//   it("should prevent early withdrawals", async () => {
//     await pensionFund.deposit({ from: owner, value: depositAmount });
    
//     try {
//       await pensionFund.withdraw(depositAmount, { from: owner });
//       assert.fail("Withdrawal should have failed");
//     } catch (error) {
//       assert(error.message.includes("Fund is still locked"));
//     }
//   });

//   it("should allow withdrawal after unlock time", async () => {
//     await pensionFund.deposit({ from: owner, value: depositAmount });
    
//     // Advance time by 6 seconds
//     await time.increase(6);
    
//     await pensionFund.withdraw(depositAmount, { from: owner });
//     const balance = await pensionFund.getBalance();
//     assert.equal(balance.toString(), "0");
//   });
// });