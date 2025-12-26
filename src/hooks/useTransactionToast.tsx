import { TransactionLink } from "@/components/TransactionLink"
import { useEffect, useMemo } from "react"
import { toast } from "sonner"
import { BaseError, useChainId } from "wagmi"

interface UseTransactionToastProps {
  isPending: boolean
  isConfirming: boolean
  isConfirmed: boolean
  isError: boolean
  error: Error | BaseError | null
  hash?: `0x${string}`
  isIdle: boolean
}

type Stage = "idle" | "error" | "signing" | "confirming" | "confirmed"

export function useTransactionToast({
  isPending,
  isConfirming,
  isConfirmed,
  isError,
  error,
  hash,
  isIdle
}: UseTransactionToastProps) {
  const chainId = useChainId()

  const stage: Stage = useMemo(() => {
    if (isIdle && !hash) return "idle"
    if (isError) return "error"
    if (isPending) return "signing"
    if (isConfirming) return "confirming"
    if (isConfirmed) return "confirmed"
    return "idle"
  }, [isIdle, hash, isError, isPending, isConfirming, isConfirmed])
  console.log(`Stage: ${stage}, Hash: ${hash}, Error: ${error?.message}`)
  // Dismiss toast on unmount
  // useEffect(() => {
  //   return () => {
  //     toast.dismiss("tx-lifecycle")
  //   }
  // }, [])

  useEffect(() => {
    if (stage === "idle") {
      toast.dismiss("tx-lifecycle")
      return
    }

    if (stage === "error") {
      toast.error("Transaction failed", {
        id: "tx-lifecycle",
        description: error?.cause?.toString().split("Request Arguments")[0].trim(),
        action: null
      })
      return
    }

    if (stage === "signing") {
      toast.loading("Awaiting wallet confirmation…", {
        id: "tx-lifecycle",
        description: null,
        action: null
      })
      return
    }

    if (stage === "confirming" && hash) {
      toast.loading("Transaction sent", {
        id: "tx-lifecycle",
        description: "Waiting for confirmation…",
        action: <TransactionLink hash={hash} showTooltip={false} />
      })
      return
    }

    if (stage === "confirmed" && hash) {
      toast.success("Transaction confirmed", {
        id: "tx-lifecycle",
        description: "View on Explorer",
        action: <TransactionLink hash={hash} showTooltip={false} />,
        duration: 500
      })
      return
    }
  }, [stage, hash, error, chainId])
}
