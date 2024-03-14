// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Counter {
    uint public count;
    address private deployer;

    event CountUpdated(uint _count);

    constructor() {
        count = 0;
        deployer = msg.sender;
    }

    function getDeployer() public view returns (address) {
        return deployer;
    }

    function incrementBy(uint value) public {
        count += value;
        emit CountUpdated(count);
    }

    function increment() public {
        count += 1;
        emit CountUpdated(count);
    }

    function decrement() public {
        require(count > 0, "Counter: count cannot be less than 0");
        count -= 1;
        emit CountUpdated(count);
    }
}
