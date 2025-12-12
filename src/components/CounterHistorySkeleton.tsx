import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ITEMS_PER_PAGE = 5;

export default function CounterIncrHistorySkeleton() {
  return (
    <Card className="max-w-xs">
      <CardHeader>
        <div className="flex items-center justify-center gap-2">
          <CardTitle className="text-2xl">Recent Activity</CardTitle>
          <div className="h-5 w-8 bg-muted rounded-full animate-pulse" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1.5">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
            <div
              key={`skeleton-${i}`}
              className="flex items-center gap-2 p-1 min-h-14 rounded-lg border bg-card"
            >
              <div className="w-7.5 h-7.5 rounded-full bg-muted animate-pulse" />

              <div className="flex-1 flex flex-col gap-1">
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
