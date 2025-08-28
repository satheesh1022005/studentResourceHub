"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, LogOut, Save, CheckCircle, XCircle, Clock, Eye, ExternalLink, Settings } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { resourcesData as initialResourcesData, type ResourceCategory } from "@/data/resourcesData"
import { projectsData as initialProjectsData } from "@/data/projectsData"
import { resumeTemplatesData, resumeTipsData, type ResumeTemplate, type ResumeTip } from "@/data/resumeData"

interface Resource {
  title: string
  url: string
}

interface Project {
  title: string
  description: string
  techStack: string[]
  githubUrl: string
}

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

export default function AdminDashboard() {
  const { isAuthenticated, logout, changePassword } = useAuth()
  const router = useRouter()
  const [resources, setResources] = useState<ResourceCategory[]>(initialResourcesData)
  const [projects, setProjects] = useState<Project[]>(initialProjectsData)
  const [projectSubmissions, setProjectSubmissions] = useState<ProjectSubmission[]>([])
  const [resumeTemplates, setResumeTemplates] = useState<ResumeTemplate[]>(resumeTemplatesData)
  const [resumeTips, setResumeTips] = useState<ResumeTip[]>(resumeTipsData)
  const [message, setMessage] = useState("")

  const [newResource, setNewResource] = useState({
    category: "",
    subcategory: "",
    title: "",
    url: "",
    isNewCategory: false,
    newCategoryIcon: "",
  })
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    techStack: "",
    githubUrl: "",
  })

  const [newCategory, setNewCategory] = useState({
    name: "",
    icon: "",
    parentCategory: "",
  })

  const [newResumeTemplate, setNewResumeTemplate] = useState({
    name: "",
    description: "",
    features: "",
    downloadUrl: "",
    popular: false,
  })

  const [newResumeTip, setNewResumeTip] = useState({
    title: "",
    description: "",
    icon: "",
  })

  const [passwordChange, setPasswordChange] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin")
      return
    }

    const savedResources = localStorage.getItem("adminResources")
    const savedProjects = localStorage.getItem("adminProjects")
    const savedSubmissions = localStorage.getItem("projectSubmissions")
    const savedTemplates = localStorage.getItem("adminResumeTemplates")
    const savedTips = localStorage.getItem("adminResumeTips")

    if (savedResources) {
      setResources(JSON.parse(savedResources))
    }
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    }
    if (savedSubmissions) {
      setProjectSubmissions(JSON.parse(savedSubmissions))
    }
    if (savedTemplates) {
      setResumeTemplates(JSON.parse(savedTemplates))
    }
    if (savedTips) {
      setResumeTips(JSON.parse(savedTips))
    }
  }, [isAuthenticated, router])

  const saveToLocalStorage = () => {
    localStorage.setItem("adminResources", JSON.stringify(resources))
    localStorage.setItem("adminProjects", JSON.stringify(projects))
    localStorage.setItem("projectSubmissions", JSON.stringify(projectSubmissions))
    localStorage.setItem("adminResumeTemplates", JSON.stringify(resumeTemplates))
    localStorage.setItem("adminResumeTips", JSON.stringify(resumeTips))
    setMessage("Changes saved successfully!")
    setTimeout(() => setMessage(""), 3000)
  }

  const addResource = () => {
    if (!newResource.title || !newResource.url) return

    const updatedResources = [...resources]

    if (newResource.isNewCategory) {
      if (!newResource.category || !newResource.newCategoryIcon) return

      updatedResources.push({
        category: newResource.category,
        icon: newResource.newCategoryIcon,
        resources: [{ title: newResource.title, url: newResource.url }],
      })
    } else if (newResource.subcategory) {
      const categoryIndex = updatedResources.findIndex((cat) => cat.category === newResource.category)
      if (categoryIndex >= 0) {
        if (!updatedResources[categoryIndex].subcategories) {
          updatedResources[categoryIndex].subcategories = []
        }

        const subcategoryIndex = updatedResources[categoryIndex].subcategories!.findIndex(
          (sub) => sub.name === newResource.subcategory,
        )

        if (subcategoryIndex >= 0) {
          if (!updatedResources[categoryIndex].subcategories![subcategoryIndex].resources) {
            updatedResources[categoryIndex].subcategories![subcategoryIndex].resources = []
          }
          updatedResources[categoryIndex].subcategories![subcategoryIndex].resources!.push({
            title: newResource.title,
            url: newResource.url,
          })
        } else {
          updatedResources[categoryIndex].subcategories!.push({
            name: newResource.subcategory,
            resources: [{ title: newResource.title, url: newResource.url }],
          })
        }
      }
    } else {
      const categoryIndex = updatedResources.findIndex((cat) => cat.category === newResource.category)
      if (categoryIndex >= 0) {
        if (!updatedResources[categoryIndex].resources) {
          updatedResources[categoryIndex].resources = []
        }
        updatedResources[categoryIndex].resources!.push({
          title: newResource.title,
          url: newResource.url,
        })
      }
    }

    setResources(updatedResources)
    setNewResource({
      category: "",
      subcategory: "",
      title: "",
      url: "",
      isNewCategory: false,
      newCategoryIcon: "",
    })
  }

  const removeResource = (categoryIndex: number, resourceIndex: number, subcategoryIndex?: number) => {
    const updatedResources = [...resources]

    if (subcategoryIndex !== undefined) {
      updatedResources[categoryIndex].subcategories![subcategoryIndex].resources!.splice(resourceIndex, 1)

      if (updatedResources[categoryIndex].subcategories![subcategoryIndex].resources!.length === 0) {
        updatedResources[categoryIndex].subcategories!.splice(subcategoryIndex, 1)
      }
    } else {
      updatedResources[categoryIndex].resources!.splice(resourceIndex, 1)
    }

    const hasResources = updatedResources[categoryIndex].resources?.length > 0
    const hasSubcategories = updatedResources[categoryIndex].subcategories?.length > 0

    if (!hasResources && !hasSubcategories) {
      updatedResources.splice(categoryIndex, 1)
    }

    setResources(updatedResources)
  }

  const addProject = () => {
    if (!newProject.title || !newProject.description || !newProject.githubUrl) return

    const project: Project = {
      title: newProject.title,
      description: newProject.description,
      techStack: newProject.techStack.split(",").map((tech) => tech.trim()),
      githubUrl: newProject.githubUrl,
    }

    setProjects([...projects, project])
    setNewProject({ title: "", description: "", techStack: "", githubUrl: "" })
  }

  const removeProject = (index: number) => {
    const updatedProjects = [...projects]
    updatedProjects.splice(index, 1)
    setProjects(updatedProjects)
  }

  const updateSubmissionStatus = (submissionId: string, status: "approved" | "rejected") => {
    const updatedSubmissions = projectSubmissions.map((submission) =>
      submission.id === submissionId ? { ...submission, status } : submission,
    )
    setProjectSubmissions(updatedSubmissions)
    localStorage.setItem("projectSubmissions", JSON.stringify(updatedSubmissions))

    if (status === "approved") {
      const approvedSubmission = updatedSubmissions.find((s) => s.id === submissionId)
      if (approvedSubmission) {
        const newProject: Project = {
          title: approvedSubmission.title,
          description: approvedSubmission.description,
          techStack: approvedSubmission.techStack,
          githubUrl: approvedSubmission.githubUrl,
        }
        setProjects((prev) => [...prev, newProject])
      }
    }
  }

  const deleteSubmission = (submissionId: string) => {
    const updatedSubmissions = projectSubmissions.filter((s) => s.id !== submissionId)
    setProjectSubmissions(updatedSubmissions)
    localStorage.setItem("projectSubmissions", JSON.stringify(updatedSubmissions))
  }

  const addResumeTemplate = () => {
    if (!newResumeTemplate.name || !newResumeTemplate.description || !newResumeTemplate.downloadUrl) return

    const template: ResumeTemplate = {
      id: Date.now().toString(),
      name: newResumeTemplate.name,
      description: newResumeTemplate.description,
      features: newResumeTemplate.features.split(",").map((feature) => feature.trim()),
      downloadUrl: newResumeTemplate.downloadUrl,
      popular: newResumeTemplate.popular,
    }

    setResumeTemplates([...resumeTemplates, template])
    setNewResumeTemplate({ name: "", description: "", features: "", downloadUrl: "", popular: false })
  }

  const removeResumeTemplate = (id: string) => {
    setResumeTemplates(resumeTemplates.filter((template) => template.id !== id))
  }

  const addResumeTip = () => {
    if (!newResumeTip.title || !newResumeTip.description || !newResumeTip.icon) return

    const tip: ResumeTip = {
      id: Date.now().toString(),
      title: newResumeTip.title,
      description: newResumeTip.description,
      icon: newResumeTip.icon,
    }

    setResumeTips([...resumeTips, tip])
    setNewResumeTip({ title: "", description: "", icon: "" })
  }

  const removeResumeTip = (id: string) => {
    setResumeTips(resumeTips.filter((tip) => tip.id !== id))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
    }
  }

  const handlePasswordChange = () => {
    if (!passwordChange.currentPassword || !passwordChange.newPassword || !passwordChange.confirmPassword) {
      setMessage("Please fill in all password fields")
      return
    }

    if (passwordChange.newPassword !== passwordChange.confirmPassword) {
      setMessage("New passwords don't match")
      return
    }

    if (passwordChange.newPassword.length < 6) {
      setMessage("New password must be at least 6 characters long")
      return
    }

    const success = changePassword(passwordChange.currentPassword, passwordChange.newPassword)
    if (success) {
      setMessage("Password changed successfully!")
      setPasswordChange({ currentPassword: "", newPassword: "", confirmPassword: "" })
    } else {
      setMessage("Current password is incorrect")
    }
    setTimeout(() => setMessage(""), 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage resources, projects, and submissions</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={saveToLocalStorage} className="bg-accent hover:bg-accent/90">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
            <Button variant="outline" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {message && (
          <Alert className="mb-6">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="submissions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="submissions">
              Project Submissions
              {projectSubmissions.filter((s) => s.status === "pending").length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {projectSubmissions.filter((s) => s.status === "pending").length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="resume">Resume</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="submissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Submissions</CardTitle>
                <p className="text-sm text-muted-foreground">Review and manage project submissions from users</p>
              </CardHeader>
              <CardContent>
                {projectSubmissions.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No project submissions yet.</p>
                ) : (
                  <div className="space-y-4">
                    {projectSubmissions.map((submission) => (
                      <Card key={submission.id} className="border-l-4 border-l-accent">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{submission.title}</CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className={getStatusColor(submission.status)}>
                                  {getStatusIcon(submission.status)}
                                  <span className="ml-1 capitalize">{submission.status}</span>
                                </Badge>
                                <span className="text-sm text-muted-foreground">by {submission.submitterName}</span>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(submission.submittedAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              {submission.status === "pending" && (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() => updateSubmissionStatus(submission.id, "approved")}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => updateSubmissionStatus(submission.id, "rejected")}
                                  >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Reject
                                  </Button>
                                </>
                              )}
                              <Button size="sm" variant="ghost" onClick={() => deleteSubmission(submission.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-3">{submission.description}</p>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {submission.techStack.map((tech, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-4 text-sm">
                            <a
                              href={submission.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-accent hover:text-accent/80"
                            >
                              <Eye className="h-4 w-4" />
                              GitHub
                              <ExternalLink className="h-3 w-3" />
                            </a>
                            {submission.liveUrl && (
                              <a
                                href={submission.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-accent hover:text-accent/80"
                              >
                                <Eye className="h-4 w-4" />
                                Live Demo
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                            <span className="text-muted-foreground">Contact: {submission.submitterEmail}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add New Resource
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 mb-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newResource.isNewCategory}
                      onChange={(e) => setNewResource({ ...newResource, isNewCategory: e.target.checked })}
                    />
                    Create new category
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {newResource.isNewCategory ? (
                    <>
                      <div>
                        <Label htmlFor="newCategory">New Category Name</Label>
                        <Input
                          id="newCategory"
                          value={newResource.category}
                          onChange={(e) => setNewResource({ ...newResource, category: e.target.value })}
                          placeholder="e.g., Machine Learning"
                        />
                      </div>
                      <div>
                        <Label htmlFor="categoryIcon">Category Icon</Label>
                        <Input
                          id="categoryIcon"
                          value={newResource.newCategoryIcon}
                          onChange={(e) => setNewResource({ ...newResource, newCategoryIcon: e.target.value })}
                          placeholder="🤖"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={newResource.category || "defaultCategory"} // Updated default value
                          onValueChange={(value) =>
                            setNewResource({ ...newResource, category: value, subcategory: "" })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {resources.map((cat) => (
                              <SelectItem key={cat.category} value={cat.category}>
                                {cat.icon} {cat.category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="subcategory">Subcategory</Label>
                        <div className="space-y-2">
                          <Select
                            value={newResource.subcategory || "no-subcategory"}
                            onValueChange={(value) =>
                              setNewResource({ ...newResource, subcategory: value === "no-subcategory" ? "" : value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sel or cr subcate" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="no-subcategory">No subcategory</SelectItem>
                              {newResource.category &&
                                resources
                                  .find((cat) => cat.category === newResource.category)
                                  ?.subcategories?.map((sub) => (
                                    <SelectItem key={sub.name} value={sub.name}>
                                      {sub.name}
                                    </SelectItem>
                                  ))}
                            </SelectContent>
                          </Select>
                          <Input
                            value={newResource.subcategory}
                            onChange={(e) => setNewResource({ ...newResource, subcategory: e.target.value })}
                            placeholder="new subcate name"
                            className="text-sm"
                          />
                        </div>
                      </div>
                    </>
                  )}
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newResource.title}
                      onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                      placeholder="e.g., React Documentation"
                    />
                  </div>
                  <div>
                    <Label htmlFor="url">URL</Label>
                    <Input
                      id="url"
                      value={newResource.url}
                      onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <Button onClick={addResource} className="w-full md:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Resource
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {resources.map((category, categoryIndex) => (
                <Card key={categoryIndex}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <span>{category.icon}</span>
                        {category.category}
                        <Badge variant="secondary">
                          {(category.resources?.length || 0) +
                            (category.subcategories?.reduce((acc, sub) => acc + (sub.resources?.length || 0), 0) ||
                              0)}{" "}
                          resources
                        </Badge>
                      </CardTitle>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setNewResource({ ...newResource, category: category.category })}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Link
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.resources && category.resources.length > 0 && (
                        <div className="space-y-2">
                          {category.resources.map((resource, resourceIndex) => (
                            <div
                              key={resourceIndex}
                              className="flex items-center justify-between p-2 bg-muted/30 rounded"
                            >
                              <div>
                                <span className="font-medium">{resource.title}</span>
                                <span className="text-sm text-muted-foreground ml-2">{resource.url}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeResource(categoryIndex, resourceIndex)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}

                      {category.subcategories &&
                        category.subcategories.map((subcategory, subcategoryIndex) => (
                          <div key={subcategoryIndex} className="ml-4 border-l-2 border-accent/20 pl-4">
                            <h4 className="font-medium text-accent mb-2">{subcategory.name}</h4>
                            <div className="space-y-2">
                              {subcategory.resources?.map((resource, resourceIndex) => (
                                <div
                                  key={resourceIndex}
                                  className="flex items-center justify-between p-2 bg-muted/20 rounded"
                                >
                                  <div>
                                    <span className="font-medium">{resource.title}</span>
                                    <span className="text-sm text-muted-foreground ml-2">{resource.url}</span>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeResource(categoryIndex, resourceIndex, subcategoryIndex)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add New Project
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="projectTitle">Title</Label>
                    <Input
                      id="projectTitle"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      placeholder="Project name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="githubUrl">GitHub URL</Label>
                    <Input
                      id="githubUrl"
                      value={newProject.githubUrl}
                      onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Brief project description"
                  />
                </div>
                <div>
                  <Label htmlFor="techStack">Tech Stack (comma-separated)</Label>
                  <Input
                    id="techStack"
                    value={newProject.techStack}
                    onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>
                <Button onClick={addProject} className="w-full md:w-auto">
                  Add Project
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {project.title}
                      <Button variant="ghost" size="sm" onClick={() => removeProject(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.techStack.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">{project.githubUrl}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resume" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="h-5 w-5" />
                      Add Resume Template
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="templateName">Template Name</Label>
                      <Input
                        id="templateName"
                        value={newResumeTemplate.name}
                        onChange={(e) => setNewResumeTemplate({ ...newResumeTemplate, name: e.target.value })}
                        placeholder="e.g., Modern Professional"
                      />
                    </div>
                    <div>
                      <Label htmlFor="templateDescription">Description</Label>
                      <Textarea
                        id="templateDescription"
                        value={newResumeTemplate.description}
                        onChange={(e) => setNewResumeTemplate({ ...newResumeTemplate, description: e.target.value })}
                        placeholder="Brief description of the template"
                      />
                    </div>
                    <div>
                      <Label htmlFor="templateFeatures">Features (comma-separated)</Label>
                      <Input
                        id="templateFeatures"
                        value={newResumeTemplate.features}
                        onChange={(e) => setNewResumeTemplate({ ...newResumeTemplate, features: e.target.value })}
                        placeholder="ATS Optimized, Modern Design, Easy to Edit"
                      />
                    </div>
                    <div>
                      <Label htmlFor="templateDownloadUrl">Download URL</Label>
                      <Input
                        id="templateDownloadUrl"
                        value={newResumeTemplate.downloadUrl}
                        onChange={(e) => setNewResumeTemplate({ ...newResumeTemplate, downloadUrl: e.target.value })}
                        placeholder="https://example.com/template.docx"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="templatePopular"
                        checked={newResumeTemplate.popular}
                        onChange={(e) => setNewResumeTemplate({ ...newResumeTemplate, popular: e.target.checked })}
                      />
                      <Label htmlFor="templatePopular">Mark as Popular</Label>
                    </div>
                    <Button onClick={addResumeTemplate} className="w-full">
                      Add Template
                    </Button>
                  </CardContent>
                </Card>

                <div className="space-y-2">
                  <h3 className="font-semibold">Current Templates</h3>
                  {resumeTemplates.map((template) => (
                    <Card key={template.id} className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium">{template.name}</span>
                          {template.popular && (
                            <Badge className="ml-2" variant="secondary">
                              Popular
                            </Badge>
                          )}
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeResumeTemplate(template.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="h-5 w-5" />
                      Add Resume Tip
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="tipTitle">Tip Title</Label>
                      <Input
                        id="tipTitle"
                        value={newResumeTip.title}
                        onChange={(e) => setNewResumeTip({ ...newResumeTip, title: e.target.value })}
                        placeholder="e.g., Keep it Concise"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tipDescription">Description</Label>
                      <Textarea
                        id="tipDescription"
                        value={newResumeTip.description}
                        onChange={(e) => setNewResumeTip({ ...newResumeTip, description: e.target.value })}
                        placeholder="Detailed tip description"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tipIcon">Icon (emoji)</Label>
                      <Input
                        id="tipIcon"
                        value={newResumeTip.icon}
                        onChange={(e) => setNewResumeTip({ ...newResumeTip, icon: e.target.value })}
                        placeholder="📝"
                      />
                    </div>
                    <Button onClick={addResumeTip} className="w-full">
                      Add Tip
                    </Button>
                  </CardContent>
                </Card>

                <div className="space-y-2">
                  <h3 className="font-semibold">Current Tips</h3>
                  {resumeTips.map((tip) => (
                    <Card key={tip.id} className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span>{tip.icon}</span>
                          <span className="font-medium">{tip.title}</span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeResumeTip(tip.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Admin Settings
                </CardTitle>
                <p className="text-sm text-muted-foreground">Manage your admin account settings</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="max-w-md space-y-4">
                  <h3 className="text-lg font-semibold">Change Password</h3>
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={passwordChange.currentPassword}
                      onChange={(e) => setPasswordChange({ ...passwordChange, currentPassword: e.target.value })}
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordChange.newPassword}
                      onChange={(e) => setPasswordChange({ ...passwordChange, newPassword: e.target.value })}
                      placeholder="Enter new password (min 6 characters)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordChange.confirmPassword}
                      onChange={(e) => setPasswordChange({ ...passwordChange, confirmPassword: e.target.value })}
                      placeholder="Confirm new password"
                    />
                  </div>
                  <Button onClick={handlePasswordChange} className="w-full">
                    Change Password
                  </Button>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-2">Security Information</h3>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>• Password is stored securely using client-side hashing</p>
                    <p>• Default password is "admin123" - please change it immediately</p>
                    <p>• Use a strong password with at least 6 characters</p>
                    <p>• Password changes are applied globally across all instances</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
