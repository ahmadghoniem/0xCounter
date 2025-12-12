import { getAddress } from "viem";
import { useChainId } from "wagmi";
import { Check, Copy } from "lucide-react";
import { cn, truncateAddress, getExplorerUrl } from "@/lib/utils";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AddressProps {
  address: string;
  className?: string;
  truncate?: boolean;
}

export function Address({ address, className, truncate = true }: AddressProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const chainId = useChainId();
  const explorerUrl = getExplorerUrl(chainId, address, "address");

  // Normalize the address to checksum format
  const checksumAddress = getAddress(address);

  // Truncate the address if needed
  const displayAddress = truncate
    ? truncateAddress(checksumAddress)
    : checksumAddress;

  const handleCopy = () => {
    copyToClipboard(checksumAddress);
  };

  return (
    <TooltipProvider delayDuration={200}>
      <div
        className={cn(
          "inline-flex items-center gap-2 px-2 py-1 rounded-md font-mono text-sm",
          "hover:bg-accent/50 transition-colors group",
          className,
        )}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            {chainId === 31337 ? (
              <span className="font-medium cursor-not-allowed">
                {displayAddress}
              </span>
            ) : (
              <a
                href={explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium cursor-pointer"
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
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm cursor-pointer",
              )}
            >
              {isCopied ? (
                <Check className="h-3.5 w-3.5 shrink-0" />
              ) : (
                <Copy className="h-3.5 w-3.5 text-muted-foreground transition-opacity shrink-0" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isCopied ? "Copied!" : "Click to copy"}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
