import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-primary transition-colors">
              🚀 Tech Resource Directory
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              All Resources
            </Link>
            <Link 
              href="/#featured" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Featured
            </Link>
            <Link 
              href="/#categories" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Categories
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}