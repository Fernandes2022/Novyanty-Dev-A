# 🎨 Creative Workspace

**Build websites before your coffee cools ☕**

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-ff0055?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

## ✨ Features

### 🚀 Core Features
- **No Code Required** - Voice-powered and prompt-based interface
- **AI Adaptive Engine** - Real-time layout and color optimization
- **Instant Deploy** - One-click deployment with auto SSL & CDN
- **Team Collaboration** - Real-time sync workspace for multiple users
- **Lightning Fast** - Edge-optimized performance
- **Privacy First** - AES-256 encryption + GDPR compliant

### 🎭 User Experience
- **Beautiful Animations** - Framer Motion-powered smooth transitions
- **Theme Toggle** - Perfect dark/light mode with full page support
- **Audio Experience** - Piano music + female voiceover
- **Live Preview** - Real-time website generation
- **Chaos Mode** - Fun easter egg for wild designs
- **Mobile Optimized** - Perfect responsive design

### 🛠️ Technical Stack
- **Framework**: Next.js 16 with Turbopack
- **Styling**: Tailwind CSS + Custom Glass Morphism
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Audio**: Web Audio API + Web Speech API
- **TypeScript**: Full type safety

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/princeflexzy0/my-creative-workspace.git

# Navigate to project
cd my-creative-workspace

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app! 🎉

### Build for Production
```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 📁 Project Structure
```
my-creative-workspace/
├── app/
│   ├── components/          # Reusable React components
│   │   ├── AudioExperience.tsx   # Piano + voiceover player
│   │   ├── CursorTrail.tsx       # Animated cursor effect
│   │   ├── GlowLayer.tsx         # Background glow effects
│   │   ├── GradientDivider.tsx   # Section dividers
│   │   ├── LivePreviewGenerator.tsx  # Live website preview
│   │   ├── SoundManager.tsx      # Sound effects manager
│   │   ├── Tooltip.tsx           # Hover tooltips
│   │   └── VoiceNarrator.tsx     # Text-to-speech
│   ├── globals.css          # Global styles + theme system
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   └── theme-toggle.tsx     # Theme switcher component
├── public/
│   └── videos/              # Background videos
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🎨 Theme System

The app supports beautiful dark and light themes:
```tsx
// Toggle theme programmatically
document.documentElement.setAttribute('data-theme', 'light');
// or
document.documentElement.setAttribute('data-theme', 'dark');
```

### Theme Features
- ✅ Full page background color changes
- ✅ Automatic text contrast for readability
- ✅ Glass morphism effects adapt to theme
- ✅ All components theme-aware
- ✅ Smooth transitions between themes
- ✅ LocalStorage persistence

## 🎵 Audio Experience

The homepage includes a sensational audio experience:

- **Piano Music**: Emotional chord progression (Cmaj7-Am7-Fmaj7-G)
- **Heartbeat Bass**: 65Hz pulse for emotional impact
- **Female Voiceover**: Inspirational script about creativity
- **Controls**: Play/Pause and Mute/Unmute buttons
- **Visualizer**: 20-bar animated audio visualizer

## 📱 Responsive Design

Perfect text sizing across all devices:
```css
/* Hero text: 2rem - 5rem */
.text-hero { font-size: clamp(2rem, 5vw, 5rem); }

/* Section titles: 2rem - 3.5rem */
.text-section-title { font-size: clamp(2rem, 4vw, 3.5rem); }

/* Body text: 0.875rem - 1.125rem */
.text-body { font-size: clamp(0.875rem, 1.5vw, 1.125rem); }

/* Small text: 0.75rem - 0.875rem */
.text-small { font-size: clamp(0.75rem, 1.2vw, 0.875rem); }
```

## 🎯 Key Components

### AudioExperience
```tsx
import { AudioExperience } from './components/AudioExperience';

<AudioExperience />
```
Provides piano music, heartbeat bass, and female voiceover.

### LivePreviewGenerator
```tsx
import { LivePreviewGenerator } from './components/LivePreviewGenerator';

<LivePreviewGenerator input="Make a portfolio site" chaos={false} />
```
Generates live website previews based on text input.

### ThemeToggle
```tsx
import { ThemeToggle } from './theme-toggle';

<ThemeToggle />
```
Beautiful animated theme switcher (Sun/Moon icon).

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Other Platforms
The app is a standard Next.js app and can be deployed to:
- Netlify
- AWS Amplify
- Railway
- Render
- Any Node.js hosting

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to customize the color scheme:
```ts
theme: {
  extend: {
    colors: {
      primary: '#8b5cf6',  // Purple
      secondary: '#3b82f6', // Blue
      // Add your colors
    }
  }
}
```

### Animations
All animations use Framer Motion. Customize in components:
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
>
  Your content
</motion.div>
```

## 🐛 Troubleshooting

### Video not playing
- Check video files are in `/public/videos/`
- Ensure correct video format (MP4, H.264)
- Add `playsInline` attribute for iOS

### Audio not working
- Check browser supports Web Audio API
- Ensure user interaction before playing audio
- Check volume and mute settings

### Theme not persisting
- Clear browser cache
- Check LocalStorage is enabled
- Verify theme-toggle.tsx is imported correctly

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 💬 Support

- 📧 Email: support@creativeworkspace.com
- 🐦 Twitter: [@CreativeWorkspace](https://twitter.com)
- 💬 Discord: [Join our server](https://discord.gg/creativeworkspace)

## ⭐ Star History

If you find this project useful, please consider giving it a star ⭐

---

**Built with ❤️ by creators, for creators**

© 2025 Creative Workspace. All rights reserved.

# Trigger deploy

