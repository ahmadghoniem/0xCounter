import { Button } from "@/components/ui/button"

interface PaginationControlsProps {
  currentPage: number
  totalCount: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  showSeparator?: boolean
  className?: string
  disabled?: boolean
}

export function PaginationControls({
  currentPage,
  totalCount,
  itemsPerPage,
  onPageChange,
  disabled
}: PaginationControlsProps) {
  const totalPages = Math.max(0, Math.ceil(totalCount / itemsPerPage))
  const canGoBack = currentPage > 0
  const canGoForward = totalPages > 0 && currentPage < totalPages - 1

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

  // Display text for current range
  const start = totalCount === 0 ? 0 : currentPage * itemsPerPage + 1
  const end = totalCount === 0 ? 0 : Math.min((currentPage + 1) * itemsPerPage, totalCount)
  const displayText = totalCount > 0 ? `${start}-${end} of ${totalCount} records` : "No records"

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
        {displayText}
      </span>

      <Button variant="outline" size="sm" onClick={handleNext} disabled={disabled || !canGoForward}>
        Next
      </Button>
    </div>
  )
}
