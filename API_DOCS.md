# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Endpoints

### Authentication

#### Register
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}

Response: 201 Created
{
  "message": "User registered successfully",
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}

Response: 200 OK
{
  "message": "Login successful",
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Quizzes

#### Get All Quizzes (Public)
```
GET /quizzes

Response: 200 OK
[
  {
    "_id": "quiz_id",
    "title": "JavaScript Basics",
    "description": "Test your JS knowledge",
    "topic": "JavaScript",
    "difficulty": "medium",
    "questionCount": 10,
    "timeLimit": 30,
    "creator": {
      "_id": "user_id",
      "name": "John Doe"
    },
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

#### Get My Quizzes
```
GET /quizzes/my-quizzes
Authorization: Bearer token

Response: 200 OK
[...same as above...]
```

#### Get Quiz by ID
```
GET /quizzes/:id

Response: 200 OK
{
  "_id": "quiz_id",
  "title": "JavaScript Basics",
  "description": "Test your JS knowledge",
  "topic": "JavaScript",
  "difficulty": "medium",
  "questionCount": 10,
  "timeLimit": 30,
  "questions": [...],
  "creator": {...},
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### Create Quiz
```
POST /quizzes
Authorization: Bearer token
Content-Type: application/json

{
  "title": "JavaScript Basics",
  "description": "Test your JS knowledge",
  "topic": "JavaScript ES6 Features",
  "difficulty": "medium",
  "questionCount": 10,
  "timeLimit": 30
}

Response: 201 Created
{
  "message": "Quiz created successfully",
  "quiz": {...}
}
```

#### Update Quiz
```
PUT /quizzes/:id
Authorization: Bearer token
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description"
}

Response: 200 OK
{
  "message": "Quiz updated successfully",
  "quiz": {...}
}
```

#### Delete Quiz
```
DELETE /quizzes/:id
Authorization: Bearer token

Response: 200 OK
{
  "message": "Quiz deleted successfully"
}
```

#### Generate Questions with AI
```
POST /quizzes/:id/generate-questions
Authorization: Bearer token
Content-Type: application/json

{
  "topic": "JavaScript ES6 Features",
  "difficulty": "medium",
  "count": 10
}

Response: 200 OK
{
  "message": "Questions generated successfully",
  "questions": [...],
  "quiz": {...}
}
```

### Questions

#### Get Questions for a Quiz
```
GET /questions/quiz/:quizId

Response: 200 OK
[
  {
    "_id": "question_id",
    "text": "What is a closure?",
    "type": "multiple_choice",
    "options": [
      {"text": "Option A", "isCorrect": true},
      {"text": "Option B", "isCorrect": false}
    ],
    "difficulty": "medium"
  }
]
```

#### Submit Quiz Answers
```
POST /questions/submit
Authorization: Bearer token
Content-Type: application/json

{
  "quizId": "quiz_id",
  "answers": [
    {
      "questionId": "question_id",
      "selected": "Option A"
    }
  ],
  "timeSpent": 1200
}

Response: 200 OK
{
  "message": "Quiz submitted successfully",
  "result": {
    "score": 8,
    "totalQuestions": 10,
    "percentage": "80.00",
    "timeSpent": 1200
  }
}
```

#### Get Quiz Results
```
GET /questions/results/:quizId
Authorization: Bearer token

Response: 200 OK
[
  {
    "_id": "result_id",
    "quiz": {...},
    "score": 8,
    "totalQuestions": 10,
    "percentage": 80,
    "timeSpent": 1200,
    "completedAt": "2024-01-01T00:00:00Z"
  }
]
```

## Error Responses

```json
{
  "error": "Error message here"
}
```

Common Status Codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Server Error
