import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  const userName = user ? JSON.parse(user).name : 'User';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-brand">
          📚 Quiz Builder
        </Link>
        <div className="navbar-menu">
          <Link to="/dashboard" className="nav-link">
            My Quizzes
          </Link>
          <Link to="/create-quiz" className="nav-link">
            Create Quiz
          </Link>
          <span className="nav-user">{userName}</span>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <style jsx>{`
        .navbar {
          background-color: #2c3e50;
          padding: 15px 0;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .navbar-brand {
          font-size: 24px;
          font-weight: bold;
          color: white;
          text-decoration: none;
        }
        .navbar-menu {
          display: flex;
          gap: 20px;
          align-items: center;
        }
        .nav-link {
          color: white;
          text-decoration: none;
          transition: color 0.3s;
        }
        .nav-link:hover {
          color: #3498db;
        }
        .nav-user {
          color: #ecf0f1;
          margin-right: 10px;
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
