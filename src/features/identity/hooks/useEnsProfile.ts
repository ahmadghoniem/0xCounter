import { useAccount, useEnsAvatar, useEnsName, useEnsText } from "wagmi"
import { useIsLocalNetwork } from "@/hooks/useIsLocalNetwork"
import { sepolia } from "wagmi/chains"

export function useEnsProfile() {
  const { address } = useAccount()
  const isLocalNetwork = useIsLocalNetwork()

  const shouldFetchEns = !isLocalNetwork && !!address

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
  const { data: ensHeader } = useEnsText({
    name: ensName ?? undefined,
    key: "header",
    chainId: sepolia.id,
    query: {
      enabled: shouldFetchEns && !!ensName
    }
  })
  console.log(ensName, ensAvatar, ensHeader)

  return {
    ensName,
    ensAvatar,
    ensHeader,
    address
  }
}
