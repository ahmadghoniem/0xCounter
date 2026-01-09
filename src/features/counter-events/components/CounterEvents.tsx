import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useIsContractDeployed } from "@/hooks/useIsContractDeployed"
import { useIsLocalNetwork } from "@/hooks/useIsLocalNetwork"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useAccount } from "wagmi"
import { useBacklogSync } from "../hooks/useBacklogSync"
import { ITEMS_PER_PAGE, useCounterEvents } from "../hooks/useCounterEvents"
import { CounterEventItem } from "./CounterEventItem"
import CounterEventsPlaceholder from "./CounterEventsPlaceholder"
import HistorySkeletonRows from "./HistorySkeletonRows"
import { LoadingOverlay } from "./LoadingOverlay"
import { PaginationControls } from "./PaginationControls"

export default function CounterEvents() {
  const [page, setPage] = useState(0)
  const { isConnected } = useAccount()
  const isLocalNetwork = useIsLocalNetwork()
  const { isDeployed } = useIsContractDeployed()

  const { isSyncing, progressMessage } = useBacklogSync()
  const { data, isFetching } = useCounterEvents({ page })

  const emptySlots = Math.max(0, ITEMS_PER_PAGE - (data?.events.length ?? 0))

  // Show placeholder when wallet is not connected, contract not deployed, or no events
  const hasNoEvents = !data || data.events.length === 0

  if (!isConnected || !isDeployed || (hasNoEvents && !isFetching)) {
    return (
      <CounterEventsPlaceholder
        isConnected={isConnected}
        isDeployed={isDeployed}
        hasNoEvents={hasNoEvents && !isFetching}
      />
    )
  }

  return (
    <Card className="w-xs">
      <CardHeader>
        <div className="flex items-center justify-center gap-2">
          <CardTitle className="text-2xl">Increment History</CardTitle>
          {/*<span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
            {data?.totalCount ?? 0}
          </span>*/}
        </div>
      </CardHeader>
      <CardContent className="relative">
        <LoadingOverlay
          isLoading={isSyncing || isFetching}
          message={isSyncing ? (progressMessage || "Checking for un-indexed events...") : "Fetching history..."}
        />
        <div
          className={cn(
            "flex flex-col gap-1.5 transition-all duration-300",
            isSyncing || isFetching ? "opacity-25 blur-xs" : "blur-0 opacity-100"
          )}
        >
          {data?.events.map((event) => (
            <CounterEventItem {...event} isLocalNetwork={isLocalNetwork} />
          ))}
          <HistorySkeletonRows count={emptySlots} />
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="mt-1 flex items-center justify-center">
        <PaginationControls
          currentPage={page}
          totalCount={data?.totalCount ?? 0}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setPage}
          disabled={isFetching}
        />
      </CardFooter>
    </Card>
  )
}
