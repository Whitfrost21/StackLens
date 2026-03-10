# StackLens

StackLens is a full-stack log aggregation and monitoring dashboard built with Typescript and a modern PERN stack.  
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

---

## Architecture

```
Service → Log Ingestion API → Express Server → PostgreSQL → React Dashboard
```

1. Services send logs to the backend using a REST API
2. The Express server validates and stores logs in PostgreSQL
3. The frontend dashboard fetches logs through API endpoints
4. Logs are visualized through charts and filtering tools

---

## Tech Stack

| Layer      | Technology                                  |
| ---------- | ------------------------------------------- |
| Frontend   | React, TypeScript, TanStack Query, Recharts |
| Backend    | Node.js, Express, TypeScript                |
| Database   | PostgreSQL                                  |
| Deployment | Render (backend), Supabase (database)       |

---

## Project Structure

```
stacklens/
│
├── frontend/        # React + TypeScript dashboard
├── backend/         # Express + TypeScript API
└── README.md
```

---

## Log Format

Logs follow a structured JSON format:

```json
{
  "service": "auth-service",
  "level": "error",
  "message": "User authentication failed",
  "metadata": { "ip": "192.168.1.10", "user_id": "123" },
  "timestamp": "2026-03-04T10:30:00Z",
  "created_at": "2026-03-04T10:30:00Z"
}
```

**Supported severity levels:** `debug` · `info` · `warn` · `error`

---

## API Reference

### Send a Log

```
POST /logs
```

**Request body:**

```json
{
  "service": "deploy-service",
  "level": "warn",
  "message": "avoid unnecessary bloat",
  "metadata": { "user_id": "123", "ip": "192.168.1.10" }
}
```

The server stores the log in db and fetches it making immediately available for search and analytics.

---

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/Whitfrost21/stacklens.git
cd stacklens
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
DATABASE_URL=your_postgres_url
PORT=5000
```

Start the server:

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd frontend
npm install
npm run dev
```

The React app will be running at `http://localhost:5173`.

---

## Roadmap

- [ ] Real-time log streaming
- [ ] Log ingestion agents
- [ ] Alerting and notifications
- [ ] Distributed tracing support
- [ ] Role-based access control (Authentication)

---

## Learning Goals

This project was built to explore:

- Observability concepts and log aggregation pipelines
- API design for log ingestion
- Data querying and analytics at scale
- Building dashboards for monitoring distributed systems

---

## Contributing

Contributions are welcome. Feel free to open issues or submit pull requests.
