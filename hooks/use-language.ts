"use client"

import { useState, useEffect } from "react"
import type { Language } from "@/lib/translations"

export function useLanguage() {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    // Only detect browser language on first load
    const browserLang = navigator.language.toLowerCase()
    if (browserLang.startsWith("hi")) {
      setLanguage("hi")
    } else if (browserLang.startsWith("ne")) {
      setLanguage("ne")
    } else {
      setLanguage("en")
    }
  }, [])

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    // No localStorage persistence
  }

  return { language, changeLanguage }
}
