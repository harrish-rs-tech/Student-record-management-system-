# Student Record Management System — Project Structure

```
Student_Record_Management_System/
├── frontend/          React + Vite + TypeScript app (the entire project)
│   ├── src/
│   │   ├── pages/        Home, Login, Dashboard, Students, AddStudent,
│   │   │                  DeleteStudent, StudentProfile, Reports, Contact
│   │   ├── components/    Layout, Navbar, Sidebar, Logo
│   │   ├── context/        AppContext.tsx (auth, students, notifications, theme)
│   │   └── main.tsx / App.tsx
│   ├── public/
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
│
├── backend/            Placeholder — no backend exists yet (see README.md)
│
└── database/            Placeholder — no real database yet (see README.md);
                          currently all data lives in browser localStorage
```

## Notes

1. **This is currently a frontend-only project.** Unlike your other apps
   (Habit Tracker, Blood Donor Finder, AI Email Assistant), there's no
   `/api` folder and no Supabase — student records, login state, and
   notifications all live in the browser's `localStorage`
   (`frontend/src/context/AppContext.tsx`).

2. **No local build artifacts included** — `node_modules/` and `dist/`
   were left out. Regenerate with:

       cd frontend && npm install && npm run build

3. **`backend/` and `database/` are placeholders** with notes on how to
   add a real Supabase-backed API later, matching the pattern used in
   your other projects, if you want this to support multiple users or
   persist data server-side.
