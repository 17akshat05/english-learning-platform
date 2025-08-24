# English Learning Platform 🎓

A comprehensive English learning website that helps users master English from basic to advanced levels through interactive lessons, daily vocabulary, and speaking practice.

## ✨ Features

### 🗓️ Daily Words
- **5 Random Words Daily**: New vocabulary words every day with meanings, examples, and pronunciation
- **Interactive Learning**: Audio pronunciation, favorites, and sharing capabilities
- **Rich Definitions**: Complete word information including etymology and usage examples
- **Progress Tracking**: Track your vocabulary learning journey

### 🎤 Speaking Practice
- **Voice Recognition**: Real-time speech recognition for pronunciation practice
- **Interactive Exercises**: Practice speaking with guided exercises
- **Instant Feedback**: Get immediate feedback on your pronunciation
- **Progress Monitoring**: Track your speaking accuracy and improvement

### 📚 Learning Modules
- **Structured Curriculum**: Organized lessons from beginner to advanced levels
- **Multiple Categories**: Grammar, business English, academic writing, and more
- **Interactive Content**: Engaging lessons with practical examples
- **Progress Tracking**: Monitor your learning progress across modules

### 📊 Progress Tracker
- **Comprehensive Stats**: View your learning statistics and achievements
- **Achievement System**: Unlock badges and rewards as you progress
- **Weekly Activity**: Track your daily learning activities
- **Goal Setting**: Set and monitor your learning goals

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd english-learning-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **APIs**: 
  - Free Dictionary API (https://dictionaryapi.dev/)
  - Random Word API (https://random-word-api.herokuapp.com/)
  - Web Speech API (built-in browser API)

## 📁 Project Structure

```
english-learning-website/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── DailyWords.tsx     # Daily vocabulary component
│   ├── SpeakingPractice.tsx # Speaking exercises
│   ├── LearningModules.tsx # Course modules
│   ├── ProgressTracker.tsx # Progress tracking
│   └── Footer.tsx         # Site footer
├── utils/                 # Utility functions
│   └── api.ts            # API utilities and helpers
├── public/               # Static assets
└── package.json          # Dependencies and scripts
```

## 🎯 Key Features Explained

### Daily Words System
- Uses free APIs to fetch random words and their definitions
- Implements date-based consistency (same words for same date)
- Includes audio pronunciation and phonetic transcriptions
- Allows users to favorite and share words

### Speaking Practice
- Leverages Web Speech API for voice recognition
- Provides real-time feedback on pronunciation
- Includes difficulty levels and categories
- Tracks accuracy and provides improvement tips

### Learning Modules
- Structured curriculum with clear progression paths
- Interactive content with practical examples
- Achievement system to motivate learning
- Progress tracking across different skill areas

### Progress Tracking
- Comprehensive statistics dashboard
- Achievement badges and rewards
- Weekly activity visualization
- Goal setting and monitoring

## 🌐 Free APIs Used

1. **Free Dictionary API** (https://dictionaryapi.dev/)
   - Provides word definitions, pronunciations, and etymologies
   - No API key required
   - Rate limited but sufficient for learning purposes

2. **Random Word API** (https://random-word-api.herokuapp.com/)
   - Generates random English words
   - Configurable word length and count
   - No authentication required

3. **Web Speech API**
   - Built-in browser API for text-to-speech and speech recognition
   - No external dependencies
   - Works in modern browsers

## 🎨 Design Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Accessibility**: WCAG compliant with proper contrast and keyboard navigation
- **Dark Mode Ready**: Prepared for future dark mode implementation
- **Performance Optimized**: Fast loading with optimized images and code splitting

## 📱 Browser Support

- Chrome 66+
- Firefox 60+
- Safari 12+
- Edge 79+

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel with automatic deployments
```

### Netlify
```bash
npm run build
# Deploy the 'out' directory to Netlify
```

### Other Platforms
The app can be deployed to any platform that supports Next.js applications.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Free Dictionary API](https://dictionaryapi.dev/) for word definitions
- [Random Word API](https://random-word-api.herokuapp.com/) for vocabulary generation
- [Lucide React](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact us.

---

**Happy Learning! 🎓✨** 