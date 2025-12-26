import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { truncateAddress } from "@/lib/utils"
import { useAccount, useChainId } from "wagmi"
import { useEnsProfile } from "../hooks/useEnsProfile"
import IdentityCardPlaceholder from "./IdentityCardPlaceholder"

export default function IdentityCard() {
  const { isConnected } = useAccount()
  const chainId = useChainId()
  const { ensName, ensAvatar, ensBanner, address } = useEnsProfile()

  const isLocalNetwork = isConnected && chainId === 31337

  // Show placeholder when wallet is not connected, local network, or no ENS name
  if (!isConnected || isLocalNetwork || !address || !ensName) {
    return (
      <IdentityCardPlaceholder
        isConnected={isConnected && !!address}
        hasEnsName={!!ensName}
        isLocalNetwork={isLocalNetwork}
      />
    )
  }

  // ENS name found - show full identity card
  const displayName = ensName
  const fallbackInitial = ensName[0].toUpperCase()

  return (
    <div className="bg-card flex w-xs flex-col gap-2 overflow-hidden rounded-xl border shadow-sm">
      {/* Banner */}
      <div className="from-primary/20 via-primary/30 to-primary/20 relative h-20 bg-linear-to-r">
        {ensBanner && (
          <img
            src={ensBanner}
            alt="Profile banner"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>

      {/* Profile row */}
      <div className="-mt-10 flex items-end gap-3 px-2 pb-2">
        {/* Avatar */}
        <Avatar className="border-card size-20 shrink-0 border">
          <AvatarImage src={ensAvatar || undefined} alt={displayName} />
          <AvatarFallback className="text-2xl font-semibold">{fallbackInitial}</AvatarFallback>
        </Avatar>

        {/* Info */}
        <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold">{displayName}</h3>
            <p className="text-muted-foreground truncate font-mono text-sm">
              {truncateAddress(address)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
