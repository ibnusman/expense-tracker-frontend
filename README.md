# Yi-Frontend

## Overview
This is the frontend for the Notes App, built with React and Vite. It allows users to create, view, and delete notes. The app communicates with a backend API to persist data.

## Features
- Add new notes with a title and content.
- View all saved notes.
- Delete notes when no longer needed.
- Responsive design for various screen sizes.

## Pages & User Interaction
### Home Page (`/`)
- Displays all notes retrieved from the backend.
- Users can add a new note using the input form.
- Each note has a delete button to remove it from the list.

## Installation & Setup
### Prerequisites
- Node.js installed
- npm or yarn installed

### Steps to Run Locally
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. The app will be available at:
   ```sh
   http://localhost:5173/
   ```

## Connecting to Backend
The frontend communicates with the backend at `http://localhost:5000/api/notes`.
Ensure the backend is running before using the app.

### API Endpoints Used
- `GET /api/notes` - Fetch all notes.
- `POST /api/notes` - Add a new note.
- `DELETE /api/notes/:id` - Delete a note.

## Deployment
To deploy the frontend:
1. Build the project:
   ```sh
   npm run build
   ```
2. Serve the `dist/` folder using a static file server or deploy to a hosting service like Netlify, Vercel, or Firebase.

---
# expense-tracker-frontend
