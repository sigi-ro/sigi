# Hero Sections Architecture - IllustratorDemo

## Problem Analysis
The mockup shows two distinct hero sections at the top of the homepage:
1. Left hero with figure/artwork
2. Right hero with figure/artwork

These sections need to be:
- Fully manageable from SIGI CMS
- Flexible in number (not hardcoded to 2)
- Customizable in all aspects (images, text, styling, layout)

## Architectural Solution

### 1. Template Field Structure

Create a **repeater field** called `hero-sections` in the Home Page template with the following sub-fields:

```
hero-sections (repeater)
├── background-image (image) - Main background image
├── foreground-image (image) - Optional overlay/figure image  
├── title (text) - Main heading
├── subtitle (textarea) - Supporting text
├── description (wysiwyg) - Rich text content
├── text-position (select) - left|center|right
├── text-vertical-position (select) - top|center|bottom
├── background-overlay-opacity (number) - 0-100
├── background-overlay-color (text) - hex color
├── text-color (text) - hex color for title
├── subtitle-color (text) - hex color for subtitle
├── min-height (select) - 50vh|75vh|100vh|custom
├── custom-height (text) - e.g., "600px"
├── show-scroll-indicator (checkbox)
├── cta-button-text (text) - Optional CTA button
├── cta-button-url (text) - CTA link
├── cta-button-style (select) - primary|secondary|ghost
└── section-order (number) - Display order
```

### 2. Frontend Component Architecture

```typescript
// components/HeroSection.tsx
interface HeroSectionProps {
  backgroundImage?: string
  foregroundImage?: string
  title?: string
  subtitle?: string
  description?: string
  textPosition: 'left' | 'center' | 'right'
  textVerticalPosition: 'top' | 'center' | 'bottom'
  overlayOpacity: number
  overlayColor?: string
  textColor?: string
  subtitleColor?: string
  minHeight: string
  showScrollIndicator: boolean
  ctaButton?: {
    text: string
    url: string
    style: 'primary' | 'secondary' | 'ghost'
  }
}
```

### 3. Database Schema Changes

**Add to `cms_template_fields` for home-page template:**

```sql
-- Parent repeater field
INSERT INTO cms_template_fields (template_id, name, slug, type, is_required, `order`)
VALUES 
  ((SELECT id FROM cms_templates WHERE slug = 'home-page'), 'Hero Sections', 'hero-sections', 'repeater', 0, 1);

-- Child fields (simplified - need to get parent repeater ID)
-- These would be inserted with proper parent_id references
```

### 4. SIGI Admin Interface

The admin will show:
- **Hero Sections** repeater with "Add Section" button
- Each section in a collapsible panel showing:
  - Image picker for background
  - Image picker for foreground/figure
  - Text inputs for content
  - Visual style controls (colors, positions)
  - Layout controls (height, alignment)
  - CTA button configuration
- Drag-and-drop reordering
- Preview thumbnails of each section

### 5. Frontend Rendering Logic

```typescript
// app/page.tsx
const heroSections = homePage.content['hero-sections']?.data || []

return (
  <div>
    {/* Render all hero sections */}
    {heroSections.map((section, index) => (
      <HeroSection
        key={index}
        {...section}
      />
    ))}
    
    {/* Rest of page content */}
    <section id="explore">...</section>
  </div>
)
```

### 6. Alternative Approach: Named Sections

If you prefer fixed sections instead of repeater:

```
hero-section-1-background (image)
hero-section-1-foreground (image)
hero-section-1-title (text)
hero-section-1-subtitle (textarea)
...
hero-section-2-background (image)
hero-section-2-foreground (image)
hero-section-2-title (text)
...
```

**Pros**: Simpler for non-technical users, fixed layout
**Cons**: Less flexible, requires code changes to add more sections

### 7. Recommended Approach: Hybrid

Use **Components** system in SIGI:

1. Create a "Hero Section" component template
2. Add a `hero-sections` component field to home-page template
3. Each component instance has all the settings
4. Allows reusability across pages
5. Provides maximum flexibility

## Implementation Plan

### Phase 1: Database Setup
1. Create component template for "Hero Section"
2. Add all necessary fields to component
3. Add component field to home-page template

### Phase 2: SIGI Admin
1. Verify component editor UI works
2. Test image picker integration
3. Add preview functionality

### Phase 3: Frontend
1. Create `HeroSection` React component
2. Update `app/page.tsx` to render components
3. Handle image URL conversion (relative → absolute)
4. Add responsive styles

### Phase 4: Testing
1. Create test hero sections in SIGI
2. Verify rendering on frontend
3. Test all configuration options
4. Mobile responsiveness check

## Benefits

✅ **Fully CMS-Controlled**: Every aspect manageable from SIGI
✅ **Flexible**: Add/remove/reorder sections easily
✅ **Reusable**: Component approach allows using on other pages
✅ **Type-Safe**: TypeScript interfaces for frontend
✅ **Scalable**: Easy to add new fields/options
✅ **User-Friendly**: Visual editor in SIGI admin
✅ **Performance**: Static generation with Next.js

## Questions to Resolve

1. Do you want repeater or fixed sections?
2. Should hero sections be page-specific or global components?
3. What's the maximum number of hero sections needed?
4. Do you need animation/transition options between sections?
5. Should sections support video backgrounds?

## Next Steps

1. Review this architecture
2. Decide on repeater vs. component approach
3. Create migration script for database changes
4. Implement SIGI backend changes
5. Build frontend component
6. Test and iterate
