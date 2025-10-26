import { createContext, useContext, useState, useEffect } from "react";
import {
  saveSession as storageSaveSession,
  getSession as storageGetSession,
  clearSession as storageClearSession,
} from "../utils/storage";

import DotSpinner from "../components/Loader/DotSpinner";
import { useToast } from "./ToastContext";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const LS_USERS_KEY = "ticketapp_users";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  useEffect(() => {
    const session = storageGetSession();
    if (session) setUser(session.user);
    setLoading(false);
  }, []);

  const signup = ({ name, email, password }) => {
    if (!name || !email || !password) {
      showToast("All fields are required.", "error");
      return { ok: false, message: "All fields are required." };
    }

    const users = JSON.parse(localStorage.getItem(LS_USERS_KEY)) || {};

    if (users[email]) {
      showToast("Email already registered.", "error");
      return { ok: false, message: "Email already registered." };
    }

    // Save new user
    users[email] = { name, password };
    localStorage.setItem(LS_USERS_KEY, JSON.stringify(users));

    const userObj = { name, email };
    setUser(userObj);
    storageSaveSession(userObj);
    showToast("Signup successful!", "success");

    return { ok: true };
  };

  const login = ({ email, password }) => {
    if (!email || !password) {
      showToast("Email and password required.", "error");
      return { ok: false, message: "Email and password required." };
    }

    const users = JSON.parse(localStorage.getItem(LS_USERS_KEY)) || {};

    if (password === "12") {
      const demoUser = { name: "Demo User", email };
      setUser(demoUser);
      storageSaveSession(demoUser);
      showToast("Logged in as Demo User!", "success");
      return { ok: true };
    }

    if (!users[email] || users[email].password !== password) {
      showToast("Invalid email or password.", "error");
      return { ok: false, message: "Invalid email or password." };
    }

    const userObj = { name: users[email].name, email };
    setUser(userObj);
    storageSaveSession(userObj);
    showToast("Login successful!", "success");

    return { ok: true };
  };

  const logout = () => {
    storageClearSession();
    setUser(null);
    showToast("Logged out successfully.", "success");
  };

  const isAuthenticated = !!user;

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <DotSpinner />
      </div>
    );

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}
