import { cn } from "@/lib/utils"

interface IdentityDetailsProps {
  title: React.ReactNode
  subtitle: React.ReactNode
  action?: React.ReactNode
  className?: string
}

export function IdentityDetails({ title, subtitle, action, className }: IdentityDetailsProps) {
  return (
    <div className={cn("flex flex-1 items-end justify-between gap-1", className)}>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-base font-semibold">{title}</h3>
        <div className="text-muted-foreground text-sm">{subtitle}</div>
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
