import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { InfoGrid } from "./InfoGrid"
import type { AnalyzeResponse } from "@/types"
import { FileCheck, Copy, Check } from "lucide-react"
import { useState } from "react"

interface AnalysisResultProps {
  data: AnalyzeResponse
}

export function AnalysisResult({ data }: AnalysisResultProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyKey = async () => {
    await navigator.clipboard.writeText(data.cache_key)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="border-green-200 bg-white">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-600 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-green-600" />
            解析结果
          </h2>
          <span className="text-xs text-gray-400">
            处理耗时: {data.processing_time_ms}ms
          </span>
        </div>

        <InfoGrid info={data.extracted_info} />

        <div className="mt-4 flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs">
          <span className="text-gray-500">缓存键:</span>
          <code className="font-mono text-amber-700 bg-amber-100 px-2 py-0.5 rounded text-xs">
            {data.cache_key.substring(0, 16)}...
          </code>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs ml-auto"
            onClick={handleCopyKey}
          >
            {copied ? (
              <Check className="w-3 h-3 text-green-600" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
            <span className="ml-1">{copied ? "已复制" : "复制"}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
