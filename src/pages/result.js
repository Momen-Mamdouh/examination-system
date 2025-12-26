var loaderContainer = document.getElementById("loader-container");
var userLogin = JSON.parse(localStorage.getItem("logins")) || {};
toggleLoader();

// **===================================GUARD================================:
resultGuard();
function resultGuard() {
  if (userLogin && typeof userLogin.userScore === "number") {
    return;
  } else {
    window.location.replace("/index.html");
  }
}

// **===================================GUARD================================

// **===================================LOADER================================:

function toggleLoader() {
  loaderContainer.style.display = "block";
  setTimeout(function () {
    loaderContainer.style.display = "none";
  }, 2000);
}

function routing(route) {
  toggleLoader();
  window.location.pathname = route;
}

// **===================================LOADER================================

// !!===================================Assem================================
// reading results from the localStorage
var raw = localStorage.getItem("allScores");
var data = raw ? JSON.parse(raw) : null;

function el(tag, className, text) {
  var node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

// creating the elements
var box = el("div", "box");
document.body.appendChild(box);

box.appendChild(el("h1", null, "Result"));

var circle = el("div", "circle");
var inside = el("div", "inside");
var percentEl = el("h2", null, "0%");
var gradeEl = el("p", null, "-");
var msgEl = el("p", null, "");

inside.appendChild(percentEl);
inside.appendChild(gradeEl);
circle.appendChild(inside);

box.appendChild(circle);
box.appendChild(msgEl);

var backLink = el("a", null, "Back");
backLink.href = "login.html";
box.appendChild(backLink);

// if there is no data
if (!data) {
  msgEl.textContent = "No result found. Please take the exam first.";
} else {
  console.log(data);
  var percentage = Number(data.userScorePercentage) || 0;
  var score = Number(data.userScore) || 0;
  var total = Number(data.totalQuestions) || 0;

  // circle style
  circle.style.background =
    "conic-gradient(#22c55e " + percentage + "%, #334155 0%)";

  percentEl.textContent = percentage + "%";

  // grade + message
  var grade = "";
  var msg = "";

  if (percentage >= 90) {
    grade = "Excellent";
    msg = "Great job!";
  } else if (percentage >= 75) {
    grade = "Very Good";
    msg = "Keep going!";
  } else if (percentage >= 60) {
    grade = "Good";
    msg = "Nice effort.";
  } else if (percentage >= 50) {
    grade = "Pass";
    msg = "You passed.";
  } else {
    grade = "Needs Improvement";
    msg = "Try again.";
  }

  gradeEl.textContent = grade;
  msgEl.textContent = msg + " Score: " + score + "/" + total;
}

// !!===================================Assem================================
