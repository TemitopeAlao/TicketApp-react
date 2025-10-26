export const LS_SESSION_KEY = "ticketapp_session";
export const LS_TICKETS_KEY = "ticketapp_tickets";

export const saveSession = (token) => {
  localStorage.setItem(LS_SESSION_KEY, JSON.stringify(token));
};

export const getSession = () => {
  const raw = localStorage.getItem(LS_SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const clearSession = () => {
  localStorage.removeItem(LS_SESSION_KEY);
};

export const loadTickets = () => {
  const raw = localStorage.getItem(LS_TICKETS_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const saveTickets = (tickets) => {
  localStorage.setItem(LS_TICKETS_KEY, JSON.stringify(tickets));
};
