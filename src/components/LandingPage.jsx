import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import financeImage from "../assets/images/finance.jpg";
import "/src/styles.css";

const LandingPage = () => {
  return (
    <Container fluid className="landing-container text-center">
      {/* Hero Section */}
      <Row className="vh-100 align-items-center justify-content-center bg-light">
        <Col md={6}>
          <h1 className="display-4 fw-bold text-primary">
            Track Your Expenses, Gain Financial Freedom
          </h1>
          <p className="lead text-muted">
            Easily manage your spending and take control of your financial future.
          </p>
          <div className="mt-4">
            <Link to="/register">
              <Button variant="primary" className="me-3 px-4 py-2">Register</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline-primary" className="px-4 py-2">Login</Button>
            </Link>
          </div>
        </Col>
        <Col md={6} className="d-none d-md-block">
          <img src={financeImage} alt="Finance" className="img-fluid rounded shadow-lg" />
        </Col>
      </Row>

      {/* Features Section */}
      <Row className="py-5 bg-white">
        <h2 className="text-center mb-4">Why Choose Expense Tracker?</h2>
        <Col md={4} className="d-flex justify-content-center">
          <Card className="shadow-lg p-3" style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title className="text-primary">Track Your Spending</Card.Title>
              <Card.Text>Get a clear view of where your money is going and stay on top of your expenses.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="d-flex justify-content-center">
          <Card className="shadow-lg p-3" style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title className="text-primary">Set a Budget</Card.Title>
              <Card.Text>Plan your finances efficiently and avoid unnecessary expenses.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="d-flex justify-content-center">
          <Card className="shadow-lg p-3" style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title className="text-primary">Save Regularly</Card.Title>
              <Card.Text>Build financial security by developing a consistent saving habit.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
