import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Header.css";

export default function Header() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div
        className={`overlay ${menuOpen ? "active" : ""}`}
        onClick={closeMenu}
      ></div>

      <nav className="main-nav">
        <Link to="/" className="logo" onClick={closeMenu}>
          🎟️ TicketApp
        </Link>

        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
          <li>
            <Link to="/">Homepage</Link>
          </li>
          <li>
            <Link to="/dashboard" onClick={closeMenu}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/tickets" onClick={closeMenu}>
              Tickets
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <span className="username">
                  Hi, {user?.name?.toUpperCase()}
                </span>
              </li>
              <li>
                <button
                  className="logout-btn"
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/auth/login" onClick={closeMenu}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
