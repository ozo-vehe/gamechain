// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title MonsterCard
 * @dev An ERC721-based NFT contract for trading monster cards with additional functionality.
 * Implements features for buying cards, transferring cards between players, and withdrawing Ether.
 */
contract MonsterCard is
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    Ownable,
    ReentrancyGuard
{
    uint256 public price; // Price for purchasing a card
    string public baseURI; // Base URI for token metadata
    uint256 public monsterTokenIds = 1; // Counter for token IDs (starts from 1)

    // Event to log received Ether
    event Received(address indexed from, uint256 amount);

    // Struct to track card buyers
    struct Buyer {
        bool status; // Indicates if the buyer already owns a card
        uint256 tokenId; // ID of the purchased card
    }

    // Mapping to track buyers and their card ownership
    mapping(address => Buyer) public buyers;

    /**
     * @dev Constructor to initialize the contract with the necessary parameters.
     * @param initialOwner The address that will be the owner of the contract.
     * @param _name The name of the NFT collection.
     * @param _price The price of each monster card.
     * @param _symbol The symbol for the NFT collection.
     * @param _uri The base URI for metadata.
     */
    constructor(
        address initialOwner,
        string memory _name,
        uint256 _price,
        string memory _symbol,
        string memory _uri
    ) ERC721(_name, _symbol) Ownable(initialOwner) {
        require(initialOwner != address(0), "Invalid initial owner address");
        require(bytes(_uri).length > 0, "Base URI cannot be empty");

        price = _price;
        baseURI = _uri;
    }

    /**
     * @dev Allows a user to purchase a monster card by minting a new token.
     * Requirements:
     * - Caller must not be the contract owner.
     * - Caller must send enough Ether to meet the card price.
     * - Caller must not already own a card.
     */
    function purchaseCard() public payable nonReentrant {
        require(msg.sender != owner(), "Owner cannot buy this card");
        require(msg.value >= price, "Insufficient funds to purchase card");
        require(!buyers[msg.sender].status, "Already bought this token");

        // Mint the token to the purchaser's address and set its URI
        _safeMint(msg.sender, monsterTokenIds);
        _setTokenURI(monsterTokenIds, baseURI);

        // Update buyer status
        buyers[msg.sender] = Buyer({status: true, tokenId: monsterTokenIds});

        monsterTokenIds++; // Increment the token ID for the next mint
    }

    /**
     * @dev Transfers a monster card from a losing player to the winning player.
     * @param winnerAddress The address of the winning player.
     * @param loserAddress The address of the losing player.
     * @param monsterId The ID of the monster card to transfer.
     * Requirements:
     * - The losing player must own the specified monster card.
     * - The caller must be approved to transfer the monster card.
     */
    function sendCardToWinner(
        address winnerAddress,
        address loserAddress,
        uint256 monsterId
    ) public nonReentrant {
        require(
            ownerOf(monsterId) == loserAddress,
            "Loser does not own this monster card"
        );

        // Transfer card from the loser to the winner
        transferFrom(loserAddress, winnerAddress, monsterId);

        buyers[loserAddress] = Buyer({status: false, tokenId: 0});
        buyers[winnerAddress] = Buyer({status: true, tokenId: monsterId});
    }

    /**
     * @dev Transfers a monster card from a losing player to the winning player.
     * @param playerAddress The address of the winning player.
     * @param isWinner A boolean indicating if the player is the winner or loser.
     * Requirements:
     * - The player must have won a match against the computer.
     * - The player must not already own a card.
     */
    function freeMint(
        address playerAddress,
        bool isWinner
    ) public {
        require(isWinner, "You must have won a match against computer before you can mint a card");
        
        // Mint the token to the purchaser's address and set its URI
        _safeMint(playerAddress, monsterTokenIds);
        _setTokenURI(monsterTokenIds, baseURI);

        // Update buyer status
        buyers[playerAddress] = Buyer({status: true, tokenId: monsterTokenIds});

        monsterTokenIds++; // Increment the token ID for the next mint
    }

    /**
     * @dev Allows the contract owner to withdraw all Ether collected in the contract.
     * Requirements:
     * - There must be Ether in the contract balance.
     */
    function withdrawEther() external onlyOwner nonReentrant {
        uint256 amount = address(this).balance;
        require(amount > 0, "No Ether available for withdrawal");

        (bool sent, ) = payable(owner()).call{value: amount}("");
        require(sent, "Failed to withdraw Ether");
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    /**
     * @dev Function to handle incoming Ether transfers.
     */
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    fallback() external payable {
        emit Received(msg.sender, msg.value);
    }

    /**
     * @dev Override required by Solidity for multiple inheritance of ERC721 and ERC721Enumerable.
     */
    function _update(
        address to,
        uint256 _tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, _tokenId, auth);
    }

    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    /**
     * @dev Override required by Solidity for multiple inheritance of ERC721 and ERC721URIStorage.
     */
    function tokenURI(
        uint256 _tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(_tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
