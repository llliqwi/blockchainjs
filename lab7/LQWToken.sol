pragma solidity ^0.8.20;
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract LQWToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("LIQW", "LQW") public {
        _mint(msg.sender, initialSupply*10**uint256(18));
    }
}