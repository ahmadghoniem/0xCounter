import { createClient } from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL;
const supabaseKey = import.meta.env
  .VITE_REACT_APP_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const supabase = createClient(supabaseUrl!, supabaseKey!);
// TypeScript types for CounterEvent table
export type CounterEvent = {
  id: number;
  tx_hash: string;
  block_number: number;
  caller_address: string;
  inc_by: string;
  indexed_at: string;
};
