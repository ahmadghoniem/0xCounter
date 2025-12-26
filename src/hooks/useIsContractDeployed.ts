import { counterAddress } from "@/config/generated"
import { useBytecode, useChainId } from "wagmi"
import { hardhat } from "wagmi/chains"

interface UseIsContractDeployedOptions {
  address?: string
}

interface UseIsContractDeployedReturn {
  isContractDeployed: boolean
  isLoading: boolean
  address?: string
}

export function useIsContractDeployed(
  options: UseIsContractDeployedOptions = {}
): UseIsContractDeployedReturn {
  const chainId = useChainId()
  const { address } = options

  // Check if contract address exists in config
  const configAddress = counterAddress[chainId as keyof typeof counterAddress]
  const addressToCheck = address || configAddress

  // Local networks need bytecode verification since contracts can be wiped on restart
  const isLocalNetwork = chainId === hardhat.id

  const { data: bytecode, isLoading: isBytecodeLoading } = useBytecode({
    address: addressToCheck as `0x${string}` | undefined,
    query: {
      enabled: !!addressToCheck && isLocalNetwork
    }
  })

  // Permanent networks (Sepolia, Mainnet) have immutable deployments so we trust the config.
  // This optimization eliminates unnecessary RPC calls, reducing latency and improving UX.
  // Local networks (Hardhat) are ephemeral and need bytecode verification to catch stale addresses.
  const isDeployed = isLocalNetwork ? !!bytecode && bytecode !== "0x" : !!addressToCheck

  return {
    isContractDeployed: isDeployed,
    isLoading: isLocalNetwork ? isBytecodeLoading : false,
    address: addressToCheck
  }
}
