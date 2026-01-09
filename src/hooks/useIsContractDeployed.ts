import { counterAddress } from "@/config/generated"
import { useIsLocalNetwork } from "@/hooks/useIsLocalNetwork"
import { useBytecode, useChainId } from "wagmi"

interface UseIsContractDeployedParams {
  /** Skip bytecode verification on remote networks. Default: true */
  skipLiveCheck?: boolean
}

interface UseIsContractDeployedReturn {
  isDeployed: boolean
  contractAddress: `0x${string}` | undefined
}

/**
 * Checks if contract is deployed on current network.
 * Local networks always verify bytecode, remote networks can skip.
 */
export function useIsContractDeployed({
  skipLiveCheck = true
}: UseIsContractDeployedParams = {}): UseIsContractDeployedReturn {
  const chainId = useChainId()
  const isLocalNetwork = useIsLocalNetwork()

  const contractAddress = counterAddress[chainId as keyof typeof counterAddress]

  // Enable bytecode check: always on local, only when skipLiveCheck=false on remote
  const { data: bytecode } = useBytecode({
    address: contractAddress,
    query: {
      enabled: !!contractAddress && (!skipLiveCheck || isLocalNetwork)
    }
  })

  // Skip bytecode check on remote when skipLiveCheck=true, otherwise verify bytecode
  const isDeployed =
    skipLiveCheck && !isLocalNetwork
      ? !!contractAddress
      : (!!bytecode && bytecode !== "0x") || !!contractAddress

  return {
    isDeployed,
    contractAddress
  }
}
