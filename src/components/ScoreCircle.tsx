interface ScoreCircleProps {
  score: number
  size?: number
}

export function ScoreCircle({ score, size = 140 }: ScoreCircleProps) {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const progress = (score / 100) * circumference
  const strokeWidth = 8

  const getColor = (s: number) => {
    if (s >= 80) return { stroke: "#22c55e", bg: "#f0fdf4" }
    if (s >= 60) return { stroke: "#f59e0b", bg: "#fffbeb" }
    return { stroke: "#ef4444", bg: "#fef2f2" }
  }

  const { stroke, bg } = getColor(score)
  const center = size / 2

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* 背景圆环 */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={bg}
          strokeWidth={strokeWidth}
        />
        {/* 进度圆环 */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          transform={`rotate(-90 ${center} ${center})`}
          className="transition-all duration-1000 ease-out"
        />
        {/* 中心分数 */}
        <text
          x={center}
          y={center - 8}
          textAnchor="middle"
          dominantBaseline="central"
          className="text-3xl font-bold"
          fill="#1f2937"
        >
          {score}
        </text>
        <text
          x={center}
          y={center + 16}
          textAnchor="middle"
          dominantBaseline="central"
          className="text-xs"
          fill="#9ca3af"
        >
          /100
        </text>
      </svg>
    </div>
  )
}
