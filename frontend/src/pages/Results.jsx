import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { questionsAPI } from '../api/services';

function Results() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, [id]);

  const fetchResults = async () => {
    try {
      const response = await questionsAPI.getResults(id);
      setResults(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading results...</div>;

  const latestResult = results[0];
  if (!latestResult) return <div className="loading">No results found</div>;

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="results-card">
          <h1>🎉 Quiz Completed!</h1>
          <div className="score-display">
            <div className="score-circle">
              <div className="score-number">{latestResult.percentage.toFixed(0)}%</div>
              <div className="score-label">Score</div>
            </div>
            <div className="score-details">
              <p>
                <strong>Correct Answers:</strong> {latestResult.score}/{latestResult.totalQuestions}
              </p>
              <p>
                <strong>Time Spent:</strong> {Math.floor(latestResult.timeSpent / 60)}:{String(latestResult.timeSpent % 60).padStart(2, '0')}
              </p>
            </div>
          </div>

          <div className="results-history">
            <h2>All Attempts</h2>
            {results.map((result, index) => (
              <div key={index} className="result-item">
                <div className="result-info">
                  <span className="attempt">Attempt {results.length - index}</span>
                  <span className="date">{new Date(result.completedAt).toLocaleDateString()}</span>
                </div>
                <div className="result-score">
                  <span className="percentage">{result.percentage.toFixed(0)}%</span>
                  <span className="answers">({result.score}/{result.totalQuestions})</span>
                </div>
              </div>
            ))}
          </div>

          <div className="results-actions">
            <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .results-card {
          background: white;
          padding: 40px;
          border-radius: 10px;
          max-width: 600px;
          margin: 40px auto;
        }
        .results-card h1 {
          text-align: center;
          margin-bottom: 30px;
          color: #27ae60;
        }
        .score-display {
          display: flex;
          align-items: center;
          gap: 40px;
          margin-bottom: 40px;
          padding: 30px;
          background: #f8f9fa;
          border-radius: 10px;
        }
        .score-circle {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: white;
        }
        .score-number {
          font-size: 48px;
          font-weight: bold;
        }
        .score-label {
          font-size: 14px;
          margin-top: 5px;
        }
        .score-details p {
          margin: 10px 0;
          color: #333;
        }
        .results-history {
          margin-bottom: 30px;
        }
        .results-history h2 {
          margin-bottom: 15px;
          color: #333;
        }
        .result-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          border: 1px solid #ecf0f1;
          border-radius: 8px;
          margin-bottom: 10px;
        }
        .result-info {
          display: flex;
          gap: 20px;
          align-items: center;
        }
        .attempt {
          font-weight: bold;
          color: #333;
        }
        .date {
          color: #7f8c8d;
          font-size: 14px;
        }
        .result-score {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .percentage {
          font-size: 18px;
          font-weight: bold;
          color: #27ae60;
        }
        .answers {
          color: #7f8c8d;
          font-size: 14px;
        }
        .results-actions {
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default Results;
