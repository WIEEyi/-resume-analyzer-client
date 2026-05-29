import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Brain, Sparkles } from "lucide-react"

interface MatchInputProps {
  jobDescription: string
  useAiScoring: boolean
  isMatching: boolean
  onJobDescriptionChange: (value: string) => void
  onUseAiScoringChange: (checked: boolean) => void
  onMatch: () => void
}

export function MatchInput({
  jobDescription,
  useAiScoring,
  isMatching,
  onJobDescriptionChange,
  onUseAiScoringChange,
  onMatch,
}: MatchInputProps) {
  const canMatch = jobDescription.trim().length >= 10 && !isMatching

  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-sm font-semibold text-gray-600 mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          第二步：岗位匹配
        </h2>

        <div className="space-y-1 mb-4">
          <label className="text-sm font-medium text-gray-700">
            岗位描述
          </label>
          <Textarea
            value={jobDescription}
            onChange={e => onJobDescriptionChange(e.target.value)}
            placeholder={`请粘贴岗位描述文本，例如：\n负责后端系统的设计与开发，要求3年以上Python开发经验，熟悉FastAPI/Django等框架...`}
            rows={5}
            disabled={isMatching}
          />
          <p className="text-xs text-gray-400">
            至少输入 10 个字符（当前 {jobDescription.trim().length} 字）
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="ai-scoring"
              checked={useAiScoring}
              onCheckedChange={onUseAiScoringChange}
              disabled={isMatching}
            />
            <label
              htmlFor="ai-scoring"
              className="text-sm text-gray-600 cursor-pointer flex items-center gap-1"
            >
              <Brain className="w-4 h-4" />
              使用 AI 精确评分（较慢，更精准）
            </label>
          </div>
          <Button
            onClick={onMatch}
            disabled={!canMatch}
          >
            {isMatching ? "匹配中..." : "开始匹配"}
          </Button>
        </div>

        {isMatching && (
          <div className="mt-4 space-y-1">
            <p className="text-xs text-gray-500 text-center">AI 正在匹配评估...</p>
            <Progress className="h-1.5" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
