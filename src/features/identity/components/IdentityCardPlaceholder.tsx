import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn, truncateAddress } from "@/lib/utils"
import { useAccount } from "wagmi"
import { EnsLogo } from "./EnsLogo"

interface IdentityCardPlaceholderProps {
  isConnected: boolean
  hasEnsName: boolean
  isLocalNetwork: boolean
}

const ENS_APP_URL = "https://sepolia.app.ens.domains/"

const gradients = {
  inactive:
    "radial-gradient(79.05% 79.05% at 21.62% 20.95%, rgb(196, 199, 200) 0%, rgb(229, 229, 229) 100%)",
  active:
    "radial-gradient(79.05% 79.05% at 21.62% 20.95%, rgb(0, 122, 255) 0%, rgb(0, 224, 255) 100%)"
} as const

export default function IdentityCardPlaceholder({
  isConnected,
  hasEnsName,
  isLocalNetwork
}: IdentityCardPlaceholderProps) {
  const { address } = useAccount()

  if (isLocalNetwork) {
    return (
      <div className="bg-card flex w-xs flex-1 items-center rounded-xl border p-8 text-center shadow-sm">
        <p className="text-muted-foreground text-sm">
          ENS Lookup is not supported on the local Hardhat network
        </p>
      </div>
    )
  }

  if (!isConnected || !hasEnsName) {
    const gradient = isConnected ? gradients.active : gradients.inactive

    return (
      <div className="bg-card flex w-xs flex-col gap-2 overflow-hidden rounded-xl border shadow-sm">
        {/* Banner */}
        <div className="h-20" style={{ background: gradient }} />

        {/* Profile row */}
        <div className="-mt-10 flex items-end gap-3 px-2 pb-2">
          {/* Avatar */}
          <Avatar className="border-card size-20 shrink-0 border">
            <AvatarFallback style={{ background: gradient }}>
              <EnsLogo className={cn("size-10", isConnected ? "text-white" : "text-ens-blue")} />
            </AvatarFallback>
          </Avatar>

          {/* Info + Action */}
          <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold">
                {isConnected ? "yourname.eth" : "Your Web3 Identity"}
              </h3>
              <p className="text-muted-foreground truncate text-sm">
                {isConnected && address ? truncateAddress(address) : "Connect to view your profile"}
              </p>
            </div>

            {isConnected && (
              <Button size="sm" asChild>
                <a href={ENS_APP_URL} target="_blank" rel="noopener noreferrer">
                  Get ENS
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card w-xs rounded-xl border p-8 text-center shadow-sm">
      <p className="text-muted-foreground text-sm">Loading...</p>
    </div>
  )
}
