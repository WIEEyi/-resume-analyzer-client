import { FileSearch } from "lucide-react"

export function Header() {
  return (
    <header className="text-center py-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-600 mb-4">
        <FileSearch className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        AI 智能简历分析系统
      </h1>
      <p className="text-gray-500 text-base">
        上传简历 PDF，AI 自动提取关键信息并进行岗位匹配评分
      </p>
    </header>
  )
}
