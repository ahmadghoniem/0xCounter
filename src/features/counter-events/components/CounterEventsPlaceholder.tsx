import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollText } from "lucide-react"

interface CounterEventsPlaceholderProps {
  isConnected: boolean
  isContractDeployed: boolean
  hasNoEvents: boolean
}

export default function CounterEventsPlaceholder({
  isConnected,
  isContractDeployed,
  hasNoEvents
}: CounterEventsPlaceholderProps) {
  let message = "Loading..."
  if (!isConnected) {
    message =
      "Connect your wallet to view indexed increment events from local Hardhat or testnets like Sepolia."
  } else if (!isContractDeployed) {
    message = "No contract deployed on this network."
  } else if (hasNoEvents) {
    message = "No increments yet. Be the first — your transaction will be indexed here."
  }

  return (
    <Card className="w-xs">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Increment History</CardTitle>
      </CardHeader>
      <CardContent className="flex min-h-[280px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <ScrollText className="text-muted-foreground/50 h-12 w-12" />
          <p className="text-muted-foreground text-center">{message}</p>
        </div>
      </CardContent>
    </Card>
  )
}
