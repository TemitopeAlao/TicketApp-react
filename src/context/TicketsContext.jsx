import { createContext, useContext, useState, useEffect } from "react";
import { loadTickets, saveTickets } from "../utils/storage";
import { v4 as uuidv4 } from "uuid";

const TicketsContext = createContext();

export const useTickets = () => useContext(TicketsContext);

export function TicketsProvider({ children }) {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    setTickets(loadTickets());
  }, []);

  useEffect(() => {
    saveTickets(tickets);
  }, [tickets]);

  const createTicket = (data) => {
    const newTicket = {
      id: uuidv4(),
      title: data.title,
      status: data.status,
      description: data.description || "",
      priority: data.priority || "normal",
      createdAt: new Date().toISOString(),
    };
    setTickets((t) => [newTicket, ...t]);
    return { ok: true, ticket: newTicket };
  };

  const updateTicket = (id, updates) => {
    setTickets((t) =>
      t.map((ticket) => (ticket.id === id ? { ...ticket, ...updates } : ticket))
    );
    return { ok: true };
  };

  const deleteTicket = (id) => {
    setTickets((t) => t.filter((ticket) => ticket.id !== id));
    return { ok: true };
  };

  const stats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === "open").length,
    in_progress: tickets.filter((t) => t.status === "in_progress").length,
    closed: tickets.filter((t) => t.status === "closed").length,
  };

  return (
    <TicketsContext.Provider
      value={{ tickets, createTicket, updateTicket, deleteTicket, stats }}
    >
      {children}
    </TicketsContext.Provider>
  );
}
