import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import "../../styles/SignUp.css";

export default function SignUp() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    let validationErrors = {};

    // name validation
    if (!form.name.trim()) {
      validationErrors.name = "Name is required";
    }

    // email validation
    if (!form.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      validationErrors.email = "Enter a valid email address";
    }

    // password validation
    if (!form.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const res = signup(form);
    if (!res.ok) {
      setError(res.message);
      showToast(res.message || "Signup failed", "error");
      return;
    }

    showToast("Signup successful!", "success");
    navigate("/dashboard");
  };

  return (
    <main className="signup-container">
      <div className="signup-card">
        <h1>Create Account</h1>

        <form onSubmit={handleSubmit} aria-label="signup form">
          <label>
            Name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            {errors.name && <p className="inline-error">{errors.name}</p>}
          </label>

          <label>
            Email
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && <p className="inline-error">{errors.email}</p>}
          </label>

          <label>
            Create Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="inline-error">{errors.password}</p>
            )}
          </label>

          {error && <p className="inline-error">{error}</p>}

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/auth/login">Login</Link>
        </p>
      </div>
    </main>
  );
}
