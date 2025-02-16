# Expense Tracker (Frontend)

This is the frontend of the **Expense Tracker** application, built using **React.js** and **Bootstrap**. It allows users to **register, log in, add expenses, upload receipts, filter expenses by category, and log out** securely.

## Features
- 🔐 **User Authentication** (Register, Login, Logout)
- 📌 **Add, View, and Delete Expenses**
- 📁 **Receipt Upload & Preview**
- 📊 **Filter Expenses by Category**
- 🏷 **Custom Expense Categories**
- 📱 **Responsive Design**

## Tech Stack
- **Frontend:** React.js, React Bootstrap
- **State Management:** React Hooks (useState, useEffect)
- **Routing:** React Router
- **Styling:** CSS, Bootstrap
- **API Calls:** Fetch API

## Installation & Setup
### Prerequisites
Ensure you have **Node.js** and **npm** installed.

### Steps to Run Locally
1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-username/expense-tracker-frontend.git
   cd expense-tracker-frontend
   ```
2. **Install Dependencies**
   ```sh
   npm install
   ```
3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add:
   ```sh
   VITE_API_BASE_URL=<your_backend_api_url>
   ```
4. **Run the App**
   ```sh
   npm run dev
   ```

## Project Structure
```
📂 src
 ├── 📂 assets            # Images & static files
 ├── 📂 components        # Reusable UI components
 ├── 📂 pages             # Page components (Login, Register, Dashboard, etc.)
 ├── 📂 styles            # Global styles
 ├── 📄 App.jsx           # Main App component
 ├── 📄 main.jsx          # ReactDOM rendering
 ├── 📄 config.js         # API base URL
```

## API Endpoints Used
- **POST** `/register` → User Registration
- **POST** `/login` → User Login
- **GET** `/expenses` → Fetch User Expenses
- **POST** `/expenses` → Add New Expense
- **DELETE** `/expenses/:id` → Delete Expense

## Deployment
You can deploy the app using **Vercel** or **Netlify**:
```sh
npm run build
```
Then follow the respective hosting provider's instructions.

## Areas for Improvement
- ✅ **Expense Analytics Dashboard** (Charts & Reports)
- ✅ **Recurring Expenses Feature**
- ✅ **Dark Mode UI Support**
- ✅ **Mobile App Version**
