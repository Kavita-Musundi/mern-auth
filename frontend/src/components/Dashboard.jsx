import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Welcome, {user?.name}!</h2>
                <div>
                  <Link to="/profile" className="btn btn-outline-primary me-2">
                    Profile
                  </Link>
                  <button onClick={handleLogout} className="btn btn-danger">
                    Logout
                  </button>
                </div>
              </div>
              <p>Email: {user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;