// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Receiver {
    address public sender;      // msg.sender
    address public origin;      // tx.origin
    address public from;        // address(this)
    uint256 public value;

    function setVars(uint256 _value) public {
        sender = msg.sender;
        origin = tx.origin;
        from = address(this);
        value = _value;
    }
}