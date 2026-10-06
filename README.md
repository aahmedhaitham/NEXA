# Nexa

A mobile-first, local-first productivity and wellness Progressive Web App with a serverless reminder backend.

Nexa combines daily planning, university classes, calendar events, training, nutrition, habits, prayer times and configurable reminders in one installable interface. It is designed primarily for iPhone while remaining responsive on desktop browsers.

## Features

- Daily dashboard for classes, tasks, habits, nutrition and upcoming events
- Class schedule with live **NOW**, **IN X MIN** and **PASSED** states
- Task management with subtasks and quick completion
- Calendar events with upcoming-event countdowns
- Training log and configurable weekly workout split
- Nutrition targets and daily macro tracking
- Custom habits with optional reminder times
- Prayer-time dashboard
- Configurable background Web Push reminders for classes, habits, prayer and events
- Offline-capable installable PWA
- Touch-first responsive interface with undo actions and mobile safe-area support

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | HTML5, CSS3, JavaScript |
| Client persistence | Browser Local Storage |
| PWA | Web App Manifest, Service Worker, Cache API |
| Notifications | Web Push API, Push API, Notifications API |
| Backend | Supabase Edge Functions |
| Database | PostgreSQL |
| Scheduling | pg_cron |
| Frontend hosting | Vercel |
| Source control | Git & GitHub |

## Architecture

Nexa deliberately uses a **local-first architecture** rather than requiring user accounts. Everyday application data is stored in Local Storage on the device, keeping the interface fast and allowing the core experience to remain independent of a cloud database.

The notification system is full-stack. The frontend creates a browser push subscription and sends the public subscription plus reminder configuration to a Supabase Edge Function. PostgreSQL stores the reminder/subscription data, scheduled backend processing evaluates due reminders, and Web Push delivers notifications back to the installed PWA through its service worker.

```text
┌──────────────────────────────┐
│        Nexa Frontend         │
│ HTML · CSS · JavaScript      │
│ Local Storage · Service Worker│
└──────────────┬───────────────┘
               │ reminder configuration
               ▼
┌──────────────────────────────┐
│      Supabase Backend        │
│ Edge Functions · PostgreSQL  │
│ pg_cron / scheduled jobs     │
└──────────────┬───────────────┘
               │ Web Push
               ▼
┌──────────────────────────────┐
│       Installed Nexa PWA     │
│ Background notifications     │
└──────────────────────────────┘
```

## Frontend

The frontend is framework-free and split into clear responsibilities:

- `index.html` — semantic application markup and PWA metadata
- `styles.css` — responsive layout, components and mobile styling
- `app.js` — state, rendering, interactions and application behavior
- `service-worker.js` — offline caching and background push handling
- `manifest.webmanifest` — installable PWA configuration
- `push-config.js` — public Web Push configuration

## Backend

The backend runs on Supabase rather than on Vercel or inside the browser. It is responsible specifically for the reminder pipeline, not for storing the user's everyday Nexa data.

Its responsibilities include receiving push subscriptions, storing reminder configuration in PostgreSQL, running scheduled reminder checks, and sending Web Push notifications. Private backend credentials such as VAPID private keys and service-role credentials are kept out of frontend source control.

The deployed backend is hosted by Supabase. Backend source and database migration files can also be version-controlled under `supabase/` so the GitHub repository documents the complete system without exposing secrets.

## Project Structure

```text
NEXA/
├── index.html
├── styles.css
├── app.js
├── service-worker.js
├── push-config.js
├── manifest.webmanifest
├── logo.png
├── icon-192.png
├── icon-512.png
├── apple-touch-icon.png
└── supabase/                 # backend source/migrations when exported
    ├── functions/
    └── migrations/
```

## Data Flow

1. Nexa stores normal application state locally in the browser.
2. When notifications are enabled, the PWA registers a push subscription.
3. The frontend sends the subscription and enabled reminder configuration to the Supabase backend.
4. Scheduled backend processing checks which reminders are due.
5. The backend sends Web Push messages.
6. The service worker receives them and displays native notifications, including while the PWA is in the background.

## PWA & Offline Support

The Web App Manifest makes Nexa installable from a supported browser. The service worker caches the application shell and uses a network-first navigation strategy with an offline fallback. Static assets are cached for repeat launches, while the same service worker handles incoming push events and notification clicks.

## Development

Nexa has no frontend framework or build step. Clone the repository and serve the project directory through a static HTTP server. PWA and Web Push features require HTTPS in production (or localhost during development).

The production frontend is deployed through Vercel. The reminder backend is deployed separately through Supabase.

## Security

Only public client configuration belongs in the frontend. Private VAPID material, Supabase service-role credentials and other backend secrets must remain in the backend environment and must never be committed to GitHub.

## Design

Nexa uses a dark, touch-first interface with compact dashboard cards, responsive controls and mobile safe-area support. The UI is designed to feel closer to a native mobile application than a conventional website.

## Status

Nexa is an actively developed personal project. The current architecture intentionally prioritizes a stable local-first experience with a dedicated serverless backend for background reminders. User accounts and cloud synchronization are not part of the current application.
