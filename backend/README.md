# College Marketplace Backend

This is the backend API for the College Marketplace application.

## Features

- RESTful API built with Express.js
- MongoDB integration with Mongoose
- JWT authentication
- File upload support with Multer
- Input validation with express-validator
- Security headers with Helmet
- CORS enabled
- Request logging with Morgan

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration

4. Start development server:
```bash
npm run dev
```

## API Endpoints

### Base URL
- Development: `http://localhost:5000`

### Available Routes
- `GET /` - API information
- `GET /api/health` - Health check

### Future Endpoints (to be implemented)
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/books` - Get all books
- `POST /api/books` - Add new book
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Add new skill

## Project Structure

```
backend/
├── src/
│   ├── controllers/     # Route handlers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   ├── config/         # Configuration files
│   ├── utils/          # Utility functions
│   └── server.js       # Main server file
├── package.json
└── README.md
```

## Development

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier