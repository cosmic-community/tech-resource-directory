import { Resource } from '@/types'
import ResourceCard from '@/components/ResourceCard'

interface FeaturedSectionProps {
  resources: Resource[]
}

export default function FeaturedSection({ resources }: FeaturedSectionProps) {
  if (!resources || resources.length === 0) {
    return null
  }

  return (
    <section id="featured" className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">⭐</span>
        <h2 className="text-2xl font-bold text-gray-900">Featured Resources</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.slice(0, 3).map((resource) => (
          <ResourceCard 
            key={resource.id} 
            resource={resource}
            className="ring-2 ring-yellow-200 bg-yellow-50"
          />
        ))}
      </div>
    </section>
  )
}