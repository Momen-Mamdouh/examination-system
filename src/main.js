var loaderContainer = document.getElementById("loader-container");
var userLogin = JSON.parse(localStorage.getItem("logins")) || {};
toggleLoader();
// **===================================GUARD================================:

homeGuard();
function homeGuard() {
  if (!userLogin || !userLogin.userEmail) {
    window.location.replace("/pages/login.html");
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

var welcomeHeader = document.querySelector("h1");
var users = JSON.parse(localStorage.getItem("users")) || [];
var userName;
var today = new Date().getDate();
var startBtn = document.querySelector(".start-btn");

// !!===================================Check_Login_user================================:

if (userLogin.userEmail) {
  if (isOldLogin()) {
    localStorage.removeItem("logins");
    window.location.pathname = "/pages/login.html";
  } else {
    welcoming();
  }
}

function isOldLogin() {
  return today > userLogin.loginStartDate;
}

function getUserName() {
  for (var i = 0; i < users.length; i++) {
    if (userLogin.userEmail === users[i].email) {
      return users[i].fullname;
    }
  }
}

function welcoming() {
  userName = getUserName();
  welcomeHeader.textContent = "Welcome " + userName;
}

// !!===================================Check_Login_user================================:

// ^^===================================Retake_Exam================================:
startBtn.addEventListener("click", function () {
  userLogin.userScore = null;
  localStorage.setItem("logins", JSON.stringify(userLogin));
  routing("/pages/test.html");
});
// ^^===================================Retake_Exam================================:
