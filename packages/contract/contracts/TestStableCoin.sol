// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TestCoin is ERC20, Ownable {
    constructor(address initialOwner)
        ERC20("Test Coin", "TstCoin")
        Ownable(initialOwner)
    {}

    // this function is only for testing purposes
    function mint(address to) public {
        _mint(to, 1000 * 10**18);
    }
}