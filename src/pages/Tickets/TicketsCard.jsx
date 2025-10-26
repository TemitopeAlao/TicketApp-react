export default function TicketCard({ ticket, onEdit, onDelete }) {
  const { title, status, priority, description, createdAt } = ticket;

  const statusColors = {
    open: "#19a974",
    in_progress: "#ff9f43",
    closed: "#9aa0a6",
  };

  const priorityColors = {
    low: "#7dd3fc",
    normal: "#facc15",
    high: "#f87171",
  };

  return (
    <div className="ticket-card">
      <div className="ticket-head">
        <h3 className="ticket-title">{title}</h3>
        <span
          className="status-pill"
          style={{ background: statusColors[status] || "#ccc" }}
        >
          {status.replace("_", " ")}
        </span>
      </div>

      <p className="ticket-desc">{description || "No description."}</p>

      <div className="ticket-meta">
        <span
          className="priority-pill"
          style={{ background: priorityColors[priority] || "#ccc" }}
        >
          {priority}
        </span>
        <span>{new Date(createdAt).toLocaleDateString()}</span>
      </div>

      <div className="actions">
        <button
          className="action-btn action-edit"
          onClick={() => onEdit(ticket)}
        >
          Edit
        </button>
        <button
          className="action-btn action-delete"
          onClick={() => {
            if (
              window.confirm("Are you sure you want to delete this ticket?")
            ) {
              onDelete(ticket.id);
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
