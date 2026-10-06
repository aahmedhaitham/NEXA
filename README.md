# Nexa

A mobile-first personal productivity and wellness Progressive Web App built with vanilla web technologies.

Nexa brings daily planning, university classes, calendar events, training, nutrition, habits, prayer times and configurable reminders into one installable interface. The project is designed primarily for iPhone while remaining responsive on desktop browsers.

## Features

- Daily dashboard with classes, tasks, habits, nutrition and upcoming events
- Class schedule with live status such as **NOW**, **IN X MIN** and **PASSED**
- Undated task management with subtasks and quick completion
- Dated calendar events and upcoming-event countdowns
- Training log and configurable weekly workout split
- Nutrition targets and daily macro tracking
- Custom habits with optional reminder times
- Prayer-time dashboard
- Configurable Web Push reminders for classes, habits, prayer and events
- Installable PWA with offline application-shell caching
- Mobile-focused interactions, undo actions and responsive layouts

## Tech Stack

| Layer | Technology |
| --- | --- |
| UI | HTML5, CSS3, JavaScript |
| Persistence | Browser Local Storage |
| PWA | Web App Manifest, Service Worker |
| Notifications | Web Push API, Push API |
| Reminder backend | Supabase Edge Functions, PostgreSQL, pg_cron |
| Hosting | Vercel |
| Source control | Git & GitHub |

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
└── apple-touch-icon.png
```

`index.html` contains the application markup, `styles.css` contains the responsive interface and component styling, and `app.js` contains application state, rendering and interaction logic. The service worker provides PWA caching and receives background push notifications.

## Architecture

Nexa uses a local-first architecture. User data is stored on-device in Local Storage, keeping everyday interactions fast and usable without a traditional account system. The frontend synchronizes reminder configuration with a Supabase-backed notification service. Scheduled backend jobs evaluate reminder data and deliver Web Push messages to subscribed devices.

## PWA

The included manifest and service worker allow Nexa to be installed to a device home screen. Navigation requests use a network-first strategy with an offline fallback, while static application assets are cached for repeat launches.

## Development

No framework or build step is required. Clone the repository and serve the project directory with any static HTTP server. PWA and Web Push functionality should be tested over HTTPS or localhost.

## Design

Nexa uses a dark, touch-first interface with safe-area support, compact dashboard cards and responsive controls intended to feel closer to a native mobile application than a conventional website.

## Status

Nexa is an actively developed personal project. The current version focuses on a stable local-first experience and background reminders rather than user accounts or cloud data synchronization.
