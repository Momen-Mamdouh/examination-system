// **===================================GUARD================================:
var userLogin = JSON.parse(localStorage.getItem("logins")) || {};
homeGuard();
function homeGuard() {
  if (!userLogin || !userLogin.userEmail) {
    window.location.replace("/pages/login.html");
  }
}
// **===================================GUARD================================

var welcomeHeader = document.querySelector("h1");
var users = JSON.parse(localStorage.getItem("users")) || [];
var userName;
var today = new Date().getDate();

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
  console.log(userLogin.loginStartDate, today);
  console.log(today > userLogin.loginStartDate);
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
