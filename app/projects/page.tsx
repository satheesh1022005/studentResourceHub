import Link from "next/link"
import { ExternalLink, Github, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/Navbar"
import { projectsData } from "@/data/projectsData"

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Student Projects</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Explore real-world projects built by students. Get inspired, learn from the code, and contribute to open
            source.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projectsData.map((project, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 group">
              <CardHeader>
                <CardTitle className="text-xl text-foreground group-hover:text-accent transition-colors">
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* GitHub Link */}
                <div className="pt-2">
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="w-full group/btn bg-transparent">
                      <Github className="h-4 w-4 mr-2" />
                      View on GitHub
                      <ExternalLink className="h-3 w-3 ml-2 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <h1 className="text-2xl font-bold text-center text-foreground mb-8">Have a cool project? ,share it with us</h1>
        <div className="text-center">
          <Card className="bg-accent/5 border-accent/20 max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">Share Your Project</h3>
              <p className="text-muted-foreground mb-4">
                Built something amazing? Share it with the community and inspire other students.
              </p>
              <Link href="/submit-project">
                <Button className="bg-accent hover:bg-accent/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Submit Your Project
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Project Ideas Section */}
        {/* <div className="mt-16">
          <h2 className="text-2xl font-bold text-center text-foreground mb-8">Need Project Ideas?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Web Applications", icon: "🌐", description: "Full-stack web apps with modern frameworks" },
              { title: "Mobile Apps", icon: "📱", description: "iOS and Android applications" },
              { title: "Data Science", icon: "📊", description: "ML models and data analysis projects" },
              { title: "Open Source", icon: "🔓", description: "Contribute to existing projects" },
            ].map((idea, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-3xl mb-2">{idea.icon}</div>
                  <h3 className="font-semibold text-foreground mb-2">{idea.title}</h3>
                  <p className="text-sm text-muted-foreground">{idea.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  )
}
