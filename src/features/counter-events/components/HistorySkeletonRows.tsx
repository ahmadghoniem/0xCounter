interface HistorySkeletonRowsProps {
  count: number
}

export default function HistorySkeletonRows({ count }: HistorySkeletonRowsProps) {
  if (count <= 0) return null

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={`skeleton-${i}`}
          className="min-h-14 rounded-lg border border-dashed"
          aria-hidden="true"
        />
      ))}
    </>
  )
}
