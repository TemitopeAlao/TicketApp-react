import { useNavigate } from "react-router-dom";
import "../styles/Landing.css";

export default function Landing() {
  const nav = useNavigate();

  return (
    <main className="landing">
      <section className="hero">
        <div className="hero-content">
          <div className="decorative-circle"></div>
          <h1>TicketApp</h1>
          <p>Manage your support tickets faster, smarter, and with ease.</p>

          <div className="hero-buttons">
            <button onClick={() => nav("/auth/signup")}>Get Started</button>
            <button className="outline" onClick={() => nav("/auth/login")}>
              Login
            </button>
          </div>
        </div>

        <div className="wave-container">
          <img src="./assets/wave-hero.svg" />
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>Create Tickets</h3>
          <p>Quickly log issues and track their status in real-time.</p>
        </div>
        <div className="feature-card">
          <h3>Manage Effortlessly</h3>
          <p>Organize open, in-progress, and resolved tickets easily.</p>
        </div>
        <div className="feature-card">
          <h3>Stay Updated</h3>
          <p>Receive instant updates on your ticket progress.</p>
        </div>
      </section>
    </main>
  );
}
