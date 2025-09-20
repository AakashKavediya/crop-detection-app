import { diseaseDatabase, type Language } from "./translations"

export interface DetectionResult {
  imageId: string
  diseaseId: string | null
  diseaseName: string
  stage: string
  confidence: number
  remedies: string[]
  isHealthy: boolean
  severity: "low" | "medium" | "high"
  treatmentUrgency: "immediate" | "within_week" | "monitor"
  preventiveMeasures: string[]
  expectedRecoveryTime: string
}

export async function detectCropDiseases(imageFiles: File[], language: Language): Promise<DetectionResult[]> {
  await new Promise((resolve) => setTimeout(resolve, 3000))

  const results: DetectionResult[] = []

  // Knowledge base for image matching (simulated)
  const imageKnowledgeBase = [
    {
      keywords: ["ginger", "rhizome", "brown", "rot"],
      diseaseId: "ginger_bacterial_wilt",
      confidence: 92,
    },
    {
      keywords: ["maize", "corn", "smut", "gall", "black"],
      diseaseId: "maize_common_smut",
      confidence: 88,
    },
    {
      keywords: ["ginger", "yellow", "wilt", "leaves"],
      diseaseId: "ginger_bacterial_wilt",
      confidence: 85,
    },
    {
      keywords: ["cardamom", "leaf", "blotch", "spot"],
      diseaseId: "black_cardamom_leaf_blotch",
      confidence: 90,
    },
    {
      keywords: ["maize", "rust", "pustule", "orange"],
      diseaseId: "maize_common_rust",
      confidence: 87,
    },
    {
      keywords: ["cardamom", "viral", "mosaic", "yellow"],
      diseaseId: "black_cardamom_leaf_blotch",
      confidence: 89,
    },
  ]

  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i]
    const imageId = `img_${i + 1}`

    // Simulate AI analysis based on filename or random selection from knowledge base
    const fileName = file.name.toLowerCase()
    let detectedDisease = null
    let confidence = 0

    // Try to match based on filename or use random selection
    for (const knowledge of imageKnowledgeBase) {
      const hasKeyword = knowledge.keywords.some((keyword) => fileName.includes(keyword))
      if (hasKeyword || Math.random() > 0.7) {
        detectedDisease = knowledge.diseaseId
        confidence = knowledge.confidence + Math.floor(Math.random() * 8) - 4 // ±4% variation
        break
      }
    }

    // Fallback to random selection if no match
    if (!detectedDisease) {
      const diseases = Object.keys(diseaseDatabase[language === "en" ? "en" : language === "hi" ? "hi" : "ne"])
      detectedDisease = diseases[Math.floor(Math.random() * diseases.length)]
      confidence = Math.floor(Math.random() * 25) + 70
    }

    const isHealthy = confidence < 75 && Math.random() > 0.8

    if (isHealthy) {
      results.push({
        imageId,
        diseaseId: null,
        diseaseName: "",
        stage: "",
        confidence: Math.floor(Math.random() * 15) + 85,
        remedies: [],
        isHealthy: true,
        severity: "low",
        treatmentUrgency: "monitor",
        preventiveMeasures: [
          language === "en"
            ? "Continue regular monitoring"
            : language === "hi"
              ? "नियमित निगरानी जारी रखें"
              : "नियमित निगरानी जारी राख्नुहोस्",
          language === "en"
            ? "Maintain proper irrigation and nutrition"
            : language === "hi"
              ? "उचित सिंचाई और पोषण बनाए रखें"
              : "उचित सिंचाई र पोषण कायम राख्नुहोस्",
        ],
        expectedRecoveryTime:
          language === "en" ? "Plant is healthy" : language === "hi" ? "पौधा स्वस्थ है" : "बिरुवा स्वस्थ छ",
      })
    } else {
      const diseaseInfo =
        diseaseDatabase[language === "en" ? "en" : language === "hi" ? "hi" : "ne"][
          detectedDisease as keyof typeof diseaseDatabase.en
        ]
      const randomStage = diseaseInfo.stages[Math.floor(Math.random() * diseaseInfo.stages.length)]

      results.push({
        imageId,
        diseaseId: detectedDisease,
        diseaseName: diseaseInfo.name,
        stage: randomStage,
        confidence: Math.max(75, confidence),
        remedies: diseaseInfo.remedies,
        isHealthy: false,
        severity: diseaseInfo.severity as "low" | "medium" | "high",
        treatmentUrgency: diseaseInfo.treatmentUrgency as "immediate" | "within_week" | "monitor",
        preventiveMeasures: diseaseInfo.preventiveMeasures || [],
        expectedRecoveryTime: diseaseInfo.recoveryTime,
      })
    }
  }

  return results
}

export async function analyzeImageWithAI(imageBase64: string): Promise<{
  disease: string | null
  confidence: number
  stage: string
}> {
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const diseases = ["leaf_blight", "powdery_mildew", "rust"]
  const stages = ["early", "moderate", "severe"]

  const hasDisease = Math.random() > 0.3

  if (!hasDisease) {
    return {
      disease: null,
      confidence: Math.floor(Math.random() * 15) + 85,
      stage: "",
    }
  }

  return {
    disease: diseases[Math.floor(Math.random() * diseases.length)],
    confidence: Math.floor(Math.random() * 25) + 75,
    stage: stages[Math.floor(Math.random() * stages.length)],
  }
}

export const detectCropDisease = detectCropDiseases
