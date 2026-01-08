import { useChainId } from "wagmi"
import { hardhat } from "wagmi/chains"

export function useIsLocalNetwork() {
  const chainId = useChainId()
  return chainId === hardhat.id
}
