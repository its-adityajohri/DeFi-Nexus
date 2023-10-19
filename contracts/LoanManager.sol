// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract LoanManager {
    using SafeERC20 for ERC20;

    struct Loan {
        uint256 id;
        address borrower;
        address lender;
        ERC20 collateralToken;
        ERC20 debtToken;
        uint256 collateralAmount;
        uint256 duration;
        uint256 terms;
        uint256 startingTime;
        uint256 debtAmount;
        uint256 interestRate;
    }

    struct Auction {
        uint256 id;
        uint256 loanId;
        uint256 startingPrice;
        uint256 endingPrice;
        uint256 duration;
        uint256 startingTime;
    }

    struct Terms {
        uint256 dutchAuctionMultiplier;
        uint256 settlementMultiplier;
        uint256 liquidationBonus;
        uint256 auctionLength;
    }

    uint256 constant private SCALAR = 1e6;

    uint256 public loanCount;
    Auction[] public auctions;
    Terms[] public loanTerms;
    uint256[] public durations = [7 hours, 1 days, 2 days, 7 days, 0];
    mapping(uint256 => uint256) public loanIdToAuction;
    mapping(uint256 => Loan) public loans;
    mapping(address => uint256[]) public borrowerLoans;
    mapping(address => uint256[]) public lenderLoans;

    event LoanRepaid(uint256 indexed id, address indexed borrower, address indexed lender, uint256 amount);
    event LoanCreated(
        uint256 indexed id,
        address indexed borrower,
        address indexed lender,
        ERC20 collateralToken,
        ERC20 debtToken,
        uint256 collateralAmount,
        uint256 debtAmount,
        uint256 interestRate,
        uint256 startingTime,
        uint256 duration,
        uint256 terms
    );

    event AuctionCreated(
        uint256 indexed id,
        uint256 indexed loanId,
        uint256 duration,
        uint256 startingPrice,
        uint256 startingTime,
        uint256 endingPrice
    );
    event AuctionSettled(uint256 indexed auction, address bidder, uint256 price);
    event AuctionReclaimed(uint256 indexed loanId, uint256 amount);
    event TermsSet(uint256 termId, Terms term);

    constructor() {}

    function createLoan(
        address _lender,
        ERC20 _collateral,
        ERC20 _debt,
        uint256 _collateralAmount,
        uint256 _debtAmount,
        uint256 _interestRate,
        uint256 _duration,
        uint256 _terms
    ) external {
        createLoan(
            _lender,
            msg.sender,
            _collateral,
            _debt,
            _collateralAmount,
            _debtAmount,
            _interestRate,
            _duration,
            _terms,
            ""
        );
    }

    function createLoan(
        address _lender,
        address _borrower,
        ERC20 _collateral,
        ERC20 _debt,
        uint256 _collateralAmount,
        uint256 _debtAmount,
        uint256 _interestRate,
        uint256 _duration,
        uint256 _terms,
        bytes32 _data
    ) public {
        loanCount++;
        Loan memory newLoan = Loan(
            loanCount,
            _borrower,
            _lender,
            _collateral,
            _debt,
            _collateralAmount,
            _debtAmount,
            _interestRate,
            block.timestamp,
            durations[_duration],
            _terms
        );

        loans[loanCount] = newLoan;

        require(Lender(_lender).verifyLoan(newLoan, _data), "Loan not verified");
        _collateral.safeTransferFrom(msg.sender, address(this), _collateralAmount);
        _debt.safeTransferFrom(_lender, address(this), _debtAmount);
        _debt.safeTransfer(msg.sender, _debtAmount);
        emit LoanCreated(
            newLoan.id,
            newLoan.borrower,
            newLoan.lender,
            newLoan.collateralToken,
            newLoan.debtToken,
            newLoan.collateralAmount,
            newLoan.debtAmount,
            newLoan.interestRate,
            newLoan.startingTime,
            newLoan.duration,
            newLoan.terms
        );
    }

    function liquidateLoan(uint256 _loanId) external {
        Loan storage loan = loans[_loanId];
        require(loan.lender == msg.sender, "Only lender can liquidate");
        if (loan.duration + loan.startingTime > block.timestamp || loan.duration == type(uint256).max) {
            revert("Loan not yet liquidatable or is already in auction");
        }
        uint256 interest = calculateInterest(loan.interestRate, loan.debtAmount, loan.startingTime, block.timestamp);
        uint256 totalDebt = loan.debtAmount + interest;
        startAuction(_loanId, totalDebt, interest, loan.terms);

        loan.duration = type(uint256).max;
    }

    function repayLoan(uint256 _loanId) external {
        repayLoan(_loanId, msg.sender);
    }

    function repayLoan(uint256 _loanId, address onBehalfof) public {
        Loan memory loan = loans[_loanId];
        uint256 interest = calculateInterest(loan.interestRate, loan.debtAmount, loan.startingTime, block.timestamp);
        uint256 totalDebt = loan.debtAmount + interest;
        loan.debtToken.safeTransferFrom(onBehalfof, loan.lender, totalDebt);
        emit LoanRepaid(_loanId, loan.borrower, loan.lender, totalDebt);
        try Lender(loan.lender).loanRepaid(loan) {} catch {}
        if (loan.duration == 0) delete auctions[loanIdToAuction[_loanId]];
    }

    function rebalanceRate(uint256 _loanId, uint256 _newRate) external {
        Loan storage loan = loans[_loanId];
        require(loan.lender == msg.sender, "Only lender can rebalance the rate");
        if (loan.duration + loan.startingTime > block.timestamp) {
            revert("Loan not yet adjustable");
        }
        uint256 interest = calculateInterest(loan.interestRate, loan.debtAmount, loan.startingTime, block.timestamp);
        uint256 totalDebt = loan.debtAmount + interest;
        loan.debtAmount = totalDebt;
        loan.startingTime = block.timestamp;
        loan.interestRate = _newRate;
        if (isContract(loan.borrower)) {
            try Borrower(loan.borrower).interestRateUpdate(loan, _newRate) {} catch {}
        }
    }

    function startAuction(uint256 _loanId, uint256 _amount, uint256 _interestRate, uint256 _terms) internal {
        Terms memory terms = loanTerms[_terms];
        uint256 startPrice = ((_amount + _interestRate) * terms.dutchAuctionMultiplier) / SCALAR;
        uint256 endPrice = (_amount * _interestRate) / (terms.settlementMultiplier * SCALAR);
        Auction memory newAuction =
            Auction(auctions.length, _loanId, terms.auctionLength, startPrice, block.timestamp, endPrice);
        auctions.push(newAuction);
        loanIdToAuction[_loanId] = newAuction.id;
        emit AuctionCreated(newAuction.id, newAuction.loanId, newAuction.duration, newAuction.startingPrice, newAuction.startingTime, newAuction.endingPrice);
    }

    function bid(uint256 _auctionId) external {
        Auction memory auction = auctions[_auctionId];
        Loan memory loan = loans[auction.loanId];
        Terms memory terms = loanTerms[loan.terms];
        require(auction.startingTime + auction.duration > block.timestamp, "Auction has ended");
        uint256 currentPrice = getCurrentPrice(_auctionId);
        loan.debtToken.safeTransferFrom(msg.sender, address(this), currentPrice);
        loan.collateralToken.safeTransfer(msg.sender, loan.collateralAmount);
        uint256 interest = calculateInterest(loan.interestRate, loan.debtAmount, loan.startingTime, block.timestamp);
        uint256 lenderClearing = ((loan.debtAmount + interest) * terms.liquidationBonus) / SCALAR;
        uint256 lenderReturn = (lenderClearing > currentPrice) ? currentPrice : lenderClearing;
        uint256 borrowerReturn = currentPrice - lenderReturn;
        loan.debtToken.safeTransfer(loan.lender, lenderReturn);
        try Lender(loan.lender).auctionSettled(loan, lenderReturn, borrowerReturn) {} catch {}
        if (isContract(loan.borrower)) {
            try Borrower(loan.borrower).auctionSettled(loan, lenderReturn, borrowerReturn) {} catch {}
        }
        if (borrowerReturn > 0) {
            loan.debtToken.safeTransfer(loan.borrower, borrowerReturn);
        }
        emit AuctionSettled(_auctionId, msg.sender, currentPrice);
    }

    function reclaim(uint256 _auctionId) external {
        Auction memory auction = auctions[_auctionId];
        require(auction.startingTime + auction.duration < block.timestamp, "Auction has not ended");
        require(auction.endingPrice == auction.startingPrice, "Auction has not ended");
        Loan memory loan = loans[auction.loanId];
        loan.collateralToken.safeTransfer(loan.lender, loan.collateralAmount);
        delete auctions[_auctionId];
        delete loanIdToAuction[auction.loanId];
        emit AuctionReclaimed(_auctionId, loan.collateralAmount);
    }

    function getCurrentPrice(uint256 _auctionId) public view returns (uint256) {
        Auction memory auction = auctions[_auctionId];
        uint256 startPrice = auction.startingPrice;
        uint256 endPrice = auction.endingPrice;
        uint256 startTime = auction.startingTime;
        uint256 duration = auction.duration;
        if (block.timestamp >= startTime + duration) {
            return endPrice;
        } else {
            uint256 elapsed = block.timestamp - startTime;
            uint256 remaining = duration - elapsed;
            return startPrice - ((startPrice - endPrice) * elapsed) / remaining;
        }
    }

    function setTerms(Terms memory _terms) external returns (uint256) {
        loanTerms.push(_terms);
        emit TermsSet(loanTerms.length - 1, _terms);
        return loanTerms.length - 1;
    }

    function updateBorrower(uint256 _loanId, address _borrower) external {
        Loan storage loan = loans[_loanId];
        require(loan.lender == msg.sender, "Only Borrower can update borrower");
        loan.borrower = _borrower;
    }

    function getLoan(uint256 _loanId) external view returns (Loan memory loan) {
        loan = loans[_loanId];
        loan.debtAmount += calculateInterest(loan.interestRate, loan.debtAmount, loan.startingTime, block.timestamp);
    }

    function isContract(address _addr) private view returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(_addr)
        }
        return size > 0;
    }

    function calculateInterest(uint256 _interestRate, uint256 _debt, uint256 _startTime, uint256 _endTime) public pure returns (uint256) {
        uint256 timeElapsed = _endTime - _startTime;
        return (_interestRate * _debt * timeElapsed) / (365 days * SCALAR);
    }
}