import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useReadCounterCount } from "@/config/generated"
import { useIsContractDeployed } from "@/hooks/useIsContractDeployed"
import { useAccount } from "wagmi"
import useCounterIncrListener from "../hooks/useCounterIncrementListener"
import CounterCardPlaceholder from "./CounterCardPlaceholder"
import IncrementButton from "./IncrementButton"

export default function CounterCard() {
  const { isConnected } = useAccount()
  const { isContractDeployed, isLoading: isBytecodeLoading } = useIsContractDeployed()

  const {
    data: count,
    isLoading,
    isError,
    error,
    refetch
  } = useReadCounterCount({
    query: {
      refetchOnWindowFocus: false,
      enabled: isContractDeployed
    }
  })

  useCounterIncrListener(refetch)

  // Show placeholder when wallet is not connected, contract not found on chain, or still checking
  if (!isConnected || isBytecodeLoading || !isContractDeployed) {
    return (
      <CounterCardPlaceholder
        isConnected={isConnected}
        isContractDeployed={isBytecodeLoading ? true : isContractDeployed}
      />
    )
  }

  return (
    <Card className="h-full w-xs justify-between">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Counter App</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-around">
        <div className="flex flex-col justify-between gap-2">
          <div>
            <div className="text-center">
              {isError && <p className="max-w-prose text-red-500">{error.cause.message}</p>}
              <p className="font-mono text-6xl font-bold tabular-nums transition-all">
                {isLoading ? "0" : count?.toString()}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <IncrementButton />
      </CardFooter>
    </Card>
  )
}
