// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Simple counter contract

contract Counter {
    uint public count;
    address public owner;
    event Increment(address indexed caller, uint by);

    error NotOwner(); // "incBy: caller is not the owner"
    error InvalidIncrement(); // "incBy: increment should be positive"

    constructor() {
        owner = msg.sender;
    }

    function inc() public {
        count++;
        emit Increment(msg.sender, 1);
    }

    function incBy(uint by) public {
        if (msg.sender != owner) revert NotOwner();
        if (by <= 0) revert InvalidIncrement();
        count += by;
        emit Increment(msg.sender, by);
    }
}
