// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Simple counter contract

contract Counter {
  uint public x;
  address public owner;
  event Increment(address indexed caller, uint by);

  error NotOwner(); // "incBy: caller is not the owner"
  error InvalidIncrement(); // "incBy: increment should be positive"

  constructor() {
    owner = msg.sender;
  }
  //using a modifier
  //   modifier OnlyOwner() {
  //     require(msg.sender == owner, "Not Owner");
  //     _;
  // }

  function inc() public {
    x++;
    emit Increment(msg.sender,1);
  }

  function incBy(uint by) public  {
    if(msg.sender != owner) revert NotOwner();
    if(by  <= 0) revert InvalidIncrement();
    x += by;
    emit Increment(msg.sender, by);
  }
}

// demonstrating different way to implement ownership between regular if statment or require check, using a modifier and
// using openzepplin Ownable (with transferOwnership and renounceOwnership)

// import "@openzeppelin/contracts/access/Ownable.sol";
// Contract module which provides a basic access control mechanism, where there is an account (an owner) that can be granted exclusive access to specific functions.
// This module is used through inheritance. It will make available the modifier onlyOwner, which can be applied to your functions to restrict their use to the owner.

/*

import "@openzeppelin/contracts/access/Ownable.sol";

contract Counter is Ownable {
    // Note: The constructor is handled by Ownable
    
    function incBy(uint by) public onlyOwner {
        // ... function logic
    }

    // New features provided by Ownable:
    function transferOwnership(address newOwner) public onlyOwner {
        _transferOwnership(newOwner);
    }
}
transferOwnership from the owner account to a new one
renounceOwnership : Renouncing ownership will leave the contract without an owner, thereby disabling any functionality that is only available to the owner.
*/