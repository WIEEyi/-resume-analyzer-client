import type { ExtractedInfo } from "@/types"

const FIELDS: { key: keyof ExtractedInfo; label: string }[] = [
  { key: "name", label: "姓名" },
  { key: "phone", label: "电话" },
  { key: "email", label: "邮箱" },
  { key: "address", label: "地址" },
  { key: "job_intention", label: "求职意向" },
  { key: "expected_salary", label: "期望薪资" },
  { key: "work_years", label: "工作年限" },
  { key: "education", label: "学历背景" },
  { key: "skills", label: "技能" },
  { key: "project_experience", label: "项目经历" },
]

interface InfoGridProps {
  info: ExtractedInfo
}

export function InfoGrid({ info }: InfoGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {FIELDS.map(({ key, label }) => {
        const value = info[key as keyof ExtractedInfo]
        return (
          <div
            key={key}
            className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-100"
          >
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">
              {label}
            </div>
            <div className="text-sm font-medium text-gray-800 break-all">
              {value || "-"}
            </div>
          </div>
        )
      })}
    </div>
  )
}
