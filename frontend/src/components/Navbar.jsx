import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import image from "../assets/images/navbar_line.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { disconnect } from "@wagmi/core";
import { config } from "../config/wagmi";
import { fetchMonsters, fetchUserMonsters } from "../features/gamechain/gamechainSlice";
import { useDispatch } from "react-redux";

// Constants
const LINKS = [
  {
    title: "home",
    url: "/",
  },
  {
    title: "about",
    url: "#",
  },
];

const Navbar = () => {
  const { address, chain, chainId } = useAccount();
  const dispatch = useDispatch();
  const OWNER_ADDRESS = "0x6b7978560661acC18d861b5701f2843dD685b6bF";


  useEffect(() => {
    if(address) {
      if(chain.name.toLowerCase() !== "arbitrum sepolia" || chainId !== 421614) {
        alert("Please connect to Arbitrum Sepolia network");
        disconnect(config);
        return;
      } else {
        console.log("Connected to the right network");
        dispatch(fetchUserMonsters(address));
        dispatch(fetchMonsters());
      }
    }
  }, [address, chain, chainId, dispatch]);

  return (
    <nav className="p-4 w-full lg:px-20 md:px-10 px-5 relative mb-10">
      {/* Navbar Image Line */}
      <img
        className="absolute -bottom-5 left-0 w-full h-5"
        src={image}
        alt="Image"
      />
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <NavLink to="/" className="text-2xl font-[900] text-cyan-700 michroma">
            GameChain
          </NavLink>
        </div>

        <div className="hidden md:flex space-x-6">
          {LINKS.map((link, _i) => (
            <NavLink key={_i} to={link.url} className="text-black capitalize">
              {link.title}
            </NavLink>
          ))}
          <NavLink to="/monsters" className="text-black capitalize">
            marketplace
          </NavLink>

          {/* Change this line to allow current owner upload new monsters to the smart contract */}
          {address == OWNER_ADDRESS &&<NavLink to="/upload-monster" className="text-black capitalize">
            upload monster
          </NavLink>}

          {address && <NavLink to="/profile" className="text-black capitalize">
            profile
          </NavLink>}

          {address && <NavLink to="/play" className="text-black capitalize">
            fight
          </NavLink>}

          {address && <NavLink to="/leaderboard" className="text-black capitalize">
            leaderboard
          </NavLink>}
        </div>

        {/* Connect Wallet Button */}
        <div className="connect-btn-container">
          <div className="max-w-[500px]">
            {address ? (
              <div
                className="relative flex items-center justify-center connect-btn px-4 py-2 bg-white text-cyan-700 border border-cyan-700 before:absolute before:w-full h-[45px] min-w-[150px] btn group"
              >
                <span>{address.slice(0, 4)}...{address.slice(-4)}</span>
                <span className="group-hover:top-[50%] absolute flex items-center justify-center capitalize cursor-pointer top-[150%] -translate-y-[50%] z-10 bg-white w-[90%] mx-auto h-[50%] transition-all duration-300" onClick={async() => await disconnect(config)}>
                  logout
                </span>
              </div>
            ) : (
              <div className="relative flex items-center justify-center connect-btn px-4 py-2 bg-cyan-700 text-white before:absolute before:w-full h-[45px] min-w-[150px]">
                Connect Wallet
                <span className="block absolute opacity-0 top-0 left-0">
                  <ConnectButton />
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
