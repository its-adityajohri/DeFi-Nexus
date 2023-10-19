// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GovernanceTokenVoting is Ownable {
    uint256 public constant VOTING_PERIOD = 7 days;
    IERC20 public immutable governanceToken;

    struct Proposal {
        uint256 totalVotes;
        uint256 slashingRatio;
    }

    mapping(address => mapping(uint256 => uint256)) public userDeposits;
    mapping(address => mapping(uint256 => Proposal)) public proposals;
    mapping(uint256 => uint256) public totalVotes;

    event UserVote(address indexed voter, address proposal, uint256 epoch);

    constructor(ERC20 _governanceToken) {
        governanceToken = _governanceToken;
    }

    function currentEpoch() public view returns (uint256) {
        return epoch(block.timestamp);
    }

    function epoch(uint256 timestamp) public pure returns (uint256) {
        return timestamp / VOTING_PERIOD;
    }

    function depositTokens(address _proposal, uint256 _amount) external {
        uint256 currentEpoch = currentEpoch();
        bytes32 proposalHash = keccak256(abi.encodePacked(_proposal, currentEpoch));

        governanceToken.transferFrom(msg.sender, address(this), _amount);
        userDeposits[msg.sender][currentEpoch] += _amount;
        proposals[_proposal][currentEpoch].totalVotes += _amount;
        totalVotes[currentEpoch] += _amount;

        emit UserVote(msg.sender, _proposal, currentEpoch);
    }

    function withdrawTokens(address _proposal, uint256 _epoch, uint256 _amount) external {
        require(_epoch != currentEpoch() - 1, "Tokens are locked for withdrawal");
        bytes32 proposalHash = keccak256(abi.encodePacked(_proposal, _epoch));
        Proposal storage proposal = proposals[_proposal][_epoch];
        uint256 maxWithdrawAmount = userDeposits[msg.sender][_epoch];

        require(_amount <= maxWithdrawAmount, "Invalid withdrawal amount");

        userDeposits[msg.sender][_epoch] -= _amount;
        proposal.totalVotes -= _amount;
        totalVotes[_epoch] -= _amount;

        uint256 safeAmount = (_amount * (1e18 - proposal.slashingRatio)) / 1e18;
        governanceToken.transfer(msg.sender, safeAmount);
    }

    function shortfallCoverage(address _proposal) public view returns (uint256) {
        uint256 currentEpoch = currentEpoch();
        bytes32 proposalHash = keccak256(abi.encodePacked(_proposal, currentEpoch - 1));
        Proposal storage proposal = proposals[_proposal][currentEpoch - 1];
        return (1e18 - proposal.slashingRatio) * proposal.totalVotes;
    }

    function coverShortfall(address _proposal, uint256 _amount, uint256 _epoch) external onlyOwner {
        bytes32 proposalHash = keccak256(abi.encodePacked(_proposal, _epoch));
        Proposal storage proposal = proposals[_proposal][_epoch];

        uint256 maxCoverAmount = _min(_amount, (1e18 - proposal.slashingRatio) * proposal.totalVotes);
        governanceToken.transfer(owner(), maxCoverAmount);
        proposal.slashingRatio += (maxCoverAmount * 1e18) / proposal.totalVotes;
    }

    function _min(uint x, uint y) private pure returns (uint) {
        return x <= y ? x : y;
    }
}
