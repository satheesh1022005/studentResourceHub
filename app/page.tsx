import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Navbar from "@/components/Navbar"

export default function HomePage() {
  const features = [
    {
      icon: "🗺️",
      title: "Learning Roadmaps",
      description: "Structured paths for frontend, backend, and full-stack development",
    },
    {
      icon: "💻",
      title: "Coding Practice",
      description: "DSA problems, coding challenges, and interview preparation",
    },
    {
      icon: "📚",
      title: "Core Subjects",
      description: "Essential CS topics: OOP, DBMS, OS, and Computer Networks",
    },
    {
      icon: "🚀",
      title: "Project Ideas",
      description: "Real-world projects and open source contribution opportunities",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            All-in-One Student Resource Hub 🚀
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Roadmaps, Coding, Core CS, Projects, Interview Prep — everything in one place.
          </p>
          <Link href="/resources">
            <Button size="lg" className="text-lg px-8 py-3">
              Explore Resources
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Everything You Need to Succeed</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of students who are already using our curated resources to advance their careers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/resources">
              <Button size="lg" className="w-full sm:w-auto">
                Browse Resources
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                View Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg mb-4">Made with ❤️ by seniors to guide juniors</p>
          <div className="flex justify-center space-x-6">
            <a href="https://github.com" className="hover:text-accent transition-colors">
              GitHub
            </a>
            <a href="https://linkedin.com" className="hover:text-accent transition-colors">
              LinkedIn
            </a>
            <Link href="/admin" className="hover:text-accent transition-colors text-sm opacity-60">
              Admin Login
            </Link>
          </div>
          <p className="mt-4 text-sm opacity-80">© 2024 Student Resource Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
