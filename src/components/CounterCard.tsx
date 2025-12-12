import { useReadCounterCount } from "@/config/generated";
import useCounterIncrListener from "@/hooks/useCounterIncrementListener";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import IncrementButton from "@/components/IncrementButton";
import { useChainId } from "wagmi";
import { counterAddress } from "@/config/generated";

export default function CounterCard() {
  const chainId = useChainId();
  const isContractDeployed = chainId in counterAddress;

  const {
    data: count,
    isLoading,
    isError,
    error,
    refetch,
  } = useReadCounterCount({
    query: {
      refetchOnWindowFocus: false,
      enabled: isContractDeployed, // Only query if contract exists
    },
  });

  useCounterIncrListener(refetch);

  // Show message when contract doesn't exist on current network
  if (!isContractDeployed) {
    return (
      <Card className="w-2xs h-full justify-between">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Counter App</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center min-h-[200px]">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">
              There are no contracts deployed on this network
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-2xs h-full justify-between">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Counter App</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-around">
        <div className="flex flex-col justify-between gap-2">
          <div>
            <div className="text-center">
              <p className="text-muted-foreground text-sm mb-2">
                Current Count
              </p>
              {isError && (
                <p className="text-red-500">
                  Error: {error?.cause?.toString()}
                </p>
              )}
              <p className="text-5xl font-mono font-bold tabular-nums">
                {isLoading ? "0" : count?.toString()}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <IncrementButton />
      </CardFooter>
    </Card>
  );
}
