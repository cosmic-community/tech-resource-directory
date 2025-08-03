'use client'

import { useState } from 'react'
import { Category, Tag, DifficultyLevel, ResourceType } from '@/types'
import SearchBar from '@/components/SearchBar'
import CategoryFilter from '@/components/CategoryFilter'
import TagFilter from '@/components/TagFilter'

interface FilterSectionProps {
  categories: Category[]
  tags: Tag[]
}

export default function FilterSection({ categories, tags }: FilterSectionProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | null>(null)
  const [selectedResourceType, setSelectedResourceType] = useState<ResourceType | null>(null)

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId)
    // Dispatch custom event to notify ResourceGrid
    window.dispatchEvent(new CustomEvent('filterChange', {
      detail: { 
        type: 'category', 
        value: categoryId 
      }
    }))
  }

  const handleTagToggle = (tagId: string) => {
    const newSelectedTags = selectedTags.includes(tagId)
      ? selectedTags.filter(id => id !== tagId)
      : [...selectedTags, tagId]
    
    setSelectedTags(newSelectedTags)
    window.dispatchEvent(new CustomEvent('filterChange', {
      detail: { 
        type: 'tags', 
        value: newSelectedTags 
      }
    }))
  }

  const handleSearchChange = (term: string) => {
    setSearchTerm(term)
    window.dispatchEvent(new CustomEvent('filterChange', {
      detail: { 
        type: 'search', 
        value: term 
      }
    }))
  }

  const handleDifficultyChange = (difficulty: DifficultyLevel | null) => {
    setSelectedDifficulty(difficulty)
    window.dispatchEvent(new CustomEvent('filterChange', {
      detail: { 
        type: 'difficulty', 
        value: difficulty 
      }
    }))
  }

  const handleResourceTypeChange = (resourceType: ResourceType | null) => {
    setSelectedResourceType(resourceType)
    window.dispatchEvent(new CustomEvent('filterChange', {
      detail: { 
        type: 'resourceType', 
        value: resourceType 
      }
    }))
  }

  const handleClearTags = () => {
    setSelectedTags([])
    window.dispatchEvent(new CustomEvent('filterChange', {
      detail: { 
        type: 'tags', 
        value: [] 
      }
    }))
  }

  const clearAllFilters = () => {
    setSearchTerm('')
    setSelectedCategory(null)
    setSelectedTags([])
    setSelectedDifficulty(null)
    setSelectedResourceType(null)
    window.dispatchEvent(new CustomEvent('filterChange', {
      detail: { 
        type: 'clear', 
        value: null 
      }
    }))
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          <button
            onClick={clearAllFilters}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Clear All
          </button>
        </div>

        <div className="space-y-6">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Resources
            </label>
            <SearchBar 
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              placeholder="Search by name or description..."
            />
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Category
            </label>
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>

          {/* Difficulty Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Difficulty Level
            </label>
            <div className="space-y-2">
              {(['beginner', 'intermediate', 'advanced'] as DifficultyLevel[]).map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => handleDifficultyChange(
                    selectedDifficulty === difficulty ? null : difficulty
                  )}
                  className={`filter-button w-full text-left ${
                    selectedDifficulty === difficulty 
                      ? 'filter-button-active' 
                      : 'filter-button-inactive'
                  }`}
                >
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Resource Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Resource Type
            </label>
            <div className="space-y-2">
              {(['tutorial', 'tool', 'library', 'article', 'course', 'documentation'] as ResourceType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => handleResourceTypeChange(
                    selectedResourceType === type ? null : type
                  )}
                  className={`filter-button w-full text-left ${
                    selectedResourceType === type 
                      ? 'filter-button-active' 
                      : 'filter-button-inactive'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Tags
            </label>
            <TagFilter
              tags={tags}
              selectedTags={selectedTags}
              onTagToggle={handleTagToggle}
              onClearTags={handleClearTags}
            />
          </div>
        </div>
      </div>
    </div>
  )
}