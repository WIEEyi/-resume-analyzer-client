import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"

export interface Toast {
  id: string
  message: string
  type: "success" | "error"
}

let toastCounter = 0

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((message: string, type: "success" | "error") => {
    const id = String(++toastCounter)
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4000)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return { toasts, addToast, removeToast }
}

export function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: string) => void }) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={cn(
            "px-4 py-3 rounded-lg shadow-lg text-sm font-medium animate-toast-in cursor-pointer max-w-sm",
            toast.type === "success" && "bg-green-50 text-green-700 border border-green-200",
            toast.type === "error" && "bg-red-50 text-red-700 border border-red-200"
          )}
          onClick={() => onRemove(toast.id)}
        >
          {toast.message}
        </div>
      ))}
    </div>
  )
}
