import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { checkHealth } from "@/api/client"
import { Settings, CheckCircle2, XCircle, Loader2 } from "lucide-react"

interface ApiConfigProps {
  apiUrl: string
  onApiUrlChange: (url: string) => void
}

export function ApiConfig({ apiUrl, onApiUrlChange }: ApiConfigProps) {
  const [inputValue, setInputValue] = useState(apiUrl)
  const [status, setStatus] = useState<"idle" | "checking" | "connected" | "error">("idle")
  const [modelName, setModelName] = useState("")

  useEffect(() => {
    setInputValue(apiUrl)
    if (apiUrl) {
      doHealthCheck(apiUrl)
    }
  }, [apiUrl])

  const doHealthCheck = async (url: string) => {
    setStatus("checking")
    try {
      const data = await checkHealth(url)
      setStatus("connected")
      setModelName(data.model)
    } catch {
      setStatus("error")
    }
  }

  const handleSave = () => {
    const trimmed = inputValue.trim().replace(/\/+$/, "")
    if (!trimmed) return
    onApiUrlChange(trimmed)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-3">
          <Settings className="w-4 h-4 text-gray-400" />
          <h2 className="text-sm font-semibold text-gray-600">API 配置</h2>
          {status === "checking" && (
            <Badge variant="secondary" className="ml-auto">
              <Loader2 className="w-3 h-3 animate-spin mr-1" />
              检测中...
            </Badge>
          )}
          {status === "connected" && (
            <Badge variant="success" className="ml-auto">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              已连接 ({modelName})
            </Badge>
          )}
          {status === "error" && (
            <Badge variant="destructive" className="ml-auto">
              <XCircle className="w-3 h-3 mr-1" />
              连接失败
            </Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="后端 API 地址，例如 http://localhost:8000"
            className="flex-1"
            onKeyDown={e => e.key === "Enter" && handleSave()}
          />
          <Button onClick={handleSave} size="default">
            保存
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
