# AI Quiz Builder

An intelligent online quiz generator that uses AI to create custom quizzes from any topic or document.

## Features

✨ **AI-Powered Quiz Generation** - Generate quiz questions using OpenAI GPT
👤 **User Authentication** - Secure user registration and login
📝 **Quiz Management** - Create, edit, and manage quizzes
🎯 **Quiz Taking** - Interactive quiz interface with instant feedback
📊 **Results & Analytics** - Track quiz history and performance
🎨 **Responsive UI** - Beautiful, mobile-friendly interface

## Tech Stack

### Frontend
- React 18+
- Vite
- Tailwind CSS
- Axios for API calls
- React Router

### Backend
- Node.js & Express
- MongoDB
- JWT Authentication
- OpenAI API
- dotenv for environment variables

## Project Structure

```
AI--Quiz-builder/
├── frontend/               # React application
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/                # Node.js/Express server
│   ├── models/             # MongoDB models
│   ├── routes/             # API endpoints
│   ├── controllers/        # Business logic
│   ├── middleware/         # Custom middleware
│   ├── config/             # Configuration files
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- MongoDB Atlas account
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kumarashu12952/AI--Quiz-builder.git
   cd AI--Quiz-builder
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
NODE_ENV=development
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:5000/api
```

## API Endpoints

### Auth
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Quizzes
- `GET /api/quizzes` - Get all quizzes
- `POST /api/quizzes` - Create new quiz
- `GET /api/quizzes/:id` - Get quiz details
- `PUT /api/quizzes/:id` - Update quiz
- `DELETE /api/quizzes/:id` - Delete quiz

### Questions
- `POST /api/quizzes/:id/generate` - Generate questions using AI
- `POST /api/quizzes/:id/submit` - Submit quiz answers

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT License

## Author

kumarashu12952
