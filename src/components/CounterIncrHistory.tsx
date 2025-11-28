import { formatDistanceToNow } from "date-fns";
import { truncateAddress } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import CounterIncrHistorySkeleton from "@/components/CounterIncrHistorySkeleton";
import { useCounterHistory, ITEMS_PER_PAGE } from "@/hooks/useCounterHistory";
import { PaginationControls } from "@/components/ui/PaginationControls";

export default function CounterHistory() {
  const [page, setPage] = useState(0);

  const { data, error, isPending, isFetching } = useCounterHistory({ page });

  const totalPages = data ? Math.ceil(data.totalCount / ITEMS_PER_PAGE) : 0;

  // Show full skeleton only on initial load (no data yet)
  if (isPending) {
    return <CounterIncrHistorySkeleton />;
  }

  if (error) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="flex items-center gap-2 p-4 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          <span>Failed to load history: {error.message}</span>
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
          No increments yet. Be the first to increment the counter!
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="min-w-xs">
      <CardHeader>
        <div className="flex items-center justify-center gap-2">
          <CardTitle className="text-xl">Recent Activity</CardTitle>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {data.totalCount}
          </span>
        </div>
      </CardHeader>
      <CardContent
        className={`space-y-2 transition-opacity duration-200 ${isFetching ? "opacity-50" : "opacity-100"}`}
      >
        <div className="space-y-2">
          {data.events.map((event) => (
            <div
              key={event.id}
              className="flex items-center gap-3 p-2 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              {/* Increment Value - Smaller */}
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                <span className="text-xs font-semibold">+{event.inc_by}</span>
              </div>

              {/* Event Details */}
              <div className="flex-1 space-y-0.5">
                <div className="text-sm font-mono font-medium">
                  {truncateAddress(event.caller_address)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(event.indexed_at), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              {/* Transaction Link - Commented out for now */}
              {/* <a
                href={`https://etherscan.io/tx/${event.tx_hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline whitespace-nowrap"
                onClick={(e) => e.stopPropagation()}
              >
                View Tx →
              </a> */}
            </div>
          ))}
        </div>
      </CardContent>
      <PaginationControls
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </Card>
  );
}
