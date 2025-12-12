import { ExternalLink } from "lucide-react";
import { useChainId } from "wagmi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getExplorerUrl } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface TransactionLinkProps {
  hash: string;
  className?: string;
}

export function TransactionLink({ hash, className }: TransactionLinkProps) {
  const chainId = useChainId();
  const explorerUrl = getExplorerUrl(chainId, hash, "transaction");
  const isLocalChain = chainId === 31337;

  return (
    <div
      className={cn(
        "ml-auto mr-2 opacity-40 group-hover/item:opacity-100 transition-opacity",
        className,
      )}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {isLocalChain ? (
              <span className="flex items-center justify-center p-1.5 rounded-md text-muted-foreground/50 cursor-not-allowed">
                <ExternalLink className="h-4 w-4" />
              </span>
            ) : (
              <a
                href={explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </TooltipTrigger>
          <TooltipContent>
            <p>View Transaction</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
