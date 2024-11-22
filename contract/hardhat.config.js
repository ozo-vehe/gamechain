require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

// NEVER record important private keys in your code - this is for demo purposes

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: '0.8.27',
  networks: {
    hardhat: {
      chainId: 1337,
    },
    arbitrumSepolia: {
      url: 'https://sepolia-rollup.arbitrum.io/rpc',
      chainId: 421614,
      accounts: [process.env.SEPOLIA_TESTNET_PRIVATE_KEY]
    },
  },
};
