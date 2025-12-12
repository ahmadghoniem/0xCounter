import { useWatchCounterIncrementEvent } from "@/config/generated";
import { useChainId } from "wagmi";
import { toast } from "sonner";
import { truncateAddress } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";

export default function useCounterIncrListener(refetchCount: () => void) {
  const queryClient = useQueryClient();
  const chainId = useChainId();

  useWatchCounterIncrementEvent({
    onError(error) {
      console.log("Error", error);
    },
    onLogs(logs) {
      console.log(logs);
      if (logs.length === 0) return;

      Promise.all(
        logs.map(async (log) => {
          const incBy = log.args?.by;
          const contractAddress = log.address.toLowerCase();
          const callerAddress = log.args?.caller?.toLowerCase();
          const txHash = log.transactionHash;

          if (incBy === undefined) return;

          try {
            const { error } = await supabase
              .from("counter_events")
              .insert({
                tx_hash: txHash,
                block_number: Number(log.blockNumber),
                contract_address: contractAddress,
                chain_id: chainId, // Use the hook instead of log.chainId
                caller_address: callerAddress,
                inc_by: incBy.toString(),
              })
              .select()
              .single();

            if (error) {
              if (error.code === "23505") {
                console.log(`Transaction ${txHash} already indexed`);
                return;
              }
              console.error("Supabase insert error:", error);
              return;
            }

            toast.success(
              `Counter incremented by ${truncateAddress(callerAddress)}`,
              {
                description: `Incremented by ${incBy.toString()}. Transaction: ${txHash.slice(0, 10)}...`,
              },
            );

            queryClient.invalidateQueries({
              queryKey: ["counter-history"],
            });
            refetchCount();
          } catch (err) {
            console.error("Failed to process event:", err);
          }
        }),
      ).catch((err) => {
        console.error("Error processing logs:", err);
      });
    },
  });
}
