import { counterAddress } from "@/config/generated"
import { useBytecode } from "wagmi"
import { useIsLocalNetwork } from "./useIsLocalNetwork"

interface useIsLocalContractDeployedReturn {
  isLocalContractDeployed: boolean
  contractAddress: `0x${string}`
}

export function useIsLocalContractDeployed(): useIsLocalContractDeployedReturn {
  const isLocalNetwork = useIsLocalNetwork()

  // get contract address from config
  const configContractAddress = counterAddress[31337]

  // Local networks need bytecode verification since contracts can be wiped on restart

  const { data: bytecode } = useBytecode({
    address: configContractAddress,
    query: {
      enabled: !!configContractAddress && isLocalNetwork
    }
  })

  // Local networks (Hardhat) are ephemeral and need bytecode verification to catch stale addresses.
  // Permanent networks (Sepolia, Mainnet) have immutable deployments so we trust the config.
  // This optimization eliminates unnecessary calls to supabase, reducing latency and improving UX.
  const isDeployed = isLocalNetwork ? !!bytecode && bytecode !== "0x" : !!configContractAddress

  return {
    isLocalContractDeployed: isDeployed,
    contractAddress: configContractAddress
  }
}
