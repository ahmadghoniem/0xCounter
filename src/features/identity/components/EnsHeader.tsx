import { cn } from "@/lib/utils"

interface EnsHeaderProps {
  header?: string | null
  gradient?: string
  className?: string
}

export function EnsHeader({ header, gradient, className }: EnsHeaderProps) {
  return (
    <div
      className={cn("relative h-22 w-full overflow-hidden", className)}
      style={gradient ? { background: gradient } : undefined}
    >
      {header && (
        <img
          src={header}
          style={{ background: header || gradient }}
          alt="Profile header"
          className="absolute inset-0 h-full w-full object-cover select-none"
        />
      )}
    </div>
  )
}
