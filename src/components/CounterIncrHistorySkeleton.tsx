import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ITEMS_PER_PAGE = 5;

export default function CounterIncrHistorySkeleton() {
  return (
    <Card className="min-w-xs">
      <CardHeader>
        <div className="flex items-center justify-center gap-2">
          <CardTitle className="text-xl">Recent Activity</CardTitle>
          <div className="h-5 w-8 bg-muted rounded-full animate-pulse" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-2">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
            <div
              key={`skeleton-${i}`}
              className="flex items-center gap-3 p-2 rounded-lg border bg-card"
            >
              {/* Skeleton Increment Badge */}
              <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />

              {/* Skeleton Event Details */}
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                <div className="h-3 w-24 bg-muted rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
