# Backend

This project currently has **no backend** — it's a frontend-only app.
There is no `/api` folder and no server calls; everything runs in the browser.

This folder is left here as a placeholder for when you add one. Based on
the other projects in your portfolio (Habit Tracker, Blood Donor Finder,
AI Email Assistant), a natural next step would be:

- Vercel Serverless Functions (`api/*.js`) for endpoints like
  `students.js`, `auth.js`, `reports.js`
- Using the Supabase JS client (service role key, server-side only) to
  read/write a real database instead of localStorage
