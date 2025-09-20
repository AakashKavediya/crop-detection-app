"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { type Language, translations } from "@/lib/translations"

interface LanguageSelectorProps {
  currentLanguage: Language
  onLanguageChange: (language: Language) => void
}

const languageNames = {
  en: "English",
  hi: "हिन्दी",
  ne: "नेपाली",
}

export function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  const t = translations[currentLanguage]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button type="button" className="inline-flex items-center gap-2 bg-transparent border rounded-md px-3 py-1.5 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <Globe className="h-4 w-4" />
          {languageNames[currentLanguage]}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-50 min-w-[120px]">
        {Object.entries(languageNames).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => onLanguageChange(code as Language)}
            className={`cursor-pointer hover:bg-accent ${currentLanguage === code ? "bg-accent" : ""}`}
          >
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
