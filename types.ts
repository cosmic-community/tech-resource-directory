// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status: string;
  published_at: string;
  bucket: string;
  created_by: string;
  modified_by: string;
  thumbnail?: string;
}

// Resource object type
interface Resource extends CosmicObject {
  type: 'resources';
  metadata: {
    name: string;
    url: string;
    description: string;
    category?: Category;
    tags?: Tag[];
    difficulty?: {
      key: DifficultyLevel;
      value: string;
    };
    resource_type?: {
      key: ResourceType;
      value: string;
    };
    featured?: boolean;
  };
}

// Category object type
interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name: string;
    description?: string;
    icon?: string;
  };
}

// Tag object type
interface Tag extends CosmicObject {
  type: 'tags';
  metadata: {
    name: string;
    color?: string;
  };
}

// Type literals for select-dropdown values
type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
type ResourceType = 'tutorial' | 'tool' | 'library' | 'article' | 'course' | 'documentation';

// API response types
interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip?: number;
}

// Component prop types
interface ResourceCardProps {
  resource: Resource;
  className?: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

interface TagFilterProps {
  tags: Tag[];
  selectedTags: string[];
  onTagToggle: (tagId: string) => void;
}

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder?: string;
}

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

interface DifficultyBadgeProps {
  difficulty: DifficultyLevel;
  className?: string;
}

interface ResourceTypeBadgeProps {
  resourceType: ResourceType;
  className?: string;
}

// Type guards for runtime type checking
function isResource(obj: CosmicObject): obj is Resource {
  return obj.type === 'resources';
}

function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

function isTag(obj: CosmicObject): obj is Tag {
  return obj.type === 'tags';
}

// Utility types
type FilterState = {
  searchTerm: string;
  selectedCategory: string | null;
  selectedTags: string[];
  selectedDifficulty: DifficultyLevel | null;
  selectedResourceType: ResourceType | null;
};

export type {
  CosmicObject,
  Resource,
  Category,
  Tag,
  CosmicResponse,
  ResourceCardProps,
  CategoryFilterProps,
  TagFilterProps,
  SearchBarProps,
  FilterSectionProps,
  DifficultyBadgeProps,
  ResourceTypeBadgeProps,
  FilterState,
  DifficultyLevel,
  ResourceType
};

export {
  isResource,
  isCategory,
  isTag
};