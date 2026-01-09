import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileCode2 } from "lucide-react"

interface CounterCardPlaceholderProps {
  isConnected: boolean
  isDeployed: boolean
}

export default function CounterCardPlaceholder({
  isConnected,
  isDeployed
}: CounterCardPlaceholderProps) {
  let message = "Loading..."
  if (!isConnected) {
    message =
      "Connect your wallet to read the counter state and send increment transactions on local Hardhat or testnets like Sepolia."
  } else if (!isDeployed) {
    message = "No contract deployed on Hardhat local network."
  }

  return (
    <Card className="h-full w-xs justify-between">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Counter App</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <FileCode2 className="text-muted-foreground/50 h-12 w-12" />
          <p className="text-muted-foreground text-center">{message}</p>
        </div>
      </CardContent>
    </Card>
  )
}
