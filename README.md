# Nexa

Nexa is a mobile-first, local-first productivity and wellness Progressive Web App (PWA). It brings daily planning, university classes, tasks, calendar events, workouts, nutrition, habits, prayer times, and reminders into one installable app.

The frontend is framework-free HTML, CSS, and JavaScript. Most personal app data stays in the browser's Local Storage; Supabase is used for the optional background Web Push reminder backend. The app is designed with phones in mind and also works in desktop browsers.

## Features

- Daily dashboard with classes, tasks, habits, nutrition, and upcoming events
- Class timetable with live status indicators and class management
- Tasks, subtasks, subjects, and task organization
- Calendar events and upcoming-event countdowns
- Workout logging and configurable weekly workout splits
- Daily calorie and macronutrient goals
- Custom habits and habit tracking
- Prayer-time dashboard
- Configurable background push reminders for classes, habits, prayer, and events
- Installable PWA with offline app-shell caching
- Touch-friendly controls, undo actions, responsive layouts, and mobile safe-area support

## Technology

| Area | Technology |
| --- | --- |
| Frontend | HTML5, CSS3, vanilla JavaScript |
| Local persistence | Browser Local Storage |
| Installability and offline support | Web App Manifest, Service Worker, Cache API |
| Push notifications | Web Push API, Notifications API |
| Reminder backend | Supabase Edge Functions |
| Reminder data | Supabase PostgreSQL |
| Hosting | Vercel (frontend) and Supabase (backend) |
| Version control | Git and GitHub |

## Repository layout

```text
NEXA/
├── index.html
├── styles.css
├── app.js
├── service-worker.js
├── manifest.webmanifest
├── push-config.js
├── logo.png
├── apple-touch-icon.png
├── icon-192.png
├── icon-512.png
├── .gitignore
├── README.md
└── supabase/
    ├── functions/
    │   ├── nexa-push-subscribe/
    │   │   └── index.ts
    │   └── nexa-send-reminders/
    │       └── index.ts
    └── migrations/
        └── 20261004_push_subscriptions.sql
```

The icon and logo image files are runtime assets, not disposable repository clutter. `logo.png` is used for notification artwork. The Supabase function sources and SQL migration are included so the backend can be reviewed and redeployed.

## Run locally

No frontend package manager, bundler, or build step is required.

1. Clone this repository.
2. Serve the repository root with any static HTTP server.
3. Open the local URL in a browser.

For example, if Python is installed:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

Service workers and Web Push require a secure context: use localhost for local development and HTTPS in production. Opening `index.html` directly as a `file://` URL is not a reliable way to test PWA features.

## Deployment

### Frontend

Deploy the repository root as a static site on Vercel. There is no build command or output directory to configure for the current framework-free frontend. Ensure all root assets are included in the deployment.

### Supabase reminder backend

The backend source is under `supabase/functions/`; the database schema migration is under `supabase/migrations/`.

1. Create or select a Supabase project.
2. Apply `supabase/migrations/20261004_push_subscriptions.sql` to create the push-subscription table.
3. Configure the backend secrets in Supabase:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY` (or the supported server-side `SUPABASE_SECRET_KEY`)
   - `VAPID_PRIVATE_KEY` for the reminder-sending function
   - `VAPID_SUBJECT` (optional; a valid contact URL or mailto value is recommended)
4. Deploy `nexa-push-subscribe` and `nexa-send-reminders` as Supabase Edge Functions.
5. Configure a trusted scheduler to invoke `nexa-send-reminders` at the required interval. The scheduler configuration itself is not included in the SQL migration.
6. Confirm that `push-config.js` contains the correct **public** VAPID key and the deployed subscription-function URL.

The frontend configuration file intentionally contains only public values. Never put a VAPID private key, Supabase service-role key, or other server secret in `push-config.js`, `app.js`, or any other browser-delivered file.

## Data and privacy notes

- Everyday app data is stored in the current browser/device's Local Storage; it is not automatically backed up to Supabase or synchronized between devices.
- Clearing browser site data or using the app's **Reset all data** action can permanently remove local app data. Export or back up important information separately before resetting.
- Supabase stores push-subscription details and the reminder settings needed to deliver background notifications.
- Background push reminders depend on browser/platform support, notification permission, a deployed backend, valid VAPID keys, and a working scheduler.
- Prayer reminder calculations in `nexa-send-reminders/index.ts` currently use coordinates defined in that function. Change those coordinates if the reminder location needs to differ.

## Offline and update behavior

The service worker caches the app shell and static assets for repeat launches, attempts a network-first load for navigation, and falls back to the cached app page when offline. It also receives push events and opens Nexa when a notification is tapped. When changing the app shell or its caching behavior, update the service-worker cache version and keep the asset list in sync with the files the app requires.

## Security checklist

- Keep private keys and service-role credentials in Supabase's server-side secrets only.
- Keep `.env`, local tooling folders, and operating-system metadata out of version control; the repository's `.gitignore` already excludes common local-only files.
- Keep the reminder-sending Edge Function protected so only the trusted scheduler or authorized operators can invoke it.
- Review Supabase Row Level Security and function access settings before changing the reminder backend's deployment configuration.

## Project status

Nexa is an actively developed personal project. The current design prioritizes a responsive, local-first app experience with an optional serverless backend for background reminders. User accounts and general cloud synchronization are not currently part of the app.
