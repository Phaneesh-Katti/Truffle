const PensionFund = artifacts.require("PensionFund");

module.exports = async function (callback) {
  try {
    const accounts = await web3.eth.getAccounts();
    const owner = accounts[0];
    const depositAmount = web3.utils.toWei("1", "ether");

    // Deploy the PensionFund contract
    const pensionFund = await PensionFund.new({ from: owner });

    console.log("PensionFund contract deployed");

    // Estimate gas for deposit
    const gasEstimateDeposit = await pensionFund.deposit.estimateGas({
      from: owner,
      value: depositAmount,
    });

    console.log(`Estimated gas for deposit: ${gasEstimateDeposit}`);

    // Perform the deposit
    await pensionFund.deposit({ from: owner, value: depositAmount });
    console.log("Deposit made");

    // Try estimating gas for withdrawal before unlock time
    try {
      const gasEstimateWithdrawEarly = await pensionFund.withdraw.estimateGas(
        depositAmount,
        { from: owner }
      );
      console.log(`Estimated gas for early withdrawal: ${gasEstimateWithdrawEarly}`);
    } catch (error) {
      console.log("Early withdrawal failed as expected (fund is locked)");
    }

    // Increase blockchain time by 21 seconds (unlock time is 20 seconds)
    await advanceTime(21);
    console.log("Time advanced by 21 seconds");

    // Estimate gas for withdrawal after the unlock time
    const gasEstimateWithdraw = await pensionFund.withdraw.estimateGas(
      depositAmount,
      { from: owner }
    );
    console.log(`Estimated gas for withdrawal after unlock time: ${gasEstimateWithdraw}`);

    callback();
  } catch (error) {
    console.error(error);
    callback(error);
  }
};

// Helper function to advance time on the blockchain
function advanceTime(seconds) {
  return new Promise((resolve, reject) => {
    web3.currentProvider.send(
      {
        jsonrpc: "2.0",
        method: "evm_increaseTime",
        params: [seconds],
        id: new Date().getTime(),
      },
      (err, result) => {
        if (err) {
          return reject(err);
        }
        // Mine a block after increasing time
        web3.currentProvider.send(
          {
            jsonrpc: "2.0",
            method: "evm_mine",
            id: new Date().getTime(),
          },
          (err2) => {
            if (err2) {
              return reject(err2);
            }
            resolve(result);
          }
        );
      }
    );
  });
}



// const PensionFund = artifacts.require("PensionFund");

// module.exports = async function(callback) {
//   try {
//     const accounts = await web3.eth.getAccounts();
//     const pensionFund = await PensionFund.deployed();

//     // Get current timestamp and unlock time
//     const currentTime = Math.floor(Date.now() / 1000);
//     const unlockTime = (await pensionFund.unlockTime()).toString();
//     const timeRemaining = (await pensionFund.getTimeRemaining()).toString();
    
//     console.log(`Current time: ${currentTime}`);
//     console.log(`Unlock time: ${unlockTime}`);
//     console.log(`Time remaining: ${timeRemaining} seconds\n`);

//     // Estimate gas for deposit
//     const depositAmount = web3.utils.toWei("1", "ether");
//     const depositGas = await pensionFund.deposit.estimateGas({ 
//       from: accounts[0],
//       value: depositAmount 
//     });
//     console.log(`Estimated gas for deposit: ${depositGas}`);

//     // Try withdrawal
//     console.log("\nTrying withdrawal:");
//     try {
//       const withdrawGas = await pensionFund.withdraw.estimateGas(
//         depositAmount, 
//         { from: accounts[0] }
//       );
//       console.log(`Estimated gas for withdrawal: ${withdrawGas}`);
//     } catch(e) {
//       console.log("Withdrawal gas estimation failed - fund might be locked or insufficient balance");
//     }

//     callback();
//   } catch(error) {
//     console.error(error);
//     callback(error);
//   }
// };
