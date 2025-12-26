import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { http, webSocket } from "viem"
import { baseSepolia, hardhat, sepolia } from "wagmi/chains"

const ETHEREUM_SEPOLIA_RPC_URL = import.meta.env.VITE_ETHEREUM_SEPOLIA_RPC_URL
const BASE_SEPOLIA_RPC_URL = import.meta.env.VITE_BASE_SEPOLIA_RPC_URL
export const wagmiConfig = getDefaultConfig({
  appName: "BasicWeb3",
  // Every dApp that relies on WalletConnect now needs to obtain a projectId from WalletConnect Cloud.
  projectId: "274b012d8a8d3072c778cb84b7e55898",
  chains: [hardhat, sepolia, baseSepolia],
  transports: {
    [hardhat.id]: http("http://127.0.0.1:8545"),
    [sepolia.id]: webSocket(ETHEREUM_SEPOLIA_RPC_URL),
    [baseSepolia.id]: webSocket(BASE_SEPOLIA_RPC_URL)
  }
})
