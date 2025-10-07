# System Architecture Documentation

## Tech Stack

- **Framework**: Next.js 14.2.16 (React 18)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: Radix UI primitives with custom styling
- **Font**: Raleway (Google Fonts) with weights 400-800, Inter for navbar branding
- **Package Manager**: PNPM
- **Analytics**: Vercel Analytics
- **Build Tool**: Next.js built-in build system
- **CSS Preprocessor**: PostCSS 8.5

## Project Structure

```
d:\tranzmit-website\
├── app/                          # Next.js App Router directory
│   ├── book-demo/               # Demo booking page
│   │   └── page.tsx             # Demo booking form with radial gradient background
│   ├── globals.css              # Global CSS styles, Tailwind imports, custom theme variables
│   ├── layout.tsx               # Root layout component, Raleway font setup, metadata
│   └── page.tsx                 # Home page component, main entry point
├── components/                   # React components directory
│   ├── ui/                      # Reusable UI primitives (buttons, cards, etc.)
│   │   ├── button.tsx           # Button component with variants (primary, ghost, sizes)
│   │   ├── badge.tsx            # Badge/pill component for labels and statuses
│   │   ├── card.tsx             # Card container component with header/content/footer
│   │   └── [other-ui-components] # Additional UI primitives from Radix/shadcn
│   ├── compliance-badges.tsx    # Compliance/security badges section
│   ├── customer-logos.tsx       # Customer logo showcase section
│   ├── get-closer-customers-section.tsx # Customer relationship section
│   ├── header.tsx               # Navigation header (CENTERED branding, microphone icon, no nav links)
│   ├── hero-section.tsx         # Main hero section with product demo video and CTA
│   ├── more-than-words-section.tsx # Product feature section
│   ├── platform-section.tsx    # Platform overview section
│   ├── statistics-section.tsx  # Statistics and metrics display
│   ├── streamlined-research-section.tsx # Research process section
│   ├── testimonial-quote-section.tsx # Single testimonial quote
│   ├── testimonials-section.tsx # Multiple testimonials grid
│   ├── theme-provider.tsx       # Theme context provider for dark/light mode
│   └── use-cases-section.tsx    # Use cases and applications section
├── hooks/                       # Custom React hooks
│   ├── use-mobile.ts           # Mobile device detection hook
│   └── use-toast.ts            # Toast notification hook
├── lib/                         # Utility libraries
│   └── utils.ts                # Utility functions, class merging helpers
├── public/                      # Static assets
│   ├── *.jpg, *.png, *.svg     # Images for testimonials, placeholders, logos
│   └── [other-assets]          # Additional static resources
├── styles/                      # Additional stylesheets
│   └── globals.css             # Secondary global styles (mirrors app/globals.css)
├── components.json              # shadcn/ui configuration
├── next.config.mjs             # Next.js configuration
├── package.json                # Dependencies and scripts
├── postcss.config.mjs          # PostCSS configuration
├── tailwind.config.ts          # Tailwind CSS configuration (if exists)
└── tsconfig.json               # TypeScript configuration
```

## Component Architecture

### Layout Components
- **Header**: Centered navigation with microphone icon, Tranzmit branding, single CTA button
- **HeroSection**: Main landing section with product demo, heading "Get qualitative insights from your customers, at scale", and CTA button
- **Footer**: Compliance badges and footer content

### Content Sections
- **CustomerLogos**: Brand trust signals
- **TestimonialsSection**: Social proof grid layout
- **TestimonialQuoteSection**: Featured testimonial highlight
- **UseCasesSection**: Product application scenarios
- **PlatformSection**: Technical platform overview
- **StreamlinedResearchSection**: Process/workflow explanation
- **MoreThanWordsSection**: Additional features/benefits
- **StatisticsSection**: Key metrics and achievements
- **GetCloserCustomersSection**: Customer relationship benefits

### UI Primitives
Built on Radix UI with custom Tailwind styling:
- **Button**: Multiple variants (default, ghost, outline) and sizes
- **Badge**: Status indicators and labels
- **Card**: Container component with consistent styling
- **Form Components**: Inputs, selects, checkboxes, etc.
- **Layout Components**: Grids, containers, separators
- **Overlay Components**: Dialogs, tooltips, dropdowns

