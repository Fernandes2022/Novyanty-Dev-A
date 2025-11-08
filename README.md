# 🎨 Creative Workspace - AI-Powered Website Builder

A modern Next.js application for building websites with AI assistance. Features glass morphism design, smooth animations, and intelligent website generation.

## 🚀 Quick Start
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` to see the application.

## 📦 Tech Stack

- **Framework:** Next.js 16.0.0 (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS with custom utilities
- **Animations:** Framer Motion
- **Forms:** React Hook Form
- **Icons:** Lucide React

## 📄 Pages & Routes

### Public Pages
- `/` - Landing page with hero, features, pricing
- `/about` - About the service
- `/contact` - Contact form with API endpoint
- `/privacy` - Privacy policy (standalone)
- `/terms` - Terms of service (standalone)
- `/refund` - Refund policy
- `/faq` - Frequently asked questions
- `/workspace` - Website builder workspace

### API Endpoints
- `/api/contact` - Contact form submission
- `/api/create` - Create workspace stub
- `/api/checkout` - Payment processing
- `/api/publish` - Publish website
- `/api/update` - Update content

## 🎨 Design System

### CSS Variables (Tailwind Config)
```css
--bg-primary: Background color
--text-soft: Muted text color
--accent-primary: Primary accent (#7B5CFF)
--accent-secondary: Secondary accent (#00F5A0)
```

### Custom Utilities (globals.css)
- `.glass` - Glass morphism effect
- `.gradient-text` - Gradient text effect
- `.shimmer` - Shimmer animation

## 🧩 Component Structure
```
/app
  /contact          → Contact page components
  /privacy          → Privacy policy
  /refund           → Refund policy
  /terms            → Terms of service
  /api              → API routes
/components
  /home             → Homepage components
  /ui               → Reusable UI components (Button, Sheet, Toast, etc.)
/hooks              → Custom React hooks
/lib                → Utility functions
/types              → TypeScript type definitions
```

## 🔧 Key Features

### ✅ Completed Features
- TypeScript strict mode enabled
- Contact form with validation
- Glass morphism design system
- Framer Motion animations
- Social media links (Pinterest, Facebook, LinkedIn, Blog, TikTok, Instagram, X)
- Floating "Contact Us" button
- Standalone Privacy & Terms pages
- Refund policy page
- API endpoints for forms

### 🎯 Custom Hooks
- `useToast` - Toast notifications
- `usePayment` - Payment processing
- `useCompose` - AI content composition
- `useReducedMotion` - Accessibility for animations
- `useWorkspaceState` - Workspace state management

### 🎨 UI Components
- Button - Customizable button variants
- Sheet - Slide-out panels
- Toast - Notification system
- Panel - Content containers
- Textarea - Form inputs
- Select - Dropdown selects

## 📝 Environment Variables

Create a `.env.local` file:
```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=your_api_url
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Manual Build
```bash
npm run build
npm start
```

## 🔍 TypeScript

This project uses **strict mode** for TypeScript:
- All types must be explicitly defined
- Null checks required
- No implicit any types

## 📊 Project Stats

- **Total Routes:** 20
- **Components:** 30+
- **Hooks:** 10+
- **API Endpoints:** 7
- **Build Time:** ~10 seconds
- **TypeScript Errors:** 0

## 🤝 Contributing

This is a collaborative project. When contributing:

1. Create a feature branch
2. Run `npm run lint` before committing
3. Ensure `npm run build` passes
4. Test all pages locally
5. Update this README if adding new features

## 📱 Social Links

Connect with us:
- Pinterest
- Facebook
- LinkedIn
- Blog
- TikTok
- Instagram
- X (Twitter)

## 🐛 Known Issues

- Turbopack experimental warning (can be ignored)
- Next.config.js 'turbo' key warning (doesn't affect functionality)

## 📞 Support

For questions or issues:
- **Contact Page:** `/contact`
- **Email:** support@creativeworkspace.com

## 📄 License

© 2025 Creative Workspace. All rights reserved.

---

**Built with ❤️ by creators, for creators.**

---

## 🎉 Latest Updates (November 8, 2025)

### New Features Added
- ✨ Professional Contact page with animated form
- 🔐 Standalone Privacy Policy page
- 💸 Refund Policy page
- 🚀 Performance optimizations for mobile
- 📱 Added TikTok, Instagram, X to social links
- ⚡ All Contact CTAs now link to contact form

### Performance Improvements
- Reduced animation complexity
- Optimized for mobile devices
- Faster page transitions
- GPU acceleration enabled
- Respects user motion preferences

---

**Live Site:** https://my-creative-workspace.vercel.app/

**Last Updated:** November 8, 2025
