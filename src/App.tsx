import { Header } from "@/components/Header"
import { CounterCard } from "@/features/counter"
import { CounterEvents } from "@/features/counter-events"
import { IdentityCard } from "@/features/identity"
import { Toaster } from "sonner"
import { useChainId } from "wagmi"

export default function App() {
  const chainId = useChainId()
  return (
    <>
      <div className="flex min-h-screen flex-col font-sans">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="flex min-h-108 flex-row gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex h-full flex-2/3">
                <CounterCard />
              </div>
              <div className="flex h-full flex-1/3">
                <IdentityCard />
              </div>
            </div>
            <div className="flex">
              <CounterEvents key={chainId} />
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  )
}
