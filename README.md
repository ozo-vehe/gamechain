# **GameChain**: Decentralized NFT Card Game  

## 🐉 Project Overview  

GameChain is a decentralized application (dApp) built to bring innovation into card games. It provides a fun, interactive, and rewarding way for users to buy, battle monster-themed cards and win or lose monsters. Unlike traditional games where centralized platforms control assets, these cards are NFTs (Non-Fungible Tokens), which give players true ownership of their assets. It is a hybrid game based on the anime `Bakugan` that leverages on-chain assets, like tokens or NFTs, but where gameplay events happen off-chain.

---

## 🧩 **Core Features**  

1. **Purchase Monster Cards**:  
   Players can mint unique monster cards (NFTs) directly on the platform, ensuring randomness and fairness in card distribution.  

2. **Card Ownership**:  
   Every monster card is minted as an ERC-721 NFT, allowing users to own their cards fully.  

3. **Competitive Battles**:  
   Players can engage in battles, and the winner takes ownership of the losing player’s card, creating a high-stakes environment.  

4. **Marketplace Compatibility**:  
   Cards are tradeable on any NFT marketplace, as they align with the ERC-721 standard.  

5. **Immutable Metadata**:  
   Each card is tied to unique metadata, ensuring its properties and attributes remain consistent.  

---

## 🔨 **How the Project is Built**  

### **Smart Contracts**  
The project leverages Solidity to implement core functionalities. The two main contracts used are:  
1. **`MonsterCard.sol`**:  
   - Handles minting, ownership, and player rewards for each monster NFT.  
   - Implements ERC-721 standards with `ERC721Enumerable` and `ERC721URIStorage` extensions.  

2. **`Gamechain.sol`**:  
   - Tracks ownership changes of monster cards.  
   - Records each monster cards for front-end display.  

### **Frontend**  
- **React.js**: Used for creating the user interface.
- **Redux toolkit**: Used for state management to prevent multiple read calls to the smart contract and enhance user experience by providing a seamless user interface.
- **Rainbowkit**: For customised wallet connection.
- **Web3.js/Ethers.js**: For interacting with smart contracts deployed on the blockchain.  
- **CSS/TailwindCSS**: Provides an intuitive, responsive, and visually appealing UI.  

### **Backend**  
- **Hardhat**: For contract testing, easy development and deployment

### **Storage**  
- **IPFS/Filebase**: For storing and retrieving monster card metadata (image, description, abilities).  
- **Blockchain**: For storing ownership and gameplay state.  

### **Deployment**  
- **Smart Contracts**: Deployed using Hardhat on a testnet (Arbitrum sepolia).  
- **Frontend**: Hosted using Vercel or Netlify for ease of access.  

---

## 💡 Problems Faced and Solutions  

### 1. **Problem**: Tracking Ownership of Cards  
   - **Challenge**: Keeping an updated list of all the cards owned by a player.  
   - **Solution**: A secondary contract (`MonsterOwners.sol`) was introduced to map addresses to a list of monster card metadata URIs, enabling a simple way to retrieve owned cards for display.  

### 2. **Problem**: Preventing Reentrant Attacks  
   - **Challenge**: Securing the platform from malicious reentrant function calls during token transfers.  
   - **Solution**: The `nonReentrant` modifier from OpenZeppelin’s `ReentrancyGuard` was used to secure critical functions.  

### 3. **Problem**: Card Duplication Bugs  
   - **Challenge**: Preventing duplicate cards from being minted.  
   - **Solution**: Added checks to ensure the token ID does not already exist before minting.  

### 4. **Problem**: High Gas Costs  
   - **Challenge**: Ethereum network gas fees can be high, especially for NFT-related transactions.  
   - **Solution**: Optimized the smart contract by using gas-efficient coding practices, such as minimizing state changes and redundant storage.  

### 5. **Problem**: Ensuring Player Fairness in Battles  
   - **Challenge**: Avoiding unfair outcomes or exploits during battles.  
   - **Solution**: Enforced strict ownership verification before transferring cards during battles, ensuring only legitimate players can participate.  

---

## 🌟 **Detailed Features**  

1. **Minting Monster Cards**  
   Players can mint monster cards using the `purchaseCard` function. Each card has unique metadata stored on IPFS, ensuring rarity and value.  

2. **Battle Mechanism**  
   Players can compete against each other using their monster cards. The winner of the battle receives the losing player’s monster card.  

3. **Ownership Tracking**  
   A separate smart contract tracks the history and current ownership of all cards, simplifying data retrieval for frontend integration.  

4. **Secure Transactions**  
   - All transactions are secured by Ethereum’s blockchain.  
   - Refunds are automatically processed for overpayments.  

5. **Interoperability**  
   Cards can be listed, traded, or auctioned on external NFT marketplaces like OpenSea.  

---

## 🚀 **Getting Started**  

### Prerequisites  
- **Node.js** and npm installed.  
- **MetaMask** browser extension for interacting with the dApp.  
- A testnet wallet with ETH for gas fees.  

### Installation  

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/your-repo-link.git
   cd your-repo-link
   ```  

2. **Install Dependencies**  
   ```bash
   npm install
   ```  

3. **Deploy Smart Contracts**  
   Update the network details in `hardhat.config.js` and deploy the contracts:  
   ```bash
   npx hardhat run scripts/deploy.js --network <network-name>
   ```  

4. **Start the Frontend**  
   ```bash
   npm start
   ```  

---

## 🎮 **How to Use the dApp**  

1. **Mint a Monster Card**  
   - Connect your MetaMask wallet.  
   - Pay the required ETH to mint a unique monster card.  

2. **View Owned Cards**  
   - Navigate to the "My Cards" section to view all monster cards you own.  

3. **Battle (Computer for now, as PVP and Multiplayer modes are in development)**
   - Initiate a battle and stake your monster card. 
   - If you win, you receive the opponent’s card.

---

## 🏗️ **Future Enhancements**  

1. **New Game Modes**
   - Introduce PvE (Player vs Environment) challenges for solo gameplay.  
   - Add team-based multiplayer battles.
   - Finish PvP development

2. **Dynamic Monster Attributes**
   - Cards will have upgradable skills and attributes based on gameplay.  

3. **Cross-Chain Compatibility**  
   - Expand to other blockchains like Polygon and BNB Chain for lower fees.  

4. **Native Marketplace**  
   - Build an in-app marketplace for direct trades between players.
   - Exchange of monsters and ability cards

5. **AI Integration**
   - Integrate AI with different levels of difficulty to simulate more interactive and engaging battles

---

## 🎥 **Demo Video** 

https://github.com/user-attachments/assets/b5fe3730-2959-40c2-91c0-e58a363ffc17


