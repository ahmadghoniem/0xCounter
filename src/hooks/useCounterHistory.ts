import { useQuery } from "@tanstack/react-query";
import { supabase, type CounterEvent } from "@/lib/supabase";
import { useChainId } from "wagmi";
import { counterAddress } from "@/config/generated";
export const ITEMS_PER_PAGE = 5;

interface UseCounterHistoryOptions {
  page?: number;
  itemsPerPage?: number;
}

interface CounterHistoryResult {
  events: CounterEvent[];
  totalCount: number;
}

export function useCounterHistory(options: UseCounterHistoryOptions = {}) {
  const chainId = useChainId();
  const isContractDeployed = chainId in counterAddress;

  const { page = 0, itemsPerPage = ITEMS_PER_PAGE } = options;

  return useQuery({
    queryKey: ["counter-history", chainId, page],
    queryFn: async (): Promise<CounterHistoryResult> => {
      const from = page * itemsPerPage;
      const to = from + itemsPerPage - 1;

      const address = counterAddress[chainId as keyof typeof counterAddress];
      if (!address) return { events: [], totalCount: 0 };

      const { data, error, count } = await supabase
        .from("counter_events")
        .select("*", { count: "exact" })
        .eq("chain_id", chainId)
        .eq("contract_address", address.toLowerCase())
        .order("block_number", { ascending: false })
        .range(from, to);
      if (error) throw error;

      return {
        events: data as CounterEvent[],
        totalCount: count ?? 0,
      };
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: isContractDeployed, // Only fetch if contract exists
  });
}
