import { Address } from "@/components/Address"
import { TransactionLink } from "@/components/TransactionLink"
import { formatDistanceToNow } from "date-fns"

interface CounterEventItemProps {
  id: number
  inc_by: number
  caller_address: `0x${string}`
  indexed_at: string
  tx_hash: string
  isLocalNetwork: boolean
}

export function CounterEventItem({
  id,
  inc_by,
  caller_address,
  indexed_at,
  tx_hash,
  isLocalNetwork
}: CounterEventItemProps) {
  return (
    <div
      key={id}
      className="bg-card hover:bg-accent/50 group/item flex items-center gap-2 rounded-lg border p-1.25 transition-colors"
    >
      <div className="bg-primary text-primary-foreground flex h-7.5 w-7.5 items-center justify-center rounded-full">
        <span className="text-xs font-medium">+{inc_by}</span>
      </div>
      <div className="flex flex-col">
        <Address address={caller_address} showEnsName={true} />
        <div className="text-muted-foreground ml-2 text-xs">
          {formatDistanceToNow(new Date(indexed_at), {
            addSuffix: true
          })}
        </div>
      </div>
      <TransactionLink hash={tx_hash} showTooltip={!isLocalNetwork} />
    </div>
  )
}
