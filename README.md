# Creative Workspace

> AI-powered website builder with real-time generation and instant deployment

A modern Next.js application that transforms ideas into live websites in under a minute. Built for speed, designed for simplicity.

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)

## Features

- **Fast Generation** - Build complete websites in ~50 seconds
- **Real-time Preview** - Watch your site come together live
- **Mobile First** - Responsive design that works everywhere
- **One-Click Deploy** - Push to production instantly
- **AI-Powered** - Describe what you want, get what you need

## Quick Start
```bash
# Clone the repository
git clone https://github.com/Sandy5688/my-creative-workspace.git
cd my-creative-workspace

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the app.

## Project Structure
```
my-creative-workspace/
├── app/                      # Next.js app directory
│   ├── api/                 # API routes
│   ├── workspace/           # Workspace page
│   └── page.tsx             # Homepage
├── components/              # React components
│   ├── home/               # Homepage components
│   └── workspace/          # Workspace components
├── public/                  # Static assets
│   ├── images/             # Image files
│   └── videos/             # Video backgrounds
├── scripts/                 # Development utilities
│   ├── checks/             # Diagnostic scripts
│   ├── fixes/              # Fix scripts
│   ├── deployment/         # Deploy helpers
│   └── testing/            # Test utilities
├── docs/                    # Documentation
├── backups/                 # Backup files
└── lib/                     # Utility functions
```

## Tech Stack

### Core
- **Next.js 16** - React framework with Turbopack
- **TypeScript** - Type-safe JavaScript
- **React 19** - UI library

### Styling
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons

### Development
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Turbopack** - Fast bundler

## Available Scripts
```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Start production server

# Utilities (in scripts/ folder)
./scripts/checks/*          # Run diagnostics
./scripts/fixes/*           # Apply fixes
./scripts/deployment/*      # Deploy helpers
```

## Key Components

### Homepage
- Hero section with animated video background
- Feature cards with hover effects
- Testimonials carousel
- Pricing comparison table
- Stats dashboard
- Mobile-responsive navigation

### Workspace
- Real-time website builder
- Settings panel with customization options
- Mobile navigation drawer
- Sign-in modal

## Configuration

### Environment Variables

Create a `.env.local` file:
```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=your_api_url
```

### Tailwind Configuration

The project uses a custom Tailwind setup with:
- Custom color palette
- Extended animations
- Responsive breakpoints
- Dark mode support

### TypeScript

Strict mode enabled with proper type checking across the entire codebase.

## Deployment

### Vercel (Recommended)

This project is optimized for Vercel deployment:

1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically on push
```bash
# Manual deployment
git add .
git commit -m "your changes"
git push origin main
```

### Other Platforms

Works with any Node.js hosting platform:
- Netlify
- Railway
- Render
- AWS Amplify

## Performance

- **Build Time**: ~50 seconds
- **Lighthouse Score**: 95+ on all metrics
- **Bundle Size**: Optimized with Turbopack
- **First Paint**: < 1 second

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Development Workflow

1. Create feature branch
2. Make changes
3. Test locally with `npm run dev`
4. Build with `npm run build`
5. Push to GitHub
6. Auto-deploy to production

## Folder Organization

The repository follows a clean, professional structure:

- **Core files** in root (configs only)
- **Scripts** organized by purpose
- **Documentation** centralized in `docs/`
- **Backups** kept in `backups/`

## API Routes

- `/api/create` - Generate new website
- `/api/update` - Update existing content
- `/api/publish` - Deploy to production
- `/api/checkout` - Handle payments

## Customization

### Styling
Edit `tailwind.config.ts` for custom theme values.

### Components
All components are in `components/` with clear naming.

### Pages
Add new pages in `app/` directory following Next.js 14+ conventions.

## Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Type Errors
```bash
# Regenerate types
npx tsc --noEmit
```

## Contributing

This is a client project, but the structure can be used as a template for similar applications.

## License

Private project - All rights reserved

## Maintenance

Scripts are organized in `scripts/` folder:
- Run checks before major changes
- Use deployment scripts for consistent deploys
- Keep backups in `backups/` folder

## Notes

- Mobile menus available on homepage and workspace
- Video backgrounds optimized for performance
- All forms have proper placeholder alignment
- Build time consistently around 50 seconds
- Settings dropdown includes sign-in option

---

**Built with Next.js** • **Styled with Tailwind** • **Deployed on Vercel**

For questions or issues, refer to documentation in `docs/` folder.
