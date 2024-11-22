import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { buyMonsterCard } from "../utils/gamechain";
import { useAccount } from "wagmi";
import { useDispatch } from "react-redux";
import { fetchUserMonsters, fetchMonsters } from "../features/gamechain/gamechainSlice";

const OWNER_ADDRESS = "0x6b7978560661acC18d861b5701f2843dD685b6bF";

const MonsterDetailsPage = () => {
  const [monster, setMonster] = useState(null);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const location = useLocation();
  const { address } = useAccount();
  const dispatch = useDispatch();

  const buy = async (id, price) => {
    setPurchaseLoading(true);
    try {
      await buyMonsterCard(id, price);
      dispatch(fetchMonsters());
      dispatch(fetchUserMonsters(address));
      setPurchaseLoading(false);
      alert("Monster purchased successfully!");
    } catch (error) {
      console.log(error);
      setPurchaseLoading(false);
    }
  };

  useEffect(() => {
    setMonster(location.state.monster);
    console.log(location.state.monster);
  }, [location.state.monster]);

  if (!monster) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-2xl">Monster not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] min-h-[80vh] mx-auto px-4 py-8">
      <div className="flex items-start justify-center gap-8">
        <div className="p-4 lg:w-[550px] md:w-[300px] w-full lg:h-[650px] md:h-[400px] h-fit ">
          <img
            className="w-full h-full object-contain"
            src={monster.image}
            alt={monster.name}
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-cyan-700 font-semibold">
            {monster.type}
          </div>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            {monster.name}
          </h1>
          <p className="text-cyan-700 font-[600] text-2xl mt-1 flex items-center gap-4">
            <span>{monster.price}ETH</span>
            {address !== OWNER_ADDRESS && (
              <span
                onClick={() => buy(monster.monsterId, monster.price)}
                className="bg-cyan-700 text-white cursor-pointer py-1 px-4 rounded-[4px] capitalize text-sm flex items-center justify-center h-7 min-w-[60px]"
              >
                {purchaseLoading ? (
                <span className="animate-spin border-white border-x-2 rounded-full w-4 h-4">
                </span>
                ) : (
                  "buy"
                )}
              </span>
            )}
          </p>
          <div className="my-8">
            <h2 className="text-xl font-semibold mb-4">Abilities</h2>
            <div className="abilities flex flex-wrap items-center justify-between gap-2 w-full">
              <div className="attack text-center">
                <h3>Attack</h3>
                <div className="flex flex-wrap items-center gap-2">
                  {monster.abilities.attack.map((ability, _i) => (
                    <div
                      key={_i}
                      className="flex flex-col items-center gap-2 w-[130px] h-[170px] border border-gray-100 rounded-[4px] overflow-hidden "
                    >
                      <div className="ability-image w-full h-[70%] p-2">
                        <img
                          className="w-full h-full object-cover rounded-[4px]"
                          src={ability.image}
                          alt="info"
                        />
                      </div>
                      <div className="ability-details mb-2">
                        <p className="text-gray-700 text-[12px]">
                          {ability.name}
                        </p>
                        <p className="text-[12px] text-gray-700">
                          Damage: {ability.damage}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="defense text-center">
                <h3>Defense</h3>
                <div className="flex flex-wrap items-center gap-2">
                  {monster.abilities.defense.map((ability, _i) => (
                    <div
                      key={_i}
                      className="flex flex-col items-center gap-2 w-[130px] h-[170px] border border-gray-100 rounded-[4px] overflow-hidden "
                    >
                      <div className="ability-image w-full h-[70%] p-2">
                        <img
                          className="w-full h-full object-cover rounded-[4px]"
                          src={ability.image}
                          alt="info"
                        />
                      </div>
                      <div className="ability-details mb-2">
                        <p className="text-gray-700 text-[12px]">
                          {ability.name}
                        </p>
                        <p className="text-[12px] text-gray-700">
                          Block: {ability.block}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="healing text-center">
                <h3>Healing</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex flex-col items-center gap-2 w-[130px] h-[170px] border border-gray-100 rounded-[4px] overflow-hidden ">
                    <div className="ability-image w-full h-[70%] p-2">
                      <img
                        className="w-full h-full object-cover rounded-[4px]"
                        src={monster.abilities.healing.image}
                        alt="info"
                      />
                    </div>
                    <div className="ability-details mb-2">
                      <p className="text-gray-700 text-[12px]">
                        {monster.abilities.healing.name}
                      </p>
                      <p className="text-[12px] text-gray-700">
                        Heal: {monster.abilities.healing.heal}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="my-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{monster.description}</p>
          </div>

          <div className="my-6">
            <h2 className="text-xl font-semibold mb-2">Stats</h2>
            <ul className="attributes text-gray-700">
              {monster.attributes?.slice(2).map((attribute, _i) => (
                <li
                  key={_i}
                  className="px-3 py-1 text-sm list-disc list-inside"
                >
                  {attribute.trait_type}: {attribute.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonsterDetailsPage;
