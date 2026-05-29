import type { DimensionScore } from "@/types"
import { cn } from "@/lib/utils"

interface DimensionCardProps {
  dimension: DimensionScore
}

const LABELS: Record<string, string> = {
  skills: "技能匹配",
  experience: "经验匹配",
  education: "学历匹配",
  overall: "综合评分",
}

export function DimensionCard({ dimension }: DimensionCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50 border-green-200"
    if (score >= 60) return "text-orange-600 bg-orange-50 border-orange-200"
    return "text-red-600 bg-red-50 border-red-200"
  }

  return (
    <div className={cn(
      "rounded-lg border p-4 transition-all hover:shadow-sm",
      getScoreColor(dimension.score)
    )}>
      <div className="text-xs font-medium opacity-70 mb-1">
        {LABELS[dimension.dimension] || dimension.dimension}
      </div>
      <div className="text-2xl font-bold">{dimension.score}</div>
      {dimension.reasoning && (
        <div className="text-xs mt-2 opacity-70 leading-relaxed">
          {dimension.reasoning}
        </div>
      )}
    </div>
  )
}
