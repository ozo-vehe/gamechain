import FeaturesCard from "../components/FeaturesCard";
// import landingImage from "../assets/images/heroImage.png";
import gameplayImage from "../assets/icons/gameplay.png";
import itemsImage from "../assets/icons/items.png";
import heroesImage from "../assets/icons/heroes.png";
// import aboutImage from "../assets/images/about.png";
import aboutImage from "../assets/images/Photoroom-20241108_190040_1.png";
import landingImage from "../assets/images/Photoroom-20241108_190040_2.png";
import avatar1 from '../assets/images/avatar1.jpg'
import avatar2 from '../assets/images/avatar2.jpg'
import avatar3 from '../assets/images/avatar3.avif'
import avatar4 from '../assets/images/avatar4.avif'
import avatar5 from '../assets/images/avatar5.avif'
import { useNavigate } from "react-router-dom";

// Constants
const FEATURES = [
  {
    title: "Gameplay and Features",
    description: "Earn tokens by playing the game.",
    image: gameplayImage,
  },
  {
    title: "Items andd Collectibles",
    description: "Build your own game using our game engine.",
    image: itemsImage,
  },
  {
    title: "Heroes and Game Locations",
    description: "Earn tokens by playing the game.",
    image: heroesImage,
  },
];

const LandingPage = () => {
  // Functions
  const navigate = useNavigate();

  const handleConnectWallet = async() => {
    navigate('/monsters')
  }

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section min-h-[85vh] flex gap-8 flex-wrap items-center justify-center lg:px-10 md:px-5 px-5 max-w-[1440px] mx-auto">
        <header className="hero-header-section flex flex-col gap-8 lg:max-w-[600px] md:max-w-[500px] w-full">
          <div className="header-text">
            <h1 className="lg:text-[40px] md:text-[36px] text-[28px] michroma font-[500] mb-8">
              Unleash your survival instincts in a futuristic apocalypse.
            </h1>
            <p className="max-w-[500px] font-[500]">
              Engage in heart-pounding combar across ruined cityscapes and
              war-torn landscapes.
            </p>
          </div>
          <div className="header-btn flex flex-wrap lg:justify-start md:justify-start justify-center items-center gap-4">
            <button onClick={handleConnectWallet} className="relative connect-btn px-4 py-2 bg-cyan-700 border-cyan-700 text-white before:absolute before:w-full h-[45px] min-w-[150px]">
              Connect wallet
            </button>
            <button className="btn relative px-4 py-2 border border-cyan-700 text-cyan-border-cyan-700 before:absolute before:w-full h-[45px] w-[150px]">
              Learn more
            </button>
          </div>

          <div className="features-container flex flex-wrap items-center lg:justify-start md:justify-start justify-center gap-4">
            {FEATURES.map((feature, _i) => (
              <FeaturesCard key={_i} feature={feature} />
            ))}
          </div>
        </header>

        <div className="hero-section-image relative lg:w-[400px] md:max-w-[400px] w-full">
          <img className="w-full -scale-x-[1]" src={landingImage} alt="Image" />
        </div>
      </section>

      {/* About Section */}
      <section className="landing-page-about-container lg:px-10 md:px-5 px-5 my-16 max-w-[1440px] mx-auto">
        <header className="max-w-[800px] mx-auto text-center">
          <h2 className="lg:text-[36px] md:text-[32px] capitalize text-[28px] mb-4 michroma text-cyan-700 border-cyan-700">
            Harness the Power Of Innovation in a Game Of Survival
          </h2>
          <p className="max-w-[600px] mx-auto">
            Discover unique mechanics and enhancements that take your gaming
            experience to new heights.
          </p>
        </header>

        <section className="my-16 relative flex flex-col gap-8 flex-wrap items-center justify-center min-h-[100vh]">
          <div className="about-image max-w-[500px] mx-auto">
            <img src={aboutImage} alt="Image" />
          </div>

          {/* About cards */}
          <div className="lg:absolute lg:top-0 lg:left-0 relative w-full h-full flex flex-wrap items-center justify-center gap-8">
            <div className="feature-card w-[280px] h-[350px] border border-cyan-700 flex flex-col items-end justify-start gap-4 px-4 py-8 cursor-pointer lg:absolute lg:top-0 lg:left-0 relative">
              <div className="image w-full flex items-center justify-center">
                <img
                  className="w-[45px] h-[45px]"
                  src={gameplayImage}
                  alt="Image"
                />
              </div>
              <p className="text-center text-[20px] font-[600] michroma">
                Intense Survival Gameplay
              </p>
              <p className="text-center text-[14px]">
                Test your skills and instincts as you navigate through hostile
                environments, scavenge for resources, and make crucial choices
                to survive in a world on the brink of collapse.
              </p>
            </div>

            <div className="feature-card w-[280px] h-[350px] border border-cyan-700 flex flex-col items-end justify-start gap-4 px-4 py-8 cursor-pointer lg:absolute lg:bottom-0 lg:left-0 relative">
              <div className="image w-full flex items-center justify-center">
                <img
                  className="w-[45px] h-[45px]"
                  src={gameplayImage}
                  alt="Image"
                />
              </div>
              <p className="text-center text-[20px] font-[600] michroma">
                Tactical Combat and Customization
              </p>
              <p className="text-center text-[14px]">
                Engage in adrenaline-pumping combat encounters, utilizing a
                range of futuristic weapons, gadget, and abilitis.
              </p>
            </div>

            <div className="feature-card w-[280px] h-[350px] border border-cyan-700 flex flex-col items-end justify-start gap-4 px-4 py-8 cursor-pointer lg:absolute lg:top-[50%] lg:-translate-y-[50%] lg:right-0 relative">
              <div className="image w-full flex items-center justify-center">
                <img
                  className="w-[45px] h-[45px]"
                  src={gameplayImage}
                  alt="Image"
                />
              </div>
              <p className="text-center text-[20px] font-[600] michroma">
                Cooperative Multiplayer
              </p>
              <p className="text-center text-[14px]">
                Join forces with friends or other players in cooperative
                multiplayer mode. Tackle challenging missions together,
                coordinate strategies, and combine your unique abilities.
              </p>
            </div>
          </div>
        </section>
      </section>

      {/* Roadmap Section */}
      <section className="roadmap-container lg:px-10 md:px-5 px-5 my-16 py-8 max-w-[1440px] mx-auto">
        <header className="max-w-[800px] mx-auto text-center">
          <h2 className="lg:text-[36px] md:text-[32px] capitalize text-[28px] mb-4 michroma text-cyan-700 border-cyan-700">
            From Outcasts To Legends: The Journey of GameChain
          </h2>
          <p className="max-w-[600px] mx-auto">
            Witness the rise of unlikely heroes who defy the odds and challenge
            fate.
          </p>
        </header>

        <section className="roadmap-container my-16">
          <div className="relative flex flex-wrap justify-center items-center gap-8 max-w-[950px] mx-auto min-h-[1000px]">
            <div className="roadmap-card w-[300px] h-[400px] border border-cyan-700 flex flex-col items-end justify-start gap-4 p-6 cursor-pointer lg:absolute lg:top-0 lg:left-0 relative">
              <div className="avatar-image w-full h-[85%] flex items-center justify-center">
                <img
                  className="w-full h-full object-cover object-top"
                  src={avatar1}
                  alt="Image"
                />
              </div>
              <p className="text-center text-cyan-800 text-[20px] font-[700] michroma w-full">
                Slayer 1
              </p>
            </div>

            <div className="roadmap-card w-[300px] h-[400px] border border-cyan-700 flex flex-col items-end justify-start gap-4 p-6 cursor-pointer lg:absolute lg:right-0 lg:top-0 relative">
              <div className="avatar-image w-full h-[85%] flex items-center justify-center">
                <img
                  className="w-full h-full object-cover object-top"
                  src={avatar2}
                  alt="Image"
                />
              </div>
              <p className="text-center text-cyan-800 text-[20px] font-[700] michroma w-full">
                Slayer 2
              </p>
            </div>

            <div className="roadmap-card w-[300px] h-[400px] border border-cyan-700 flex flex-col items-end justify-start gap-4 p-6 cursor-pointer lg:absolute lg:top-[50%] lg:left-[50%] lg:-translate-x-[50%] lg:-translate-y-[50%] relative">
              <div className="avatar-image w-full h-[85%] flex items-center justify-center">
                <img
                  className="w-full h-full object-cover object-top"
                  src={avatar3}
                  alt="Image"
                />
              </div>
              <p className="text-center text-cyan-800 text-[20px] font-[700] michroma w-full">
                Slayer 3
              </p>
            </div>

            <div className="roadmap-card w-[300px] h-[400px] border border-cyan-700 flex flex-col items-end justify-start gap-4 p-6 cursor-pointer lg:absolute lg:bottom-0 lg:left-0 relative">
              <div className="avatar-image w-full h-[85%] flex items-center justify-center">
                <img
                  className="w-full h-full object-cover object-top"
                  src={avatar4}
                  alt="Image"
                />
              </div>
              <p className="text-center text-cyan-800 text-[20px] font-[700] michroma w-full">
                Slayer 4
              </p>
            </div>

            <div className="roadmap-card w-[300px] h-[400px] border border-cyan-700 flex flex-col items-end justify-start gap-4 p-6 cursor-pointer relative lg:absolute lg:bottom-0 lg:right-0">
              <div className="avatar-image w-full h-[85%] flex items-center justify-center">
                <img
                  className="w-full h-full object-cover object-top"
                  src={avatar5}
                  alt="Image"
                />
              </div>
              <p className="text-center text-cyan-800 text-[20px] font-[700] michroma w-full">
                Slayer 5
              </p>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default LandingPage;
