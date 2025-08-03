import { Resource } from '@/types'

interface ResourceCardProps {
  resource: Resource
  className?: string
}

export default function ResourceCard({ resource, className = '' }: ResourceCardProps) {
  const { metadata } = resource

  return (
    <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden ${className}`}>
      <div className="p-6">
        {/* Header with title and featured badge */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900 leading-tight">
            {metadata.name}
          </h3>
          {metadata.featured && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Featured
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {metadata.description}
        </p>

        {/* Category and resource type */}
        <div className="flex items-center gap-3 mb-4">
          {metadata.category && (
            <span className="inline-flex items-center gap-1 text-sm text-gray-700">
              <span>{metadata.category.metadata.icon}</span>
              {metadata.category.metadata.name}
            </span>
          )}
          {metadata.resource_type && (
            <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded">
              {metadata.resource_type.value}
            </span>
          )}
        </div>

        {/* Tags */}
        {metadata.tags && metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {metadata.tags.map((tag) => (
              <span
                key={tag.id}
                className="inline-block text-xs px-2 py-1 rounded-full text-white"
                style={{ backgroundColor: tag.metadata.color || '#6B7280' }}
              >
                {tag.metadata.name}
              </span>
            ))}
          </div>
        )}

        {/* Difficulty level */}
        {metadata.difficulty && (
          <div className="mb-4">
            <span className={`text-xs font-medium px-2 py-1 rounded ${
              metadata.difficulty.key === 'beginner' 
                ? 'bg-green-100 text-green-800'
                : metadata.difficulty.key === 'intermediate'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {metadata.difficulty.value}
            </span>
          </div>
        )}

        {/* Action button */}
        <a
          href={metadata.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Visit Resource
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  )
}