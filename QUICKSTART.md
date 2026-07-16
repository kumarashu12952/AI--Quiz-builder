# AI Quiz Builder - Quick Start Guide

## 🚀 Quick Start in 5 Minutes

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- MongoDB account (free at mongodb.com)
- OpenAI API key (get it from openai.com)

### Step 1: Clone the Repository
```bash
git clone https://github.com/kumarashu12952/AI--Quiz-builder.git
cd AI--Quiz-builder
```

### Step 2: Setup Backend
```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials
# MONGODB_URI=your_mongodb_uri
# OPENAI_API_KEY=your_openai_key
# JWT_SECRET=any_secret_string

# Start backend server
npm run dev
```

Backend will run on http://localhost:5000

### Step 3: Setup Frontend (in a new terminal)
```bash
cd frontend
npm install

# Create .env.local file
echo "VITE_API_URL=http://localhost:5000/api" > .env.local

# Start frontend
npm run dev
```

Frontend will run on http://localhost:5173

### Step 4: Access the Application
1. Open http://localhost:5173 in your browser
2. Register a new account
3. Create a quiz by clicking "Create Quiz"
4. Fill in the quiz details and let AI generate questions
5. Take the quiz and see your results!

## 🔑 Getting API Keys

### MongoDB
1. Go to mongodb.com and sign up
2. Create a new cluster
3. Go to "Connect" and copy your connection string
4. Add `MONGODB_URI` to `.env`

### OpenAI API Key
1. Go to openai.com/account/api-keys
2. Create a new API key
3. Copy and add to `.env` as `OPENAI_API_KEY`

## 📁 Project Structure

```
AI--Quiz-builder/
├── backend/          # Node.js/Express API
│  ├── routes/        # API endpoints
│  ├── models/        # MongoDB schemas
│  ├── middleware/    # Auth middleware
│  └── server.js      # Main server file
├── frontend/         # React app
│  ├── src/
│  │  ├── pages/      # React pages
│  │  ├── components/ # Reusable components
│  │  ├── api/        # API calls
│  │  └── App.jsx     # Main app
│  └── index.html     # Entry HTML
└── README.md
```

## 🏃 Features

### User Authentication
- Sign up with email
- Secure password storage
- JWT-based authentication

### Quiz Management
- Create quizzes with custom topics
- Set difficulty level (easy, medium, hard)
- Configure time limit
- Auto-generate questions with AI

### Taking Quizzes
- Interactive quiz interface
- Real-time timer
- Navigation between questions
- Immediate score calculation

### Results & Analytics
- View detailed results
- Track score history
- Performance analytics

## 🛠️ Common Commands

### Backend
```bash
cd backend

# Development
npm run dev

# Production
npm start

# Tests
npm test
```

### Frontend
```bash
cd frontend

# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🐛 Troubleshooting

### Backend won't start
- Check if port 5000 is available
- Verify MongoDB connection string in .env
- Ensure all dependencies are installed: `npm install`

### Frontend won't connect to backend
- Make sure backend is running on port 5000
- Check `VITE_API_URL` in frontend/.env.local
- Check browser console for CORS errors

### AI questions not generating
- Verify OpenAI API key is valid
- Check API key has credits/quota
- Check API errors in browser console

## 📚 Additional Resources

- [Full README](./README.md)
- [API Documentation](./API_DOCS.md)
- [Architecture Guide](./ARCHITECTURE.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Contributing Guide](./CONTRIBUTING.md)

## 💡 Tips

1. **Use Ctrl+C to stop servers**
2. **Keep .env files private** - never commit them
3. **Use meaningful quiz topics** for better AI-generated questions
4. **Set realistic time limits** for quizzes
5. **Test with a few questions first** before creating large quizzes

## 📞 Support

If you encounter issues:
1. Check the [troubleshooting](#-troubleshooting) section
2. Review the [API docs](./API_DOCS.md)
3. Check GitHub Issues
4. Create a new issue with details

## 🎉 Next Steps

- Customize the styling
- Add more question types
- Implement advanced features
- Deploy to production
- Share with others!

Happy learning! 📖
