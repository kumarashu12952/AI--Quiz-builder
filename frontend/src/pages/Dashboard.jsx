import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { quizzesAPI } from '../api/services';

function Dashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await quizzesAPI.getMyQuizzes();
      setQuizzes(response.data);
    } catch (err) {
      setError('Failed to load quizzes');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        await quizzesAPI.delete(id);
        setQuizzes(quizzes.filter((q) => q._id !== id));
      } catch (err) {
        setError('Failed to delete quiz');
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>My Quizzes</h1>
        {error && <div className="alert alert-error">{error}</div>}
        {loading ? (
          <div className="loading">Loading quizzes...</div>
        ) : quizzes.length === 0 ? (
          <div className="card text-center">
            <p>No quizzes yet. Create one to get started!</p>
            <button
              className="btn btn-primary mt-20"
              onClick={() => navigate('/create-quiz')}
            >
              Create Quiz
            </button>
          </div>
        ) : (
          <div className="quizzes-grid">
            {quizzes.map((quiz) => (
              <div key={quiz._id} className="quiz-card">
                <h3>{quiz.title}</h3>
                <p>{quiz.description}</p>
                <div className="quiz-meta">
                  <span>📝 {quiz.questionCount} questions</span>
                  <span>⏱️ {quiz.timeLimit} min</span>
                  <span>📊 {quiz.difficulty}</span>
                </div>
                <div className="quiz-actions">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/quiz/${quiz._id}/take`)}
                  >
                    Take Quiz
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleDelete(quiz._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <button
          className="btn btn-primary mt-20"
          onClick={() => navigate('/create-quiz')}
        >
          ✨ Create New Quiz
        </button>
      </div>
      <style jsx>{`
        .quizzes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        .quiz-card {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .quiz-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        .quiz-card h3 {
          margin-bottom: 10px;
          color: #333;
        }
        .quiz-meta {
          display: flex;
          gap: 10px;
          margin: 15px 0;
          font-size: 14px;
          color: #666;
        }
        .quiz-actions {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }
        .quiz-actions button {
          flex: 1;
        }
      `}</style>
    </div>
  );
}

export default Dashboard;
