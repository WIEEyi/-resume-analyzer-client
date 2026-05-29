import { Card, CardContent } from "@/components/ui/card"
import { ScoreCircle } from "./ScoreCircle"
import { DimensionCard } from "./DimensionCard"
import { KeywordBadge } from "./KeywordBadge"
import type { MatchResponse } from "@/types"
import { Trophy, Zap, BarChart3 } from "lucide-react"

interface MatchResultProps {
  data: MatchResponse
}

export function MatchResult({ data }: MatchResultProps) {
  const result = data.match_result

  return (
    <Card className="border-primary-100 bg-white">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-semibold text-gray-600 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-primary-600" />
            匹配结果
          </h2>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            {result.is_ai_scored ? (
              <>
                <Zap className="w-3 h-3" /> AI 评分
              </>
            ) : (
              <>
                <BarChart3 className="w-3 h-3" /> 关键词匹配
              </>
            )}
            &nbsp;· {data.processing_time_ms}ms
          </span>
        </div>

        {/* 总体评分 */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-6 p-6 bg-gray-50 rounded-xl">
          <ScoreCircle score={result.overall_score} />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              综合匹配度
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {result.summary || "暂无总结"}
            </p>
          </div>
        </div>

        {/* 维度评分 */}
        {result.dimensions.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-3">各维度评分</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {result.dimensions.map(d => (
                <DimensionCard key={d.dimension} dimension={d} />
              ))}
            </div>
          </div>
        )}

        {/* 关键词 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
              匹配关键词
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {result.keyword_overlap.length > 0 ? (
                result.keyword_overlap.map(k => (
                  <KeywordBadge key={k} keyword={k} variant="match" />
                ))
              ) : (
                <span className="text-xs text-gray-400">无</span>
              )}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
              缺失关键词
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {result.missing_keywords.length > 0 ? (
                result.missing_keywords.map(k => (
                  <KeywordBadge key={k} keyword={k} variant="miss" />
                ))
              ) : (
                <span className="text-xs text-gray-400">无</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
