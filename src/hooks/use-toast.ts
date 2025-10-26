import { useState } from "react"

export function useToast() {
  const [toasts, setToasts] = useState<any[]>([])
  
  const toast = ({ title, description, variant = "default" }: any) => {
    const id = Math.random().toString(36)
    setToasts((prev) => [...prev, { id, title, description, variant }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }
  
  return { toast, toasts }
}