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
  const [customCategory, setCustomCategory] = useState("");
  const [categories, setCategories] = useState(["food", "transportation", "rent", "other"]);
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Redirect to landing page if not logged in
    } else {
      fetchExpenses();
    }
  }, []);

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

  const handleAddExpense = async () => {
    if (!description || !amount) {
      setError("Please fill all fields");
      return;
    }

    const finalCategory = category === "other" && customCategory ? customCategory : category;
    if (finalCategory !== category && !categories.includes(finalCategory)) {
      setCategories([...categories, finalCategory]); // Add new category to list
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("description", description);
    formData.append("amount", amount);
    formData.append("category", finalCategory);
    if (receipt) formData.append("receipt", receipt);

    try {
      const response = await fetch(`${API_BASE_URL}/expenses`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to add expense");

      fetchExpenses();
      setDescription("");
      setAmount("");
      setReceipt(null);
      setCustomCategory("");
      setShowCustomCategory(false);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`${API_BASE_URL}/expenses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      setExpenses(expenses.filter((exp) => exp._id !== id));
    } catch (err) {
      setError("Failed to delete expense");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Redirect to landing page after logout
  };

  return (
    <Container>
      {/* Top Bar with Logout Button */}
      <div className="top-bar">
        <h2>Expense Tracker</h2>
        <Button variant="danger" onClick={handleLogout} className="logout-btn">Logout</Button>
      </div>

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
          <Form.Select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setShowCustomCategory(e.target.value === "other");
            }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Form.Select>
        </Form.Group>

        {showCustomCategory && (
          <Form.Group>
            <Form.Label>Custom Category</Form.Label>
            <Form.Control
              type="text"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
            />
          </Form.Group>
        )}

        <Form.Group>
          <Form.Label>Upload Receipt</Form.Label>
          <Form.Control type="file" onChange={(e) => setReceipt(e.target.files[0])} />
        </Form.Group>
        <Button onClick={handleAddExpense} className="mt-3 expense-btn">Add Expense</Button>
      </Form>

      <Form.Group className="mt-4">
        <Form.Label>Filter by Category</Form.Label>
        <Form.Select onChange={(e) => setFilter(e.target.value)}>
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
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
    <img
      src={`${API_BASE_URL}/${exp.receipt_url}`}
      alt="Receipt"
      className="receipt-img"
    />
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
