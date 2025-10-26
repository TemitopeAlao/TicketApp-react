export function validateTicket(ticket) {
  const errors = {};
  if (!ticket.title || String(ticket.title).trim().length < 3) {
    errors.title = "Title is required and must be at least 3 characters.";
  }

  const allowed = ["open", "in_progress", "closed"];
  if (!ticket.status || !allowed.includes(ticket.status)) {
    errors.status = "Status is required. Use open, in_progress or closed.";
  }

  if (ticket.description && ticket.description.length > 1000) {
    errors.description = "Description is too long (max 1000 chars).";
  }

  return errors;
}
