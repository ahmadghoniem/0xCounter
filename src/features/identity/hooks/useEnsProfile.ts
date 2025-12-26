import { useAccount, useChainId, useEnsAvatar, useEnsName, useEnsText } from "wagmi"
import { sepolia } from "wagmi/chains"

export function useEnsProfile() {
  const { address } = useAccount()
  const chainId = useChainId()

  // Don't fetch ENS data on Hardhat (chainId 31337)
  const shouldFetchEns = chainId !== 31337 && !!address

  const { data: ensName } = useEnsName({
    address,
    chainId: sepolia.id, // ENS on Sepolia testnet
    query: {
      enabled: shouldFetchEns
    }
  })

  const { data: ensAvatar } = useEnsAvatar({
    name: ensName ?? undefined,
    chainId: sepolia.id,
    query: {
      enabled: shouldFetchEns && !!ensName
    }
  })

  const { data: ensBanner } = useEnsText({
    name: ensName ?? undefined,
    key: "header",
    chainId: sepolia.id,
    query: {
      enabled: shouldFetchEns && !!ensName
    }
  })
  return {
    ensName,
    ensAvatar,
    ensBanner,
    address
  }
}
