# Tech Resource Directory

![App Preview](https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=300&fit=crop&auto=format)

A comprehensive web development resource directory built with Next.js and Cosmic. Discover and explore curated development tools, tutorials, libraries, and educational content organized by categories and skill levels.

## ✨ Features

- **Smart Resource Filtering** - Filter by category, tags, difficulty level, and resource type
- **Featured Resources** - Highlight the most valuable resources
- **Color-Coded Tag System** - Visual organization with custom tag colors
- **Responsive Design** - Optimized for all screen sizes
- **Category Browse** - Explore resources by development focus areas
- **Direct Resource Links** - Quick access to external resources
- **Search Functionality** - Find resources quickly with text search
- **Difficulty Indicators** - Clear skill level markers for each resource

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=688f928d70106502cd8408cf&clone_repository=688faa182889898b399663ba)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> A directory for web development resources

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic** - Headless CMS for content management
- **React** - Component-based UI library

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Cosmic account and bucket

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd tech-resource-directory
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Set up environment variables:**
   
   The following environment variables will be automatically configured when you deploy this application:
   - `COSMIC_BUCKET_SLUG` - Your Cosmic bucket identifier
   - `COSMIC_READ_KEY` - Read access key for your bucket
   - `COSMIC_WRITE_KEY` - Write access key for content management

4. **Run the development server:**
   ```bash
   bun dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Cosmic SDK Examples

### Fetching Resources with Categories and Tags

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all resources with nested category and tag data
const resources = await cosmic.objects
  .find({ type: 'resources' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1) // Include connected objects
```

### Filtering Resources by Category

```typescript
// Get resources from a specific category
const frontendResources = await cosmic.objects
  .find({ 
    type: 'resources',
    'metadata.category': categoryId 
  })
  .depth(1)
```

### Getting Featured Resources

```typescript
// Get only featured resources
const featuredResources = await cosmic.objects
  .find({ 
    type: 'resources',
    'metadata.featured': true 
  })
  .depth(1)
```

## 🎨 Cosmic CMS Integration

This application integrates with three main Cosmic object types:

### Resources
- **Name** - Resource title
- **URL** - External link to the resource
- **Description** - Detailed resource description
- **Category** - Connected category object
- **Tags** - Array of connected tag objects
- **Difficulty Level** - Beginner, Intermediate, or Advanced
- **Resource Type** - Tutorial, Tool, Library, Article, Course, or Documentation
- **Featured** - Boolean to highlight important resources

### Categories
- **Name** - Category title
- **Description** - Category description
- **Icon** - Emoji icon for visual identification

### Tags
- **Name** - Tag title
- **Color** - Hex color code for visual styling

## 🚀 Deployment Options

### Deploy on Vercel (Recommended)

1. Push your code to a Git repository
2. Connect your repository to [Vercel](https://vercel.com)
3. Configure environment variables in the Vercel dashboard
4. Deploy automatically on every push

### Deploy on Netlify

1. Build the application: `bun run build`
2. Upload the `out` folder to [Netlify](https://netlify.com)
3. Configure environment variables in Netlify settings

### Environment Variables Setup

Set these variables in your deployment platform:

- `COSMIC_BUCKET_SLUG` - Your bucket slug from Cosmic
- `COSMIC_READ_KEY` - Your read key from Cosmic  
- `COSMIC_WRITE_KEY` - Your write key from Cosmic

Find these values in your Cosmic dashboard under Bucket Settings > API Access.

<!-- README_END -->