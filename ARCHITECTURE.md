# Quiz Builder Architecture

## Project Structure

```
AI--Quiz-builder/
├── backend/
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── models/
│   │   ├── User.js            # User schema
│   │   ├── Quiz.js            # Quiz schema
│   │   ├── Question.js        # Question schema
│   │   └── QuizResult.js      # Quiz results schema
│   ├── routes/
│   │   ├── auth.js            # Auth endpoints
│   │   ├── quizzes.js         # Quiz endpoints
│   │   └── questions.js       # Question endpoints
│   ├── utils/
│   │   └── aiHelper.js        # AI integration helper
│   ├── server.js              # Express server setup
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── client.js      # Axios configuration
│   │   │   └── services.js    # API service functions
│   │   ├── components/
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── CreateQuiz.jsx
│   │   │   ├── TakeQuiz.jsx
│   │   │   └── Results.jsx
│   │   ├── App.jsx            # Main App component
│   │   ├── App.css            # Global styles
│   │   └── main.jsx           # React entry point
│   ├── index.html             # HTML template
│   ├── vite.config.js         # Vite configuration
│   └── package.json
├── README.md
├── DEPLOYMENT.md
├── CONTRIBUTING.md
└── API_DOCS.md
```

## Technology Stack

### Backend
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **AI Integration**: OpenAI API
- **Environment**: dotenv

### Frontend
- **Framework**: React 18
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Styling**: CSS (inline styles)

## Data Models

### User
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Quiz
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  topic: String,
  creator: ObjectId (ref: User),
  questions: [ObjectId] (ref: Question),
  difficulty: String (easy|medium|hard),
  questionCount: Number,
  timeLimit: Number (in minutes),
  isPublished: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Question
```javascript
{
  _id: ObjectId,
  quiz: ObjectId (ref: Quiz),
  text: String,
  type: String (multiple_choice|true_false|short_answer),
  options: [
    {
      text: String,
      isCorrect: Boolean
    }
  ],
  correctAnswer: String,
  explanation: String,
  difficulty: String,
  order: Number,
  createdAt: Date
}
```

### QuizResult
```javascript
{
  _id: ObjectId,
  quiz: ObjectId (ref: Quiz),
  user: ObjectId (ref: User),
  answers: [
    {
      question: ObjectId,
      selectedAnswer: String,
      isCorrect: Boolean
    }
  ],
  score: Number,
  totalQuestions: Number,
  percentage: Number,
  timeSpent: Number (in seconds),
  completedAt: Date
}
```

## Key Features

### 1. Authentication
- User registration and login
- JWT token-based authentication
- Secure password hashing with bcryptjs

### 2. Quiz Management
- Create, read, update, delete quizzes
- Set difficulty levels and time limits
- Track question counts

### 3. AI Question Generation
- Integrate with OpenAI API
- Generate questions based on topic and difficulty
- Create multiple choice questions automatically

### 4. Quiz Taking
- Interactive quiz interface
- Real-time timer
- Progress tracking
- Immediate feedback

### 5. Results & Analytics
- Calculate scores and percentages
- Track attempt history
- Performance metrics

## API Flow

### Quiz Creation Flow
1. User creates quiz (title, topic, difficulty)
2. Backend creates Quiz document
3. AI generates questions based on topic
4. Questions are saved and linked to quiz
5. Quiz ready for taking

### Quiz Taking Flow
1. User starts quiz (timer begins)
2. Questions displayed one by one
3. User answers each question
4. User submits quiz
5. Backend calculates score
6. Results saved to database
7. Results displayed to user

## Security Considerations

1. **Password Security**: Passwords hashed with bcryptjs (salt rounds: 10)
2. **JWT Tokens**: Expire after 7 days
3. **CORS**: Configured to accept requests from frontend
4. **Authorization**: Routes check user ownership before allowing updates/deletes
5. **Environment Variables**: Sensitive data stored in .env files

## Performance Optimization

1. **Database Indexing**: Indexes on email, creator, and quiz references
2. **Lazy Loading**: Components load only when needed
3. **API Caching**: Frontend stores quiz data temporarily
4. **Query Optimization**: Only fetch necessary fields
5. **Pagination Ready**: Can be added for large quiz collections

## Future Enhancements

1. **Analytics Dashboard**: Detailed performance metrics
2. **Leaderboards**: Competitive quiz taking
3. **Quiz Sharing**: Share quizzes with others
4. **Custom Validation**: Advanced question types
5. **Export/Import**: Backup quizzes as JSON
6. **Real-time Collaboration**: Multiple users creating quizzes
7. **Mobile App**: React Native version
8. **Advanced AI**: Support for more AI providers
