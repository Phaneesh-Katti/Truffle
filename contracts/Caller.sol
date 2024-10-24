// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Caller {
    address public sender;      // msg.sender
    address public origin;      // tx.origin
    address public from;        // address(this)
    uint256 public value;

    function setVarsCall(address _contract, uint256 _value) public {
        // Using regular call
        (bool success, ) = _contract.call(
            abi.encodeWithSignature("setVars(uint256)", _value)
        );
        require(success, "Call failed");
    }

    function setVarsDelegateCall(address _contract, uint256 _value) public {
        // Using delegatecall
        (bool success, ) = _contract.delegatecall(
            abi.encodeWithSignature("setVars(uint256)", _value)
        );
        require(success, "DelegateCall failed");
    }
}