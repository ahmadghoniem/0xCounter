import { TransactionLink } from "@/components/TransactionLink"
import { counterAddress, useWatchCounterIncrementEvent } from "@/config/generated"
import { truncateAddress } from "@/lib/utils"
import { supabase } from "@/services/supabase"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useAccount, useChainId } from "wagmi"

export default function useCounterIncrListener(refetchCount: () => void) {
  const queryClient = useQueryClient()
  const chainId = useChainId()
  const { address } = useAccount()

  useWatchCounterIncrementEvent({
    onError(error) {
      console.log("Error", error)
    },
    onLogs(logs) {
      console.log(logs)
      if (logs.length === 0) return

      Promise.all(
        logs.map(async (log) => {
          const incBy = log.args?.by
          const contractAddress = log.address.toLowerCase()
          const contractChainId = Number(
            Object.entries(counterAddress).find(
              ([, addr]) => addr.toLowerCase() === contractAddress
            )?.[0]
          )
          const callerAddress = log.args?.caller?.toLowerCase()
          const txHash = log.transactionHash

          if (incBy === undefined) return

          try {
            const { error } = await supabase
              .from("counter_events")
              .insert({
                tx_hash: txHash,
                block_number: Number(log.blockNumber),
                contract_address: contractAddress,
                chain_id: chainId,
                caller_address: callerAddress,
                inc_by: incBy.toString()
              })
              .select()
              .single()

            if (error) {
              if (error.code === "23505") {
                console.log(`Transaction ${txHash} already indexed`)
                return
              }
              console.error("Supabase insert error:", error)
              return
            }
            if (callerAddress !== address?.toLowerCase() && chainId === contractChainId) {
              toast.success(`Counter incremented by ${truncateAddress(callerAddress)}`, {
                description: `Incremented by ${incBy.toString()}.View on Explorer`,
                action: <TransactionLink hash={txHash} showTooltip={false} />
              })
            }

            queryClient.invalidateQueries({
              queryKey: ["counter-events"]
            })
            refetchCount()
          } catch (err) {
            console.error("Failed to process event:", err)
          }
        })
      ).catch((err) => {
        console.error("Error processing logs:", err)
      })
    }
  })
}
