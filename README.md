# 📝 JavaScript Examination System

A fully client-side examination platform built using pure JavaScript, HTML5, and CSS3 without frameworks or build tools.
The project simulates a real online exam workflow including authentication, timed exams, question navigation, answer tracking, scoring, and result analysis.

Developed with a strong focus on DOM manipulation, modular architecture, clean UI rendering, and browser-based state management using Local Storage.

---

## 🚀 Features

### 🔐 Authentication System

* User Registration & Login
* Form validation using Regex patterns
* Password confirmation validation
* Login credential verification
* User session persistence using Local Storage
* Logout functionality

### 🧠 Examination System

* Timed examination workflow
* Dynamic question rendering
* Multiple choice questions (MCQs)
* Question navigation (Next / Previous)
* Mark questions for review
* Sidebar question tracking
* Auto-submit when timer expires
* Manual submission support

### 📊 Result & Progress Tracking

* Instant score calculation
* Percentage & grade display
* Result analysis screen
* User exam history persistence
* Performance tracking across attempts

### 🎨 UI & UX

* Responsive design using Flexbox & CSS Grid
* Dynamic DOM creation using JavaScript
* Interactive animations and transitions
* Toast notification system
* Custom reusable UI utilities
* Modern card-based layouts

---

# 🛠️ Technologies Used

* HTML5
* CSS3
* Vanilla JavaScript (ES5 / Pre-ES6 Style)
* Browser Local Storage API
* Flexbox
* CSS Grid

---

# 📂 Project Structure

```bash
├── assets/
│   ├── images/
│   │   ├── favicon.ico
│   │   ├── welcomeHero.svg
│   │   ├── formBg2.svg
│   │   ├── login-form-img.png
│   │   ├── register-form-img.png
│   │   └── screenshots/
│
├── pages/
│   ├── login.html
│   ├── register.html
│   ├── result.html
│   └── test.html
│
├── src/
│   ├── creation/
│   │   ├── createHome.js
│   │   ├── createLogin.js
│   │   ├── createRegister.js
│   │   ├── createResult.js
│   │   └── createTest.js
│   │
│   ├── pages/
│   │   ├── login.js
│   │   ├── register.js
│   │   ├── result.js
│   │   └── test.js
│   │
│   └── main.js
│
├── styles/
│   ├── base/
│   ├── layout/
│   ├── pages/
│   └── main.css
│
├── index.html
├── LICENSE
└── README.md
```

---

# 📄 Application Pages

## 🏠 Home Page

* Exam introduction
* Instructions section
* Exam statistics
* Start exam button

## 🔑 Login Page

* User authentication
* Validation feedback
* Toast notifications

## 📝 Register Page

* New user registration
* Password confirmation
* Regex-based form validation

## 📚 Test Page

* Question rendering
* Timer handling
* Navigation controls
* Marked questions sidebar

## 📈 Result Page

* Score percentage
* Grade evaluation
* Result summary
* Performance visualization

---

# ⚙️ How It Works

The system is fully browser-based and stores all data locally using the browser's Local Storage API.

### Stored Data Includes:

* Registered users
* Login session
* Exam scores
* User progress history
* Current exam state

No backend or database is required.

---

# ▶️ Getting Started

## 1. Clone Repository

```bash
git clone https://github.com/your-username/examination-system.git
```

## 2. Open Project

Open `index.html` directly in your browser.

No installation or package manager is required.

---

# 🎯 Learning Objectives

This project was built to practice and strengthen:

* JavaScript DOM manipulation
* Browser storage management
* Dynamic UI rendering
* Modular JavaScript architecture
* State handling without frameworks
* Building scalable frontend logic using Vanilla JS
* Responsive web design principles

---

# 🧩 Architecture Notes

The project follows a modular structure where:

* `creation/` handles dynamic UI generation
* `pages/` handles business logic and page functionality
* `styles/` is separated into reusable CSS layers
* Browser Local Storage acts as lightweight persistence

The UI is dynamically generated through JavaScript instead of relying on static HTML markup.

---

# 📸 Screenshots

Add screenshots inside:

```bash
assets/images/screenshots/auth.jpg
```

Example sections you can include in GitHub README:

* Authentication Page
* Exam Interface
* Result Dashboard
* Responsive Mobile Layout

---

# 📜 License

This project is licensed under the Apache License 2.0.

See the `LICENSE` file for more information.

---

# 👨‍💻 Maintainer

## Mo'men Mamdouh

Junior Software Engineer

📧 Email: [momenmamdouhdev@gmail.com](mailto:momenmamdouhdev@gmail.com)

---

# 🌟 Project Highlights

* Framework-free architecture
* Fully dynamic UI generation
* Pure JavaScript implementation
* Responsive exam platform simulation
* Clean separation of concerns
* Local Storage-based persistence
* Realistic exam workflow experience
