// src/components/WriteInc.tsx
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { counterConfig } from "@/config/generated";
import { hardhat } from "wagmi/chains";

export default function useIncrementCounter() {
  const {
    data: hash,
    writeContract,
    isPending: isWritePending,
    isError,
    error,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const handleInc = () => {
    writeContract({
      abi: counterConfig.abi,
      address: counterConfig.address[hardhat.id],
      functionName: "inc",
      args: [], // inc takes no arguments
    });
  };

  const handleIncBy = (incBy: bigint) => {
    writeContract({
      abi: counterConfig.abi,
      address: counterConfig.address[hardhat.id],
      functionName: "incBy",
      args: [incBy],
    });
  };
  return {
    handleInc,
    handleIncBy,
    hash,
    isWritePending,
    isConfirming,
    isConfirmed,
    isError,
    error,
  };
}
