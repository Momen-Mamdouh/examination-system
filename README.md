📝 JavaScript Examination System

A web-based examination system frontend fully client-side built using pure JavaScript, pure CSS, and semantic HTML.  
This project focuses on clarity, maintainability, and correct separation of concerns without using any external frameworks or libraries.

This project simulates a real online examination platform with authentication, timed exams, navigation control, and result analysis, all handled using vanilla JavaScript and Local Storage.

## Project Overview

The system allows users to:

    -Register and log in
    -Take a timed examination
    -Navigate between questions
    -Mark questions for review
    -Submit answers manually or automatically when time expires
    -View detailed results and progress analysis
    -All UI rendering, logic, and state management are implemented using JavaScript DOM manipulation.

## Features

- Dynamic DOM Manipulation ( Create, add, update, and remove HTML elements directly from JavaScript ) -> No static exam markup — the interface is rendered dynamically
- User login interface -> includes Registration and Login, includes:
  First name & last name (alphabetical characters only), Valid email address, Password (minimum 8 characters), Password confirmation, User data is stored in Local Storage, Login validates credentials against stored user data.
- Exam interface with multiple questions ( Questions are stored in a static JavaScript array ) -> Each question contains: Question text, Multiple choices, flag.
  With Navigate using Next and Previous buttons, Users can mark questions (Sidebar displays marked questions) for later review, After submission, navigation is disabled.
  -Timed Exam with a predefined duration displayed in a counter to user at expiration -> Exam is auto-submitted -> Score calculated based on correct answers
- Result summary view -> saved in Local Storage and linkd to the logged-in user -> with also User performance growth analysis across exams
- Responsive layout using CSS Grid & Flex.
- Modular JavaScript architecture
- No frameworks, no build tools

## Technologies Used

    - HTML5
    - CSS3 (Grid & Flexbox)
    - Vanilla JavaScript.
    - Browser Local Storage API

## Application Pages

    -Home Page: with -> Welcome message, Exam instructions, Button to start the test.
    -Registration Page: with -> New user sign-up.
    -Login Page: with -> User authentication.
    -Exam Page: with -> Question display, Timer, Navigation & marking sidebar.
    -Result Page: with -> Score summary, Answer analysis, Progress tracking.
    -Timeout Page: with -> Displayed when exam time ends automatically.

## Project Structure

├── assets/
│ ├── fonts/ # Custom web fonts
│ └── images/ # favicon.ico, formBg.svg, welcomeHero.svg
├── pages/
│ ├── login.html # Login interface
│ ├── register.html # User sign-up
│ ├── result.html # Score summary and analysis
│ └── test.html # Core examination interface
├── src/
│ ├── pages/
│ │ ├── auth.js # Authentication logic (Login/Register)
│ │ └── test.js # Exam and timer logic
│ └── main.js # Entry point logic
├── styles/
│ ├── pages/
│ │ ├── auth.css # Auth-specific styling
│ │ ├── home.css # Landing page styling
│ │ └── test.css # Exam interface styling
│ └── styleSheet.css # Global styles and CSS variables
├── index.html # Main entry (Home/Instructions)
└── README.md # Project documentation

## How to Run

1. Clone the repository to your local machine.
2. Open `index.html` in any modern web browser.
3. No local server or installation is required as the project uses Vanilla JS and Local Storage.

## Learning Objectives

This project was built to:

    -Master JavaScript DOM manipulation

    -Understand client-side state management

    -Practice building scalable logic without frameworks

    -Simulate real-world examination workflows
