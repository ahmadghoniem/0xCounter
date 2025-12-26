import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"
import { cn, getExplorerUrl, truncateAddress } from "@/lib/utils"
import { Check, Copy } from "lucide-react"
import { getAddress } from "viem"
import { useChainId, useEnsName } from "wagmi"

interface AddressProps {
  address: string
  className?: string
  truncate?: boolean
  showEnsName?: boolean
}

export function Address({ address, className, truncate = true, showEnsName = true }: AddressProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard()
  const chainId = useChainId()

  // Fetch ENS name for the provided address
  const { data: ensName } = useEnsName({
    address: address as `0x${string}`,
    chainId: chainId,
    query: {
      // enabled: chainId !== 31337 && !!address
    }
  })

  const explorerUrl = getExplorerUrl(chainId, address, "address")

  // Normalize the address to checksum format
  const checksumAddress = getAddress(address)

  // Display ENS name if available and enabled, otherwise truncate the address if needed
  const displayAddress =
    showEnsName && ensName ? ensName : truncate ? truncateAddress(checksumAddress) : checksumAddress

  const handleCopy = () => {
    copyToClipboard(checksumAddress)
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div
        className={cn(
          "inline-flex items-center gap-2 rounded-md px-2 py-1 font-mono text-sm",
          "hover:bg-accent/50 group transition-colors",
          className
        )}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            {chainId === 31337 ? (
              <span className="cursor-not-allowed font-medium">{displayAddress}</span>
            ) : (
              <a
                href={explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer font-medium"
              >
                {displayAddress}
              </a>
            )}
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-mono text-xs">{checksumAddress}</p>
          </TooltipContent>
        </Tooltip>

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
      </div>
    </TooltipProvider>
  )
}
