import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrumSepolia, base, sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "GameChain",
  projectId: "ead84cc01b8b64b6d12daeceda29dab2",
  chains: [arbitrumSepolia, base, sepolia],
});