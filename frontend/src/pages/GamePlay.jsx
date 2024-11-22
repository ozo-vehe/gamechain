import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
// import { monsters } from "../utils";
import { useNavigate, useLocation } from "react-router-dom";
import { rewardWinner } from "../utils/gamechain";
import { useAccount } from "wagmi";
import gamechain from "../contracts/Gamechain/Gamechain.json";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserMonsters, getUploadedMonsters } from "../features/gamechain/gamechainSlice";

// CONSTANTS
// const PLAYERMONSTER = monsters[0];

const GamePlay = () => {
  const [playerHand, setPlayerHand] = useState([]);
  const [computerHand, setComputerHand] = useState([]);
  const [playerScore, setPlayerScore] = useState(100);
  const [computerScore, setComputerScore] = useState(100);
  const [computerMonster, setComputerMonster] = useState();
  const [totalMoves, setTotalMoves] = useState(0);
  const [playedCard, setPlayedCard] = useState({});
  const [played, setPlayed] = useState(false);
  const [turn, setTurn] = useState("player");
  const [notification, setNotification] = useState(false);
  const [playAgainLoading, setPlayAgainLoading] = useState(false);
  const [goHomeLoading, setGoHomeLoading] = useState(false);

  const monsters = useSelector((state) => getUploadedMonsters(state));

  const computerRef = useRef(null);

  const location = useLocation();
  const { monster: PLAYERMONSTER } = location.state;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { address } = useAccount();

  // Computer's Cards
  const [computerAttackCards, setComputerAttackCards] = useState([]);
  const [computerDefenseCards, setComputerDefenseCards] = useState([]);
  const [computerHealingCards, setComputerHealingCards] = useState([]);

  // Player's Cards
  const attackCards = PLAYERMONSTER.abilities.attack;
  const defenseCards = PLAYERMONSTER.abilities.defense;
  const healingCards = [PLAYERMONSTER.abilities.healing];

  const playCard = (playerCard, type) => {
    setPlayed(true);
    setPlayedCard(playerCard);
    setTimeout(() => {
      setPlayed(false);
      setTurn("computer");
    }, 2000);
    switch (type) {
      case "attack":
        setTotalMoves((prev) => prev + 1);
        {
          setComputerScore((prev) => prev - playerCard.damage);
          setPlayerHand((prev) => {
            const cardExists = prev.find(
              (card) => card.name === playerCard.name
            );
            console.log(cardExists);
            if (cardExists) {
              return [...prev];
            } else {
              return [...prev, playerCard];
            }
          });
          hanldeUsedCard(playerCard);
          if (totalMoves === 10) {
            console.log("Game Over");
          }
        }
        break;
      case "defense":
        setTotalMoves((prev) => prev + 1);
        {
          setPlayerScore((prev) => prev + playerCard.block);
          setPlayerHand((prev) => {
            const cardExists = prev.find(
              (card) => card.name === playerCard.name
            );
            console.log(cardExists);
            if (cardExists) {
              return [...prev];
            } else {
              return [...prev, playerCard];
            }
          });
          hanldeUsedCard(playerCard);
          if (totalMoves === 10) {
            console.log("Game Over");
          }
        }
        break;
      case "healing":
        {
          setTotalMoves((prev) => prev + 1);
          setPlayerScore((prev) => prev + playerCard.heal);
          setPlayerHand((prev) => {
            const cardExists = prev.find(
              (card) => card.name === playerCard.name
            );
            console.log(cardExists);
            if (cardExists) {
              return [...prev];
            } else {
              return [...prev, playerCard];
            }
          });
          hanldeUsedCard(playerCard);
          if (totalMoves === 10) {
            console.log("Game Over");
          }
        }
        break;
      default:
        break;
    }
    // setPlayedCard({})
  };

  const computerPlayCard = (computerCard, type) => {
    setPlayed(true);
    setPlayedCard(computerCard);
    setNotification(true);
    setTimeout(() => {
      setPlayed(false);
      setTurn("player");
    }, 2000);

    setTimeout(() => {
      setNotification(false);
    }, 2000);
    switch (type) {
      case "attack":
        setTotalMoves((prev) => prev + 1);
        {
          setPlayerScore((prev) => prev - computerCard.damage);
          setComputerHand((prev) => {
            const cardExists = prev.find(
              (card) => card.name === computerCard.name
            );
            if (cardExists) {
              return [...prev];
            } else {
              return [...prev, computerCard];
            }
          });
          hanldeUsedCard(computerCard);
          if (totalMoves === 10) {
            console.log("Game Over");
          }
        }
        break;
      case "defense":
        setTotalMoves((prev) => prev + 1);
        {
          setComputerScore((prev) => prev + computerCard.block);
          setComputerHand((prev) => {
            const cardExists = prev.find(
              (card) => card.name === computerCard.name
            );
            if (cardExists) {
              return [...prev];
            } else {
              return [...prev, computerCard];
            }
          });
          hanldeUsedCard(computerCard);
          if (totalMoves === 10) {
            console.log("Game Over");
          }
        }
        break;
      case "healing":
        setTotalMoves((prev) => prev + 1);
        {
          setComputerScore((prev) => prev + computerCard.heal);
          setComputerHand((prev) => {
            const cardExists = prev.find(
              (card) => card.name === computerCard.name
            );

            if (cardExists) {
              return [...prev];
            } else {
              return [...prev, computerCard];
            }
          });
          hanldeUsedCard(computerCard);
          if (totalMoves === 10) {
            console.log("Game Over");
          }
        }
        break;
      default:
        break;
    }
  };

  const hanldeUsedCard = (playedCard) => {
    return playerHand.find((card) => card.name === playedCard.name);
  };

  const handleComputerUsedCard = (playedCard) => {
    return computerHand.find((card) => card.name === playedCard.name);
  };

  const getResult = () => {
    if (playerScore > computerScore) {
      return { result: "You Win", name: "player" };
    } else if (playerScore < computerScore) {
      return { result: "You Lose", name: "computer" };
    } else {
      return { result: "Draw", name: "draw" };
    }
  };

  const playAgain = async () => {
    try {
      setPlayAgainLoading(true);
      const { name } = getResult();
      switch (name) {
        case "player":
          console.log(computerMonster.monsterId)
          await rewardWinner(address, null, computerMonster.monsterId, "player");
          dispatch(fetchUserMonsters(address));
          navigate("/play");
          break;
        case "computer":
          await rewardWinner(gamechain.contractAddress, address, PLAYERMONSTER.monsterId, "computer");
          dispatch(fetchUserMonsters(address));
          navigate("/play");
          // window.location.reload();
          break;
        case "draw":
          navigate("/play");
          break;
        default:
          break;
      }
      setPlayAgainLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const goHome = async () => {
    try {
      setGoHomeLoading(true);
      const { name } = getResult();
      switch (name) {
        case "player":
          await rewardWinner(address, null, computerMonster.monsterId, "player");
          navigate("/");
          dispatch(fetchUserMonsters(address));
          break;
        case "computer":
          await rewardWinner(gamechain.contractAddress, address, PLAYERMONSTER.monsterId, "computer");
          navigate("/");
          dispatch(fetchUserMonsters(address));
          break;
        case "draw":
          navigate("/");
          break;
        default:
          break;
      }
      setGoHomeLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const selectComputerMonster = () => {
      const randomMonster =
        monsters[Math.floor(Math.random() * monsters.length)];
      if(randomMonster.name != PLAYERMONSTER.name) {
        setComputerMonster(randomMonster);
        setComputerAttackCards(randomMonster.abilities.attack);
        setComputerDefenseCards(randomMonster.abilities.defense);
        setComputerHealingCards([randomMonster.abilities.healing]);
      } else {
        selectComputerMonster();
      }
    };
    setTimeout(() => {
      selectComputerMonster();
    }, 3000);
  }, [PLAYERMONSTER.name, monsters]);

  useEffect(() => {
    if (turn === "computer") {
      // Use attribute selector to pick out play buttons that hasn't been used
      // or played by the computer
      // Also show a notification telling users that it's their turn after computer
      const getRandonMove = () => {
        console.log(computerRef.current);
        const buttonArray = computerRef.current.querySelectorAll("button");
        const computerRandomMove = Math.floor(Math.random() * buttonArray.length);
        console.log(computerRandomMove);
        if (!buttonArray[computerRandomMove].disabled) {
          console.log(buttonArray[computerRandomMove]);
          buttonArray[computerRandomMove].click();
          buttonArray[computerRandomMove].disabled = true;
        } else {
          getRandonMove();
        }
      }
      getRandonMove();
    }
  }, [turn]);

  return (
    <>
      {/* Game Play Scores */}
      <div className="scores lg:px-10 md:px-5 px-5 flex items-center justify-between max-w-[1440px] mx-auto">
        <div className="player-score">
          <h2 className="text-2xl font-bold text-center michroma">
            Player Score: {playerScore}
          </h2>
        </div>
        <div className="computer-score">
          <h2 className="text-2xl font-bold text-center michroma">
            Computer Score: {computerScore}
          </h2>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="notification fixed bg-cyan-700 text-white w-[200px] text-center h-[40px] flex items-center justify-center capitalize z-20 top-4 left-[50%] -translate-x-[50%] rounded-[4px] shadow-lg">
          player&apos;s turn
        </div>
      )}
      <div className="min-h-screen relative border border-cyan-700 max-w-[1440px] mx-auto flex lg:flex-row md:flex-row flex-col items-center justify-center mt-4 mb-16">
        {/* Played Card Animation */}
        {playedCard.name && (
          <div
            className={`played-card absolute opacity-0 z-10 rounded-[8px] overflow-hidden border border-gray-200 w-[300px] h-[350px] bg-white ${
              played && "played-card-animation"
            }`}
          >
            {playedCard && (
              <div className="played-card-container w-full h-full">
                <img
                  src={playedCard.image}
                  alt={playedCard.name}
                  className="played-card-image w-full h-[75%] object-cover object-top p-3 rounded-[16px]"
                />
                <p className="played-card-name text-center mt-4 text-xl font-[600]">
                  {playedCard.name}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Game Over Display */}
        {totalMoves == 10 && (
          <div className="fixed top-0 left-0 w-full h-full game-over-display bg-white/90 z-10 flex flex-col items-center justify-center">
            <h2 className="text-5xl michroma font-[700] text-cyan-700">
              Game over
            </h2>
            <p className="text-lg font-[700] mt-3 capitalize">
              Winner: {getResult().name}
            </p>
            {getResult().name === "player" && (
              <p className="text-lg font-[700] mt-3">Congratulations</p>
            )}
            {getResult().name === "computer" && (
              <p className="text-lg font-[700] mt-3">
                Oops! You&apos;ve lost: {PLAYERMONSTER.name}
              </p>
            )}
            {getResult().name === "draw" && (
              <p className="text-lg font-[700] mt-3">A draw it may seem</p>
            )}
            <div className="game-over-button flex gap-2">
              <button
                onClick={() => playAgain()}
                className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-2 px-4 text-[12px] mt-4 flex items-center justify-center min-w-[110px] h-[35px]"
              >
                {playAgainLoading ? (
                  <span className="animate-spin block w-4 h-4 rounded-full border-x-2 border-white"></span>
                ) : (
                  "Play Again"
                )}
              </button>
              <button
                onClick={() => goHome(PLAYERMONSTER)}
                className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-2 px-4 text-[12px] mt-4 flex items-center justify-center min-w-[120px] h-[35px]"
              >
              {goHomeLoading ? (
                <span className="animate-spin block w-4 h-4 rounded-full border-x-2 border-white"></span>
              ) : (
                "Go back home"
              )}
              </button>
            </div>
          </div>
        )}

        {/* Versus Sign */}
        <div className="versus bg-white py-1 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] ">
          <h1 className="text-2xl font-bold text-center michroma">VS</h1>
        </div>

        {/* Player Playfield */}
        <div className="player-playfield p-5 lg:w-[50%] md:w-[50%] w-full lg:border-r lg:border-cyan-700 md:border-r md:border-cayn-700 border-b border-cyan-700 lg:h-full md:h-full h-fit flex gap-y-8 flex-col items-center justify-center">
          {/* Player Monster */}
          <div
            className={`relative p-5 w-[300px] h-[400px] mx-auto flex flex-col items-center justify-between shadow-md transition-all duration-200 monster`}
          >
            <img
              className={`w-full border bg-cyan-700 p-2 h-[80%] object-contain cursor-pointer relative transition-all duration-200 monster`}
              src={PLAYERMONSTER.image}
              alt="Winged Monarch"
            />
            <p className="flex gap-1 items-center justify-center font-[600] text-[20px] text-center mt-4 michroma">
              {PLAYERMONSTER.name}
            </p>
          </div>

          {/* Player Hand/Cards */}
          <div className="monster-cards w-full flex flex-wrap gap-4 items-center justify-center">
            {/* Attack Cards */}
            <div className="attack-cards flex flex-col gap-2 flex-wrap w-fit">
              <h3 className="w-fit text-center mx-auto michroma font-[600]">
                Attack
              </h3>
              <div className="cards w-fit flex gap-2">
                {attackCards.map((card, index) => (
                  <div
                    key={index}
                    className={`attack-card relative border border-cyan-700 w-[150px] h-[200px] flex flex-col items-center justify-between p-2`}
                  >
                    {/* Used Card Overlay */}
                    {hanldeUsedCard(card) && (
                      <div className="used-card absolute top-0 left-0 w-full h-full z-[1] bg-white/70"></div>
                    )}

                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-full h-[60%] object-cover object-top"
                    />
                    <p className="text-center text-[12px] leading-tight">
                      {card.name}
                    </p>
                    <p className="text-center text-[12px] leading-tight">
                      Damage: -{card.damage}
                    </p>
                    <button
                      className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-1 px-4 text-[12px] w-full"
                      onClick={() => playCard(card, "attack")}
                    >
                      Play
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Defense Cards */}
            <div className="defense-cards flex flex-col gap-2 flex-wrap w-fit">
              <h3 className="w-fit text-center mx-auto michroma font-[600]">
                Defense
              </h3>
              <div className="cards w-fit flex gap-2">
                {defenseCards.map((card, index) => (
                  <div
                    key={index}
                    className="attack-card relative border border-cyan-700 w-[150px] h-[200px] flex flex-col items-center justify-between p-2"
                  >
                    {/* Used Card Overlay */}
                    {hanldeUsedCard(card) && (
                      <div className="used-card absolute top-0 left-0 w-full h-full z-[1] bg-white/70"></div>
                    )}

                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-full h-[60%] object-cover object-top"
                    />
                    <p className="text-center text-[12px] leading-tight">
                      {card.name}
                    </p>
                    <p className="text-center text-[12px] leading-tight">
                      Block: {card.block}
                    </p>
                    <button
                      className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-1 px-4 text-[12px] w-full"
                      onClick={() => playCard(card, "defense")}
                    >
                      Play
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Healing Cards */}
            <div className="attack-cards flex flex-col gap-2 flex-wrap w-fit">
              <h3 className="w-fit text-center mx-auto michroma font-[600]">
                Healing
              </h3>
              <div className="cards w-fit flex gap-2">
                {healingCards.map((card, index) => (
                  <div
                    key={index}
                    className="attack-card relative border border-cyan-700 w-[150px] h-[200px] flex flex-col items-center justify-between p-2"
                  >
                    {/* Used Card Overlay */}
                    {hanldeUsedCard(card) && (
                      <div className="used-card absolute top-0 left-0 w-full h-full z-[1] bg-white/70"></div>
                    )}
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-full h-[60%] object-cover object-top"
                    />
                    <p className="text-center text-[12px] leading-tight">
                      {card.name}
                    </p>
                    <p className="text-center text-[12px] leading-tight">
                      Heal: +{card.heal}
                    </p>
                    <button
                      className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-1 px-4 text-[12px] w-full"
                      onClick={() => playCard(card, "healing")}
                    >
                      Play
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Computer Playfield */}
        <div className="player-playfield p-5 lg:w-[50%] md:w-[50%] w-full lg:border-l lg:border-cyan-700 md:border-l md:border-cayn-700 border-b border-cyan-700 lg:h-full md:h-full h-fit flex gap-y-8 flex-col items-center justify-center relative">
          <div className="absolute w-full h-full bg-white z-[2] opacity-20"> </div>
          {computerAttackCards.length < 1 ? (
            <p>Picking a monster</p>
          ) : (
            <>
              {/* Computer Monster */}
              <div
                className={`relative p-5 w-[300px] h-[400px] mx-auto flex flex-col items-center justify-between shadow-md transition-all duration-200 monster`}
              >
                <img
                  className={`w-full border bg-cyan-700 px-2 h-[80%] object-contain cursor-pointer relative transition-all duration-200 monster`}
                  src={computerMonster.image}
                  alt="Winged Monarch"
                />
                <p className="flex gap-1 items-center justify-center font-[600] text-[20px] text-center mt-4 michroma">
                  {computerMonster.name}
                </p>
              </div>

              {/* Computer Hand/Cards */}
              <div
                className="monster-cards w-full flex flex-wrap gap-4 items-center justify-center"
                id="computer-hand"
                ref={computerRef}
              >
                {/* Attack Cards */}
                <div className="attack-cards flex flex-col gap-2 flex-wrap w-fit">
                  <h3 className="w-fit text-center mx-auto michroma font-[600]">
                    Attack
                  </h3>
                  <div className="cards w-fit flex gap-2">
                    {computerAttackCards.map((card, index) => (
                      <div
                        key={index}
                        className={`attack-card relative border border-cyan-700 w-[150px] h-[200px] flex flex-col items-center justify-between p-2`}
                      >
                        {/* Used Card Overlay */}
                        {handleComputerUsedCard(card) && (
                          <div className="used-card absolute top-0 left-0 w-full h-full z-[1] bg-white/70"></div>
                        )}

                        <img
                          src={card.image}
                          alt={card.name}
                          className="w-full h-[60%] object-cover object-top"
                        />
                        <p className="text-center text-[12px] leading-tight">
                          {card.name}
                        </p>
                        <p className="text-center text-[12px] leading-tight">
                          Damage: -{card.damage}
                        </p>
                        <button
                          className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-1 px-4 text-[12px] w-full"
                          disabled={false}
                          onClick={() => computerPlayCard(card, "attack")}
                        >
                          Play
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Defense Cards */}
                <div className="defense-cards flex flex-col gap-2 flex-wrap w-fit">
                  <h3 className="w-fit text-center mx-auto michroma font-[600]">
                    Defense
                  </h3>
                  <div className="cards w-fit flex gap-2">
                    {computerDefenseCards.map((card, index) => (
                      <div
                        key={index}
                        className="attack-card relative border border-cyan-700 w-[150px] h-[200px] flex flex-col items-center justify-between p-2"
                      >
                        {/* Used Card Overlay */}
                        {handleComputerUsedCard(card) && (
                          <div className="used-card absolute top-0 left-0 w-full h-full z-[1] bg-white/70"></div>
                        )}

                        <img
                          src={card.image}
                          alt={card.name}
                          className="w-full h-[60%] object-cover object-top"
                        />
                        <p className="text-center text-[12px] leading-tight">
                          {card.name}
                        </p>
                        <p className="text-center text-[12px] leading-tight">
                          Block: {card.block}
                        </p>
                        <button
                          className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-1 px-4 text-[12px] w-full"
                          onClick={() => computerPlayCard(card, "defense")}
                        >
                          Play
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Healing Cards */}
                <div className="attack-cards flex flex-col gap-2 flex-wrap w-fit">
                  <h3 className="w-fit text-center mx-auto michroma font-[600]">
                    Healing
                  </h3>
                  <div className="cards w-fit flex gap-2">
                    {computerHealingCards.map((card, index) => (
                      <div
                        key={index}
                        className="attack-card relative border border-cyan-700 w-[150px] h-[200px] flex flex-col items-center justify-between p-2"
                      >
                        {/* Used Card Overlay */}
                        {handleComputerUsedCard(card) && (
                          <div className="used-card absolute top-0 left-0 w-full h-full z-[1] bg-white/70"></div>
                        )}
                        <img
                          src={card.image}
                          alt={card.name}
                          className="w-full h-[60%] object-cover object-top"
                        />
                        <p className="text-center text-[12px] leading-tight">
                          {card.name}
                        </p>
                        <p className="text-center text-[12px] leading-tight">
                          Heal: +{card.heal}
                        </p>
                        <button
                          className={`bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-1 px-4 text-[12px] w-full disabled:opacity-50 disabled:cursor-not-allowed`}
                          onClick={() => computerPlayCard(card, "healing")}
                        >
                          Play
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default GamePlay;

GamePlay.propTypes = {
  playerMonster1: PropTypes.object,
};
