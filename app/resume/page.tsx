"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Download, FileText, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/Navbar"
import { resumeTemplatesData, resumeTipsData, type ResumeTemplate, type ResumeTip } from "@/data/resumeData"

export default function ResumePage() {
  const [resumeTemplates, setResumeTemplates] = useState<ResumeTemplate[]>(resumeTemplatesData)
  const [resumeTips, setResumeTips] = useState<ResumeTip[]>(resumeTipsData)

  useEffect(() => {
    // Load data from localStorage if available
    const savedTemplates = localStorage.getItem("adminResumeTemplates")
    const savedTips = localStorage.getItem("adminResumeTips")

    if (savedTemplates) {
      setResumeTemplates(JSON.parse(savedTemplates))
    }
    if (savedTips) {
      setResumeTips(JSON.parse(savedTips))
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Resume Templates & Tips</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Professional resume templates and expert tips to help you land your dream job.
          </p>
        </div>

        {/* Resume Templates */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Free Resume Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumeTemplates.map((template) => (
              <Card
                key={template.id}
                className="hover:shadow-lg transition-all duration-300 relative group border-2 hover:border-accent/20"
              >
                {template.popular && (
                  <Badge className="absolute -top-2 -right-2 bg-accent text-accent-foreground shadow-md">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Popular
                  </Badge>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-foreground flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <FileText className="h-5 w-5 text-accent" />
                    </div>
                    {template.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">{template.description}</p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {template.features.map((feature, featureIndex) => (
                      <Badge key={featureIndex} variant="outline" className="text-xs bg-background">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  {/* Download Button */}
                  <div className="pt-2">
                    <a href={template.downloadUrl} download className="block">
                      <Button className="w-full group-hover:bg-accent/90 transition-colors" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download Template
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Resume Tips */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Resume Writing Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resumeTips.map((tip) => (
              <Card
                key={tip.id}
                className="hover:shadow-md transition-all duration-300 border-2 hover:border-accent/20"
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl p-2 bg-accent/10 rounded-lg flex-shrink-0">{tip.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2 text-lg">{tip.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{tip.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="text-center">
          <Card className="bg-accent/5 border-accent/20 max-w-2xl mx-auto border-2">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">Need More Help?</h3>
              <p className="text-muted-foreground mb-4">
                Check out our comprehensive guide on resume writing and interview preparation.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/resources">
                  <Button variant="outline" className="w-full sm:w-auto bg-transparent border-2 hover:bg-accent/10">
                    Interview Prep Resources
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
