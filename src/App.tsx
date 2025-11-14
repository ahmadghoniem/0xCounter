import { useState, useEffect } from "react";
import { createPublicClient, formatEther, http } from "viem";
import { localhost } from "viem/chains";

function App() {
  const [balance, setBalance] = useState<string | null>(null);
  const address = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"; // Hardhat account

  useEffect(() => {
    const client = createPublicClient({
      chain: localhost,
      transport: http(),
    });

    async function fetchBalance() {
      const bal = await client.getBalance({ address });
      setBalance(formatEther(bal));
    }

    fetchBalance();
  }, [address]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1>
        address: {address} got {balance ?? "Loading..."} HardEth!
      </h1>
    </div>
  );
}

export default App;
