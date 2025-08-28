export interface ResumeTemplate {
  id: string
  name: string
  description: string
  features: string[]
  downloadUrl: string
  popular: boolean
}

export interface ResumeTip {
  id: string
  title: string
  description: string
  icon: string
}

export const resumeTemplatesData: ResumeTemplate[] = [
  {
    id: "1",
    name: "Modern Professional",
    description: "Clean, ATS-friendly template perfect for tech roles",
    features: ["ATS Optimized", "Modern Design", "Easy to Edit"],
    downloadUrl: "https://example.com/templates/modern-professional.docx",
    popular: true,
  },
  {
    id: "2",
    name: "Creative Portfolio",
    description: "Showcase your projects and creativity with this visual template",
    features: ["Visual Design", "Portfolio Section", "Color Customizable"],
    downloadUrl: "https://example.com/templates/creative-portfolio.docx",
    popular: false,
  },
  {
    id: "3",
    name: "Academic Research",
    description: "Perfect for academic positions and research roles",
    features: ["Publication Ready", "Academic Format", "References Section"],
    downloadUrl: "https://example.com/templates/academic-research.docx",
    popular: false,
  },
  {
    id: "4",
    name: "Entry Level",
    description: "Great for students and new graduates with limited experience",
    features: ["Student Friendly", "Skills Focused", "Education Emphasis"],
    downloadUrl: "https://example.com/templates/entry-level.docx",
    popular: true,
  },
]

export const resumeTipsData: ResumeTip[] = [
  {
    id: "1",
    title: "Keep it Concise",
    description: "Limit your resume to 1-2 pages and focus on relevant experience",
    icon: "📝",
  },
  {
    id: "2",
    title: "Use Action Verbs",
    description: "Start bullet points with strong action verbs like 'developed', 'implemented', 'led'",
    icon: "⚡",
  },
  {
    id: "3",
    title: "Quantify Achievements",
    description: "Include numbers and metrics to demonstrate your impact",
    icon: "📊",
  },
  {
    id: "4",
    title: "Tailor for Each Job",
    description: "Customize your resume for each position you apply to",
    icon: "🎯",
  },
]
