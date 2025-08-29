"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ExternalLink, Search } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/Navbar"
import { NestedAccordion, ResourceList } from "@/components/NestedAccordion"
import SuggestionForm from "@/components/SuggestionForm"
import ContactSection from "@/components/ContactSection"
import { resourcesData, type ResourceCategory, type SubCategory } from "@/data/resourcesData"

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredResources = useMemo(() => {
    console.log("[v0] Resources data loaded:", resourcesData?.length || 0, "categories")

    if (!resourcesData || !Array.isArray(resourcesData)) {
      console.error("[v0] Resources data is invalid:", resourcesData)
      return []
    }

    if (!searchQuery.trim()) {
      return resourcesData
    }

    const query = searchQuery.toLowerCase()

    const filterSubcategories = (subcategories: SubCategory[]): SubCategory[] => {
      return subcategories
        .map((subcategory) => ({
          ...subcategory,
          resources:
            subcategory.resources?.filter(
              (resource) =>
                resource.title.toLowerCase().includes(query) || subcategory.name.toLowerCase().includes(query),
            ) || [],
          subcategories: subcategory.subcategories ? filterSubcategories(subcategory.subcategories) : undefined,
        }))
        .filter(
          (subcategory) =>
            (subcategory.resources && subcategory.resources.length > 0) ||
            (subcategory.subcategories && subcategory.subcategories.length > 0) ||
            subcategory.name.toLowerCase().includes(query),
        )
    }

    return resourcesData
      .map((category: ResourceCategory) => ({
        ...category,
        resources:
          category.resources?.filter(
            (resource) =>
              resource.title.toLowerCase().includes(query) || category.category.toLowerCase().includes(query),
          ) || [],
        subcategories: category.subcategories ? filterSubcategories(category.subcategories) : undefined,
      }))
      .filter(
        (category) =>
          (category.resources && category.resources.length > 0) ||
          (category.subcategories && category.subcategories.length > 0) ||
          category.category.toLowerCase().includes(query),
      )
  }, [searchQuery])

  const getTotalResources = (categories: ResourceCategory[]): number => {
    return categories.reduce((total, category) => {
      let categoryTotal = category.resources?.length || 0

      if (category.subcategories) {
        const countSubcategoryResources = (subcategories: SubCategory[]): number => {
          return subcategories.reduce((subTotal, subcategory) => {
            let subCategoryTotal = subcategory.resources?.length || 0
            if (subcategory.subcategories) {
              subCategoryTotal += countSubcategoryResources(subcategory.subcategories)
            }
            return subTotal + subCategoryTotal
          }, 0)
        }
        categoryTotal += countSubcategoryResources(category.subcategories)
      }

      return total + categoryTotal
    }, 0)
  }

  if (!resourcesData) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-muted-foreground">Loading resources...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Student Resources</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Curated collection of the best learning resources, tools, and guides to accelerate your academic and
            professional journey.
          </p>
        </div>

        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search resources or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>
          {searchQuery && (
            <p className="text-center text-sm text-muted-foreground mt-2">
              {filteredResources.length === 0
                ? "No resources found"
                : `Found ${getTotalResources(filteredResources)} resources in ${filteredResources.length} categories`}
            </p>
          )}
        </div>

        {/* Resources Accordion */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Browse by Category</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredResources.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No resources match your search criteria.</p>
                <p className="text-sm text-muted-foreground mt-2">Try searching with different keywords.</p>
              </div>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {filteredResources.map((category, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left hover:no-underline">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{category.icon}</span>
                        <span className="text-lg font-semibold">{category.category}</span>
                        <span className="text-sm text-muted-foreground ml-auto mr-4">
                          {getTotalResources([category])} resources
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-4 space-y-4">
                        {category.resources && category.resources.length > 0 && (
                          <ResourceList resources={category.resources} />
                        )}

                        {category.subcategories && category.subcategories.length > 0 && (
                          <div className={category.resources && category.resources.length > 0 ? "mt-6" : ""}>
                            <NestedAccordion subcategories={category.subcategories} />
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </CardContent>
        </Card>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-accent mb-2">
                {searchQuery ? filteredResources.length : resourcesData.length}
              </div>
              <div className="text-sm text-muted-foreground">{searchQuery ? "Matching Categories" : "Categories"}</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-accent mb-2">
                {searchQuery ? getTotalResources(filteredResources) : getTotalResources(resourcesData)}
              </div>
              <div className="text-sm text-muted-foreground">
                {searchQuery ? "Matching Resources" : "Total Resources"}
              </div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-accent mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Free Resources</div>
            </CardContent>
          </Card>
        </div>

        {/* Suggestion Form Section */}
        {/* <div className="mt-12">
          <SuggestionForm />
        </div> */}

        {/* Call to Action */}
        <ContactSection />
      </div>
    </div>
  )
}
