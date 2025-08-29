import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"
import Navbar from "@/components/Navbar"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">About Student Resource Hub</h1>
        </div>

        {/* Mission */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We believe that every student deserves access to high-quality learning resources, regardless of their
              background or financial situation. Our mission is to democratize education by curating the best free
              resources available on the internet and organizing them in a way that makes sense for students at
              different stages of their journey.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Whether you're just starting your coding journey, preparing for technical interviews, or looking to
              contribute to open source projects, we've got you covered with carefully selected resources that have
              helped thousands of students succeed.
            </p>
          </CardContent>
        </Card>

        {/* What We Offer */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">📚 Curated Resources</h3>
                <p className="text-sm text-muted-foreground">
                  Hand-picked learning materials from the best sources on the internet
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">🗺️ Learning Roadmaps</h3>
                <p className="text-sm text-muted-foreground">
                  Clear paths to guide your learning journey in different tech domains
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">🚀 Project Ideas</h3>
                <p className="text-sm text-muted-foreground">
                  Real-world projects to build your portfolio and gain practical experience
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">🎯 Interview Prep</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive resources to help you ace technical and behavioral interviews
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Community */}
        {/* <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Join Our Community</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We're more than just a resource hub - we're a community of learners helping each other grow. Connect with
              us and fellow students to share your journey, ask questions, and contribute to making education more
              accessible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://github.com">
                <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
              </Link>
              <Link href="https://linkedin.com">
                <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </Button>
              </Link>
              <Link href="mailto:hello@studenthub.com">
                <Button className="w-full sm:w-auto bg-accent hover:bg-accent/90">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Us
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card> */}

        {/* Contributors */}
        {/* <div className="text-center">
          <Card className="bg-accent/5 border-accent/20">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">Want to Contribute?</h3>
              <p className="text-muted-foreground mb-4">
                Help us improve by suggesting new resources, reporting issues, or contributing to the codebase.
              </p>
              <Link href="https://github.com">
                <Button className="bg-accent hover:bg-accent/90">Contribute on GitHub</Button>
              </Link>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </div>
  )
}
