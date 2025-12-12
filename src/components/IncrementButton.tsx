import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import useIncrementCounter from "@/hooks/useIncrementCounter";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useReadCounterOwner } from "@/config/generated";
import { useTransactionToast } from "@/hooks/useTransactionToast";

export default function IncrementButton() {
  const {
    handleInc,
    handleIncBy,
    isPending,
    isConfirming,
    isConfirmed,
    isError,
    error,
    hash,
    isIdle,
  } = useIncrementCounter();

  const { address } = useAccount();
  const { data: owner } = useReadCounterOwner();

  const isOwner = owner === address;
  const [customIncrement, setCustomIncrement] = useState<bigint>(1n);

  useTransactionToast({
    isPending,
    isConfirming,
    isConfirmed,
    isError,
    error,
    hash,
    isIdle,
  });

  const handleCustomIncrement = () => {
    const value = BigInt(customIncrement);
    if (value >= 1) {
      handleIncBy(value);
    }
  };

  // Owner UI: Input + Add button
  if (isOwner) {
    return (
      <div className="flex justify-between gap-2 flex-1">
        <Input
          type="number"
          placeholder="Enter number"
          min={1}
          value={customIncrement.toString()}
          onChange={(e) => setCustomIncrement(BigInt(e.target.value || "1"))}
          disabled={isPending || isConfirming}
        />
        <Button
          onClick={handleCustomIncrement}
          variant="secondary"
          disabled={isPending || isConfirming || !customIncrement}
        >
          {isPending || isConfirming ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Add"
          )}
        </Button>
      </div>
    );
  }

  // Public UI: Full-width increment by 1 button
  return (
    <Button
      className="w-full"
      size="lg"
      onClick={handleInc}
      disabled={isPending || isConfirming}
    >
      {isPending || isConfirming ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <>
          <Plus className="mr-2 h-5 w-5" />
          Increment by 1
        </>
      )}
    </Button>
  );
}
