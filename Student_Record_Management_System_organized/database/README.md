# Database

This project does **not** use a real database. All data (students,
notifications, auth/login state, theme) is stored in the browser's
**localStorage**, managed in `frontend/src/context/AppContext.tsx`.

localStorage keys used:
- `hrs_auth`      – login/session flag
- `hrs_theme`     – dark/light mode
- `hrs_students`  – array of student records (JSON)

## Limitations of this approach

- Data is per-browser, per-device — it doesn't sync across devices and is
  lost if the user clears site data.
- Not suitable for multiple users/admins sharing the same student records.

## Recommended upgrade path

To make this a real multi-user system (matching your other projects):

1. Create a Supabase project and a `students` table (mirroring the
   `Student` type in `AppContext.tsx`: fullName, dob, gender, email,
   phone, address, department, year, section, bloodGroup, parentName,
   parentPhone, photo, admissionDate, attendance, cgpa).
2. Add a `backend/api/students.js` (Vercel serverless function) using the
   Supabase service role key to handle CRUD requests.
3. Replace the `localStorage` calls in `AppContext.tsx` with `fetch()`
   calls to those new API endpoints.
4. Put the schema here as `database/schema.sql` once created.
