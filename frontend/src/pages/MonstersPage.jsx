import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUploadedMonsters } from "../features/gamechain/gamechainSlice";

const MonsterSelection = () => {
  const [selectedMonster, setSelectedMonster] = useState(null);

  const navigate = useNavigate();
  const monsters = useSelector((state) => getUploadedMonsters(state));

  const handleMonsterSelect = (monster) => {
    setSelectedMonster(monster);
  };

  return (
    <section className="max-w-[1440px] mx-auto py-8 min-h-[90vh] lg:px-10 md:px-5 px-5">
      <h2 className="text-3xl font-bold text-center mb-4">
        Monster Marketplace
      </h2>
      <div className="flex flex-wrap gap-8 items-center justify-center">
        {monsters.length > 0 ? (
          <>
            {monsters.map((monster, _i) => (
              <div
                onClick={() => navigate(`/monsters/${monster.id}`, {state: {monster}})}
                key={_i}
                className={`relative border border-gray-100 p-5 w-[300px] h-[400px] flex flex-col items-center justify-between shadow-md transition-all duration-200 ${
                  selectedMonster === monster ? "selected-monster" : "monster"
                }`}
              >
                <img
                  onClick={() => handleMonsterSelect(monster)}
                  className={`w-full border bg-cyan-700 p-3 h-[80%] object-contain cursor-pointer relative transition-all duration-200 ${
                    selectedMonster === monster ? "selected-monster" : "monster"
                  }`}
                  src={monster.image}
                  alt="Winged Monarch"
                />
                <p className="flex gap-1 items-center justify-center font-[600] text-[20px] text-center mt-4 michroma relative">
                  {monster.name}
                </p>
              </div>
            ))}
          </>
        ) : (
          <p>No monster available</p>
        )}
      </div>

      {selectedMonster && (
        <div className="mt-8 text-center">
          <button
            className="bg-cyan-700 text-white px-8 py-3 font-semibold hover:bg-cyan-800 
              transform transition-transform hover:scale-105"
            onClick={() => navigate("/play")}
          >
            Confirm Selection: {selectedMonster.name}
          </button>
        </div>
      )}
    </section>
  );
};

export default MonsterSelection;
