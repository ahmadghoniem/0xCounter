import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import useIncrementCounter from "@/hooks/useIncrementCounter";
export default function PublicIncrBtn() {
  const { handleInc, isWritePending, isConfirming } = useIncrementCounter();
  return (
    <Button
      className="w-full"
      size="lg"
      onClick={handleInc}
      disabled={isWritePending || isConfirming}
    >
      {isWritePending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Awaiting Wallet...
        </>
      ) : isConfirming ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Confirming...
        </>
      ) : (
        <>
          <Plus className="mr-2 h-5 w-5" />
          Increment by 1
        </>
      )}
    </Button>
  );
}
