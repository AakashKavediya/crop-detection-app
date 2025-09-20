"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertTriangle, Leaf, RefreshCw, Clock, Shield } from "lucide-react"
import type { DetectionResult } from "@/lib/ai-detection"
import { translations, type Language } from "@/lib/translations"

interface DetectionResultsProps {
  results: DetectionResult[]
  language: Language
  onUploadAnother: () => void
}

export function DetectionResults({ results, language, onUploadAnother }: DetectionResultsProps) {
  const t = translations[language]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      case "medium":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "low":
        return "text-green-600 bg-green-50 border-green-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "immediate":
        return "text-red-600 bg-red-100"
      case "within_week":
        return "text-orange-600 bg-orange-100"
      case "monitor":
        return "text-green-600 bg-green-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const translateSeverity = (severity: string) => {
    switch (severity) {
      case "high":
        return t.high
      case "medium":
        return t.medium
      case "low":
        return t.low
      default:
        return severity
    }
  }

  const translateUrgency = (urgency: string) => {
    switch (urgency) {
      case "immediate":
        return t.immediate
      case "within_week":
        return t.within_week
      case "monitor":
        return t.monitor
      default:
        return urgency
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="grid gap-6">
        {results.map((result, index) => (
          <Card
            key={result.imageId}
            className={`${result.isHealthy ? "border-green-200 bg-green-50/50" : "border-orange-200 bg-orange-50/50"}`}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {result.isHealthy ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-6 w-6 text-orange-600" />
                  )}
                  <span>Image {index + 1}</span>
                </div>
                <Badge variant="outline" className="bg-white">
                  {t.confidence}: {result.confidence}%
                </Badge>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {result.isHealthy ? (
                <div className="text-center py-4">
                  <p className="text-lg font-medium text-green-700">{t.noDisease}</p>
                  <div className="mt-2 space-y-1">
                    {result.preventiveMeasures.map((measure, idx) => (
                      <p key={idx} className="text-sm text-green-600">
                        • {measure}
                      </p>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Disease Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground text-lg">{result.diseaseName}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{t.diseaseStage}:</span>
                        <Badge variant="outline">{result.stage}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{t.severity}:</span>
                        <Badge className={getSeverityColor(result.severity)}>
                          {translateSeverity(result.severity)}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{t.confidence}</span>
                          <span className="text-sm font-medium">{result.confidence}%</span>
                        </div>
                        <Progress value={result.confidence} className="h-2" />
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          <Badge className={getUrgencyColor(result.treatmentUrgency)}>
                            {translateUrgency(result.treatmentUrgency)}
                          </Badge>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Treatment Remedies */}
                  <Card className="bg-blue-50/50 border-blue-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-blue-700 text-base">
                        <Leaf className="h-5 w-5" />
                        {t.remedies}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        {result.remedies.map((remedy, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-2 rounded bg-white/70">
                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-xs font-semibold text-blue-700">
                              {idx + 1}
                            </div>
                            <p className="text-sm text-foreground leading-relaxed">{remedy}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Preventive Measures */}
                  {result.preventiveMeasures.length > 0 && (
                    <Card className="bg-green-50/50 border-green-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-green-700 text-base">
                          <Shield className="h-5 w-5" />
                          {t.preventiveMeasures}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-1">
                          {result.preventiveMeasures.map((measure, idx) => (
                            <p key={idx} className="text-sm text-green-700">
                              • {measure}
                            </p>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Recovery Time */}
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>{t.expectedRecovery}:</strong> {result.expectedRecoveryTime}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Button */}
      <div className="text-center pt-4">
        <Button onClick={onUploadAnother} size="lg">
          <RefreshCw className="h-4 w-4 mr-2" />
          {t.uploadAnother}
        </Button>
      </div>
    </div>
  )
}
