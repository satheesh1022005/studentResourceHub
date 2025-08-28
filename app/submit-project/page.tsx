"use client"

import Navbar from "@/components/Navbar"
import ProjectSubmissionForm from "@/components/ProjectSubmissionForm"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Clock, Users } from "lucide-react"

export default function SubmitProjectPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Submit Your Project</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Share your amazing project with the student community and inspire others to build great things.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">1. Submit</h3>
              <p className="text-sm text-muted-foreground">Fill out the form with your project details</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">2. Review</h3>
              <p className="text-sm text-muted-foreground">Our team reviews your submission</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">3. Publish</h3>
              <p className="text-sm text-muted-foreground">Your project goes live for everyone to see</p>
            </CardContent>
          </Card>
        </div>

        {/* Submission Form */}
        <ProjectSubmissionForm />

        {/* Guidelines */}
        <div className="mt-12">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Submission Guidelines</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Ensure your GitHub repository is public and includes a detailed README</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Include clear installation and setup instructions</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Add screenshots or demo videos to showcase your project</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Make sure your code is well-commented and follows best practices</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Projects should be original work or clearly attribute any external resources</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
