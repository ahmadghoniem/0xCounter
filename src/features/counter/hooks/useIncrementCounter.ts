// src/components/WriteInc.tsx
import { useWriteCounterInc, useWriteCounterIncBy } from "@/config/generated"
import { watchChainId } from "@wagmi/core"
import { useCallback } from "react"
import { useChainId, useConfig, useWaitForTransactionReceipt } from "wagmi"

export default function useIncrementCounter() {
  const chainId = useChainId()
  const config = useConfig()

  const {
    data: hashInc,
    isPending: isPendingInc,
    isError: isErrorInc,
    error: errorInc,
    writeContract: incCounter,
    isIdle: isIdleInc,
    reset: resetInc
  } = useWriteCounterInc()

  const {
    data: hashIncBy,
    isPending: isPendingIncBy,
    isError: isErrorIncBy,
    error: errorIncBy,
    writeContract: incCounterBy,
    isIdle: isIdleIncBy,
    reset: resetIncBy
  } = useWriteCounterIncBy()

  // Derive unified state
  const hash = hashInc || hashIncBy
  const isPending = isPendingInc || isPendingIncBy
  const isError = isErrorInc || isErrorIncBy
  const error = errorInc || errorIncBy
  const isIdle = isIdleInc && isIdleIncBy

  const { isLoading: isConfirmingRaw, isSuccess: isConfirmedRaw } = useWaitForTransactionReceipt({
    hash,
    chainId: chainId,
    query: {
      enabled: !!hash
    }
  })

  // Guard against stale state - only valid when hash exists
  const isConfirming = !!hash && isConfirmingRaw
  const isConfirmed = !!hash && isConfirmedRaw

  const resetAll = useCallback(() => {
    resetInc()
    resetIncBy()
  }, [resetInc, resetIncBy])

  const handleInc = () => {
    // resetAll()
    incCounter({})
  }

  const handleIncBy = (incBy: bigint) => {
    // resetAll()
    incCounterBy({
      args: [incBy]
    })
  }

  // In your hook/component
  watchChainId(config, {
    onChange: (newChainId) => {
      resetAll()
    }
  })

  return {
    handleInc,
    handleIncBy,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    isError,
    error,
    isIdle
  }
}
