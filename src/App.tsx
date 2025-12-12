import { useAccount, useChainId } from "wagmi";
import RainbowKitConnectButton from "@/components/RainbowKitConnectButton";
import CounterHistory from "@/components/CounterHistory";
import { Toaster } from "sonner";
import CounterCard from "@/components/CounterCard";
import IdentityCard from "@/components/IdentityCard";

export default function App() {
  const { isConnected, isConnecting } = useAccount(); // can use chain?.name to get connected chain name instead of just it's Id using useChainId
  const chainId = useChainId();

  if (!isConnected) {
    return (
      <>
        {/**TODO: turn into an empty component? */}
        <p className="text-center">Make sure to connect your wallet</p>
        <RainbowKitConnectButton />
      </>
    );
  }
  if (isConnecting) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center font-sans">
        <RainbowKitConnectButton />
        <div className="flex gap-2">
          <div className="flex flex-col gap-2">
            <CounterCard />
            <IdentityCard />
          </div>
          <CounterHistory key={chainId} />
        </div>
      </div>
      <Toaster />
    </>
  );
}
//
