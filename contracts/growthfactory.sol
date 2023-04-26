// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "./growthpair.sol";

contract GwrFactory is IGwrFactory {
    bytes32 public constant INIT_CODE_PAIR_HASH = keccak256(abi.encodePacked(type(GwrPair).creationCode));

    uint256 public fee;
    address public feeTo;
    address public feeToSetter;

    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;

    constructor(address _feeTo, uint256 _fee) {
        feeTo = _feeTo;
        fee = _fee;
        feeToSetter = msg.sender;
    }

    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }

    function createPair(address tokenA, address tokenB) external returns (address pair) {
        require(tokenA != tokenB, "Growth: IDENTICAL_ADDRESSES");
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), "Growth: ZERO_ADDRESS");
        require(getPair[token0][token1] == address(0), "Growth: PAIR_EXISTS"); // single check is sufficient
        bytes memory bytecode = type(GwrPair).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        IGwrPair(pair).initialize(token0, token1);
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // populate mapping in the reverse direction
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }

    function setFee(uint256 _fee) external {
        require(msg.sender == feeToSetter, "Growth: FORBIDDEN");
        fee = _fee;
    }

    function setFeeTo(address _feeTo) external {
        require(msg.sender == feeToSetter, "Growth: FORBIDDEN");
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external {
        require(msg.sender == feeToSetter, "Growth: FORBIDDEN");
        feeToSetter = _feeToSetter;
    }
}