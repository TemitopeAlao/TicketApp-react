# 🧾 Multi-Framework Ticket Web App — React Version

## 🧩 Overview

This project is part of the **HNG Frontend Stage 2 Challenge**: _Multi-Framework Ticket Web App_.
It is a **React implementation** of a **ticket management web application** that includes a landing page, authentication system, protected dashboard, and a complete CRUD ticket management feature.

The same **layout, design, and structure** will be replicated in **Vue.js** and **Twig** for consistency.

🔗 **Live Project:** [https://ticketapp-temi.netlify.app](https://ticketapp-temi.netlify.app)

---

## 🚀 Features Implemented

### 🏠 Landing Page

- Displays **app name**, short description, and **CTA buttons** ("Login", "Get Started")
- Includes a **wavy hero background** using SVG
- **Decorative circles** and box-styled feature sections with shadows and rounded corners
- **Centered layout** (max-width: 1440px)
- **Responsive** on desktop, tablet, and mobile
- **Consistent footer** across all pages

---

### 🔐 Authentication

- Login and Signup pages with **form validation**
- Inline and **toast** error messages
- Authentication simulated using **LocalStorage** (`ticketapp_session`)
- **Successful login → Redirects to Dashboard**
- **Unauthorized access → Redirects to /auth/login**
- Logout clears session and redirects to landing page

---

### 📊 Dashboard

- Displays key statistics:

  - Total Tickets
  - Open Tickets
  - In Progress Tickets
  - Closed Tickets

- Navigation links to **Ticket Management**
- Logout button visible and functional
- Decorative elements and responsive layout maintained

---

### 🎫 Ticket Management (CRUD)

- **Create, Read, Update, and Delete** tickets
- Inline **form validation** for required fields
- Status field strictly accepts: `open`, `in_progress`, `closed`
- Description field validated for input length
- **Real-time updates** after CRUD operations
- **Toast notifications** for success and error feedback
- Confirmation before delete actions

---

### ⚠️ Error Handling

- Unauthorized users redirected to login
- Invalid inputs trigger inline error messages
- Failed network/API calls trigger toast errors
- Descriptive and consistent messages, e.g.:

  - “Your session has expired — please log in again.”
  - “Failed to load tickets. Please retry.”

---

### 🎨 Design Consistency

- Layout width limited to **1440px** and centered
- **Card-style UI** with rounded corners and shadows
- **Wave hero**, **decorative circles**, and **neumorphic cards**
- Color system:

  - `open` → Green (#4ade80)
  - `in_progress` → Amber (#fbbf24)
  - `closed` → Gray (#9ca3af)

- **Uniform design language** across all frameworks

## 🧠 Project Structure

### 🧩 State Management

| Context            | Responsibility                                    |
| ------------------ | ------------------------------------------------- |
| **AuthContext**    | Handles signup, login, logout, and session state  |
| **TicketsContext** | Manages tickets (CRUD + stats)                    |
| **ToastContext**   | Displays success and error notifications globally |

---

### 📂 Core Pages

| Route          | Description                      |
| -------------- | -------------------------------- |
| `/`            | Landing Page                     |
| `/auth/login`  | Login Page                       |
| `/auth/signup` | Signup Page                      |
| `/dashboard`   | Protected Dashboard              |
| `/tickets`     | Protected Ticket Management Page |

---

### 🧾 Local Storage Keys

| Key                 | Description                    |
| ------------------- | ------------------------------ |
| `ticketapp_users`   | Stores registered user details |
| `ticketapp_session` | Stores active session token    |

---

## 🛠 Frameworks & Libraries Used

| Library                 | Purpose                      |
| ----------------------- | ---------------------------- |
| **React**               | Core framework               |
| **React Router DOM**    | Routing and protected routes |
| **LocalStorage API**    | Session persistence          |
| **Context API**         | Global state management      |
| **Custom Toast System** | Global notifications         |

---

## ⚙️ Setup & Execution

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/TemitopeAlao/TicketApp-react
cd TicketApp-react
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run Development Server

```bash
npm run dev
```

### 4️⃣ Build for Production

```bash
npm run build
```

## 🧾 Test Credentials

Use the following demo account to test the app:

```
Email: demo@ticketapp.com
Password: 12
```

You can also register a new user via the signup form.

---

## 📘 Known Issues & Notes

- Authentication is simulated using **LocalStorage** (no backend API).
- Toasts may overlap on smaller screens if many appear simultaneously.
- No server-side validation; all handled client-side.
- Works best on latest versions of Chrome and Firefox.

---

## 📗 Accessibility & Responsive Design Checklist

✅ Semantic and descriptive HTML elements
✅ Keyboard navigable forms and buttons
✅ Color contrast above 4.5:1
✅ Focus outlines for all interactive elements
✅ Responsive grid layouts for mobile and tablet

## 👩‍💻 Contributor

**Developed by:** Temi
**Challenge:** HNG Frontend Stage 2
**Framework:** React
