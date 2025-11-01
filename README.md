<div align="center">

# 🌌 NEXORA

**Your All-in-One AI Companion**

*Unify your AI stack. Route prompts with intent. Own the result.*

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.12-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Deno](https://img.shields.io/badge/Deno-2.5.6-000000?style=for-the-badge&logo=deno&logoColor=white)](https://deno.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.16-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

---

## 🎯 Overview

NEXORA is a modern, full-stack AI chat application that provides seamless access to multiple AI models through a single, elegant interface. Built with cutting-edge technologies like TypeScript, Vite, Deno, and Tailwind CSS v4, NEXORA delivers real-time streaming responses with a beautiful, responsive UI that adapts to your preferences.

### Key Highlights

🤖 **7 AI Models** - Access GPT-5, Claude, Gemini, DeepSeek, and more from one place  
⚡ **Real-time Streaming** - Smooth, live AI responses with progressive rendering  
🎨 **Modern UI/UX** - Beautiful interface with light/dark themes  
🔐 **User Management** - Built-in authentication and user system  
🏗️ **Feature-Based Architecture** - Clean, modular, and maintainable codebase  
🚀 **Production Ready** - Optimized builds with Vite and Deno runtime

---

## 🤖 Supported AI Models

| Model | Provider | Best For | Token Limit |
|-------|----------|----------|-------------|
| **GPT-5** | Vercel AI Gateway | General tasks, conversation | 1024 |
| **Claude Haiku 3.5** | Vercel AI Gateway | Fast responses, efficiency | 1024 |
| **Gemini 2.5 Pro** | Google | Complex reasoning | 2048 |
| **Gemini 2.5 Flash** | Google | Speed and efficiency | 4096 |
| **DeepSeek V3.1** | NVIDIA NIM | Advanced reasoning, coding | 4096 |
| **GPT-OSS-120B** | NVIDIA NIM | Open-source alternative | 4096 |
| **Qwen3 Coder** | OpenRouter (Free) | Code generation, debugging | 4096 |

---

## 🏗️ Architecture

NEXORA follows a **feature-based architecture** for better organization and scalability:

```
nexora/
├── src/
│   ├── client/              # Frontend Application
│   │   ├── app/             # Core application logic
│   │   │   ├── main.ts      # Chat functionality & API integration
│   │   │   └── ui.ts        # UI state management & interactions
│   │   ├── css/             # Tailwind CSS styles
│   │   ├── fonts/           # Custom typography (Styrene B)
│   │   ├── public/          # Static assets (logo, images)
│   │   ├── index.html       # Main application entry
│   │   └── fallback.html    # 404 error page
│   │
│   ├── features/            # Feature Modules
│   │   ├── main/            # Chat Feature
│   │   │   ├── api/
│   │   │   │   ├── routes/chatRoute.ts      # Chat endpoint
│   │   │   │   └── middleware/chat.ts       # Request validation
│   │   │   ├── models/                       # AI Model Integrations
│   │   │   │   ├── gpt-5.ts
│   │   │   │   ├── haiku-3.5.ts
│   │   │   │   ├── gemini-2.5-pro.ts
│   │   │   │   ├── gemini-2.5-flash.ts
│   │   │   │   ├── deepseek-v3.1.ts
│   │   │   │   ├── gpt-oss.ts
│   │   │   │   └── qwen3-coder.ts
│   │   │   └── utils/modelHandler.ts        # Model routing logic
│   │   │
│   │   ├── users/           # User Management Feature
│   │   │   ├── api/
│   │   │   │   ├── controllers/controller.ts
│   │   │   │   └── routes/
│   │   │   │       ├── getUserRoute.ts
│   │   │   │       └── newUserRoute.ts
│   │   │   ├── database/                     # User data persistence
│   │   │   └── utils/                        # User-related utilities
│   │   │
│   │   └── chats/           # Chat History Feature
│   │       ├── api/                          # Chat history endpoints
│   │       ├── database/                     # Chat data persistence
│   │       └── utils/                        # Chat utilities
│   │
│   ├── utils/               # Shared Utilities
│   │   ├── main.ts          # Error handling, status codes
│   │   └── types.ts         # TypeScript type definitions
│   │
│   ├── auth/                # Authentication (placeholder)
│   │
│   └── server.ts            # Hono Server Entry Point
│
├── dist/                    # Production build output (generated)
├── node_modules/            # Dependencies (generated)
├── package.json             # NPM dependencies & scripts
├── deno.json               # Deno configuration & tasks
├── tsconfig.json           # TypeScript config (client only)
└── vite.config.ts          # Vite bundler configuration
```

---

## 🛠️ Technology Stack

### Frontend
- **[TypeScript](https://www.typescriptlang.org/)** `5.8.3` - Type-safe development
- **[Vite](https://vitejs.dev/)** `7.1.12` - Lightning-fast build tool & HMR
- **[Tailwind CSS](https://tailwindcss.com/)** `4.1.16` - Utility-first styling
- **[Marked](https://marked.js.org/)** `16.4.1` - Markdown rendering for AI responses

### Backend
- **[Deno](https://deno.com/)** `2.5.6` - Secure, modern JavaScript/TypeScript runtime
- **[Hono](https://hono.dev/)** `4.10.4` - Ultra-fast web framework
- **[Vercel AI SDK](https://sdk.vercel.ai/)** `5.0.86` - Unified AI provider interface

### AI Providers & Integrations
- **[Vercel AI SDK](https://sdk.vercel.ai/)** `5.0.86` - AI Gateway for GPT-5 and Claude models
- **[@ai-sdk/google](https://www.npmjs.com/package/@ai-sdk/google)** `2.0.26` - Google Gemini models
- **[@ai-sdk/openai-compatible](https://www.npmjs.com/package/@ai-sdk/openai-compatible)** `1.0.25` - NVIDIA NIM integration
- **[@openrouter/ai-sdk-provider](https://www.npmjs.com/package/@openrouter/ai-sdk-provider)** `1.2.0` - OpenRouter models

---

## 📦 Installation

### Prerequisites

Ensure you have the following installed:

- **[Deno](https://deno.land/)** v2.5.6 or later
- **[Node.js](https://nodejs.org/)** v18+ (for NPM package management)
- **API Keys** from:
  - [Vercel AI Gateway](https://sdk.vercel.ai/) (GPT-5, Claude Haiku)
  - [Google AI Studio](https://ai.google.dev/) (Gemini models)
  - [OpenRouter](https://openrouter.ai/) (Qwen3 Coder)
  - [NVIDIA NIM](https://build.nvidia.com/) (DeepSeek, GPT-OSS)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nexora.git
   cd nexora
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Required API Keys
   GOOGLE_API_KEY=your_google_ai_studio_key
   OPENROUTER_API_KEY=your_openrouter_key
   NVIDIA_API_KEY=your_nvidia_nim_key
   ```

4. **Build the frontend**
   ```bash
   npm run build
   # or
   deno task build
   ```

---

## 🚀 Usage

### Development Mode

Run the frontend and backend separately for hot-reloading:

```bash
# Terminal 1: Start Vite dev server (frontend)
npm run dev
# or
deno task dev

# Terminal 2: Start Hono server (backend)
deno task start:server
```

The app will be available at:
- **Frontend**: `http://localhost:5173` (Vite dev server)
- **Backend API**: `http://localhost:8000` (Deno server)

### Production Mode

Build and serve the optimized production bundle:

```bash
# Build frontend and start backend in one command
deno task start:full
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build frontend for production |
| `npm run preview` | Preview production build locally |
| `deno task dev` | Start Vite dev server (Deno alias) |
| `deno task build` | Build frontend (TypeScript + Vite) |
| `deno task preview` | Preview production build |
| `deno task start:server` | Start backend server with watch mode |
| `deno task start:full` | Build + start production server |

---

## 🌐 API Reference

### Chat Endpoint

**POST** `/chat`

Send messages to AI models and receive streaming responses.

**Request:**
```typescript
{
  model: string,           // One of: 'gpt-5', 'haiku-3.5', 'gemini-2.5-pro', etc.
  messages: ModelMessage[] // Array of { role: 'user' | 'assistant', content: string }
}
```

**Response:**  
Streaming text response (Server-Sent Events)

**Example:**
```javascript
const response = await fetch('/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'gemini-2.5-flash',
    messages: [{ role: 'user', content: 'Hello!' }]
  })
});

const reader = response.body.getReader();
// Handle streaming chunks...
```

### User Endpoints

**POST** `/users/new-user` - Create a new user account  
**GET** `/users/get-user` - Retrieve user information

---

## 🎨 Features

### Theme System

NEXORA automatically adapts to your system preferences:

- 🌞 **Light Mode** - Clean, bright interface
- 🌙 **Dark Mode** - Easy on the eyes for night work
- 🔄 **Auto-Switch** - Follows OS theme settings

Theme selection is persisted in `localStorage`.

### User Experience

✅ **Model Selection** - Dropdown to switch between 7 AI models  
✅ **Live Streaming** - Progressive text rendering with smooth animations  
✅ **Markdown Rendering** - Code blocks, lists, formatting support  
✅ **Error Notifications** - User-friendly success/error messages  
✅ **Responsive Design** - Mobile-first, works on all screen sizes  
✅ **Accessibility** - Semantic HTML, keyboard navigation

---

## 🔒 Security

- 🔐 **Environment Variables** - API keys never exposed to client
- ✅ **Input Validation** - Request sanitization in middleware
- 🚫 **Error Masking** - No sensitive info in error responses
- 🛡️ **Secure Headers** - Hono handles CORS and security headers
- 📁 **Static Serving** - Safe file serving from `dist/` directory

---

## 🧩 Extending NEXORA

### Adding a New AI Model

1. **Create model file**: `src/features/main/models/my-model.ts`
   ```typescript
   import { streamText, ModelMessage, smoothStream } from 'ai';
   import { ModelResponse } from '@@utils/types.ts';
   
   export default function runModel(messages: ModelMessage[]): ModelResponse {
     try {
       const response = streamText({
         model: 'provider/model-name',
         messages,
         experimental_transform: smoothStream(),
         maxOutputTokens: 2048
       });
       return { response: response.toTextStreamResponse() };
     } catch (error) {
       return { error: error as Error };
     }
   }
   ```

2. **Register model**: Update `src/features/main/utils/modelHandler.ts`
   ```typescript
   export const availableModels = [
     'gpt-5', 'haiku-3.5', 'my-model' // Add here
   ];
   ```

3. **Update UI**: Add option to model selector in frontend

4. **Add API Key**: Update `.env` with required credentials

---

## 🧪 Configuration Files

### `vite.config.ts`
- Tailwind CSS plugin integration
- Multi-page setup (`index.html`, `fallback.html`)
- Path aliases (`@@utils`)

### `deno.json`
- Compiler options for DOM support
- Import maps for JSR dependencies
- Code formatting rules (tabs, semicolons)

### `tsconfig.json`
- Strict type checking enabled
- Modern ES features (ESNext)
- Bundler module resolution
- Includes only `src/client` for frontend

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style

- Use **TypeScript** with strict mode
- Follow **Deno formatter** settings (tabs, semicolons)
- Write **descriptive commit messages**
- Add **comments for complex logic**

---

<div align="center">

**Built with ❤️ by the NEXORA Team**

*Unify your AI stack. Route prompts with intent. Own the result.*

</div>
