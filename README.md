# Creative Workspace

A Next.js application that lets you build and deploy websites using AI. Clean, fast, and mobile-friendly.

## What It Does

- Build websites by describing what you want
- Watch it generate in real-time (takes about 50 seconds)
- Deploy straight to the web
- Works great on mobile and desktop

## Getting Started
```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to see it.

## Project Structure
```
├── app/              Next.js pages and API routes
├── components/       Reusable React components
├── public/          Images, videos, static files
├── scripts/         Development and maintenance scripts
├── docs/            Project documentation
└── backups/         Backup files and patches
```

## Tech Stack

- Next.js 16 with Turbopack
- React with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Vercel for deployment

## Features

- Mobile navigation with hamburger menus
- Responsive design that works on all screen sizes
- Video backgrounds with fallbacks
- Settings dropdown on workspace page
- Testimonials section with smooth animations
- Comparison table showing pricing tiers

## Scripts

Check the `scripts/` folder for various utilities:
- `scripts/checks/` - Diagnostic scripts
- `scripts/fixes/` - Fix and enhancement scripts
- `scripts/deployment/` - Deployment helpers
- `scripts/testing/` - Testing utilities

## Environment Variables

Create a `.env.local` file with:
```
# Add your environment variables here
```

## Deployment

The project auto-deploys to Vercel when you push to the main branch. Manual deployment:
```bash
git add .
git commit -m "your message"
git push origin main
```

## Notes

- Build time is consistently around 50 seconds
- Mobile menus on both homepage and workspace
- All backups saved in `backups/` folder
- Documentation in `docs/` folder

---

Built with care. Organized for maintenance.
