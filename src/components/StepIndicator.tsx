import { Check, Upload, Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepIndicatorProps {
  currentStep: number
}

const steps = [
  { num: 1, label: "上传简历", icon: Upload },
  { num: 2, label: "岗位匹配", icon: Search },
]

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-0 mb-6">
      {steps.map((step, i) => (
        <div key={step.num} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                currentStep > step.num
                  ? "bg-green-500 text-white"
                  : currentStep === step.num
                    ? "bg-primary-600 text-white ring-4 ring-primary-100"
                    : "bg-gray-100 text-gray-400"
              )}
            >
              {currentStep > step.num ? (
                <Check className="w-5 h-5" />
              ) : (
                <step.icon className="w-5 h-5" />
              )}
            </div>
            <span
              className={cn(
                "text-xs mt-1.5 font-medium",
                currentStep >= step.num ? "text-gray-700" : "text-gray-400"
              )}
            >
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={cn(
                "w-24 h-0.5 mx-4 mt-[-14px] transition-colors duration-300 rounded",
                currentStep > step.num ? "bg-green-500" : "bg-gray-200"
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}
