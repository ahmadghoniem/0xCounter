import { counterAddress } from "@/config/generated"
import { useIsLocalContractDeployed } from "@/hooks/useIsLocalContractDeployed"
import { useIsLocalNetwork } from "@/hooks/useIsLocalNetwork"
import { toLowerAddress } from "@/lib/utils"
import { supabase, type CounterEvent } from "@/services/supabase"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useChainId } from "wagmi"

export const ITEMS_PER_PAGE = 5

interface UseCounterEventsOptions {
  page?: number
  itemsPerPage?: number
}

interface CounterEventsResult {
  events: CounterEvent[]
  totalCount: number
}

export function useCounterEvents(options: UseCounterEventsOptions = {}) {
  const chainId = useChainId()
  const isLocalNetwork = useIsLocalNetwork()
  const { isLocalContractDeployed } = useIsLocalContractDeployed()
  const contractAddress = counterAddress[chainId as keyof typeof counterAddress]
  const { page = 0, itemsPerPage = ITEMS_PER_PAGE } = options

  return useQuery({
    queryKey: ["counter-events", chainId, page],
    queryFn: async (): Promise<CounterEventsResult> => {
      const from = page * itemsPerPage
      const to = from + itemsPerPage - 1

      if (!isLocalContractDeployed) return { events: [], totalCount: 0 } // avoid querying if contract address is not deployed

      const { data, error, count } = await supabase
        .from("counter_events")
        .select("*", { count: "exact" })
        .eq("chain_id", chainId)
        .eq("contract_address", toLowerAddress(contractAddress))
        .order("block_number", { ascending: false })
        .range(from, to)
      if (error) throw error

      return {
        events: data as CounterEvent[],
        totalCount: count ?? 0
      }
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: !isLocalNetwork || isLocalContractDeployed,
    placeholderData: keepPreviousData
  })
}
