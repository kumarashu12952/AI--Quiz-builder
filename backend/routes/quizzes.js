const express = require('express');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const auth = require('../middleware/auth');
const { generateQuestionsWithAI } = require('../utils/aiHelper');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find({ isPublished: true })
      .populate('creator', 'name')
      .sort({ createdAt: -1 });
    
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/my-quizzes', auth, async (req, res) => {
  try {
    const quizzes = await Quiz.find({ creator: req.userId })
      .populate('questions')
      .sort({ createdAt: -1 });
    
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate('creator', 'name')
      .populate('questions');
    
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { title, description, topic, difficulty, questionCount, timeLimit } = req.body;

    const quiz = new Quiz({
      title,
      description,
      topic,
      difficulty: difficulty || 'medium',
      timeLimit: timeLimit || 30,
      creator: req.userId,
      questionCount: questionCount || 0
    });

    await quiz.save();

    res.status(201).json({
      message: 'Quiz created successfully',
      quiz
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    let quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    if (quiz.creator.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized to update this quiz' });
    }

    quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Quiz updated successfully',
      quiz
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    if (quiz.creator.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized to delete this quiz' });
    }

    await Question.deleteMany({ quiz: req.params.id });
    await Quiz.findByIdAndDelete(req.params.id);

    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:id/generate-questions', auth, async (req, res) => {
  try {
    const { topic, difficulty, count } = req.body;
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    if (quiz.creator.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const questions = await generateQuestionsWithAI(topic, difficulty, count);

    const savedQuestions = [];
    for (const q of questions) {
      const question = new Question({
        quiz: quiz._id,
        text: q.text,
        type: q.type,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        difficulty: q.difficulty
      });
      await question.save();
      savedQuestions.push(question);
      quiz.questions.push(question._id);
    }

    quiz.questionCount = quiz.questions.length;
    await quiz.save();

    res.json({
      message: 'Questions generated successfully',
      questions: savedQuestions,
      quiz
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
