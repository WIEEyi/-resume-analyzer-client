// ============================================================
// 领域模型
// ============================================================

export interface ExtractedInfo {
  name: string
  phone: string
  email: string
  address: string
  job_intention: string
  expected_salary: string
  work_years: string
  education: string
  project_experience: string
  skills: string
  extraction_confidence: number
}

export type MatchDimension = "skills" | "experience" | "education" | "overall"

export interface DimensionScore {
  dimension: MatchDimension
  score: number
  reasoning: string
}

export interface MatchResult {
  overall_score: number
  dimensions: DimensionScore[]
  keyword_overlap: string[]
  missing_keywords: string[]
  summary: string
  is_ai_scored: boolean
}

// ============================================================
// API 请求/响应
// ============================================================

export interface MatchRequest {
  resume_text?: string
  job_description: string
  use_ai_scoring: boolean
  cache_key?: string
}

export interface AnalyzeResponse {
  success: boolean
  cache_key: string
  raw_text: string
  text_length: number
  extracted_info: ExtractedInfo
  processing_time_ms: number
}

export interface MatchResponse {
  success: boolean
  match_result: MatchResult
  extracted_info?: ExtractedInfo
  processing_time_ms: number
}

export interface HealthResponse {
  status: string
  model: string
  cache_size: number
}

export interface ErrorResponse {
  success: false
  error_code: string
  message: string
  detail?: string
}
