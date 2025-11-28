import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PublicIncrBtn from "@/components/PublicIncrBtn";
import OnlyOwnerIncrBtn from "@/components/OnlyOwnerIncrBtn";
import CurrentCount from "@/components/CurrentCount";
import useContractOwner from "@/hooks/useContractOwner";
import { useAccount } from "wagmi";
export default function App() {
  // we need to check if the user is the owner by checking connected wallet addy
  // and comparing it to the contract deployer from the only owner
  const { owner, isLoading, isError, error } = useContractOwner();
  const { address, isConnected } = useAccount();
  if (!isConnected) {
    return <p className="text-center">Make sure to connect your wallet</p>;
  }
  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }
  if (isError) {
    return (
      <p className="text-center">
        Failed to fetch contract owner msg: {error?.message}
      </p>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Counter App</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current  */}
        <CurrentCount />

        {/*Public Increment by 1 Button */}
        <PublicIncrBtn />

        {/* Only Owner Increment by custom amount Button */}
        {owner === address && <OnlyOwnerIncrBtn />}
      </CardContent>
    </Card>
  );
}
