import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { quizzesAPI } from '../api/services';

function CreateQuiz() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [questionCount, setQuestionCount] = useState(5);
  const [timeLimit, setTimeLimit] = useState(30);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await quizzesAPI.create({
        title,
        description,
        topic,
        difficulty,
        questionCount,
        timeLimit,
      });

      // Generate questions using AI
      await quizzesAPI.generateQuestions(response.data.quiz._id, {
        topic,
        difficulty,
        count: questionCount,
      });

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create quiz');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="create-quiz-card">
          <h1>✨ Create New Quiz</h1>
          {error && <div className="alert alert-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Quiz Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., JavaScript Basics"
                required
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what this quiz is about"
                rows="3"
              />
            </div>
            <div className="form-group">
              <label>Topic:</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., JavaScript ES6 Features"
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Difficulty Level:</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div className="form-group">
                <label>Number of Questions:</label>
                <input
                  type="number"
                  value={questionCount}
                  onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                  min="1"
                  max="50"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Time Limit (minutes):</label>
              <input
                type="number"
                value={timeLimit}
                onChange={(e) => setTimeLimit(parseInt(e.target.value))}
                min="1"
                max="180"
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Creating Quiz...' : 'Create Quiz with AI'}
            </button>
          </form>
        </div>
      </div>
      <style jsx>{`
        .create-quiz-card {
          background: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          margin: 40px auto;
        }
        .create-quiz-card h1 {
          margin-bottom: 30px;
          color: #333;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        textarea {
          resize: vertical;
        }
      `}</style>
    </div>
  );
}

export default CreateQuiz;
