# Nexa

Nexa is an installable, mobile-first productivity and wellness Progressive Web App.

## Features
- Email/password accounts
- Per-user cloud persistence
- Local-first data with cloud synchronization
- Tasks, calendar events, classes and subjects
- Training, nutrition and habit tracking
- Configurable reminders and Web Push notifications
- Offline-capable PWA

## Stack
Frontend: HTML, CSS, JavaScript, Service Worker and Web Push.
Backend: Supabase Auth, PostgreSQL, Row Level Security and Edge Functions.
Deployment: GitHub, Vercel and Supabase.

## Architecture
The app writes to local storage first for a fast offline-friendly UI. Signed-in users synchronize their application state to a per-user PostgreSQL row. Database Row Level Security restricts each account to its own data. Scheduled backend functions handle reminder delivery separately from cloud persistence.

## Branches
The stable app is on main. Authentication and cloud work is developed on fullstack-cloud until tested.
