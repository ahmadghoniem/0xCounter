import { Address } from "@/components/Address"
import { useIsLocalNetwork } from "@/hooks/useIsLocalNetwork"
import { useAccount } from "wagmi"
import { useEnsProfile } from "../hooks/useEnsProfile"
import { EnsAvatar } from "./EnsAvatar"
import { EnsHeader } from "./EnsHeader"
import IdentityCardPlaceholder from "./IdentityCardPlaceholder"
import { IdentityDetails } from "./IdentityDetails"

const gradients = {
  inactive: "linear-gradient(180deg, #C4C7C8 0%, #E5E5E5 100%)",
  active: "linear-gradient(330.4deg,#44bcf0 4.54%,#7298f8 59.2%,#a099ff 148.85%)"
} as const

export default function IdentityCard() {
  const { isConnected } = useAccount()
  const isLocalNetworkRaw = useIsLocalNetwork()
  const { ensName, ensAvatar, ensHeader, address } = useEnsProfile()

  const gradient = isConnected ? gradients.active : gradients.inactive
  const isLocalNetwork = isConnected && isLocalNetworkRaw

  // Show placeholder when wallet is not connected, local network, or no ENS name
  if (!isConnected || isLocalNetwork || !address || !ensName) {
    return (
      <IdentityCardPlaceholder
        isConnected={isConnected && !!address}
        hasEnsName={!!ensName}
        gradient={gradient}
        isLocalNetwork={isLocalNetwork}
      />
    )
  }

  // ENS name found - show full identity card
  const displayName = ensName

  return (
    <div className="bg-card flex w-xs flex-col overflow-hidden rounded-xl border shadow-sm">
      <EnsHeader header={ensHeader} gradient={gradient} />

      {/* Profile row */}
      <div className="-mt-10 flex flex-1 items-end gap-1 p-1 pt-0">
        <EnsAvatar src={ensAvatar} gradient={gradient} alt={displayName} />
        <IdentityDetails
          title={displayName}
          subtitle={<Address address={address} className="p-px" showEnsName={false} />}
        />
      </div>
    </div>
  )
}
