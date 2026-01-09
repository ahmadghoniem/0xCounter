import { counterAddress } from "@/config/generated"
import { useIsContractDeployed } from "@/hooks/useIsContractDeployed"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useChainId, usePublicClient } from "wagmi"
import { syncMissedEvents } from "../api/sync"

export function useBacklogSync() {
  const [isSyncing, setIsSyncing] = useState(false)
  const [hasSynced, setHasSynced] = useState(false)
  const [progressMessage, setProgressMessage] = useState<string | null>(null)

  const queryClient = useQueryClient()
  const publicClient = usePublicClient()
  const chainId = useChainId()
  const contractAddress = counterAddress[chainId as keyof typeof counterAddress]
  const { isDeployed } = useIsContractDeployed()

  useEffect(() => {
    if (!isDeployed || !contractAddress || !publicClient || hasSynced || isSyncing) {
      return
    }

    const sync = async () => {
      setIsSyncing(true)
      setProgressMessage("Checking for un-indexed events...")
      try {
        const count = await syncMissedEvents({
          chainId,
          contractAddress,
          publicClient,
          onProgress: (status) => {
            if (status.type === "count") {
              if (status.value > 0) {
                setProgressMessage(`Found ${status.value} un-indexed blockchain events`)
              } else {
                setProgressMessage("No un-indexed events found")
                setTimeout(() => setProgressMessage(null), 200)
              }
            } else if (status.type === "indexing") {
              setProgressMessage(`Indexing ${status.value} new events...`)
            } else if (status.type === "complete") {
              setProgressMessage("Sync complete!")
              setTimeout(() => setProgressMessage(null), 500)
            }
          }
        })
        console.log(`[BacklogSync] synced ${count} missed events`)

        if (count > 0) {
          await queryClient.invalidateQueries({ queryKey: ["counter-events"] })
        }
      } catch (error) {
        console.error("[BacklogSync] Failed:", error)
        setProgressMessage(null)
      } finally {
        setIsSyncing(false)
        setHasSynced(true)
      }
    }

    sync()
  }, [isDeployed, contractAddress, publicClient, chainId, hasSynced, isSyncing, queryClient])

  return { isSyncing, progressMessage }
}
