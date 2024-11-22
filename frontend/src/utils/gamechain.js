import { readContract, writeContract, getAccount } from "@wagmi/core";
import gamechain from "../contracts/Gamechain/Gamechain.json";
import monsterCard from "../contracts/MonsterCard/MonsterCard.json";
import { config } from "../config/wagmi";
import { formatEther, parseEther } from "ethers";

export const getMonster = async (id) => {
  let monsterDetails = {};

  const monster = await readContract(config, {
    abi: gamechain.abi,
    address: gamechain.contractAddress,
    functionName: "getMonster",
    args: [id],
  });

  monsterDetails.name = monster[1];
  monsterDetails.price = formatEther(monster[2]);
  monsterDetails.monsterId = id;

  const req = await fetch(monster[0]);
  const res = await req.json();
  monsterDetails = {
    ...monsterDetails,
    ...res,
  };

  return monsterDetails;
};

export const getMonsters = async () => {
  console.log("Fetching monsters...");
  const tokenIds = await readContract(config, {
    abi: gamechain.abi,
    address: gamechain.contractAddress,
    functionName: "tokenIds",
  });

  const monsters = [];
  if (!tokenIds) {
    console.log("No monsters found");
    return monsters;
  }

  for (let i = 0; i < tokenIds; i++) {
    const monster = await getMonster(i);
    monsters.push(monster);
  }

  return monsters;
};

export const getOwnerMonsters = async (address) => {
  try {
    const tokenIds = await readContract(config, {
      abi: gamechain.abi,
      address: gamechain.contractAddress,
      functionName: "tokenIds",
    });

    const monsters = [];
    if (!tokenIds) {
      console.log("No monsters found");
      return monsters;
    }

    for (let i = 0; i < tokenIds; i++) {
      const monster = await readContract(config, {
        abi: gamechain.abi,
        address: gamechain.contractAddress,
        functionName: "monsterCards",
        args: [i],
      });
      console.log(monster)

      const ownerBalance = await readContract(config, {
        abi: monsterCard.abi,
        address: monster,
        functionName: "balanceOf",
        args: [address],
      });

      if (ownerBalance.toString() < 1) {
        continue;
      }

      const monsterDetails = await getMonster(i);

      monsters.push(monsterDetails);
    }
    
    return monsters;
  } catch (error) {
    console.log(error);
    alert("Error fetching owner monsters");
  }
};

export const buyMonsterCard = async (id, price) => {
  console.log(id);
  const { address } = getAccount(config);
  console.log(address);
  try {
    const contractAddress = await readContract(config, {
      abi: gamechain.abi,
      address: gamechain.contractAddress,
      functionName: "monsterCards",
      args: [id],
    });
    console.log(contractAddress);

    if (!contractAddress) {
      alert("No contract address found");
      return;
    }

    const txHash = await writeContract(config, {
      abi: monsterCard.abi,
      address: contractAddress,
      functionName: "purchaseCard",
      account: address,
      value: parseEther(price),
    });

    return txHash;
  } catch (error) {
    console.log(error);
    alert("Error buying monster card");
  }
};

// Check if the game mood is PvC, PVP or multiplayer
// This will help in appropriately defining contract args
export const rewardWinner = async (winnerAddress, loserAddress = null, id, winner) => {
  console.log(winnerAddress, id, winner);
  try {
    // Checks if the loser is a player
    if(loserAddress) {
      // If loser is a player, then the loser's NFT goes to the smart contract as the winner
      const monsterContractAddress = await readContract(config, {
        abi: gamechain.abi,
        address: gamechain.contractAddress,
        functionName: "monsterCards",
        args: [id],
      });

      const getMonterTokenId = await readContract(config, {
        abi: monsterCard.abi,
        address: monsterContractAddress,
        functionName: "buyers",
        args: [loserAddress],
      });

      const monsterTokenId = getMonterTokenId[1].toString();

      // Send the NFT back to the smart contract
      const txHash = await writeContract(config, {
        abi: monsterCard.abi,
        address: monsterContractAddress,
        functionName: "sendCardToWinner",
        args: [winnerAddress, loserAddress, monsterTokenId],
      });

      console.log(txHash);
    } else {
      // If the loser is the computer, then player is gifted the computer's NFT
      const monsterContractAddress = await readContract(config, {
        abi: gamechain.abi,
        address: gamechain.contractAddress,
        functionName: "monsterCards",
        args: [id],
      });
      console.log(monsterContractAddress)

      // Reward the winner with the computer's NFT
      const txHash = await writeContract(config, {
        abi: monsterCard.abi,
        address: monsterContractAddress,
        functionName: "freeMint",
        args: [winnerAddress, true],
        // account: winnerAddress,
      });

      console.log(txHash);
    }

  } catch (error) {
    console.log(error);
    alert("Error rewarding winner");
  }
}