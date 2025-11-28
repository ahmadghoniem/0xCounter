import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CardFooter } from "@/components/ui/card";

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
  showSeparator = true,
  className = "",
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
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`mt-auto flex flex-col gap-4 ${className}`}>
      {showSeparator && <Separator />}
      <CardFooter className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={!canGoBack}
        >
          Previous
        </Button>

        <span className="text-sm text-muted-foreground">
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
      </CardFooter>
    </div>
  );
}
