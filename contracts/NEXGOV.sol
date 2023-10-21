// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract NEXGOVToken is ERC20, Ownable {
    constructor() ERC20("NEXUS Governance Stablecoin", "NEXGOV") {
        _mint(msg.sender, 100000 * 10 ** 18);
    }
    function mint(address _to, uint256 _amnt) external onlyOwner {
        _mint(_to, _amnt);
    }
    function burn(uint256 _amnt) external {
        _burn(msg.sender, _amnt);
    }
}
