# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

CampusConnect — a full-stack campus community SPA. Build from `docs/brief.md` and `docs/wireframes/`. Do not move or rename docs files unless asked.

## Development commands

The repo uses a monorepo layout. Each workspace has its own `package.json`; a root `package.json` ties them together with workspace scripts.

```bash
# Install all dependencies from repo root
npm install

# Run both dev servers concurrently (root script)
npm run dev

# Frontend only (Vite, default port 5173)
cd client && npm run dev

# Backend only (Express, default port 3000)
cd server && npm run dev

# Build frontend for production
cd client && npm run build

# Lint (run from whichever workspace you're working in)
npm run lint

# Tests (once configured)
npm test
```

Before marking a task done: run the relevant build/lint commands and confirm no errors.

## Architecture

```
client/    React + Vite SPA (all UI, SCSS, PWA manifest)
server/    Express API (routes, controllers, Mongoose models, auth middleware)
shared/    Code used by both sides only (e.g. validation schemas, type definitions)
docs/      Brief, wireframes, assignment specs — read-only reference
```

### Frontend (client/)

- Vite + React; SCSS for all styles
- React Router for client-side routing; protected routes redirect unauthenticated users to `/login`
- Auth state held in a top-level context/provider; pages consume it via hook
- PWA shell (manifest + service worker) added before final polish

### Backend (server/)

- Express REST API; all routes under `/api`
- Mongoose models in `server/models/`; route handlers in `server/routes/` or `server/controllers/`
- Auth via express-session + cookies; protected routes use an `isAuthenticated` middleware
- Server-side form validation mirrors client-side validation (never trust client alone)

### Shared (shared/)

Use sparingly — only for code that would otherwise be duplicated verbatim (e.g. Zod/Yup schemas shared between client validation and server validation).

### Core screens and routes

| Screen | Frontend route | API endpoints |
|---|---|---|
| Home | `/` | — |
| Login / Signup | `/login`, `/signup` | `POST /api/auth/login`, `POST /api/auth/signup` |
| Dashboard | `/dashboard` (protected) | `GET /api/posts` |
| Create / Edit | `/events/new`, `/events/:id/edit` (protected) | `POST /api/posts`, `PUT /api/posts/:id` |

## Workflow rules

- Plan first, code second. Stop and summarize after each phase.
- Make small, reviewable changes; avoid broad refactors unless asked.
- Update README when setup steps change.
- Keep branches feature-focused; preserve clear file names for partner handoff.
