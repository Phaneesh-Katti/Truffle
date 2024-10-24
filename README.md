# Truffle

### **Demonstration of Call vs Delegatecall & Time-Locked Pension Fund Contract with Gas Estimation**

---

### Project Description:

This project showcases the use of the **Truffle development environment** to demonstrate two key concepts in Ethereum smart contracts:

1. **Call vs Delegatecall**: A demonstration of the differences between `msg.sender`, `tx.origin`, and `address(this)` when using the `call` and `delegatecall` functions in Solidity. This part explores how contract calls behave differently depending on which method is used.

2. **Time-Locked Pension Fund**: A smart contract implementation of a pension fund that prevents the owner from withdrawing funds before a stipulated time (lock period). The contract uses modifiers to enforce time-lock restrictions on withdrawals. Additionally, this project includes a gas estimation script that estimates the gas consumption for depositing and withdrawing funds.

---

### Directory Structure:

- **contracts/**  
  Contains the Solidity smart contracts:
  - `Caller.sol`: A contract to demonstrate `call` and `delegatecall`.
  - `Receiver.sol`: A contract used by `Caller.sol` to compare the behavior of `msg.sender`, `tx.origin`, and `address(this)`.
  - `PensionFund.sol`: A smart contract representing a pension fund account with a time-lock functionality.
  - `Migrations.sol`: A default contract for handling migrations.

- **migrations/**  
  Truffle migration files:
  - `1_initial_migration.js`: Deploys the `Migrations` contract.
  - `2_deploy_contracts.js`: Deploys the `Caller`, `Receiver`, and `PensionFund` contracts.

- **scripts/**  
  Contains the script for gas estimation:
  - `estimateGas.js`: Script to estimate the gas cost for deposit and withdrawal operations on the `PensionFund` contract.

- **test/**  
  Contains the test files written in JavaScript for Truffle:
  - `callTests.js`: Test cases for demonstrating the difference between `call` and `delegatecall`.
  - `pensionFundTests.js`: Test cases for the `PensionFund` contract, covering deposit, withdrawal, and time-lock functionality.

---

### Requirements:

To run this project, ensure that you have the following software installed:

- [Node.js](https://nodejs.org/en/) (v16+ recommended)
- [Truffle](https://trufflesuite.com/docs/truffle/) (v5.11.5 or later)
- [Ganache](https://trufflesuite.com/docs/ganache/quickstart) (for running a local Ethereum blockchain)

### Setup and Installation:

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**:
   Inside the project directory, install the required Node.js packages:
   ```bash
   npm install
   ```

3. **Compile the Contracts**:
   Compile the Solidity smart contracts using Truffle:
   ```bash
   truffle compile
   ```

4. **Run Ganache**:
   In a separate terminal, start a local Ethereum blockchain using Ganache:
   ```bash
   ganache-cli
   ```

5. **Deploy the Contracts**:
   Deploy the contracts to the Ganache blockchain:
   ```bash
   truffle migrate --network development
   ```

---

### Execution:

#### Part 1: Call vs Delegatecall Demonstration

1. **Run the Tests**:
   To demonstrate the differences between `call` and `delegatecall`, execute the `callTests.js` test file:
   ```bash
   truffle test test/callTests.js --network development
   ```

2. **Expected Output**:
   This will output the differences in the values of `msg.sender`, `tx.origin`, and `address(this)` for both `call` and `delegatecall`. You can find the output stored in `callTests_output.txt` (if redirected) or in the console.

---

#### Part 2: Time-Locked Pension Fund and Gas Estimation

1. **Run the Pension Fund Tests**:
   To test the time-lock functionality and fund operations in the `PensionFund` contract, execute the `pensionFundTests.js` test file:
   ```bash
   truffle test test/pensionFundTests.js --network development
   ```

2. **Run the Gas Estimation Script**:
   To estimate the gas consumption for deposit and withdrawal operations, run the `estimateGas.js` script:
   ```bash
   truffle exec scripts/estimateGas.js --network development
   ```

3. **Expected Output**:
   - The **pension fund tests** will verify that the owner can deposit funds, cannot withdraw funds before the unlock time, and can withdraw after the lock period.
   - The **gas estimation script** will output the gas estimates for both deposit and withdrawal functions in `estimateGas_output.txt`.

---

### Sample Outputs:

- **Call vs Delegatecall Output**:
  Shows the difference in the values of `msg.sender`, `tx.origin`, and `address(this)` between `call` and `delegatecall`.
  
- **Pension Fund Tests Output**:
  Shows test results verifying deposit functionality, preventing early withdrawal, and allowing withdrawal after the unlock time.

- **Gas Estimation Output**:
  Displays the gas used for deposit and withdrawal functions in the time-locked `PensionFund` contract.

---

### Additional Information:

- **Gas Optimization**:
  The `estimateGas.js` script utilizes Web3.js to estimate the gas required for function executions in the `PensionFund` contract. It provides insight into the gas cost for both `deposit` and `withdraw` operations under different conditions (before and after the unlock time).

- **Call vs Delegatecall Behavior**:
  The `callTests.js` script demonstrates how using `call` and `delegatecall` alters the values of `msg.sender`, `tx.origin`, and `address(this)`. This showcases important differences in Ethereum's contract execution model, especially when contracts interact with each other.

---

### Author:
- [Your Name]
- [Contact Information]

---

This README serves as a guide to understanding the purpose of the project, running the tests and scripts, and interpreting the results. For more information, refer to the test files and scripts provided in the project.

---

### Submission Notes:

- **Screenshots**: Include relevant screenshots from the `callTests_output.txt`, `pensionFundTests_output.txt`, and `estimateGas_output.txt` files in the assignment submission.
- **Output Files**: Attach the output files directly if required for submission.

