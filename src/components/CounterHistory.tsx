import { formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import CounterIncrHistorySkeleton from "@/components/CounterHistorySkeleton";
import { useCounterHistory, ITEMS_PER_PAGE } from "@/hooks/useCounterHistory";
import { PaginationControls } from "@/components/PaginationControls";
import HistorySkeletonRows from "@/components/HistorySkeletonRows";
import { Separator } from "@/components/ui/separator";
import { Address } from "@/components/Address";
import { TransactionLink } from "@/components/TransactionLink";
import { counterAddress } from "@/config/generated";
import { useChainId } from "wagmi";

export default function CounterHistory() {
  const [page, setPage] = useState(0);
  const chainId = useChainId();
  const isContractDeployed = chainId in counterAddress;

  const { data, error, isPending, isFetching } = useCounterHistory({ page });
  const totalPages = data ? Math.ceil(data.totalCount / ITEMS_PER_PAGE) : 0;

  if (error) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="flex items-center gap-2 p-4 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          <span>Failed to load history: {error.cause?.toString()}</span>
        </CardContent>
      </Card>
    );
  }

  // Show full skeleton only on initial load (no data yet)
  if (isPending) {
    return <CounterIncrHistorySkeleton />;
  }

  if (!isContractDeployed) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 text-center text-sm text-muted-foreground">
          There are No Contract deployed on this network.
        </CardContent>
      </Card>
    );
  }

  if (!data || data.events.length === 0) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 text-center text-sm text-muted-foreground">
          No increments yet. {"\n"}
          Be the first to increment the counter!
        </CardContent>
      </Card>
    );
  }

  const emptySlots = Math.max(0, ITEMS_PER_PAGE - data.events.length);

  return (
    <Card className="min-w-xs ">
      <CardHeader>
        <div className="flex items-center justify-center gap-2">
          <CardTitle className="text-2xl">Recent Activity</CardTitle>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {data.totalCount}
          </span>
        </div>
      </CardHeader>
      <CardContent
        className={`transition-opacity duration-200 ${isFetching ? "opacity-50" : "opacity-100"}`}
      >
        <div className="space-y-1.5">
          {data.events.map(
            ({ id, inc_by, caller_address, indexed_at, tx_hash }) => {
              return (
                <div
                  key={id}
                  className="flex items-center gap-2 p-1 min-h-14 rounded-lg border bg-card hover:bg-accent/50 transition-colors group/item"
                >
                  <div className="flex items-center justify-center w-7.5 h-7.5 rounded-full bg-primary text-primary-foreground">
                    <span className="text-xs font-semibold">+{inc_by}</span>
                  </div>
                  <div className="flex flex-col">
                    <Address address={caller_address} />
                    <div className="text-xs text-muted-foreground ml-2">
                      {formatDistanceToNow(new Date(indexed_at), {
                        addSuffix: true,
                      })}
                    </div>
                  </div>
                  <TransactionLink hash={tx_hash} />
                </div>
              );
            },
          )}
          <HistorySkeletonRows count={emptySlots} />
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-center items-center">
        <PaginationControls
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </CardFooter>
    </Card>
  );
}
