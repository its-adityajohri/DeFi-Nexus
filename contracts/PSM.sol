pragma solidity ^0.8.17;

import {IAllocatorConduit} from "IArrangerConduit.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Loans} from "LoanContract.sol";

contract PSM is IAllocatorConduit {
    address public daiAddress;
    address public NEXGOV;
    Loans public loans;

    constructor(address _dai, address _NEXGOV) {
        daiAddress = _dai;
        NEXGOV = _NEXGOV;
    }

}
