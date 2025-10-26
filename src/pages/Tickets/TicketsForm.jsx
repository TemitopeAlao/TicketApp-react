import { useState, useEffect } from "react";
import { validateTicket } from "../../utils/validateTicket";
import "../../styles/Tickets.css";
import { useToast } from "../../context/ToastContext";

export default function TicketForm({ onSubmit, ticketToEdit, onCancel }) {
  const initial = {
    title: "",
    description: "",
    status: "open",
    priority: "normal",
  };
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (ticketToEdit) setForm({ ...ticketToEdit });
    else setForm(initial);
  }, [ticketToEdit]);

  const { showToast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((err) => ({ ...err, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validateTicket(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    onSubmit({
      ...form,
      title: String(form.title).trim(),
      description: form.description?.trim() || "",
      priority: form.priority || "normal",
      status: form.status,
    });

    showToast(
      ticketToEdit
        ? "Ticket updated successfully!"
        : "Ticket created successfully!",
      "success"
    );

    setForm(initial);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="neu-card ticket-form"
      aria-label="Ticket form"
    >
      <h2>{ticketToEdit ? "Edit Ticket" : "Create Ticket"}</h2>

      <div className="field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          aria-required="true"
        />
        {errors.title && (
          <div className="inline-error" role="alert">
            {errors.title}
          </div>
        )}
      </div>

      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        {errors.description && (
          <div className="inline-error" role="alert">
            {errors.description}
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 1 }} className="field">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="open">open</option>
            <option value="in_progress">in_progress</option>
            <option value="closed">closed</option>
          </select>
          {errors.status && (
            <div className="inline-error" role="alert">
              {errors.status}
            </div>
          )}
        </div>

        <div style={{ width: 130 }} className="field">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="low">low</option>
            <option value="normal">normal</option>
            <option value="high">high</option>
          </select>
        </div>
      </div>

      <div
        className="form-row"
        style={{ display: "flex", gap: 12, marginTop: 16 }}
      >
        <button type="submit" className="btn btn-primary">
          {ticketToEdit ? "Update" : "Create"}
        </button>
        {ticketToEdit && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
