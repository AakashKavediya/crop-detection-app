"use client"

import { useState } from "react"
import type { DetectionResult } from "@/lib/ai-detection"
import type { Language } from "@/lib/translations"

export function useCropDetection() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<DetectionResult[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const analyzeImages = async (files: File[], language: Language) => {
    setIsAnalyzing(true)
    setError(null)
    setResults(null)

    try {
      const formData = new FormData()
      files.forEach((file, index) => {
        formData.append(`image_${index}`, file)
      })
      formData.append("language", language)
      formData.append("imageCount", files.length.toString())

      const response = await fetch("/api/detect", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to analyze images")
      }

      const detectionResults = await response.json()
      setResults(detectionResults)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const clearResults = () => {
    setResults(null)
    setError(null)
  }

  return {
    isAnalyzing,
    results,
    error,
    analyzeImages,
    clearResults,
  }
}
