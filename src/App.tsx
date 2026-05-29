import { useState, useCallback } from "react"
import { Header } from "@/components/Header"
import { ApiConfig } from "@/components/ApiConfig"
import { StepIndicator } from "@/components/StepIndicator"
import { UploadZone } from "@/components/UploadZone"
import { AnalysisResult } from "@/components/AnalysisResult"
import { MatchInput } from "@/components/MatchInput"
import { MatchResult } from "@/components/MatchResult"
import { ToastContainer, useToast } from "@/components/ui/toast"
import { analyzeResume, matchResume, ApiError } from "@/api/client"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import type { AnalyzeResponse, MatchResponse } from "@/types"

export default function App() {
  const [apiUrl, setApiUrl] = useLocalStorage("resume_analyzer_api_url", "")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalyzeResponse | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [useAiScoring, setUseAiScoring] = useState(false)
  const [isMatching, setIsMatching] = useState(false)
  const [matchResult, setMatchResult] = useState<MatchResponse | null>(null)
  const { toasts, addToast, removeToast } = useToast()

  const currentStep = analysisResult ? 2 : 1

  const handleAnalyze = useCallback(async () => {
    if (!selectedFile || !apiUrl) {
      addToast("请先选择 PDF 文件并配置 API 地址", "error")
      return
    }

    setIsAnalyzing(true)
    try {
      const data = await analyzeResume(apiUrl, selectedFile)
      setAnalysisResult(data)
      setMatchResult(null)
      setJobDescription("")
      addToast(`解析完成，耗时 ${data.processing_time_ms}ms`, "success")
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "解析失败，请重试"
      addToast(message, "error")
    } finally {
      setIsAnalyzing(false)
    }
  }, [selectedFile, apiUrl, addToast])

  const handleMatch = useCallback(async () => {
    if (!apiUrl || jobDescription.trim().length < 10) {
      addToast("请输入至少 10 个字符的岗位描述", "error")
      return
    }

    setIsMatching(true)
    try {
      const body: {
        job_description: string
        use_ai_scoring: boolean
        cache_key?: string
      } = {
        job_description: jobDescription.trim(),
        use_ai_scoring: useAiScoring,
      }
      if (analysisResult?.cache_key) {
        body.cache_key = analysisResult.cache_key
      }

      const data = await matchResume(apiUrl, body)
      setMatchResult(data)
      addToast(`匹配完成，耗时 ${data.processing_time_ms}ms`, "success")

      setTimeout(() => {
        document.getElementById("match-result-section")?.scrollIntoView({
          behavior: "smooth",
        })
      }, 100)
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "匹配失败，请重试"
      addToast(message, "error")
    } finally {
      setIsMatching(false)
    }
  }, [apiUrl, jobDescription, useAiScoring, analysisResult, addToast])

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file)
    setAnalysisResult(null)
    setMatchResult(null)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-6 pb-16">
        <Header />

        <div className="space-y-5">
          <ApiConfig apiUrl={apiUrl} onApiUrlChange={setApiUrl} />

          <StepIndicator currentStep={currentStep} />

          <UploadZone
            file={selectedFile}
            isAnalyzing={isAnalyzing}
            onFileSelect={handleFileSelect}
            onAnalyze={handleAnalyze}
          />

          {analysisResult && (
            <AnalysisResult data={analysisResult} />
          )}

          {analysisResult && (
            <MatchInput
              jobDescription={jobDescription}
              useAiScoring={useAiScoring}
              isMatching={isMatching}
              onJobDescriptionChange={setJobDescription}
              onUseAiScoringChange={setUseAiScoring}
              onMatch={handleMatch}
            />
          )}

          {matchResult && (
            <div id="match-result-section">
              <MatchResult data={matchResult} />
            </div>
          )}
        </div>
      </div>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  )
}
