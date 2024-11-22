const hre = require("hardhat");


async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address); 

  const gamechain = await hre.ethers.deployContract('Gamechain', [deployer.address]);

  await gamechain.waitForDeployment();

  console.log('Gamechain deployed to:', gamechain.target);

  // for (const account of accounts) {
  //   console.log(account.address);
  // }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});