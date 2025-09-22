# College Marketplace

A full-stack college marketplace application for books and skills sharing.

## Project Structure

```
college-marketplace/
├── frontend/           # React frontend application
│   ├── src/           # Frontend source code
│   ├── public/        # Static assets
│   ├── package.json   # Frontend dependencies
│   └── ...
├── backend/           # Express.js backend API
│   ├── src/           # Backend source code
│   ├── package.json   # Backend dependencies
│   └── ...
├── package.json       # Root workspace configuration
└── README.md
```

## Getting Started

### Root Commands (Recommended)

```sh
# Install dependencies for both frontend and backend
npm install

# Start frontend development server
npm run dev

# Start both frontend and backend in parallel
npm run dev:all

# Run tests for frontend
npm run test

# Build frontend for production
npm run build
```

### Individual Commands

```sh
# Frontend only
npm run dev:frontend
npm run build:frontend
npm run test:frontend

# Backend only
npm run dev:backend
npm run build:backend
npm run test:backend
```

## Technology Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **Vite 7** - Lightning fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework with custom design tokens
- **Framer Motion** - Production-ready motion library for React
- **react-three-fiber + drei** - 3D graphics and animations
- **React Router 6** - Declarative routing
- **Zustand** - Lightweight state management
- **React Query + Axios** - Server state management and API calls
- **Vitest + React Testing Library** - Modern testing framework

### Backend
- **Express.js** - Fast, minimalist web framework
- **MongoDB + Mongoose** - NoSQL database with ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security middleware
- **CORS** - Cross-Origin Resource Sharing
- **Morgan** - HTTP request logging
- **Multer** - File upload handling

### Development Tools
- **ESLint + Prettier** - Code linting and formatting
- **Nodemon** - Auto-restart development server
- **Jest + Supertest** - Backend testing framework
- **npm workspaces** - Monorepo management

## Features

### Current Implementation
- ✅ Modern React frontend with 3D hero animations
- ✅ Beautiful landing page with Framer Motion animations
- ✅ Dark/Light theme system with Zustand
- ✅ Responsive design with Tailwind CSS
- ✅ Complete testing setup with Vitest
- ✅ Production-ready build system
- ✅ Express.js backend foundation
- ✅ Organized monorepo structure

### Planned Features
- 📚 **Books Marketplace** - Buy, sell, and exchange textbooks
- 🎯 **Skills Exchange** - Offer and request tutoring/skills
- 👤 **User Profiles** - Student profiles with ratings and reviews
- 🔍 **Advanced Search** - Filter by price, condition, subject, location
- 💬 **Messaging System** - In-app communication between users
- 📱 **Mobile Responsive** - Optimized for all devices
- 🔐 **Authentication** - Secure user registration and login
- 📊 **Analytics Dashboard** - Track your listings and transactions

## Development

### Prerequisites
- Node.js 18+ 
- npm 9+
- MongoDB (for backend development)

### Setup Instructions

1. **Clone the repository**
```sh
git clone <repository-url>
cd college-marketplace
```

2. **Install dependencies**
```sh
npm install
```

3. **Set up environment variables**
```sh
# Backend environment
cp backend/.env.example backend/.env
# Edit backend/.env with your configuration
```

4. **Start development servers**
```sh
# Start both frontend and backend
npm run dev:all

# Or start individually
npm run dev:frontend  # Frontend only (http://localhost:5173)
npm run dev:backend   # Backend only (http://localhost:5000)
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
