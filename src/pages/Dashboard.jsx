import { useAuth } from "../context/AuthContext";
import { useTickets } from "../context/TicketsContext";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const { stats } = useTickets();
  const { logout, user } = useAuth();
  const nav = useNavigate();

  return (
    <main className="dashboard-container">
      <header className="dash-header">
        <div className="dash-header-top">
          <h2>
            Welcome, <span className="username">{user?.name || "User"}</span>
          </h2>
          <div className="dash-buttons">
            <button
              className="btn-primary"
              onClick={() => nav("/tickets")}
              aria-label="Go to Ticket Management"
            >
              Manage Tickets
            </button>
            <button
              className="btn-secondary"
              onClick={() => {
                logout();
                nav("/");
              }}
              aria-label="Logout of your account"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <section className="stats-grid" aria-label="summary statistics">
        <div className="stat-card total">
          <h3>Total Tickets</h3>
          <p>{stats.total}</p>
        </div>
        <div className="stat-card open">
          <h3>Open</h3>
          <p>{stats.open}</p>
        </div>
        <div className="stat-card in-progress">
          <h3>In Progress</h3>
          <p>{stats.in_progress}</p>
        </div>
        <div className="stat-card closed">
          <h3>Closed</h3>
          <p>{stats.closed}</p>
        </div>
      </section>
    </main>
  );
}
