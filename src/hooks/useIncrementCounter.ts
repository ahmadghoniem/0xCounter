// src/components/WriteInc.tsx
import { useWaitForTransactionReceipt } from "wagmi";
import { useWriteCounterInc, useWriteCounterIncBy } from "@/config/generated";

export default function useIncrementCounter() {
  const {
    data: hashInc,
    isPending: isPendingInc,
    isError: isErrorInc,
    error: errorInc,
    writeContract: incCounter,
    isIdle: isIdleInc,
  } = useWriteCounterInc();

  const {
    data: hashIncBy,
    isPending: isPendingIncBy,
    isError: isErrorIncBy,
    error: errorIncBy,
    writeContract: incCounterBy,
    isIdle: isIdleIncBy,
  } = useWriteCounterIncBy();

  // Derive unified state
  const hash = hashInc || hashIncBy;
  const isPending = isPendingInc || isPendingIncBy;
  const isError = isErrorInc || isErrorIncBy;
  const error = errorInc || errorIncBy;
  const isIdle = isIdleInc && isIdleIncBy;

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const handleInc = () => {
    incCounter({});
  };

  const handleIncBy = (incBy: bigint) => {
    incCounterBy({
      args: [incBy],
    });
  };

  return {
    handleInc,
    handleIncBy,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    isError,
    error,
    isIdle,
  };
}
