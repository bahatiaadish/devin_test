import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  
  return (
    <Container fluid className="p-0">
      <div className="landing-header">
        <Container>
          <h1>Welcome to EE Advanced N&S Tools</h1>
          <p className="lead">
            A comprehensive suite of tools for network and security classification,
            assessment, and visualization.
          </p>
          {!isAuthenticated && (
            <Button 
              variant="light" 
              size="lg" 
              onClick={() => navigate('/login')}
              className="mt-3"
            >
              Get Started
            </Button>
          )}
        </Container>
      </div>
      
      <Container className="py-4">
        {!isAuthenticated && (
          <Alert variant="info" className="mb-4">
            <Alert.Heading>Default Login Credentials</Alert.Heading>
            <p>
              Username: <strong>admin</strong><br />
              Password: <strong>password</strong>
            </p>
          </Alert>
        )}
        
        <section className="tool-hub mb-5">
          <h2 className="section-title">Tool Hub</h2>
          <p className="mb-4">
            The EE Advanced N&S Tools hub provides a centralized platform for accessing
            various network and security tools. New tools will be added to this hub as they
            are developed.
          </p>
          <Row className="placeholder-tools">
            <Col md={4} className="mb-4">
              <Card className="h-100 tool-card">
                <Card.Body>
                  <div className="tool-icon">
                    <i className="placeholder-icon"></i>
                  </div>
                  <Card.Title>Tool Placeholder 1</Card.Title>
                  <Card.Text>
                    This is a placeholder for a future tool that will be added to the hub.
                  </Card.Text>
                  <Button 
                    variant="outline-primary" 
                    disabled
                    className="mt-auto"
                  >
                    Coming Soon
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 tool-card">
                <Card.Body>
                  <div className="tool-icon">
                    <i className="placeholder-icon"></i>
                  </div>
                  <Card.Title>Tool Placeholder 2</Card.Title>
                  <Card.Text>
                    This is a placeholder for a future tool that will be added to the hub.
                  </Card.Text>
                  <Button 
                    variant="outline-primary" 
                    disabled
                    className="mt-auto"
                  >
                    Coming Soon
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 tool-card">
                <Card.Body>
                  <div className="tool-icon">
                    <i className="placeholder-icon"></i>
                  </div>
                  <Card.Title>Tool Placeholder 3</Card.Title>
                  <Card.Text>
                    This is a placeholder for a future tool that will be added to the hub.
                  </Card.Text>
                  <Button 
                    variant="outline-primary" 
                    disabled
                    className="mt-auto"
                  >
                    Coming Soon
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>
        
        <section className="getting-started mt-5">
          <h2 className="section-title">Getting Started</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Authentication</Card.Title>
                  <Card.Text>
                    Log in to access the full suite of tools and save your results.
                  </Card.Text>
                  <Button 
                    variant="primary"
                    onClick={() => navigate('/login')}
                    className="mt-auto"
                  >
                    {isAuthenticated ? 'Dashboard' : 'Login'}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Documentation</Card.Title>
                  <Card.Text>
                    Learn more about the tools and how to use them effectively.
                  </Card.Text>
                  <Button 
                    variant="secondary"
                    onClick={() => navigate('/documentation')}
                    className="mt-auto"
                  >
                    View Docs
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Saved Results</Card.Title>
                  <Card.Text>
                    Access your previously saved assessment results.
                  </Card.Text>
                  <Button 
                    variant="secondary"
                    onClick={() => navigate('/saved-results')}
                    className="mt-auto"
                  >
                    View Results
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>
        
        <section className="about-platform mt-5">
          <h2 className="section-title">About the Platform</h2>
          <Row>
            <Col md={6}>
              <h4>Modular Architecture</h4>
              <p>
                The EE Advanced N&S Tools platform is built with a modular architecture
                that allows for easy addition of new tools and features. Each tool is
                self-contained and can be developed independently.
              </p>
              <h4>Windows Server Compatible</h4>
              <p>
                The platform is designed to be compatible with Windows 10, 11, and Server 2019+
                environments, making it easy to deploy and use in your existing infrastructure.
              </p>
            </Col>
            <Col md={6}>
              <h4>Secure Authentication</h4>
              <p>
                User-based authentication ensures that only authorized users can access
                the tools and their results. Role-based access control provides additional
                security for administrative functions.
              </p>
              <h4>Extensible Design</h4>
              <p>
                The platform's extensible design allows for the addition of new tools
                and features without requiring changes to the core architecture. This
                makes it easy to adapt to changing requirements.
              </p>
            </Col>
          </Row>
        </section>
      </Container>
    </Container>
  );
};

export default LandingPage;
