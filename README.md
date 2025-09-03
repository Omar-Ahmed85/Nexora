# NEXORA - Your All-in-one AI Companion

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-purple.svg)](https://vitejs.dev/)
[![Deno](https://img.shields.io/badge/Deno-2.4.5-green.svg)](https://deno.com/)

NEXORA is a modern, full-stack AI chat application that provides a unified interface to multiple AI models. Built with TypeScript, Vite, and Deno, it offers a seamless experience for routing prompts to different AI providers with an elegant, responsive UI.

## ✨ Features

- **Multi-Model Support**: Access to 7 different AI models including GPT-5, Claude Haiku, Gemini, DeepSeek, and more
- **Real-time Streaming**: Experience smooth, real-time AI responses with streaming technology
- **Modern UI/UX**: Beautiful, responsive interface with dark/light theme support
- **Smart Prompt Routing**: Intelligent routing system that directs requests to appropriate AI models
- **Session Management**: Persistent chat sessions with local storage
- **TypeScript First**: Built entirely with TypeScript for type safety and better development experience
- **Cross-Platform**: Works on Windows, macOS, and Linux

## 🚀 Supported AI Models

| Model | Provider | Description |
|-------|----------|-------------|
| **GPT-5** | OpenAI | Latest GPT model with enhanced capabilities |
| **Claude Haiku 3.5** | Anthropic | Fast and efficient Claude model |
| **DeepSeek V3.1** | DeepSeek | Advanced reasoning and coding capabilities |
| **GPT-OSS-120B** | OpenAI | Open-source GPT model |
| **Gemini 2.5 Pro** | Google | Google's most capable AI model |
| **Gemini 2.5 Flash** | Google | Fast and efficient Gemini model |
| **Qwen3 Coder 480B** | Alibaba | Specialized coding and development model |

## 🏗️ Architecture

```
src/
├── client/                 # Frontend application
│   ├── app/               # Client-side logic
│   │   ├── main.ts        # Chat functionality
│   │   └── ui.ts          # UI interactions
│   ├── css/               # Styling with Tailwind CSS
│   ├── fonts/             # Custom fonts
│   └── index.html         # Main HTML template
├── server/                 # Backend server
│   ├── middleware/         # Request processing
│   ├── models/            # AI model integrations
│   ├── routes/            # API endpoints
│   └── services/          # Core services
└── types/                  # TypeScript type definitions
```

## 🛠️ Tech Stack

### Frontend
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Marked** - Markdown parsing for AI responses

### Backend
- **Deno** - Modern JavaScript runtime
- **Hono** - Fast web framework
- **AI SDK** - Unified AI provider interface

### AI Providers
- **OpenAI** - GPT models
- **Anthropic** - Claude models
- **Google** - Gemini models
- **DeepSeek** - Advanced AI models
- **Alibaba** - Qwen models

## 📦 Installation

### Prerequisites
- [Deno](https://deno.land/) (latest version)
- [Node.js](https://nodejs.org/) (v18+ for development)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Nexora
   ```

2. **Install dependencies**
   ```bash
   deno install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   GOOGLE_API_KEY=your_google_api_key_here
   OPENAI_API_KEY=your_openai_api_key_here
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   DEEPSEEK_API_KEY=your_deepseek_api_key_here
   ```

4. **Build the project**
   ```bash
   deno task build
   ```

## 🚀 Running the Application

### Development Mode
```bash
# Start the development server
deno task dev
```

### Production Mode
```bash
# Build and start production server
deno task build
deno task start
```

### Available Scripts
- `deno task build` - Build for production
- `deno task preview` - Preview production build
- `deno task start` - Start Hono server
- `deno task dev` - Start development server with Vite

## 🔧 Configuration

### Vite Configuration
The project uses Vite for frontend building with Tailwind CSS integration. Configuration is in `vite.config.ts`.

### Deno Configuration
Deno configuration is in `deno.json` with:
- Compiler options for DOM support
- Import maps for dependencies
- Formatting rules
- Task definitions

### TypeScript Configuration
TypeScript is configured in `tsconfig.json` with strict type checking and modern ES features.

## 🌐 API Endpoints

### Chat Endpoint
- **POST** `/chat` - Send messages to AI models
  - Request body: `{ model: string, messages: ModelMessage[] }`
  - Response: Streaming text response

## 🎨 UI Features

### Theme System
- **Light Mode** - Clean, bright interface
- **Dark Mode** - Easy on the eyes
- **System Default** - Automatically follows OS preference

### Interactive Elements
- **Typewriter Effect** - Animated welcome message
- **Default Prompts** - Quick-start conversation starters
- **Model Selection** - Easy switching between AI models
- **Real-time Streaming** - Live AI response display

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interface

## 🔒 Security

- Environment variable protection for API keys
- Input validation and sanitization
- Error handling without exposing sensitive information
- Secure static file serving

## 🚧 Development

### Project Structure
```
├── dist/                  # Built files
├── src/                   # Source code
│   ├── client/           # Frontend
│   ├── server/           # Backend
│   └── types/            # Type definitions
├── package.json          # Node.js dependencies
├── deno.json            # Deno configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

### Adding New AI Models
1. Create a new model file in `src/server/models/`
2. Implement the model interface
3. Add the model to `availableModels` in `src/server/services/main.ts`
4. Update the UI to include the new model

### Code Style
- TypeScript strict mode enabled
- Consistent formatting with Deno formatter
- Comprehensive error handling

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [Vercel AI SDK](https://sdk.vercel.ai/) for unified AI provider interface
- [Hono](https://hono.dev/) for the fast web framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Deno](https://deno.land/) for the modern JavaScript runtime

## 📞 Support

For support, questions, or feature requests:
- Open an issue on GitHub
- Check the documentation
- Review the code examples

---

**NEXORA** - Unify your AI stack. Route prompts with intent. Own the result.