## Styling System

### Design Tokens
- **Colors**: Custom OKLCH color system with light/dark mode support
- **Typography**: Raleway font family for content, Inter font for navbar branding, bold weights for headings and CTAs
- **Spacing**: Tailwind's standard spacing scale
- **Borders**: Consistent radius (0.5rem default)
- **Shadows**: Subtle elevation with scroll-triggered navbar shadow

### Responsive Design
- Mobile-first approach using Tailwind breakpoints
- Adaptive layouts for sm/md/lg/xl screens
- Touch-friendly interactive elements

## Key Features

### Performance Optimizations
- Next.js Image optimization
- Font display swap for better loading
- Static generation where possible
- Bundle splitting and lazy loading

### User Experience
- Sticky navigation with scroll feedback
- Smooth scrolling and transitions
- Accessible component architecture
- Fast page loads with optimized assets

### Development Experience
- TypeScript for type safety
- Component composition patterns
- Consistent code organization
- Easy-to-extend UI system

## Build & Deployment

- **Development**: `npm run dev` (runs on port 3001 if 3000 occupied)
- **Build**: `npm run build` (Next.js static optimization)
- **Start**: `npm start` (production server)
- **Lint**: `npm run lint` (Next.js ESLint config)

## File Responsibilities

### Core Application Files
- `app/layout.tsx`: Application shell, font loading, metadata
- `app/page.tsx`: Homepage composition and routing
- `app/globals.css`: Design system, theme variables, base styles

### Component System
- `components/header.tsx`: Centered navigation with microphone icon, Tranzmit branding in blue Inter font, primary CTA
- `components/hero-section.tsx`: Product demo video with borders, main heading, CTA button, section divider
- `components/ui/*`: Reusable UI building blocks
- `components/[feature]-section.tsx`: Dedicated content sections

### Utilities & Configuration
- `lib/utils.ts`: Helper functions, class utilities
- `hooks/*`: Reusable state logic
- `*.config.*`: Build tool configurations
- `public/*`: Static asset serving

## Recent Modifications

1. **Complete Rebranding**: Changed from "Listen" to "Tranzmit" across entire website including all content, metadata, and branding
2. **Header Redesign**: 
   - Increased height from h-14 to h-20 for better prominence
   - Centered branding with glassy microphone icon
   - Removed navigation links (Customers, Resources, Careers) for single-page focus
   - Made "TRANZMIT" text blue (#2563eb) with Inter font and larger size (text-3xl)
   - Updated page padding from pt-14 to pt-20 to accommodate larger navbar
3. **Hero Section Overhaul**:
   - Changed main heading from "AI interviews reveal what people want, fast." to "Get qualitative insights from your customers, at scale"
   - Removed announcement bar for cleaner design
   - Increased heading font size (text-3xl to text-7xl responsive scaling)
   - Increased subheading size from text-lg to text-xl
   - Replaced dashboard mockup with actual product_demo.png image
   - Added thick black borders (8px) on three sides of video container
   - Added subtle section divider line
4. **Testimonials Section Enhancement**:
   - Increased card width from flex-based to fixed 624px width
   - Scaled all text sizes by 30% for better readability
   - Added black borders to category tags for improved contrast
   - Maintained aspect ratio and hover animations
5. **Use Cases Section Complete Redesign**:
   - Expanded grid container to max-w-screen-2xl for maximum width utilization
   - Rebuilt card architecture with element-specific padding (removed card padding)
   - Created large square icon panels (h-28 w-28) with rounded corners
   - Increased typography: headings to text-2xl, descriptions to text-lg
   - Enhanced section header: USE CASES text to text-lg, subtitle to text-xl
   - Added fade-in animations with staggered delays (100ms intervals)
   - Implemented hover effects: shadow-xl, translate-y, and scale transforms
   - Optimized card proportions: wider cards with better content distribution
6. **Book Demo Page**: Changed from linear gradient to radial gradient for more focused background
7. **Logo Integration**: Replaced circular "L" logo with SVG microphone icon with transparency fixes
8. **Layout Optimization**: Improved heading width utilization and spacing throughout

This architecture supports rapid development, consistent design, and scalable feature additions while maintaining excellent performance and user experience.
