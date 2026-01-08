import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface EnsAvatarProps {
  src?: string | null
  alt?: string
  fallback?: React.ReactNode
  gradient?: string
  className?: string
}

export function EnsAvatar({ src, alt, fallback, gradient, className }: EnsAvatarProps) {
  return (
    <Avatar className={cn("border-card size-20 shrink-0 border select-none", className)}>
      <AvatarImage src={src || undefined} alt={alt} />
      <AvatarFallback
        className="text-2xl font-semibold"
        style={gradient ? { background: gradient } : undefined}
      >
        {fallback}
      </AvatarFallback>
    </Avatar>
  )
}
