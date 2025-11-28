// 0x5FbDB2315678afecb367f032d93F642f64180aa3 contact address could be found in ignition\deployments\chain-31337\deployed_addresses.json
// SystemModule#Counter - 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
// SystemModule#NotCounter - 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9

import { useReadContract } from "wagmi";
import { counterConfig } from "@/config/generated";
import { hardhat } from "wagmi/chains";

export default function useContractOwner() {
  const {
    data: owner,
    isLoading,
    isError,
    error,
  } = useReadContract({
    abi: counterConfig.abi,
    address: counterConfig.address[hardhat.id],
    functionName: "owner", // The public variable 'x' auto-generates a getter function
    args: [],
  });

  return { owner, isLoading, isError, error };
}
