// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./MonsterCard.sol";

/**
 * @title Gamechain
 * @dev A contract to manage and upload monster cards in the game.
 */
contract Gamechain is Ownable {
    uint256 public tokenIds; // Counter for unique token IDs

    // Mapping from tokenId to MonsterCard instance
    mapping(uint256 => MonsterCard) public monsterCards;

    /**
     * @dev Constructor that sets the initial owner of the contract.
     * @param _owner Address of the initial owner of the contract.
     */
    constructor(address _owner) Ownable(_owner) {}

    /**
     * @dev Event emitted when a new monster card is uploaded.
     * @param tokenId The ID of the new card.
     * @param cardAddress The contract address of the newly created MonsterCard.
     */
    event MonsterCardUploaded(uint256 indexed tokenId, address indexed cardAddress);

    /**
     * @dev Allows the owner to create and upload a new monster card.
     * @param cardName The name of the monster card collection.
     * @param cardSymbol The symbol of the monster card collection.
     * @param cardURI The base URI for the monster card metadata.
     * @param cardPrice The price of the monster card.
     */
    function uploadMonsterCard(
        string memory cardName,
        string memory cardSymbol,
        string memory cardURI,
        uint256 cardPrice
    ) public onlyOwner {
        // Deploy a new MonsterCard contract
        MonsterCard uploadedMonsterCard = new MonsterCard(msg.sender, cardName, cardPrice, cardSymbol, cardURI);

        // Store the new MonsterCard instance in the mapping
        monsterCards[tokenIds] = uploadedMonsterCard;

        // Emit an event for the uploaded monster card
        emit MonsterCardUploaded(tokenIds, address(uploadedMonsterCard));

        // Increment the token ID counter
        tokenIds++;
    }

    /**
     * @dev Returns the base URI of a specific monster card.
     * @param monsterId The ID of the monster card.
     * @return The base URI of the monster card.
     * @return The name of the monster card.
     * @return The price of the monster card.
     */
    function getMonster(uint256 monsterId) public view returns (string memory, string memory, uint256) {
        // Ensure the requested card ID exists
        require(address(monsterCards[monsterId]) != address(0), "Monster card does not exist");

        MonsterCard monsterCardDetails = monsterCards[monsterId];
        return (monsterCardDetails.baseURI(), monsterCardDetails.name(), monsterCardDetails.price());
    }
}
