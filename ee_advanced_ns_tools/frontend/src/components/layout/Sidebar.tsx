import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface SidebarProps {
  user: User | null;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const location = useLocation();
  
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h5>Navigation</h5>
      </div>
      <Nav className="flex-column">
        <Nav.Link 
          as={Link} 
          to="/" 
          className={location.pathname === '/' ? 'active' : ''}
        >
          Dashboard
        </Nav.Link>
        <Nav.Link 
          as={Link} 
          to="/tools" 
          className={location.pathname.startsWith('/tools') ? 'active' : ''}
        >
          Tools
        </Nav.Link>
        <Nav.Link 
          as={Link} 
          to="/saved-results" 
          className={location.pathname.startsWith('/saved-results') ? 'active' : ''}
        >
          Saved Results
        </Nav.Link>
        <Nav.Link 
          as={Link} 
          to="/documentation" 
          className={location.pathname.startsWith('/documentation') ? 'active' : ''}
        >
          Documentation
        </Nav.Link>
        {user?.role === 'admin' && (
          <Nav.Link 
            as={Link} 
            to="/admin" 
            className={location.pathname.startsWith('/admin') ? 'active' : ''}
          >
            Admin
          </Nav.Link>
        )}
      </Nav>
    </div>
  );
};

export default Sidebar;
