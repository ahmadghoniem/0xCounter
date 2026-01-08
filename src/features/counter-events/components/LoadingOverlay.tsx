import { Loader2 } from "lucide-react"

interface LoadingOverlayProps {
  isLoading: boolean
  message: string
}

export function LoadingOverlay({ isLoading, message }: LoadingOverlayProps) {
  if (!isLoading) {
    return null
  }

  return (
    <div className="absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 justify-center px-4">
      <div className="bg-background/95 animate-in fade-in zoom-in-95 flex items-center gap-2 rounded-full border px-4 py-2 shadow-lg backdrop-blur-sm duration-200">
        <Loader2 className="text-primary size-4 animate-spin" />
        <span className="text-muted-foreground text-sm font-medium">{message}</span>
      </div>
    </div>
  )
}
