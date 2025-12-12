import { useEffect } from "react";
import { toast } from "sonner";
import { TransactionLink } from "@/components/TransactionLink";
import { BaseError } from "wagmi";

interface UseTransactionToastProps {
  isPending: boolean;
  isConfirming: boolean;
  isConfirmed: boolean;
  isError: boolean;
  error: Error | BaseError | null;
  hash?: string;
  isIdle: boolean;
}

export function useTransactionToast({
  isPending,
  isConfirming,
  isConfirmed,
  isError,
  error,
  hash,
  isIdle,
}: UseTransactionToastProps) {
  useEffect(() => {
    // Initial signature request
    if (isPending && !hash) {
      toast.loading("Awaiting wallet signature...", {
        id: "tx-status",
      });
    }

    const txDescription = hash ? (
      <div className="flex items-center gap-2">
        view on explorer
        <TransactionLink hash={hash} />
      </div>
    ) : undefined;

    // Transaction submitted but not yet confirming
    if (!isIdle && !isPending && !isConfirming && !isConfirmed) {
      toast.message("Transaction submitted", {
        id: "tx-status",
        description: "broadcasting to the network...",
      });
    }

    // Confirming
    if (isConfirming) {
      toast.loading("Processing transaction...", {
        id: "tx-status",
        description: txDescription,
      });
    }

    // Error
    if (isError) {
      toast.error("Transaction failed", {
        id: "tx-status",
        description: error?.cause
          ?.toString()
          .split("Request Arguments")[0]
          .trim(),
      });
    }
  }, [isPending, hash, isConfirming, isConfirmed, isError, error, isIdle]);
}
