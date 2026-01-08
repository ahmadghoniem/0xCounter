import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useReadCounterOwner } from "@/config/generated"
import { useTransactionToast } from "@/hooks/useTransactionToast"
import { toLowerAddress } from "@/lib/utils"
import { Loader2, Plus } from "lucide-react"
import { useState } from "react"
import { useAccount } from "wagmi"
import useIncrementCounter from "../hooks/useIncrementCounter"

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
    isIdle
  } = useIncrementCounter()

  const { address } = useAccount()
  const { data: owner } = useReadCounterOwner()

  const isOwner = owner && address && toLowerAddress(owner) === toLowerAddress(address)
  const [customIncrement, setCustomIncrement] = useState<bigint>(1n)

  useTransactionToast({
    isPending,
    isConfirming,
    isConfirmed,
    isError,
    error,
    hash,
    isIdle
  })

  const handleCustomIncrement = () => {
    const value = BigInt(customIncrement)
    if (value >= 1) {
      handleIncBy(value)
    }
  }

  // Owner UI: Input + Add button
  if (isOwner) {
    return (
      <div className="flex flex-1 justify-between gap-2">
        <Input
          type="number"
          placeholder="Enter number"
          min={1}
          value={customIncrement.toString()}
          onChange={(e) => {
            try {
              const value = BigInt(e.target.value || "1")
              if (value >= 1n) {
                setCustomIncrement(value)
              }
            } catch {
              // Keep previous value on invalid input
            }
          }}
          disabled={isPending || isConfirming}
        />
        <Button
          onClick={handleCustomIncrement}
          variant="secondary"
          disabled={isPending || isConfirming || !customIncrement}
        >
          {isPending || isConfirming ? <Loader2 className="size-4 animate-spin" /> : "Add"}
        </Button>
      </div>
    )
  }

  // Public UI: Full-width increment by 1 button
  return (
    <Button className="w-full" size="lg" onClick={handleInc} disabled={isPending || isConfirming}>
      {isPending || isConfirming ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <>
          <Plus className="mr-2 h-5 w-5" />
          Increment by 1
        </>
      )}
    </Button>
  )
}
