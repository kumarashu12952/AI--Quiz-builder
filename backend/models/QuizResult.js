const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  answers: [{
    question: mongoose.Schema.Types.ObjectId,
    selectedAnswer: String,
    isCorrect: Boolean
  }],
  score: Number,
  totalQuestions: Number,
  percentage: Number,
  timeSpent: Number,
  completedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('QuizResult', quizResultSchema);
