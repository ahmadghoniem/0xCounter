import { useWatchContractEvent } from "wagmi";
import { counterConfig } from "@/config/generated";
import { hardhat } from "wagmi/chains";
import { toast } from "sonner";
import { truncateAddress } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";

export default function useCounterIncrListener(refetchCount: () => void) {
  const queryClient = useQueryClient(); // Add this

  useWatchContractEvent({
    abi: counterConfig.abi,
    address: counterConfig.address[hardhat.id],
    eventName: "Increment",
    onLogs(logs) {
      if (logs.length === 0) return;

      logs.forEach(async (log) => {
        const txHash = log.transactionHash;
        const callerAddress = log.args?.caller;
        const incBy = log.args?.by;

        if (incBy === undefined) return;

        try {
          // Try to insert into Supabase
          const { data, error } = await supabase
            .from("counter_events")
            .insert({
              tx_hash: txHash,
              block_number: Number(log.blockNumber),
              caller_address: callerAddress,
              inc_by: incBy.toString(),
            })
            .select()
            .single();

          // Check if it's a duplicate
          if (error) {
            if (error.code === "23505") {
              // Duplicate tx_hash - already processed
              console.log(`Transaction ${txHash} already indexed`);
              return;
            }
            console.error("Supabase insert error:", error);
            return;
          }

          // Success! This is a NEW event
          toast.success(
            `Counter incremented by ${truncateAddress(callerAddress)}`,
            {
              description: `Incremented by ${incBy.toString()}. Transaction: ${txHash.slice(0, 10)}...`,
            },
          );
          // Immediately update the history
          queryClient.invalidateQueries({
            queryKey: ["counter-history"],
          });
          refetchCount();
        } catch (err) {
          console.error("Failed to process event:", err);
        }
      });
    },
  });
}
