
# Vertika - Vertical Video Streaming Platform

[![CI](https://github.com/your-username/vertika/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/vertika/actions/workflows/ci.yml)

A mobile-first vertical video streaming platform where creators upload episodic content and viewers consume them in an infinite swipeable feed.

## 🚀 Tech Stack

- **Framework**: Vite + React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React Context + TanStack Query
- **Animation**: Framer Motion
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Testing**: Jest + React Testing Library
- **CI/CD**: GitHub Actions

## 🏗️ Architecture

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── video/          # Video player components
│   ├── navigation/     # Navigation components
│   └── gestures/       # Gesture-based components
├── contexts/           # React contexts for global state
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries and configurations
├── pages/              # Route components
├── types/              # TypeScript type definitions
├── fixtures/           # Mock data for development
└── main.tsx           # Application entry point
```

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ and npm
- Firebase project (for production)

### Local Development

1. **Clone and install**:
   ```bash
   git clone <repository-url>
   cd vertika
   npm install
   ```

2. **Environment setup**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Firebase config
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Run tests**:
   ```bash
   npm test
   npm run test:watch  # Watch mode
   ```

5. **Build for production**:
   ```bash
   npm run build
   npm run preview     # Preview build locally
   ```

### Environment Variables

Create `.env.local` with your Firebase configuration:

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# Optional: Use Firebase Emulator for development
VITE_USE_EMULATOR=true
```

## 📱 Features

### Core Features
- **Vertical Video Feed**: Swipeable full-screen video player
- **Episode Management**: Organize content into series
- **Creator Profiles**: User profiles with content showcase
- **Continue Watching**: Resume episodes from where you left off
- **Discovery**: Browse content by genre and creator

### Planned Features
- **Upload Workflow**: Drag-and-drop video upload with compression
- **Live Comments**: Real-time episode comments
- **Social Features**: Follow creators, like episodes
- **Analytics**: Creator dashboard with viewership metrics

## 🎮 Usage

### Navigation
- **Swipe left/right**: Previous/next episode
- **Tap screen**: Show/hide video controls
- **Bottom tabs**: Navigate between Feed, Discover, Upload, Profile

### Video Controls
- Play/pause toggle
- Seek ±10 seconds
- Quality selector (240p-1080p)
- Speed control (0.5×-2×)
- Auto-hide after 3s inactivity

## 🧪 Testing

We use Jest and React Testing Library for testing:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Generate specific tests (with Cursor)
# Add @tests to your prompt when working on components
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push to main

### Manual Deployment
```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 💻 Cursor AI Workflow

This project is optimized for Cursor AI development:

1. **Auto-attached rules**: Frontend components automatically use style guidelines
2. **Agent-requested rules**: Use Firebase rules when working with backend code
3. **Manual rules**: Add `@tests` to prompts for test generation

### Cursor Rules Structure
- `00-architecture.mdc`: Project structure and constraints (always active)
- `10-frontend-style.mdc`: Component and styling guidelines (auto-attached)
- `20-firebase.mdc`: Backend integration patterns (agent-requested)
- `30-testing.mdc`: Testing guidelines (manual with `@tests`)

## 📊 Performance

Target metrics:
- **Lighthouse Score**: ≥90 on desktop and mobile
- **First Contentful Paint**: <2s on 4G
- **JavaScript Bundle**: <2MB compressed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'feat: add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Commit Convention
We use [Conventional Commits](https://conventionalcommits.org/):
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test additions or changes
- `chore`: Build process or auxiliary tool changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- [Documentation](https://docs.vertika.dev)
- [Discord Community](https://discord.gg/vertika)
- [GitHub Issues](https://github.com/your-username/vertika/issues)
