'use client'

import { Tag } from '@/types'

interface TagFilterProps {
  tags: Tag[]
  selectedTags: string[]
  onTagToggle: (tagId: string) => void
  onClearTags: () => void
}

export default function TagFilter({ 
  tags, 
  selectedTags, 
  onTagToggle, 
  onClearTags 
}: TagFilterProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Tags</h3>
        {selectedTags.length > 0 && (
          <button
            onClick={onClearTags}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear all
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag.id)
          return (
            <button
              key={tag.id}
              onClick={() => onTagToggle(tag.id)}
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                isSelected
                  ? 'text-white shadow-md transform scale-105'
                  : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
              }`}
              style={
                isSelected
                  ? { backgroundColor: tag.metadata.color || '#6B7280' }
                  : undefined
              }
            >
              {tag.metadata.name}
              {isSelected && (
                <svg
                  className="ml-1 w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          )
        })}
      </div>
      
      {selectedTags.length > 0 && (
        <div className="text-sm text-gray-600">
          {selectedTags.length} tag{selectedTags.length !== 1 ? 's' : ''} selected
        </div>
      )}
    </div>
  )
}