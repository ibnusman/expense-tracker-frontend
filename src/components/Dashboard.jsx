import React, { useEffect, useState } from "react";
import { Table, Button, Form, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";
import "/src/styles.css";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");
  const [receipt, setReceipt] = useState(null);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch Expenses
  useEffect(() => {
    const fetchExpenses = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${API_BASE_URL}/expenses`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch expenses");

        setExpenses(data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  // Add Expense
  const handleAddExpense = async () => {
    if (!description || !amount) {
      setError("Please fill all fields");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("description", description);
    formData.append("amount", amount);
    formData.append("category", category);
    if (receipt) formData.append("receipt", receipt);

    try {
      const response = await fetch(`${API_BASE_URL}/expenses`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to add expense");

      setExpenses([...expenses, data]); // Append new expense to the list
      setDescription("");
      setAmount("");
      setReceipt(null);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete Expense
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to delete expense");

      // Remove only the deleted expense
      setExpenses((prevExpenses) => prevExpenses.filter((exp) => exp._id !== id));
    } catch (err) {
      setError("Failed to delete expense");
    }
  };

  return (
    <Container>
      <h2>Expense Tracker</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Amount</Form.Label>
          <Form.Control type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="food">Food</option>
            <option value="transportation">Transportation</option>
            <option value="rent">Rent</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Upload Receipt</Form.Label>
          <Form.Control type="file" onChange={(e) => setReceipt(e.target.files[0])} />
        </Form.Group>
        <Button onClick={handleAddExpense} className="mt-3">Add Expense</Button>
      </Form>

      <Form.Group className="mt-4">
        <Form.Label>Filter by Category</Form.Label>
        <Form.Select onChange={(e) => setFilter(e.target.value)}>
          <option value="">All</option>
          <option value="food">Food</option>
          <option value="transportation">Transportation</option>
          <option value="rent">Rent</option>
        </Form.Select>
      </Form.Group>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Receipt</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses
            .filter((exp) => !filter || exp.category === filter)
            .map((exp) => (
              <tr key={exp._id}>
                <td>{exp.description}</td>
                <td>${exp.amount}</td>
                <td>{exp.category}</td>
                <td>
                  {exp.receipt_url ? (
                    <a href={`${API_BASE_URL}/${exp.receipt_url}`} target="_blank" rel="noopener noreferrer">
                      <img src={`${API_BASE_URL}/${exp.receipt_url}`} alt="Receipt" style={{ width: "50px", height: "50px" }} />
                    </a>
                  ) : (
                    "No Receipt"
                  )}
                </td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(exp._id)}>Delete</Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Dashboard;
