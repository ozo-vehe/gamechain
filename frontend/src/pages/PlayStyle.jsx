import { useState } from "react";
// import { monsters } from "../utils";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserMonsters } from "../features/gamechain/gamechainSlice";

const PlayStyle = () => {
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedMonster, setSelectedMonster] = useState(null);
  // const [monsters, setMonsters] = useState([]);

  const monsters = useSelector((state) => getUserMonsters(state));

  const navigate = useNavigate();

  const playStyles = [
    {
      id: "pvc",
      title: "Player vs Computer",
      description: "Play against a computer opponent",
      icon: "🤖",
      isAvailable: true,
    },
    {
      id: "pvp",
      title: "Player vs Player",
      description: "Challenge another player locally",
      icon: "🤺",
      isAvailable: false,
    },
    {
      id: "multiplay",
      title: "Multiplayer",
      description: "Play with multiple players online",
      icon: "👥",
      isAvailable: false,
    },
  ];

  const getStyleOfPlay = (styleId) => {
    const styleOfPlay = playStyles.find((style) => style.id === styleId);
    return styleOfPlay ? styleOfPlay.title : "";
  };

  return (
    <div className="min-h-[90vh] max-w-[1440px] mx-auto py-12 px-5 sm:px-6 lg:px-8">
      <div className="w-full mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8 michroma">
          Select Your Play Style
        </h1>
        <div className="flex flex-wrap w-full gap-6 items-center justify-center">
          {playStyles.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style.id)}
              className={`p-6 lg:w-[280px] md:w-[250px] w-[250px] lg:h-[200px] md:h-[200px] h-fit rounded-lg shadow-md transition-all duration-300 ${
                selectedStyle === style.id
                  ? "bg-cyan-700 text-white transform scale-105"
                  : "bg-white hover:bg-gray-50"
              } ${
                !style.isAvailable &&
                "opacity-70 border-2 border-red-500 cursor-not-allowed"
              }`}
              disabled={!style.isAvailable}
            >
              <div className="text-4xl mb-4">{style.icon}</div>
              <h2 className="lg:text-[18px] md:text-[16px] text-[16px] font-[700] mb-2 michroma">
                {style.title}
              </h2>
              <p className="text-sm">{style.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Display the selected style */}
      {selectedStyle && (
        <div className="mt-8 text-center">
          <p className="mb-4">Style of play: {getStyleOfPlay(selectedStyle)}</p>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-2 michroma">
            Pick a Monster
          </h2>

          {/* Start Game Button */}
          {selectedMonster && (
            <div className="text-center">
              <button
                className="bg-cyan-700 text-sm text-white px-5 py-3 font-semibold hover:bg-cyan-800
              transform transition-transform hover:scale-105"
                onClick={() =>
                  navigate(`/play/${selectedStyle}`, {
                    state: { monster: selectedMonster },
                  })
                }
              >
                Start game with: {selectedMonster.name}
              </button>

              <p className="mt-2 text-red-600 text-[10px] max-w-[300px] mx-auto">
                Warning: If you lose the match, your monster will be lost.
                However, if you win, you will gain a new NFT!
              </p>
            </div>
          )}

          <div className="w-[400px] mx-auto flex items-center justify-center">
            <Splide
              className="w-[300px] mx-auto flex items-center justify-center"
              aria-live="polite"
            >
              {monsters.length > 0 ? (
                <>
                  {monsters.map((monster, _i) => (
                    <SplideSlide key={_i}>
                      <img
                        onClick={() => setSelectedMonster(monster)}
                        className="w-[250px] h-[250px] object-contain mx-auto cursor-pointer"
                        src={monster.image}
                        alt="Winged Monarch"
                      />
                      <p className="font-[600] text-[20px] text-center mt-4 michroma">
                        {monster.name}
                      </p>
                    </SplideSlide>
                  ))}
                </>
              ) : (
                <div className="flex items-center justify-center font-[600]">
                  <p className="text-lg text-gray-600">No monsters found</p>
                </div>
              )}
            </Splide>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayStyle;
