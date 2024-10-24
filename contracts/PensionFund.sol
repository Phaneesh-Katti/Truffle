// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PensionFund {
    address public owner;
    uint256 public unlockTime;
    uint256 public balance;

    event Deposit(address indexed depositor, uint256 amount);
    event Withdrawal(address indexed recipient, uint256 amount);

    constructor() {
        owner = msg.sender;
        // Set unlock time to 20 seconds from deployment
        unlockTime = block.timestamp + 20;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier isUnlocked() {
        require(block.timestamp >= unlockTime, "Fund is still locked");
        _;
    }

    function deposit() public payable {
        balance += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 _amount) public onlyOwner isUnlocked {
        require(_amount <= balance, "Insufficient balance");
        balance -= _amount;
        (bool success, ) = owner.call{value: _amount}("");
        require(success, "Transfer failed");
        emit Withdrawal(owner, _amount);
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }

    function getUnlockTime() public view returns (uint256) {
        return unlockTime;
    }

    function getTimeRemaining() public view returns (uint256) {
        if (block.timestamp >= unlockTime) return 0;
        return unlockTime - block.timestamp;
    }
}
