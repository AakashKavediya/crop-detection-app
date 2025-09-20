"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, X, Plus } from "lucide-react"
import { translations, type Language } from "@/lib/translations"

interface ImageUploadProps {
  language: Language
  onImagesUpload: (files: File[]) => void
  isAnalyzing: boolean
}

interface UploadedImage {
  file: File
  url: string
  id: string
}

export function ImageUpload({ language, onImagesUpload, isAnalyzing }: ImageUploadProps) {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const t = translations[language]

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const remainingSlots = 6 - uploadedImages.length
      const filesToAdd = acceptedFiles.slice(0, remainingSlots)

      const newImages: UploadedImage[] = filesToAdd.map((file) => ({
        file,
        url: URL.createObjectURL(file),
        id: Math.random().toString(36).substr(2, 9),
      }))

      const updatedImages = [...uploadedImages, ...newImages]
      setUploadedImages(updatedImages)
      onImagesUpload(updatedImages.map((img) => img.file))
    },
    [uploadedImages, onImagesUpload],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: true, // Enable multiple file selection
  })

  const removeImage = (id: string) => {
    const updatedImages = uploadedImages.filter((img) => {
      if (img.id === id) {
        URL.revokeObjectURL(img.url)
        return false
      }
      return true
    })
    setUploadedImages(updatedImages)
    onImagesUpload(updatedImages.map((img) => img.file))
  }

  const clearAllImages = () => {
    uploadedImages.forEach((img) => URL.revokeObjectURL(img.url))
    setUploadedImages([])
    onImagesUpload([])
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {uploadedImages.length < 6 && (
        <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors">
          <div
            {...getRootProps()}
            className={`p-6 text-center cursor-pointer transition-colors ${
              isDragActive ? "bg-primary/5" : "hover:bg-muted/50"
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <Upload className="h-6 w-6 text-primary" />
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-semibold text-foreground">
                  {isDragActive ? t.dragDrop : `${t.uploadText} (${uploadedImages.length}/6)`}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t.dragDrop} {t.or} <span className="text-primary font-medium">{t.browse}</span>
                </p>
              </div>

              <Button type="button" size="sm" disabled={isAnalyzing}>
                <Plus className="h-4 w-4 mr-2" />
                {uploadedImages.length === 0 ? t.uploadButton : "Add More Images"}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {uploadedImages.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Uploaded Images ({uploadedImages.length}/6)</h3>
            <Button variant="outline" size="sm" onClick={clearAllImages} disabled={isAnalyzing}>
              Clear All
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {uploadedImages.map((image) => (
              <Card key={image.id} className="overflow-hidden">
                <div className="relative">
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={`Crop ${image.id}`}
                    className="w-full h-32 object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 h-6 w-6 p-0"
                    onClick={() => removeImage(image.id)}
                    disabled={isAnalyzing}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {isAnalyzing && (
            <Card className="p-4 bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent"></div>
                <span className="text-sm font-medium text-foreground">
                  {t.analyzing} {uploadedImages.length} images...
                </span>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
