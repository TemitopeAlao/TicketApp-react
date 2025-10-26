import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import "../../styles/Login.css";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const { showToast } = useToast();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handle = (e) => {
    e.preventDefault();
    setError("");

    let validationErrors = {};

    if (!form.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      validationErrors.email = "Enter a valid email address";
    }

    if (!form.password.trim()) {
      validationErrors.password = "Password is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const res = login(form);

    if (!res.ok) {
      showToast(res.message || "Failed to login", "error");
      setError(res.message);
      return;
    }

    showToast("Login successful!", "success");
    nav("/dashboard");
  };

  return (
    <main className="login-container">
      <div className="login-card">
        <h1>Login</h1>

        <form onSubmit={handle} aria-label="login form">
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
            Password
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

          {error && (
            <p role="alert" className="inline-error">
              {error}
            </p>
          )}

          <button type="submit">Login</button>
        </form>

        <p className="get-started">You don't have an account yet?</p>
        <Link to="/auth/signup">Sign up</Link>
      </div>
    </main>
  );
}
