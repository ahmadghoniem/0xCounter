import { TransactionLink } from "@/components/TransactionLink"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Address } from "@/features/identity"
import { useIsContractDeployed } from "@/hooks/useIsContractDeployed"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useAccount, useChainId } from "wagmi"
import { hardhat } from "wagmi/chains"
import { ITEMS_PER_PAGE, useCounterEvents } from "../hooks/useCounterEvents"
import CounterEventsPlaceholder from "./CounterEventsPlaceholder"
import HistorySkeletonRows from "./HistorySkeletonRows"
import { PaginationControls } from "./PaginationControls"

export default function CounterEvents() {
  const [page, setPage] = useState(0)
  const { isConnected } = useAccount()
  const chainId = useChainId()
  const isLocalNetwork = chainId === hardhat.id
  const { isContractDeployed } = useIsContractDeployed()

  const { data, isFetching } = useCounterEvents({ page })
  const totalPages = data ? Math.ceil(data.totalCount / ITEMS_PER_PAGE) : 0

  const emptySlots = Math.max(0, ITEMS_PER_PAGE - (data?.events.length ?? 0))

  // Show placeholder when wallet is not connected, contract not deployed, or no events
  const hasNoEvents = !data || data.events.length === 0

  if (!isConnected || !isContractDeployed || (hasNoEvents && !isFetching)) {
    return (
      <CounterEventsPlaceholder
        isConnected={isConnected}
        isContractDeployed={isContractDeployed}
        hasNoEvents={hasNoEvents && !isFetching}
      />
    )
  }

  return (
    <Card className="w-xs">
      <CardHeader>
        <div className="flex items-center justify-center gap-2">
          <CardTitle className="text-2xl">Increment History</CardTitle>
          <span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
            {data?.totalCount ?? 0}
          </span>
        </div>
      </CardHeader>
      <CardContent className="relative">
        {/* Loading Overlay */}
        {isFetching && (
          <div className="absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 justify-center px-4">
            <div className="bg-background/95 animate-in fade-in zoom-in-95 flex items-center gap-2 rounded-full border px-4 py-2 shadow-lg backdrop-blur-sm duration-200">
              <Loader2 className="text-primary size-4 animate-spin" />
              <span className="text-muted-foreground text-sm font-medium">Fetching history...</span>
            </div>
          </div>
        )}

        <div
          className={cn(
            "space-y-1.5 transition-all duration-300",
            isFetching ? "opacity-25 blur-[2px]" : "blur-0 opacity-100"
          )}
        >
          {data?.events.map(({ id, inc_by, caller_address, indexed_at, tx_hash }) => {
            return (
              <div
                key={id}
                className="bg-card hover:bg-accent/50 group/item flex min-h-14 items-center gap-2 rounded-lg border p-1 transition-colors"
              >
                <div className="bg-primary text-primary-foreground flex h-7.5 w-7.5 items-center justify-center rounded-full">
                  <span className="text-xs font-medium">+{inc_by}</span>
                </div>
                <div className="flex flex-col">
                  <Address address={caller_address} showEnsName={true} />
                  <div className="text-muted-foreground ml-2 text-xs">
                    {formatDistanceToNow(new Date(indexed_at), {
                      addSuffix: true
                    })}
                  </div>
                </div>
                <TransactionLink hash={tx_hash} showTooltip={!isLocalNetwork} />
              </div>
            )
          })}
          <HistorySkeletonRows count={emptySlots} />
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex items-center justify-center">
        <PaginationControls
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          disabled={isFetching}
        />
      </CardFooter>
    </Card>
  )
}
