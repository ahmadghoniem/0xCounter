import { Button } from "@/components/ui/button";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showSeparator?: boolean;
  className?: string;
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  const canGoBack = currentPage > 0;
  const canGoForward = currentPage < totalPages - 1;

  const handlePrevious = () => {
    if (canGoBack) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (canGoForward) {
      onPageChange(currentPage + 1);
    }
  };

  // Don't render if there's only one page or no pages

  return (
    <div className="relative flex items-center justify-between w-full gap-4">
      <Button
        variant="outline"
        size="sm"
        onClick={handlePrevious}
        disabled={!canGoBack}
      >
        Previous
      </Button>

      <span className="absolute left-1/2 -translate-x-1/2 text-sm text-muted-foreground">
        Page {currentPage + 1} of {totalPages}
      </span>

      <Button
        variant="outline"
        size="sm"
        onClick={handleNext}
        disabled={!canGoForward}
      >
        Next
      </Button>
    </div>
  );
}
