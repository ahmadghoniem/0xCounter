import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { supabase, type CounterEvent } from "@/lib/supabase";

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
  const { page = 0, itemsPerPage = ITEMS_PER_PAGE } = options;

  return useQuery({
    queryKey: ["counter-history", page],
    queryFn: async (): Promise<CounterHistoryResult> => {
      const from = page * itemsPerPage;
      const to = from + itemsPerPage - 1;

      const { data, error, count } = await supabase
        .from("counter_events")
        .select("*", { count: "exact" })
        .order("indexed_at", { ascending: false })
        .range(from, to);

      if (error) throw error;

      return {
        events: data as CounterEvent[],
        totalCount: count ?? 0,
      };
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    placeholderData: keepPreviousData,
  });
}
