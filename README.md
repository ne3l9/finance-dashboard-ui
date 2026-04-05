# 💸 Your's CA — Financial Command Center Dashboard

A modern, decision-driven finance dashboard built to help users **understand, track, and improve their financial behavior** through intuitive UI and meaningful insights.

---

## 🚀 Live Demo

🔗 https://your-app.vercel.app

## 📦 Repository

🔗 https://github.com/your-username/finance-dashboard

## 🎥 Demo Walkthrough

🔗 https://loom.com/your-demo-video

---

## 🧠 Overview

Your's CA is not just a dashboard — it is a **financial awareness system**.

Instead of simply displaying numbers, the interface is designed to:

* Highlight spending patterns
* Provide actionable insights
* Enable better financial decisions

The goal was to build something that feels like a **real SaaS product**, not a static assignment.

---

## ✨ Key Features

### 📊 Dashboard Overview

* Summary cards (Balance, Income, Expenses)
* Balance trend visualization (time-based)
* Spending breakdown (category-wise)

### 📄 Transactions Management

* Full transaction list with:

  * Date, Amount, Category, Type
* Search functionality
* Category filtering
* Sorting (by date and amount)
* Responsive table (mobile + desktop)

### 🔐 Role-Based UI (Simulated)

* **Viewer Mode**

  * Read-only access
* **Admin Mode**

  * Add transactions
  * Delete transactions
  * UI adapts dynamically

### 🧠 Financial Insights

* Highest spending category
* Monthly comparison trends
* Smart observations from data

### ⚡ Financial Health Score (Custom Feature)

A computed score (0–100) based on:

* Spending patterns
* Income vs expense ratio
* Financial consistency

Helps users quickly assess their financial condition.

---

## 🎨 Design & UX

* Dark-first modern UI
* Clean spacing and typography
* Subtle gradients and card elevation
* Color semantics:

  * 🟢 Income
  * 🔴 Expense
* Smooth hover states and transitions
* Fully responsive layout

---

## 🖼️ Screenshots

### 🧾 Dashboard Overview

![Dashboard Screenshot](./screenshots/dashboard.png)

### 📊 Charts & Insights

![Charts Screenshot](./screenshots/charts.png)

### 📄 Transactions Table

![Transactions Screenshot](./screenshots/transactions.png)

### 🌗 Dark Mode

![Dark Mode Screenshot](./screenshots/darkmode.png)

---

## 🏗️ Tech Stack

* **Frontend:** React (Vite)
* **State Management:** Zustand
* **Charts:** Recharts
* **Styling:** CSS / Utility-based styling
* **Icons:** Lucide React

---

## ⚙️ Architecture

```bash
/src
 ├── components/
 │    ├── cards/
 │    ├── charts/
 │    ├── transactions/
 │    ├── insights/
 │    ├── layout/
 │
 ├── store/
 │    └── useFinanceStore.js
 │
 ├── utils/
 │    ├── calculations.js
 │    ├── formatters.js
 │
 ├── mock/
 │    └── data.js
 │
 ├── pages/
 │    └── Dashboard.jsx
```

The project is structured to ensure:

* Scalability
* Component reusability
* Separation of logic and UI

---

## 🧠 State Management Approach

Zustand is used for centralized state management.

Handles:

* Transactions data
* Role switching (Viewer/Admin)
* Filters and sorting
* UI updates

This approach keeps state logic simple, scalable, and efficient.

---

## ⚠️ Edge Cases Handled

* Empty transactions state
* No matching search/filter results
* Responsive behavior across devices
* Large number formatting
* Conditional UI rendering based on role

---

## 📱 Responsiveness

* Fully responsive grid layout
* Mobile-friendly transaction view
* Adaptive charts and components

---

## 🔮 Future Improvements

* Backend integration (Node.js / Firebase)
* Authentication & user accounts
* Real-time financial analytics
* Budget tracking & alerts
* Export functionality (CSV/JSON)
* Advanced filtering & grouping

---

## 🧪 Getting Started

```bash
# Clone the repository
git clone https://github.com/ne3l9/finance-dashboard-UI.git

# Navigate into project
cd finance-dashboard-ui

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 🎯 Design Philosophy

> “Focus on decision-making, not just data display.”

This project prioritizes:

* Clarity over complexity
* Insight over raw data
* User experience over visual noise

---

## 📌 Notes

This project was built as part of a frontend evaluation assignment, with emphasis on:

* UI/UX thinking
* Component architecture
* State management
* Real-world usability

---

## 👨‍💻 Author

**Pratyush Kumar Mishra**

---

## ⭐ If you like this project

Feel free to star the repo or connect!
