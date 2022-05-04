//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract ReEntrancyGuard {

    bool internal locked;

    modifier noReentrant() {
        require(!locked, "No re-entrancy");
        locked = true;
        _;
        locked = false;
    }

}