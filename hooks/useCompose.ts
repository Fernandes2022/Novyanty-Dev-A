import { useState } from "react"
import { Draft } from "@/types/schema"

interface ComposePayload {
  directive: string
  settings?: {
    tier?: string
    [key: string]: any
  }
}

export function useCompose() {
  const [isLoading, setIsLoading] = useState(false)
  const [content, setContent] = useState("")
  const [error, setError] = useState<string | null>(null)
  
  const compose = async (params: ComposePayload) => {
    setIsLoading(true)
    setError(null)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const { directive, settings } = params
      setContent(`Composed content for: ${directive} (Tier: ${settings?.tier || 'free'})`)
      
      const previewData: Draft = {
        id: Date.now().toString(),
        name: `draft-${Date.now()}`,
        title: `Draft - ${directive.slice(0, 30)}`,
        content: `Composed content for: ${directive}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        metadata: {
          tier: settings?.tier || 'free'
        }
      }
      
      return {
        success: true,
        previewData
      }
    } catch (err) {
      setError("Failed to compose")
      return { success: false, previewData: null }
    } finally {
      setIsLoading(false)
    }
  }
  
  return { compose, isLoading, content, error }
}
