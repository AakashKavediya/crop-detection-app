import { type NextRequest, NextResponse } from "next/server"
import { detectCropDiseases } from "@/lib/ai-detection"
import type { Language } from "@/lib/translations"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const language = (formData.get("language") as Language) || "en"
    const imageCount = Number.parseInt(formData.get("imageCount") as string) || 1

    const files: File[] = []
    for (let i = 0; i < imageCount; i++) {
      const file = formData.get(`image_${i}`) as File
      if (file) {
        files.push(file)
      }
    }

    // Handle single image for backward compatibility
    if (files.length === 0) {
      const singleFile = formData.get("image") as File
      if (singleFile) {
        files.push(singleFile)
      }
    }

    if (files.length === 0) {
      return NextResponse.json({ error: "No image files provided" }, { status: 400 })
    }

    // Validate files
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        return NextResponse.json({ error: "Invalid file type. Please upload images only." }, { status: 400 })
      }

      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json({ error: "File too large. Maximum size is 10MB per image." }, { status: 400 })
      }
    }

    const results = await detectCropDiseases(files, language)

    return NextResponse.json(results)
  } catch (error) {
    console.error("Detection error:", error)
    return NextResponse.json({ error: "Failed to analyze images. Please try again." }, { status: 500 })
  }
}
