import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { AuthProvider } from "@/hooks/useAuth"
import "./globals.css"

export const metadata: Metadata = {
  title: "Student Resource Hub - All-in-One Learning Platform",
  description: "Roadmaps, Coding, Core CS, Projects, Interview Prep — everything students need in one place.",
  generator: "v0.app",
  keywords: ["student resources", "coding", "programming", "computer science", "interview prep", "roadmaps"],
  authors: [{ name: "Student Resource Hub Team" }],
  openGraph: {
    title: "Student Resource Hub",
    description: "All-in-One Student Learning Platform",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
