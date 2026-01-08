import { Address } from "@/components/Address"
import { Button } from "@/components/ui/button"
import { APP_URLS } from "@/config/wagmi"
import { cn } from "@/lib/utils"
import { useAccount } from "wagmi"
import { EnsAvatar } from "./EnsAvatar"
import { EnsHeader } from "./EnsHeader"
import { EnsLogo } from "./EnsLogo"
import { IdentityDetails } from "./IdentityDetails"

interface IdentityCardPlaceholderProps {
  isConnected: boolean
  hasEnsName: boolean
  isLocalNetwork: boolean
  gradient: string
}

export default function IdentityCardPlaceholder({
  isConnected,
  hasEnsName,
  isLocalNetwork,
  gradient
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
    const title = isConnected ? "yourname.eth" : "Your Web3 Identity"
    const subtitle =
      isConnected && address ? (
        <Address address={address} className="p-px" showEnsName={false} />
      ) : (
        "Connect to view your profile"
      )

    return (
      <div className="bg-card flex w-xs flex-col overflow-hidden rounded-xl border shadow-sm">
        <EnsHeader gradient={gradient} />

        <div className="-mt-10 flex flex-1 items-end gap-1 p-1 pt-0">
          <EnsAvatar
            fallback={
              <EnsLogo
                className={cn("size-10", isConnected ? "text-primary-foreground" : "text-ens-blue")}
              />
            }
            gradient={gradient}
          />

          <IdentityDetails
            title={title}
            subtitle={subtitle}
            action={
              isConnected && (
                <Button size="sm" asChild>
                  <a href={APP_URLS.ENS} target="_blank" rel="noopener noreferrer">
                    Get ENS
                  </a>
                </Button>
              )
            }
          />
        </div>
      </div>
    )
  }
}
