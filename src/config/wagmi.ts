import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, sepolia, hardhat } from "wagmi/chains";

export const wagmiConfig = getDefaultConfig({
  appName: "BasicWeb3",
  // Every dApp that relies on WalletConnect now needs to obtain a projectId from WalletConnect Cloud.
  projectId: "YOUR-PROJECT-ID",
  chains: [mainnet, sepolia, hardhat],
});
