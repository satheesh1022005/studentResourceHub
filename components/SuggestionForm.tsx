"use client"

import type React from "react"

import { useState } from "react"
import { Send, Mail } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function SuggestionForm() {
  const [formData, setFormData] = useState({
    resourceTitle: "",
    resourceUrl: "",
    category: "",
    description: "",
    submitterName: "",
    submitterEmail: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmitSuggestion = () => {
    const subject = encodeURIComponent("New Resource Suggestion - Student Hub")
    const body = encodeURIComponent(`
Hello Admin,

I would like to suggest a new resource for the Student Hub:

Resource Details:
- Title: ${formData.resourceTitle}
- URL: ${formData.resourceUrl}
- Category: ${formData.category}
- Description: ${formData.description}

Submitted by:
- Name: ${formData.submitterName}
- Email: ${formData.submitterEmail}

Thank you for maintaining this amazing resource hub!

Best regards,
${formData.submitterName}
    `)

    const mailtoLink = `mailto:spack1022005@gmail.com?subject=${subject}&body=${body}`
    window.location.href = mailtoLink

    // Reset form after submission
    setFormData({
      resourceTitle: "",
      resourceUrl: "",
      category: "",
      description: "",
      submitterName: "",
      submitterEmail: "",
    })
  }

  const isFormValid = formData.resourceTitle && formData.resourceUrl && formData.submitterName

  return (
    <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Mail className="h-5 w-5 text-accent" />
          Suggest a Resource
        </CardTitle>
        <p className="text-muted-foreground">
          Help us grow our collection by suggesting valuable resources that have helped you in your learning journey.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="resourceTitle">Resource Title *</Label>
            <Input
              id="resourceTitle"
              name="resourceTitle"
              placeholder="e.g., JavaScript Crash Course"
              value={formData.resourceTitle}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="resourceUrl">Resource URL *</Label>
            <Input
              id="resourceUrl"
              name="resourceUrl"
              type="url"
              placeholder="https://example.com"
              value={formData.resourceUrl}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Suggested Category</Label>
          <Input
            id="category"
            name="category"
            placeholder="e.g., Web Development, Core Subjects, Interview Prep"
            value={formData.category}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Why is this resource valuable? What topics does it cover?"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="submitterName">Your Name *</Label>
            <Input
              id="submitterName"
              name="submitterName"
              placeholder="Your full name"
              value={formData.submitterName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="submitterEmail">Your Email (Optional)</Label>
            <Input
              id="submitterEmail"
              name="submitterEmail"
              type="email"
              placeholder="your.email@example.com"
              value={formData.submitterEmail}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <Button onClick={handleSubmitSuggestion} disabled={!isFormValid} className="w-full md:w-auto" size="lg">
          <Send className="h-4 w-4 mr-2" />
          Submit Suggestion
        </Button>

        <p className="text-xs text-muted-foreground">
          * Required fields. Clicking "Submit Suggestion" will open your default email client with a pre-filled message.
        </p>
      </CardContent>
    </Card>
  )
}
