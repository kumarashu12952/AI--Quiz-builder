const express = require('express');
const Question = require('../models/Question');
const Quiz = require('../models/Quiz');
const QuizResult = require('../models/QuizResult');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/quiz/:quizId', async (req, res) => {
  try {
    const questions = await Question.find({ quiz: req.params.quizId })
      .select('-correctAnswer -explanation');
    
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/submit', auth, async (req, res) => {
  try {
    const { quizId, answers, timeSpent } = req.body;

    const quiz = await Quiz.findById(quizId).populate('questions');

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    let score = 0;
    const processedAnswers = [];

    for (const answer of answers) {
      const question = await Question.findById(answer.questionId);
      
      if (question) {
        const isCorrect = 
          question.type === 'true_false' 
            ? answer.selected === question.correctAnswer
            : question.options.some(opt => 
                opt.text === answer.selected && opt.isCorrect
              );

        if (isCorrect) score++;

        processedAnswers.push({
          question: question._id,
          selectedAnswer: answer.selected,
          isCorrect
        });
      }
    }

    const totalQuestions = processedAnswers.length;
    const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

    const result = new QuizResult({
      quiz: quizId,
      user: req.userId,
      answers: processedAnswers,
      score,
      totalQuestions,
      percentage,
      timeSpent
    });

    await result.save();

    res.json({
      message: 'Quiz submitted successfully',
      result: {
        score,
        totalQuestions,
        percentage: percentage.toFixed(2),
        timeSpent
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/results/:quizId', auth, async (req, res) => {
  try {
    const results = await QuizResult.find({ 
      quiz: req.params.quizId,
      user: req.userId
    })
    .populate('quiz', 'title')
    .sort({ completedAt: -1 });

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
