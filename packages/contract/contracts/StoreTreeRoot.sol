// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

contract StoreTreeRoot {
    mapping (address => bytes32) public treeRoots;
   
    function setTree (bytes32 _treeRoot) public {
        treeRoots[msg.sender] = _treeRoot;
    }
}