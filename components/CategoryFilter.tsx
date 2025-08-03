'use client'

import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: string | null
  onCategoryChange: (categoryId: string | null) => void
}

export default function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: CategoryFilterProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium text-gray-900">Categories</h3>
      <div className="space-y-2">
        {/* All categories option */}
        <button
          onClick={() => onCategoryChange(null)}
          className={`flex items-center w-full px-3 py-2 text-left rounded-md transition-colors duration-200 ${
            selectedCategory === null
              ? 'bg-blue-100 text-blue-800 border border-blue-200'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <span className="mr-2">📂</span>
          All Categories
        </button>

        {/* Individual categories */}
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex items-center w-full px-3 py-2 text-left rounded-md transition-colors duration-200 ${
              selectedCategory === category.id
                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="mr-2">{category.metadata.icon}</span>
            {category.metadata.name}
          </button>
        ))}
      </div>
    </div>
  )
}