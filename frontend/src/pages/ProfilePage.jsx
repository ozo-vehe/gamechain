import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { getBalance } from '@wagmi/core';
import { arbitrumSepolia } from 'viem/chains';
import { formatEther } from 'ethers';
import { config } from '../config/wagmi';
import { getUserMonsters } from '../features/gamechain/gamechainSlice';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const { address } = useAccount();
  const [balance, setBalance] = useState(0);
  const [stats, setStats] = useState({
    wins: 0,
    losses: 0,
    totalBattles: 0,
    winRate: 0
  });

  const monsters = useSelector((state) => getUserMonsters(state));

  useEffect(() => {
    // Fetch player stats from backend
    // This is a placeholder - implement actual API call
    const fetchStats = async () => {
      const { value } = await getBalance(config, {
        address: address,
        chainId: arbitrumSepolia.id
      })
      if(value) {
        const balance = Number(formatEther(value)).toFixed(4);
        setBalance(balance)
      }

      setStats({
        wins: 0,
        losses: 0,
        totalBattles: 0,
        winRate: 0
      });
    };
    fetchStats();
  }, [address]);

  return (
    <div className="max-w-[1440px] mx-auto lg:px-10 md:px-5 px-5 py-8 min-h-[80vh]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Profile Header */}
        <div className="col-span-full rounded-lg p-6 border border-gray-100">
          <h1 className="text-3xl font-bold mb-4 michroma">Player Profile</h1>
          <p className="text-gray-700 truncate">Wallet: {address.substring(0, 4)}...{address.substring(address.length - 4)}</p>
          <p className="text-cyan-700 font-[500] mt-2">Balance: {balance} ETH</p>
        </div>

        {/* Stats Card */}
        <div className="rounded-lg p-6 border border-gray-100">
          <h2 className="text-xl font-bold michroma b-4">Battle Statistics</h2>
          <div className="grid grid-cols-2 gap-4 py-8">
            <div className="text-center">
              <p className="text-gray-800">Wins</p>
              <p className="text-2xl font-bold text-green-400">{stats.wins}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-800">Losses</p>
              <p className="text-2xl font-bold text-red-400">{stats.losses}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-800">Total Battles</p>
              <p className="text-2xl font-bold">{stats.totalBattles}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-800">Win Rate</p>
              <p className="text-2xl font-bold">{stats.winRate}%</p>
            </div>
          </div>
        </div>

        {/* Monsters Collection */}
        <div className="col-span-1 md:col-span-2 rounded-lg p-6 border border-gray-100">
          <h2 className="text-xl font-bold mb-4 michroma">My Monsters</h2>
          <div className="flex flex-wrap items-center gap-4">
            {monsters.length > 0 && monsters?.map((monster) => (
              <div key={monster.id} className="bg-gray-100 rounded-lg p-3 hover:bg-gray-200 transition-colors cursor-pointer w-[200px] h-[250px]">
                <img 
                  src={monster.image} 
                  alt={monster.name}
                  className="w-full h-[70%] object-contain object-top rounded-md mb-2"
                />
                <p className="text-center font-medium">{monster.name}</p>
                <p className="text-gray-700 text-sm text-center">Rarity: {monster.attributes[2].value}</p>
              </div>
            ))}
            {monsters.length === 0 && <p className="text-gray-500 w-full">You don&apos;t have any monsters yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
