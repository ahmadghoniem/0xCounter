import { counterAbi } from "@/config/generated"
import { toLowerAddress } from "@/lib/utils"
import { supabase } from "@/services/supabase"
import { getAbiItem, type PublicClient } from "viem"

interface SyncOptions {
  chainId: number
  contractAddress: `0x${string}`
  publicClient: PublicClient
}

type ProgressStatus =
  | { type: "count"; value: number }
  | { type: "indexing"; value: number }
  | { type: "complete" }

export async function syncMissedEvents({
  chainId,
  contractAddress,
  publicClient,
  onProgress
}: SyncOptions & { onProgress?: (status: ProgressStatus) => void }) {
  // 1. Get the latest indexed block from Supabase
  // We use .maybeSingle() instead of .single() because .single() throws an error if no rows are found (PGRST116),
  // whereas .maybeSingle() simply returns null, which is a valid state for us (first run).
  const { data: lastEvent, error: fetchError } = await supabase
    .from("counter_events")
    .select("block_number")
    .eq("chain_id", chainId)
    .eq("contract_address", toLowerAddress(contractAddress))
    .order("block_number", { ascending: false })
    .limit(1)
    .maybeSingle()

  if (fetchError) {
    throw new Error(`Failed to fetch last indexed block: ${fetchError.message}`)
  }

  const fromBlock = lastEvent ? BigInt(lastEvent.block_number) + 1n : 0n

  // 2. Fetch logs from the blockchain
  const logs = await publicClient.getLogs({
    address: contractAddress as `0x${string}`,
    event: getAbiItem({ abi: counterAbi, name: "Increment" }),
    fromBlock,
    toBlock: "latest"
  })

  if (logs.length === 0) return 0

  // 3. Filter out duplicates
  const txHashes = logs.map((log) => toLowerAddress(log.transactionHash))

  // Create a unique set of fetched hashes first
  const uniqueFetchedHashes = Array.from(new Set(txHashes))

  const { data: existingEvents } = await supabase
    .from("counter_events")
    .select("tx_hash")
    .in("tx_hash", uniqueFetchedHashes)

  const existingTxHashes = new Set(existingEvents?.map((e) => e.tx_hash) || [])

  const newEvents = logs
    .filter((log) => !existingTxHashes.has(toLowerAddress(log.transactionHash)))
    .map((log) => ({
      tx_hash: toLowerAddress(log.transactionHash),
      inc_by: log.args.by?.toString() ?? "0",
      contract_address: toLowerAddress(log.address),
      caller_address: toLowerAddress(log.args.caller!),
      block_number: Number(log.blockNumber),
      chain_id: chainId
    }))

  onProgress?.({ type: "count", value: newEvents.length })

  if (newEvents.length === 0) return 0

  // 4. Batch insert
  onProgress?.({ type: "indexing", value: newEvents.length })
  const { error: insertError } = await supabase.from("counter_events").insert(newEvents)

  if (insertError) {
    throw new Error(`Failed to insert events: ${insertError.message}`)
  }

  onProgress?.({ type: "complete" })

  return newEvents.length
}
