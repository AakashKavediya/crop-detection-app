"use client"
import { ImageUpload } from "@/components/image-upload"
import { LanguageSelector } from "@/components/language-selector"
import { DetectionResults } from "@/components/detection-results"
import { SampleImages } from "@/components/sample-images"
import { useLanguage } from "@/hooks/use-language"
import { useCropDetection } from "@/hooks/use-crop-detection"
import { translations } from "@/lib/translations"
import { Leaf } from "lucide-react"

export default function HomePage() {
  const { language, changeLanguage } = useLanguage()
  const { isAnalyzing, results, error, analyzeImages, clearResults } = useCropDetection()
  const t = translations[language]

  const handleImagesUpload = async (files: File[]) => {
    if (files.length > 0) {
      await analyzeImages(files, language)
    }
  }

  const handleSampleImageSelect = async (file: File) => {
    await analyzeImages([file], language)
  }

  const handleUploadAnother = () => {
    clearResults()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-foreground">CropCare AI</h1>
          </div>
          <LanguageSelector currentLanguage={language} onLanguageChange={changeLanguage} />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          {!results && (
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-balance text-foreground">{t.title}</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">{t.subtitle}</p>
            </div>
          )}

          {/* Upload Section */}
          {!results && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <ImageUpload language={language} onImagesUpload={handleImagesUpload} isAnalyzing={isAnalyzing} />
              </div>

              <div className="flex justify-center">
                <div className="w-full max-w-4xl">
                  <SampleImages onImageSelect={handleSampleImageSelect} />
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="max-w-2xl mx-auto">
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-destructive text-center">{error}</p>
              </div>
            </div>
          )}

          {/* Detection Results */}
          {results && <DetectionResults results={results} language={language} onUploadAnother={handleUploadAnother} />}
        </div>
      </main>
    </div>
  )
}
