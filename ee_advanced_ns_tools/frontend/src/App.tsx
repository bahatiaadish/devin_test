import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/styles/App.scss';

import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';

import LandingPage from './pages/dashboard/LandingPage';
import LoginPage from './pages/auth/LoginPage';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
    }
  }, []);
  
  return (
    <Router>
      <div className="app-container">
        <Header 
          isAuthenticated={isAuthenticated} 
          user={user} 
          setIsAuthenticated={setIsAuthenticated} 
          setUser={setUser} 
        />
        
        <div className="content-container">
          {isAuthenticated && <Sidebar user={user} />}
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route 
                path="/login" 
                element={
                  <LoginPage 
                    setIsAuthenticated={setIsAuthenticated} 
                    setUser={setUser} 
                  />
                } 
              />
              {/* Add more routes as needed */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
