import RainbowKitConnectButton from "@/components/RainbowKitConnectButton"
import { CounterCard } from "@/features/counter"
import { CounterEvents } from "@/features/counter-events"
import { IdentityCard } from "@/features/identity"
import { Toaster } from "sonner"
import { useChainId } from "wagmi"

export default function App() {
  const chainId = useChainId()
  return (
    <>
      <div className="flex min-h-screen items-center justify-center font-sans">
        <RainbowKitConnectButton />
        <div className="flex gap-2">
          <div className="grid grid-rows-3 gap-2">
            <div className="row-span-2 flex flex-col">
              <CounterCard />
            </div>
            <div className="row-span-1 flex flex-col">
              <IdentityCard />
            </div>
          </div>
          <CounterEvents key={chainId} />
        </div>
      </div>
      <Toaster />
    </>
  )
}
