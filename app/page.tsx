import { getResources, getCategories, getTags, getFeaturedResources } from '@/lib/cosmic'
import ResourceGrid from '@/components/ResourceGrid'
import FilterSection from '@/components/FilterSection'
import Header from '@/components/Header'
import FeaturedSection from '@/components/FeaturedSection'

export default async function HomePage() {
  // Fetch all data in parallel
  const [resources, categories, tags, featuredResources] = await Promise.all([
    getResources(),
    getCategories(),
    getTags(),
    getFeaturedResources()
  ])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Featured Resources Section */}
        {featuredResources.length > 0 && (
          <FeaturedSection resources={featuredResources} />
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <FilterSection 
              categories={categories}
              tags={tags}
            />
          </aside>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <ResourceGrid 
              resources={resources}
              categories={categories}
              tags={tags}
            />
          </div>
        </div>
      </main>
    </div>
  )
}