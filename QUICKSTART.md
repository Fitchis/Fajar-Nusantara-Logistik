# Quick Start Guide

## Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   Navigate to `http://localhost:3000`

## Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Run production server |
| `npm run lint` | Run ESLint (if configured) |

## Project Layout

```
📦 Fajar Nusantara Logistik
├── 📁 app/
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── 📁 components/         # React components
│   ├── navbar.tsx
│   ├── hero.tsx
│   ├── services.tsx
│   ├── gallery.tsx
│   ├── clients.tsx
│   ├── testimonials.tsx
│   ├── footer.tsx
│   └── ...
├── 📁 providers/
│   └── language-provider.tsx  # Multi-language context
├── 📁 styles/
│   └── globals.css        # Global Tailwind styles
├── 📁 public/             # Static assets
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 next.config.ts
├── 📄 tailwind.config.js
└── 📄 README.md
```

## Key Features

✅ **Multi-language** - Switch between Indonesian and English  
✅ **Responsive** - Works on mobile, tablet, and desktop  
✅ **Fast Navigation** - Smooth scrolling to sections  
✅ **WhatsApp Integration** - Direct contact links  
✅ **Modern Tech Stack** - Next.js 16, React 19, Tailwind CSS  

## Using the Language Switcher

The language switcher appears in the top navigation. Click **ID** or **EN** to toggle between Indonesian and English. Your preference is saved in browser storage.

## Navigation

The website uses hash-based navigation:
- **Home** → `#home`
- **About** → `#about`
- **Services** → `#services`
- **Gallery** → `#gallery`
- **Clients** → `#clients`
- **Contact** → `#contact`

Click any menu item to smoothly scroll to that section.

## Contact Information

- **Phone**: 082156785580
- **Email**: fajarnusantaralogistik@gmail.com
- **Instagram**: @fn_logistik
- **WhatsApp**: [Chat Now](https://wa.me/6282156785580)

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `.next` folder. To test the production build locally:

```bash
npm run build
npm start
```

## Deploying to Vercel

The easiest way to deploy is to use [Vercel](https://vercel.com):

1. Push code to GitHub
2. Import repository in Vercel
3. Vercel automatically detects Next.js and deploys

## Common Tasks

### Adding a New Component

1. Create file in `/components/my-component.tsx`
2. Add `'use client'` at the top if it uses hooks
3. Import and use in `/app/page.tsx`

```typescript
'use client';

import { useState } from 'react';

export default function MyComponent() {
  return <div>Hello World</div>;
}
```

### Changing Colors

Edit `tailwind.config.js` to modify color scheme:

```javascript
theme: {
  extend: {
    colors: {
      brand: '#219cc8',
      'brand-dark': '#197b99',
    },
  },
}
```

### Adding Images

1. Place image in `/public` folder
2. Reference in component:
   ```jsx
   <img src="/image-name.png" alt="description" />
   ```

### Using the Language Context

```typescript
'use client';

import { useLanguage } from '@/providers/language-provider';

export default function MyComponent() {
  const { t, lang, setLang } = useLanguage();
  
  return <div>{t('home')}</div>;
}
```

## Performance Tips

- Images are optimized with placeholder SVGs
- Tailwind CSS is minified in production
- Code splitting happens automatically
- Unused CSS is removed automatically

## Support & Resources

- 📖 [Next.js Docs](https://nextjs.org/docs)
- 🎨 [Tailwind CSS](https://tailwindcss.com)
- 🦄 [Lucide Icons](https://lucide.dev)
- 📧 Contact: fajarnusantaralogistik@gmail.com

---

**Happy coding! 🚀**
