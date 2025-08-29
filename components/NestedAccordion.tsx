"use client"
import Link from "next/link"
import { ExternalLink, ChevronRight } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Resource, SubCategory } from "@/data/resourcesData"

interface NestedAccordionProps {
  subcategories: SubCategory[]
  level?: number
}

export function NestedAccordion({ subcategories, level = 0 }: NestedAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {subcategories.map((subcategory, index) => (
        <AccordionItem key={index} value={`subcategory-${level}-${index}`}>
          <AccordionTrigger className="text-left hover:no-underline">
            <div className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{subcategory.name}</span>
              <span className="text-sm text-muted-foreground ml-auto mr-4">
                {subcategory.resources?.length || subcategory.subcategories?.length || 0} resources
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className={`pt-2 ${level > 0 ? "ml-4 border-l border-border pl-4" : ""}`}>
              {/* Render nested subcategories if they exist */}
              {subcategory.subcategories && subcategory.subcategories.length > 0 && (
                <div className="mb-4">
                  <NestedAccordion subcategories={subcategory.subcategories} level={level + 1} />
                </div>
              )}

              {/* Render resources if they exist */}
              {subcategory.resources && subcategory.resources.length > 0 && (
                <div className="space-y-2">
                  {subcategory.resources.map((resource, resourceIndex) => (
                    <div
                      key={resourceIndex}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors group"
                    >
                      <span className="font-medium text-foreground">{resource.title}</span>
                      <Link
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
                      >
                        <span className="text-sm">Visit</span>
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

interface ResourceListProps {
  resources: Resource[]
}

export function ResourceList({ resources }: ResourceListProps) {
  return (
    <div className="space-y-3">
      {resources.map((resource, resourceIndex) => (
        <div
          key={resourceIndex}
          className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
        >
          <span className="font-medium text-foreground">{resource.title}</span>
          <Link
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
          >
            <span className="text-sm">Visit</span>
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      ))}
    </div>
  )
}
