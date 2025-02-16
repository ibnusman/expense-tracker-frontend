import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import financeImage from "../assets/images/finance.jpg";
import "/src/styles.css";


const LandingPage = () => {
  return (
    <Container className="landing-container">
      <Row className="mt-5 text-center">
        <Col>
          <h1>Welcome to Expense Tracker</h1>
          <p>Manage your expenses efficiently and achieve financial freedom.</p>
          <img src={financeImage} alt="Finance" className="landing-image" />
          <div className="mt-4">
            <Link to="/register">
              <Button variant="primary" className="me-3">Register</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline-primary">Login</Button>
            </Link>
          </div>
        </Col>
      </Row>
      <Row className="mt-5">
        <h2>Financial Advice</h2>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Track Your Spending</Card.Title>
              <Card.Text>Monitor your expenses to avoid unnecessary debt.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Set a Budget</Card.Title>
              <Card.Text>Allocate funds wisely to meet financial goals.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Save Regularly</Card.Title>
              <Card.Text>Ensure you have a financial cushion for emergencies.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
