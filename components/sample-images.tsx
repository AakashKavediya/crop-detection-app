"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/hooks/use-language"
import Image from "next/image"

const sampleImages = [
  {
    id: "ginger-rhizome-rot",
    src: "/sample-images/ginger-rhizome-rot.png",
    disease: {
      en: "Ginger Bacterial Wilt / Rhizome Rot",
      hi: "अदरक जीवाणु मुरझान / प्रकंद सड़न",
      ne: "अदुवा ब्याक्टेरियल ओइलाउने / जरा सड्ने",
    },
  },
  {
    id: "maize-smut",
    src: "/sample-images/maize-smut.png",
    disease: {
      en: "Maize Common Smut",
      hi: "मक्का सामान्य कंडुआ",
      ne: "मकै सामान्य कण्डुवा",
    },
  },
  {
    id: "ginger-wilt",
    src: "/sample-images/ginger-wilt.png",
    disease: {
      en: "Ginger Bacterial Wilt",
      hi: "अदरक जीवाणु मुरझान",
      ne: "अदुवा ब्याक्टेरियल ओइलाउने",
    },
  },
  {
    id: "cardamom-plants",
    src: "/sample-images/cardamom-plants.png",
    disease: {
      en: "Black Cardamom Leaf Blotch",
      hi: "बड़ी इलायची पत्ती धब्बा",
      ne: "ठूलो अलैंची पात दाग",
    },
  },
  {
    id: "cardamom-leaf-blotch",
    src: "/sample-images/cardamom-leaf-blotch.png",
    disease: {
      en: "Black Cardamom Viral Complex",
      hi: "बड़ी इलायची वायरल रोग",
      ne: "ठूलो अलैंची भाइरल रोग",
    },
  },
  {
    id: "maize-rust",
    src: "/sample-images/maize-rust.png",
    disease: {
      en: "Maize Common Rust",
      hi: "मक्का सामान्य रतुआ",
      ne: "मकै सामान्य खिया",
    },
  },
]

interface SampleImagesProps {
  onImageSelect: (imageFile: File) => void
}

export function SampleImages({ onImageSelect }: SampleImagesProps) {
  const { language } = useLanguage()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleImageClick = async (imageSrc: string, imageName: string) => {
    try {
      const response = await fetch(imageSrc)
      const blob = await response.blob()
      const file = new File([blob], `${imageName}.png`, { type: "image/png" })
      setSelectedImage(imageSrc)
      onImageSelect(file)
    } catch (error) {
      console.error("Error loading sample image:", error)
    }
  }

  const labels = {
    en: {
      title: "Try Sample Images",
      description: "Click on any sample image to test the disease detection system",
    },
    hi: {
      title: "नमूना छवियां आज़माएं",
      description: "रोग पहचान प्रणाली का परीक्षण करने के लिए किसी भी नमूना छवि पर क्लिक करें",
    },
    ne: {
      title: "नमूना छविहरू प्रयास गर्नुहोस्",
      description: "रोग पहिचान प्रणालीको परीक्षण गर्न कुनै पनि नमूना छविमा क्लिक गर्नुहोस्",
    },
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-primary">{labels[language].title}</CardTitle>
        <CardDescription>{labels[language].description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {sampleImages.map((image) => (
            <div key={image.id} className="space-y-2">
              <Button
                variant={selectedImage === image.src ? "default" : "outline"}
                className="w-full h-32 p-2 relative overflow-hidden"
                onClick={() => handleImageClick(image.src, image.id)}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.disease[language]}
                  fill
                  className="object-cover rounded"
                />
              </Button>
              <p className="text-xs text-center text-muted-foreground">{image.disease[language]}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
