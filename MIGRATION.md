# Migration Guide: Vite to Next.js

This document outlines the changes made during the migration from a Vite + React SPA to Next.js 16 with the App Router.

## Overview

The original Vite-based project has been successfully converted to Next.js 16, maintaining all functionality while gaining server-side rendering capabilities and improved performance.

## Major Changes

### 1. Build System
- **Before**: Vite (`vite build`)
- **After**: Next.js (`next build`)
- **Benefits**: 
  - Server-side rendering (SSR)
  - Automatic code splitting
  - Optimized bundle size
  - API routes support

### 2. Project Structure
```
Before (Vite):
src/
├── App.tsx
├── main.tsx
├── components/
├── context/
├── assets/
└── index.css

After (Next.js):
app/
├── layout.tsx
├── page.tsx
components/
providers/
styles/
public/
```

### 3. Entry Point
- **Before**: `src/main.tsx` (React DOM root)
- **After**: `app/layout.tsx` (Next.js root layout)

### 4. Client Components
All interactive components now include the `'use client'` directive at the top, telling Next.js to render them on the client side:

```typescript
'use client';

import { useState } from 'react';

export default function MyComponent() {
  // Component code
}
```

### 5. Language Provider
The language context has been moved to `providers/language-provider.tsx` and includes:
- `'use client'` directive for client-side state management
- localStorage support for language persistence
- useLanguage hook export for easy consumption

### 6. Styling
- **Tailwind CSS**: Maintained from original project
- **Global CSS**: Moved to `styles/globals.css`
- **Configuration**: Updated `tailwind.config.js` to match Next.js content paths

### 7. Image Handling
- **Before**: Direct imports from `/src/assets/`
- **After**: Placeholder URLs in components (ready for actual image assets)
- **Future**: Can be upgraded to use Next.js `<Image>` component

## Component Migration Details

### Navbar Component
```typescript
// Before (Vite)
import logo from '../assets/logo.jpeg';

// After (Next.js)
<img src="/placeholder.svg?height=80&width=80" alt="Logo" />
```

All image imports have been converted to placeholder SVGs. To use actual images:
1. Add images to `/public` directory
2. Update image `src` attributes to `/image-name.ext`

### Context/Hooks
```typescript
// Before
import { useLanguage } from '../context/useLanguage';

// After
import { useLanguage } from '@/providers/language-provider';
```

## Configuration Files Updated

### package.json
- Replaced Vite scripts with Next.js scripts
- Updated dependencies to match Next.js ecosystem
- Removed Vite-specific plugins

### tailwind.config.js
- Updated content paths to match Next.js structure
- Maintained custom color extensions for brand colors

### tsconfig.json
- Converted to Next.js-compatible configuration
- Added path aliases (`@/*`)
- Enabled Next.js compiler plugins

### postcss.config.js
- Changed from ES module to CommonJS export
- Tailwind and autoprefixer configuration maintained

## Breaking Changes

1. **Hash-based routing**: Maintained for backward compatibility
   - Links still use hash navigation (`#home`, `#about`, etc.)
   - Next.js App Router routes not yet implemented

2. **Image assets**: Must be added to `/public` directory
   - Old assets in `src/assets/` are no longer accessible
   - Update all image paths to use `/public` URLs

3. **Import paths**: Use `@/` alias instead of relative imports
   ```typescript
   // Before
   import Navbar from './components/Navbar';
   
   // After
   import Navbar from '@/components/navbar';
   ```

## Installation & Running

### Development
```bash
npm install
npm run dev
```
Server runs on `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

## Environment Setup

No environment variables are required for basic functionality. The app uses hardcoded contact information.

To add environment variables in the future:
1. Create `.env.local` file in project root
2. Add variables with `NEXT_PUBLIC_` prefix for client-side access
3. Reference in components via `process.env.NEXT_PUBLIC_VARIABLE`

## Performance Improvements

1. **Automatic Code Splitting**: Each page loads only required code
2. **Image Optimization**: Ready to upgrade with `next/image`
3. **CSS-in-JS Elimination**: Pure Tailwind CSS
4. **Bundle Analysis**: Can run `next build --analyze` to visualize bundles

## Next Steps / Future Enhancements

- [ ] Add actual image assets to `/public`
- [ ] Update image components to use `next/image`
- [ ] Implement API routes for contact form submission
- [ ] Add sitemap.xml and robots.txt generation
- [ ] Implement dynamic imports for better code splitting
- [ ] Add service worker for offline support
- [ ] Set up proper error boundaries and error pages
- [ ] Add analytics integration

## Testing

The project is ready for testing:
1. Test all navigation links (smooth scroll to sections)
2. Test language switcher (ID/EN toggle)
3. Test responsive design on mobile, tablet, desktop
4. Test WhatsApp integration links
5. Test social media links

## Troubleshooting

### Components not updating after language change
- Ensure component imports `useLanguage` from `@/providers/language-provider`
- Confirm component is marked with `'use client'` directive

### Images not showing
- Check image paths start with `/` (from public directory)
- Ensure images are in `/public` folder
- Use placeholder URLs as fallback

### Styling issues
- Verify Tailwind classes are used correctly
- Check `tailwind.config.js` includes correct content paths
- Run `npm run build` to check for CSS errors

## Reverting to Vite (if needed)

If you need to revert to the Vite version:
1. The original source files are still in `src/` directory
2. Restore `package.json` scripts and dependencies
3. Remove `app/` and update imports back to `src/`

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router Guide](https://nextjs.org/docs/app)
- [Tailwind CSS with Next.js](https://tailwindcss.com/docs/guides/nextjs)

---

**Migration Date**: February 2025  
**Next.js Version**: 16.0.0  
**Original Project**: Vite + React + TypeScript
