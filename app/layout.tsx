import type React from "react"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { AuthProvider } from "@/hooks/useAuth"
import "./globals.css"

const inter = Inter({ subsets: ['latin'] })

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
      <head>
        {/* Google AdSense Meta Tag */}
        <meta name="google-adsense-account" content="ca-pub-3596390815097696" />
        {/* Google AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3596390815097696"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
