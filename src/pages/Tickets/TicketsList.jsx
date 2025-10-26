import { useState } from "react";
import { useTickets } from "../../context/TicketsContext";
import TicketCard from "./TicketsCard";
import TicketForm from "./TicketsForm";

export default function TicketsList() {
  const { tickets, createTicket, updateTicket, deleteTicket, stats } =
    useTickets();
  const [editing, setEditing] = useState(null);

  const handleCreateOrUpdate = (data) => {
    if (editing) {
      updateTicket(editing.id, data);
      setEditing(null);
    } else {
      createTicket(data);
    }
  };

  return (
    <section className="neu-container">
      <h1>Tickets</h1>

      <TicketForm
        onSubmit={handleCreateOrUpdate}
        ticketToEdit={editing}
        onCancel={() => setEditing(null)}
      />

      <div className="stat-list">
        <div>
          Total: {stats.total} | Open: {stats.open} | In Progress:{" "}
          {stats.in_progress} | Closed: {stats.closed}
        </div>

        {tickets.length === 0 ? (
          <p>No tickets yet. Create one above.</p>
        ) : (
          tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onEdit={setEditing}
              onDelete={deleteTicket}
            />
          ))
        )}
      </div>
    </section>
  );
}
