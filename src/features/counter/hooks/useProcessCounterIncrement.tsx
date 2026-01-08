import { Address } from "@/components/Address"
import { TransactionLink } from "@/components/TransactionLink"
import { counterAddress, useWatchCounterIncrementEvent } from "@/config/generated"
import { toLowerAddress } from "@/lib/utils"
import { supabase } from "@/services/supabase"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useAccount, useChainId } from "wagmi"

export default function useProcessCounterIncrement(refetchCount: () => void) {
  const queryClient = useQueryClient()
  const chainId = useChainId()
  const { address, chain } = useAccount()
  const blockExplorerName = chain?.blockExplorers?.default?.name || "Block Explorer"
  useWatchCounterIncrementEvent({
    onError(error) {
      console.log("Error", error)
    },
    onLogs(logs) {
      console.log(logs)
      if (logs.length === 0) return

      Promise.all(
        logs.map(async (log) => {
          const incBy = log.args.by
          const contractAddress = log.address
          const contractChainId = Number(
            Object.entries(counterAddress).find(
              ([, addr]) => toLowerAddress(addr) === toLowerAddress(contractAddress)
            )?.[0]
          )
          const callerAddress = toLowerAddress(log.args.caller!)
          const txHash = toLowerAddress(log.transactionHash)

          if (incBy === undefined) return

          try {
            const { error } = await supabase
              .from("counter_events")
              .insert({
                tx_hash: txHash,
                inc_by: incBy.toString(),
                contract_address: contractAddress,
                caller_address: callerAddress,
                block_number: Number(log.blockNumber),
                chain_id: chainId
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
            // IMPNOTE: don't show even emitted by the current user && don't show if it's not on the same chain
            if (callerAddress !== toLowerAddress(address!) && chainId === contractChainId) {
              toast.success(
                <span>
                  <Address
                    address={callerAddress!}
                    className="p-px"
                    showCopyButton={false}
                    showTooltip={false}
                  />
                  Added {incBy.toString()} to the counter
                </span>,
                {
                  description: `View on ${blockExplorerName}`,
                  action: <TransactionLink hash={txHash} showTooltip={false} />
                }
              )
            }

            await queryClient.invalidateQueries({
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
