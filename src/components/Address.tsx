import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"
import { useIsLocalNetwork } from "@/hooks/useIsLocalNetwork"
import { cn, getExplorerUrl, truncateAddress } from "@/lib/utils"
import { Check, Copy } from "lucide-react"
import { getAddress } from "viem"
import { useChainId, useEnsName } from "wagmi"

interface AddressProps {
  address: `0x${string}`
  className?: string
  truncate?: boolean
  showEnsName?: boolean
  showTooltip?: boolean
  showCopyButton?: boolean
}

export function Address({
  address,
  className,
  truncate = true,
  showEnsName = true,
  showTooltip = true,
  showCopyButton = true
}: AddressProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard()
  const isLocalNetwork = useIsLocalNetwork()
  const chainId = useChainId()
  // Fetch ENS name for the provided address
  const { data: ensName } = useEnsName({
    address: address,
    chainId: chainId,
    query: {
      enabled: !isLocalNetwork && !!address // prevents unnecessary RPC calls for hardhat local deployed contracts
    }
  })

  const explorerUrl = getExplorerUrl(chainId, address, "address")

  // Addresses are stored lowercase in Supabase to avoid case mismatches. Display and copy in checksum format (EIP-55) for validation and better UX.
  const checksumAddress = getAddress(address)

  // Display ENS name if available and enabled, otherwise truncate the address if needed
  const displayAddress =
    showEnsName && ensName ? ensName : truncate ? truncateAddress(checksumAddress) : checksumAddress

  const handleCopy = () => copyToClipboard(checksumAddress)

  const addressElement = isLocalNetwork ? (
    <span className="cursor-not-allowed font-mono font-medium">{displayAddress}</span>
  ) : (
    <a
      href={explorerUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "cursor-pointer font-medium",
        showEnsName && ensName ? "font-sans" : "font-mono"
      )}
    >
      {displayAddress}
    </a>
  )

  return (
    <TooltipProvider delayDuration={200}>
      <div
        className={cn(
          "inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm",
          "hover:bg-accent/50 group transition-colors",
          className
        )}
      >
        {showTooltip ? (
          <Tooltip>
            <TooltipTrigger asChild>{addressElement}</TooltipTrigger>
            <TooltipContent>
              <p className="font-mono text-xs">{checksumAddress}</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          addressElement
        )}

        {showCopyButton && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleCopy}
                className={cn(
                  "focus-visible:ring-ring cursor-pointer rounded-sm focus-visible:ring-2 focus-visible:outline-none"
                )}
              >
                {isCopied ? (
                  <Check className="h-3.5 w-3.5 shrink-0" />
                ) : (
                  <Copy className="text-muted-foreground h-3.5 w-3.5 shrink-0 transition-opacity" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isCopied ? "Copied!" : "Click to copy"}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  )
}
