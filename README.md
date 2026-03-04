# StackLens

StackLens is a full-stack log aggregation and monitoring dashboard built with a modern PERN stack.  
It allows services to push logs into a centralized system and provides powerful filtering, searching, pagination, and analytics.

Built to simulate a production-style logging system with real-time filtering and responsive UI.

The system exposes a log ingestion API where services can push structured logs. These logs are stored in PostgreSQL and analyzed through a React dashboard powered by backend analytics endpoints.

---

## Features

- ☐ Centralized log storage
- ⌕ Search logs with debounce
- ⌁ Filter by service & log level (debug, info, warn, error)
- ◷ Date range filtering
- ◳ Analytics dashboard (log distribution & trends)
- ⎘ Pagination
- ◻ Fully responsive UI (mobile-first)
- ◐ Dark mode support
- ⇄ Smooth route transitions with Framer Motion
- ⛨ Secure backend with CORS & environment variables

---

## StackLens Demo

<video src="https://github.com/user-attachments/assets/e47645b8-ffd5-4e09-8d21-5ce406b17e6e" controls></video>

## Tech Stack

### Frontend

- React
- TypeScript
- TailwindCSS
- React Router
- TanStack Query
- Framer Motion

### Backend

- Node.js
- Express
- PostgreSQL
- Supabase (Hosted Postgres)
- REST API architecture

---
