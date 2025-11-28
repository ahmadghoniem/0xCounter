import { Button } from "@/components/ui/button";
import { Settings, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import useIncrementCounter from "@/hooks/useIncrementCounter";
import { useEffect, useState } from "react";

export default function OnlyOwnerIncrBtn() {
  const {
    handleIncBy,
    isWritePending,
    isConfirming,
    isConfirmed,
    isError,
    error,
  } = useIncrementCounter();
  const [customIncrement, setCustomIncrement] = useState<bigint>(0n);

  useEffect(() => {
    if (isConfirmed) {
      setCustomIncrement(0n);
    }
  }, [isConfirmed]);

  const handleCustomIncrement = () => {
    const value = BigInt(customIncrement);
    if (value > 0) {
      handleIncBy(value);
    }
  };

  return (
    <div className="space-y-3 pt-4 border-t">
      <p className="text-sm text-muted-foreground flex items-center gap-2">
        <Settings className="h-4 w-4" />
        Owner Controls
      </p>
      <div className="flex gap-2">
        <Input
          type="number"
          placeholder="Enter number"
          value={customIncrement.toString()}
          onChange={(e) => setCustomIncrement(BigInt(e.target.value))}
          disabled={isWritePending || isConfirming}
        />
        <Button
          onClick={handleCustomIncrement}
          variant="secondary"
          disabled={isWritePending || isConfirming || !customIncrement}
        >
          {isWritePending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Awaiting Wallet...
            </>
          ) : isConfirming ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Confirming...
            </>
          ) : (
            "Add"
          )}
        </Button>
        {isError && <p className="text-red-500">{error?.message}</p>}
      </div>
    </div>
  );
}
