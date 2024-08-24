// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

contract StoreDID {
    mapping (address => bytes32) public dids;
   
    function setDID (bytes32 _did) public {
        dids[msg.sender] = _did;
    }
}