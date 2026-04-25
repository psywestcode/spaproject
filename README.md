# CampusConnect

A full-stack campus community SPA — discover, create, and manage campus events.

## Tech stack

- **Frontend**: React 18, Vite, React Router 6, SCSS modules
- **Backend**: Express 4, Mongoose, express-session, bcryptjs
- **Database**: MongoDB
- **Shared**: Zod validation schemas

## Prerequisites

- Node.js 18+
- npm 8+ (workspaces support)
- A running MongoDB instance (local or Atlas)

## Setup

1. Clone the repo and install all dependencies:
   ```bash
   npm install
   ```

2. Create your environment file:
   ```bash
   cp .env.example server/.env
   ```
   Edit `server/.env` and fill in your values (see `.env.example` for descriptions).

3. Start both dev servers:
   ```bash
   npm run dev
   ```
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start both servers concurrently |
| `npm run build` | Build the frontend for production |
| `npm run lint` | Lint client and server |
| `cd client && npm run dev` | Frontend only |
| `cd server && npm run dev` | Backend only |

## Environment variables

See `.env.example` for the full list. Required:

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `SESSION_SECRET` | Secret for signing session cookies |
| `PORT` | Express port (default 3000) |
| `CLIENT_URL` | Frontend URL for CORS (default http://localhost:5173) |

## Project structure

```
client/    React + Vite SPA
server/    Express REST API
shared/    Zod validation schemas (used by both sides)
docs/      Brief, wireframes, assignment specs
```

## Features

- Signup / Login / Logout (express-session + cookies)
- Protected routes (dashboard, create, edit)
- Create, edit, delete events with draft/publish workflow
- Client-side and server-side validation (shared Zod schemas)
- Responsive layout (SCSS modules, mobile-first)
- PWA manifest (installable)
