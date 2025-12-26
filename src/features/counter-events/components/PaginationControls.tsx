import { Button } from "@/components/ui/button"

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showSeparator?: boolean
  className?: string
  disabled?: boolean
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  disabled
}: PaginationControlsProps) {
  const canGoBack = currentPage > 0
  const canGoForward = currentPage < totalPages - 1

  const handlePrevious = () => {
    if (canGoBack) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (canGoForward) {
      onPageChange(currentPage + 1)
    }
  }

  // Don't render if there's only one page or no pages

  return (
    <div className="relative flex w-full items-center justify-between gap-4">
      <Button
        variant="outline"
        size="sm"
        onClick={handlePrevious}
        disabled={disabled || !canGoBack}
      >
        Previous
      </Button>

      <span className="text-muted-foreground absolute left-1/2 -translate-x-1/2 text-sm">
        Page {currentPage + 1} of {totalPages}
      </span>

      <Button variant="outline" size="sm" onClick={handleNext} disabled={disabled || !canGoForward}>
        Next
      </Button>
    </div>
  )
}
