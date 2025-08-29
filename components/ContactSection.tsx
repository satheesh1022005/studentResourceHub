'use client'

import { ExternalLink } from "lucide-react"
import { Card, CardContent } from "./ui/card"

export default function ContactSection() {
  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.location.href = "mailto:spack1022005@gmail.com"
  }

  return (
    <div className="mt-12 text-center">
      <Card className="bg-accent/5 border-accent/20">
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold text-foreground mb-2">Have Questions?</h3>
          <p className="text-muted-foreground mb-4">
            Need help finding specific resources or have feedback about the platform? feel free to reach out
          </p>
          <a
            href="#"
            onClick={handleEmailClick}
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium"
          >
            Contact Support
            <ExternalLink className="h-4 w-4" />
          </a>
        </CardContent>
      </Card>
    </div>
  )
}