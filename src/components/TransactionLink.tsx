import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useIsLocalNetwork } from "@/hooks/useIsLocalNetwork"
import { cn, getExplorerUrl } from "@/lib/utils"
import { ExternalLink } from "lucide-react"
import { useChainId } from "wagmi"

interface TransactionLinkProps {
  hash: string
  className?: string
  showTooltip?: boolean
}

export function TransactionLink({ hash, className, showTooltip = true }: TransactionLinkProps) {
  const chainId = useChainId()
  const explorerUrl = getExplorerUrl(chainId, hash, "transaction")
  const isLocalNetwork = useIsLocalNetwork()

  return (
    <div
      className={cn(
        "mr-2 ml-auto opacity-40 transition-opacity group-hover/item:opacity-100",
        className
      )}
    >
      {showTooltip ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {isLocalNetwork ? (
                <span className="text-muted-foreground/50 flex cursor-not-allowed items-center justify-center rounded-md p-1.5">
                  <ExternalLink className="size-4" />
                </span>
              ) : (
                <a
                  href={explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary hover:bg-primary/10 flex items-center justify-center rounded-md p-1.5 transition-colors"
                >
                  <ExternalLink className="size-4" />
                </a>
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>View Transaction</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <>
          {isLocalNetwork ? (
            <span className="text-muted-foreground/50 flex cursor-not-allowed items-center justify-center rounded-md p-1.5">
              <ExternalLink className="size-4" />
            </span>
          ) : (
            <a
              href={explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary hover:bg-primary/10 flex items-center justify-center rounded-md p-1.5 transition-colors"
            >
              <ExternalLink className="size-4" />
            </a>
          )}
        </>
      )}
    </div>
  )
}
