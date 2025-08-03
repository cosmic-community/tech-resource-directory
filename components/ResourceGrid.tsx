'use client'

import { useState, useEffect } from 'react'
import { Resource, Category, Tag, FilterState, DifficultyLevel, ResourceType } from '@/types'
import ResourceCard from '@/components/ResourceCard'

interface ResourceGridProps {
  resources: Resource[]
  categories: Category[]
  tags: Tag[]
}

export default function ResourceGrid({ resources, categories, tags }: ResourceGridProps) {
  const [filteredResources, setFilteredResources] = useState<Resource[]>(resources)
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    selectedCategory: null,
    selectedTags: [],
    selectedDifficulty: null,
    selectedResourceType: null,
  })

  // Filter resources based on current filters
  const applyFilters = (currentFilters: FilterState) => {
    let filtered = [...resources]

    // Search filter
    if (currentFilters.searchTerm) {
      const searchLower = currentFilters.searchTerm.toLowerCase()
      filtered = filtered.filter(resource =>
        resource.metadata.name?.toLowerCase().includes(searchLower) ||
        resource.metadata.description?.toLowerCase().includes(searchLower)
      )
    }

    // Category filter
    if (currentFilters.selectedCategory) {
      filtered = filtered.filter(resource =>
        resource.metadata.category?.id === currentFilters.selectedCategory
      )
    }

    // Tags filter
    if (currentFilters.selectedTags.length > 0) {
      filtered = filtered.filter(resource =>
        resource.metadata.tags?.some(tag =>
          currentFilters.selectedTags.includes(tag.id)
        )
      )
    }

    // Difficulty filter
    if (currentFilters.selectedDifficulty) {
      filtered = filtered.filter(resource =>
        resource.metadata.difficulty?.key === currentFilters.selectedDifficulty
      )
    }

    // Resource type filter
    if (currentFilters.selectedResourceType) {
      filtered = filtered.filter(resource =>
        resource.metadata.resource_type?.key === currentFilters.selectedResourceType
      )
    }

    setFilteredResources(filtered)
  }

  // Listen for filter changes from FilterSection
  useEffect(() => {
    const handleFilterChange = (event: CustomEvent) => {
      const { type, value } = event.detail
      
      let newFilters = { ...filters }
      
      switch (type) {
        case 'search':
          newFilters.searchTerm = value
          break
        case 'category':
          newFilters.selectedCategory = value
          break
        case 'tags':
          newFilters.selectedTags = value
          break
        case 'difficulty':
          newFilters.selectedDifficulty = value
          break
        case 'resourceType':
          newFilters.selectedResourceType = value
          break
        case 'clear':
          newFilters = {
            searchTerm: '',
            selectedCategory: null,
            selectedTags: [],
            selectedDifficulty: null,
            selectedResourceType: null,
          }
          break
      }
      
      setFilters(newFilters)
      applyFilters(newFilters)
    }

    window.addEventListener('filterChange', handleFilterChange as EventListener)
    return () => {
      window.removeEventListener('filterChange', handleFilterChange as EventListener)
    }
  }, [filters, resources])

  // Initialize filtered resources
  useEffect(() => {
    setFilteredResources(resources)
  }, [resources])

  return (
    <div>
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          All Resources
          <span className="text-sm font-normal text-gray-500 ml-2">
            ({filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'})
          </span>
        </h2>
      </div>

      {/* Resources Grid */}
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <ResourceCard 
              key={resource.id} 
              resource={resource} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
          <p className="text-gray-500">
            Try adjusting your filters or search terms to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  )
}