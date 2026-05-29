import type { AnalyzeResponse, HealthResponse, MatchResponse } from "@/types"

const TIMEOUT_MS = 60000

class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public detail?: string
  ) {
    super(message)
    this.name = "ApiError"
  }
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs: number = TIMEOUT_MS
): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    return response
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new ApiError("请求超时（60秒），请稍后重试")
    }
    if (err instanceof TypeError && err.message.includes("fetch")) {
      throw new ApiError("无法连接到后端服务，请检查 API 地址和后端是否已启动")
    }
    throw new ApiError(err instanceof Error ? err.message : "网络请求失败")
  } finally {
    clearTimeout(timeoutId)
  }
}

export async function checkHealth(apiUrl: string): Promise<HealthResponse> {
  const resp = await fetchWithTimeout(`${apiUrl}/api/health`, { method: "GET" })
  if (!resp.ok) throw new ApiError(`健康检查失败: HTTP ${resp.status}`, resp.status)
  return resp.json()
}

export async function analyzeResume(
  apiUrl: string,
  file: File
): Promise<AnalyzeResponse> {
  const formData = new FormData()
  formData.append("file", file)

  const resp = await fetchWithTimeout(`${apiUrl}/api/analyze`, {
    method: "POST",
    body: formData,
  })

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({ detail: `HTTP ${resp.status}` }))
    throw new ApiError(
      err.message || err.detail || "简历解析失败",
      resp.status,
      err.detail
    )
  }

  return resp.json()
}

export async function matchResume(
  apiUrl: string,
  body: {
    job_description: string
    use_ai_scoring: boolean
    cache_key?: string
    resume_text?: string
  }
): Promise<MatchResponse> {
  const resp = await fetchWithTimeout(`${apiUrl}/api/match`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({ detail: `HTTP ${resp.status}` }))
    throw new ApiError(
      err.message || err.detail || "岗位匹配失败",
      resp.status,
      err.detail
    )
  }

  return resp.json()
}

export { ApiError }
