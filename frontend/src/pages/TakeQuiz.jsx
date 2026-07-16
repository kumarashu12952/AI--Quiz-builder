import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { quizzesAPI, questionsAPI } from '../api/services';

function TakeQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0) return;
    const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeRemaining]);

  const fetchQuiz = async () => {
    try {
      const quizResponse = await quizzesAPI.getById(id);
      setQuiz(quizResponse.data);
      setQuestions(quizResponse.data.questions);
      setTimeRemaining(quizResponse.data.timeLimit * 60);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (answer) => {
    setAnswers({
      ...answers,
      [questions[currentQuestion]._id]: answer,
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      alert('Please answer all questions before submitting');
      return;
    }

    const formattedAnswers = Object.entries(answers).map(([questionId, selected]) => ({
      questionId,
      selected,
    }));

    try {
      await questionsAPI.submit({
        quizId: id,
        answers: formattedAnswers,
        timeSpent: quiz.timeLimit * 60 - timeRemaining,
      });
      navigate(`/results/${id}`);
    } catch (err) {
      alert('Failed to submit quiz');
    }
  };

  if (loading) return <div className="loading">Loading quiz...</div>;
  if (!quiz || questions.length === 0) return <div className="loading">Quiz not found</div>;

  const question = questions[currentQuestion];
  const answered = answers[question._id] !== undefined;

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="quiz-container">
          <div className="quiz-header">
            <h2>{quiz.title}</h2>
            <div className="timer">
              ⏱️ {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, '0')}
            </div>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>

          <div className="question-card">
            <div className="question-number">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <h3>{question.text}</h3>

            <div className="options">
              {question.options.map((option, index) => (
                <label key={index} className="option">
                  <input
                    type="radio"
                    name="answer"
                    value={option.text}
                    checked={answers[question._id] === option.text}
                    onChange={() => handleAnswer(option.text)}
                  />
                  {option.text}
                </label>
              ))}
            </div>
          </div>

          <div className="quiz-actions">
            <button
              className="btn btn-secondary"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>
            <span className="answered-count">
              Answered: {Object.keys(answers).length}/{questions.length}
            </span>
            {currentQuestion === questions.length - 1 ? (
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={!answered}
              >
                Submit Quiz
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={handleNext}
                disabled={!answered}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .quiz-container {
          background: white;
          padding: 40px;
          border-radius: 10px;
          max-width: 800px;
          margin: 40px auto;
        }
        .quiz-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }
        .timer {
          font-size: 20px;
          font-weight: bold;
          color: #e74c3c;
        }
        .progress-bar {
          height: 8px;
          background: #ecf0f1;
          border-radius: 10px;
          margin-bottom: 30px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #667eea, #764ba2);
          transition: width 0.3s;
        }
        .question-card {
          margin-bottom: 30px;
        }
        .question-number {
          color: #7f8c8d;
          font-size: 14px;
          margin-bottom: 10px;
        }
        .options {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-top: 20px;
        }
        .option {
          display: flex;
          align-items: center;
          padding: 15px;
          border: 2px solid #ecf0f1;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .option:hover {
          border-color: #3498db;
          background: #f8f9fa;
        }
        .option input {
          margin-right: 10px;
          cursor: pointer;
        }
        .quiz-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }
        .answered-count {
          color: #7f8c8d;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}

export default TakeQuiz;
