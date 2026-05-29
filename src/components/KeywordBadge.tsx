import { cn } from "@/lib/utils"

interface KeywordBadgeProps {
  keyword: string
  variant: "match" | "miss"
}

export function KeywordBadge({ keyword, variant }: KeywordBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        variant === "match" && "bg-green-100 text-green-700",
        variant === "miss" && "bg-red-100 text-red-700"
      )}
    >
      {keyword}
    </span>
  )
}
