"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Github, ExternalLink, Send } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

interface ProjectSubmission {
  id: string
  title: string
  description: string
  techStack: string[]
  githubUrl: string
  liveUrl?: string
  submitterName: string
  submitterEmail: string
  category: string
  submittedAt: string
  status: "pending" | "approved" | "rejected"
}

export default function ProjectSubmissionForm() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    githubUrl: "",
    liveUrl: "",
    submitterName: "",
    submitterEmail: "",
    category: "",
  })

  const [techStackArray, setTechStackArray] = useState<string[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleTechStackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData((prev) => ({ ...prev, techStack: value }))

    // Convert comma-separated string to array
    const techArray = value
      .split(",")
      .map((tech) => tech.trim())
      .filter((tech) => tech.length > 0)
    setTechStackArray(techArray)
  }

  const handleSubmitProject = () => {
    const newSubmission: ProjectSubmission = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      techStack: techStackArray,
      githubUrl: formData.githubUrl,
      liveUrl: formData.liveUrl,
      submitterName: formData.submitterName,
      submitterEmail: formData.submitterEmail,
      category: formData.category,
      submittedAt: new Date().toISOString(),
      status: "pending",
    }

    // Store in localStorage
    const existingSubmissions = JSON.parse(localStorage.getItem("projectSubmissions") || "[]")
    const updatedSubmissions = [...existingSubmissions, newSubmission]
    localStorage.setItem("projectSubmissions", JSON.stringify(updatedSubmissions))

    toast({
      title: "Project Submitted Successfully!",
      description: "Your project has been submitted for review. You'll hear back from us soon.",
    })

    // Reset form
    setFormData({
      title: "",
      description: "",
      techStack: "",
      githubUrl: "",
      liveUrl: "",
      submitterName: "",
      submitterEmail: "",
      category: "",
    })
    setTechStackArray([])
  }

  const isFormValid =
    formData.title && formData.description && formData.githubUrl && formData.submitterName && techStackArray.length > 0

  return (
    <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Upload className="h-5 w-5 text-accent" />
          Submit Your Project
        </CardTitle>
        <p className="text-muted-foreground">
          Share your amazing project with the community and inspire other students!
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title *</Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g., E-commerce Website"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              placeholder="e.g., Web App, Mobile App, Data Science"
              value={formData.category}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Project Description *</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Describe your project, its features, and what problem it solves..."
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="techStack">Tech Stack * (comma-separated)</Label>
          <Input
            id="techStack"
            name="techStack"
            placeholder="e.g., React, Node.js, MongoDB, TypeScript"
            value={formData.techStack}
            onChange={handleTechStackChange}
            required
          />
          {techStackArray.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {techStackArray.map((tech, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="githubUrl">GitHub Repository *</Label>
            <div className="relative">
              <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="githubUrl"
                name="githubUrl"
                type="url"
                placeholder="https://github.com/username/repo"
                value={formData.githubUrl}
                onChange={handleInputChange}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="liveUrl">Live Demo URL (Optional)</Label>
            <div className="relative">
              <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="liveUrl"
                name="liveUrl"
                type="url"
                placeholder="https://your-project.com"
                value={formData.liveUrl}
                onChange={handleInputChange}
                className="pl-10"
              />
            </div>
          </div>
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
            <Label htmlFor="submitterEmail">Your Email *</Label>
            <Input
              id="submitterEmail"
              name="submitterEmail"
              type="email"
              placeholder="your.email@example.com"
              value={formData.submitterEmail}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <Button onClick={handleSubmitProject} disabled={!isFormValid} className="w-full md:w-auto" size="lg">
          <Send className="h-4 w-4 mr-2" />
          Submit Project
        </Button>

        <p className="text-xs text-muted-foreground">
          * Required fields. Your project will be reviewed by our team before being published.
        </p>
      </CardContent>
    </Card>
  )
}
