import { useState, useRef, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadZoneProps {
  file: File | null
  isAnalyzing: boolean
  onFileSelect: (file: File) => void
  onAnalyze: () => void
}

export function UploadZone({ file, isAnalyzing, onFileSelect, onAnalyze }: UploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validate = useCallback((f: File): string | null => {
    if (f.type !== "application/pdf" && !f.name.toLowerCase().endsWith(".pdf")) {
      return "只支持 PDF 格式文件"
    }
    if (f.size > 10 * 1024 * 1024) {
      return "文件大小不能超过 10MB"
    }
    return null
  }, [])

  const handleFile = useCallback((f: File) => {
    setError("")
    const err = validate(f)
    if (err) {
      setError(err)
      return
    }
    onFileSelect(f)
  }, [validate, onFileSelect])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0])
    }
  }, [handleFile])

  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-sm font-semibold text-gray-600 mb-4 flex items-center gap-2">
          <Upload className="w-4 h-4" />
          第一步：上传简历
        </h2>

        {/* 拖拽区域 */}
        <div
          className={cn(
            "border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-200",
            isDragOver
              ? "border-primary-500 bg-primary-50/50"
              : "border-gray-300 hover:border-primary-400 hover:bg-gray-50/50"
          )}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setIsDragOver(true) }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center gap-2">
            <div className={cn(
              "w-14 h-14 rounded-full flex items-center justify-center mb-2 transition-colors",
              isDragOver ? "bg-primary-100" : "bg-gray-100"
            )}>
              <Upload className={cn(
                "w-6 h-6 transition-colors",
                isDragOver ? "text-primary-600" : "text-gray-400"
              )} />
            </div>
            <p className="text-sm text-gray-600">
              拖拽 PDF 文件到此处或<span className="text-primary-600 font-medium">点击选择</span>
            </p>
            <p className="text-xs text-gray-400">支持 PDF 格式，最大 10MB</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="mt-3 flex items-center gap-2 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* 文件信息 */}
        {file && (
          <div className="mt-3 flex items-center gap-2 text-sm bg-green-50 text-green-700 rounded-lg px-3 py-2">
            <FileText className="w-4 h-4 flex-shrink-0" />
            已选择: {file.name} ({(file.size / 1024).toFixed(1)} KB)
          </div>
        )}

        {/* 解析进度条 */}
        {isAnalyzing && (
          <div className="mt-4 space-y-1">
            <p className="text-xs text-gray-500 text-center">AI 正在解析简历...</p>
            <Progress className="h-1.5" />
          </div>
        )}

        {/* 解析按钮 */}
        <Button
          className="w-full mt-4"
          disabled={!file || isAnalyzing}
          onClick={onAnalyze}
        >
          {isAnalyzing ? "解析中..." : "解析简历"}
        </Button>
      </CardContent>
    </Card>
  )
}
