import useCounterIncrListener from "@/hooks/useCounterIncrListener";
import useReadCounter from "@/hooks/useReadCounter";

export default function CurrentCount() {
  const {
    count,
    isLoading: isLoadingCount,
    isError,
    error,
    refetch,
  } = useReadCounter();
  useCounterIncrListener(refetch);

  return (
    <div>
      <div className="text-center">
        <p className="text-muted-foreground text-sm mb-2">Current Count</p>
        {isError && <p className="text-red-500">Error: {error?.message}</p>}
        <p className="text-6xl font-bold tabular-nums">
          {isLoadingCount ? "Loading..." : count}
        </p>
      </div>
    </div>
  );
}
// by switching tabs or switching context from tab the value updates
// Your useReadCounter hook likely wraps Wagmi's useReadContract, which uses TanStack Query. This system is highly optimized to save bandwidth, RPC calls, and battery power.

// By default, the system implements two key mechanisms:

// refetchOnWindowFocus (The cause of your issue): The query is set to stale immediately after it fetches. However, it only attempts to refetch when the browser tab gains focus. When you switch tabs and switch back, your dApp tab gains focus, triggering a network request to update the count.

// No Default Polling: Standard Wagmi useReadContract calls often do not have a continuous polling interval set by default (or it's set very high).

// const { data } = useReadContract({
//     // ... contract configuration ...
//     functionName: 'getCount',

//     // --- THIS IS THE CRITICAL LINE ---
//     // Wagmi will now automatically refetch the count every 4000 milliseconds (4 seconds).
//     // You can adjust this interval based on how frequently you expect the count to change.
//     query: {
//         pollingInterval: 4000,
//     },
// });
