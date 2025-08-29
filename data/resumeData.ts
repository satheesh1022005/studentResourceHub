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
    name: "Deedy CV",
    description: "A clean, elegant LaTeX CV template suitable for 2 coulmn layouts",
    features: ["LaTeX Template", "Elegant Design", "Professional Look"],
    downloadUrl: "https://www.overleaf.com/latex/templates/deedy-cv/bjryvfsjdyxz",
    popular: false,
  },
  {
    id: "2",
    name: "Jake's Resume",
    description: "Minimal and modern LaTeX resume template for single column layouts",
    features: ["LaTeX Template", "Minimal Design", "ATS-Friendly"],
    downloadUrl: "https://www.overleaf.com/latex/templates/jakes-resume/syzfjbzwjncs",
    popular: false,
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
