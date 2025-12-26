var loaderContainer = document.getElementById("loader-container");
var userLogin = JSON.parse(localStorage.getItem("logins")) || {};
var users = JSON.parse(localStorage.getItem("users")) || [];
toggleLoader();

var loginForm = document.querySelector(".auth-form");

var email = document.querySelector("#email");
var password = document.querySelector("#password");

var inputDiv = document.querySelectorAll(".input-div");
var inputPassword = document.querySelectorAll("input[type=password]");

var loginBtn = document.querySelector(".main-btn");

var emailWarning = document.querySelector(".email-warning");
var passwordWarning = document.querySelector(".password-warning");

// Regex Patterns
var emailRegex = /^[^\\s@]+@[^\\s@]+\.[^\\s@]+$/; // Standard Email format
var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/; /// Allows special characters, requires 1 letter, 1 number, and 8+ length

// **===================================GUARD================================:
loginGuard();
function loginGuard() {
  if (userLogin && userLogin.userEmail) {
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

// !!===================================Check_Validation================================:

var isValid = true;

function checkPatternValidation(regexPattern, inputValue) {
  var regex = new RegExp(regexPattern);
  return regex.test(inputValue);
}

function checkValidation(regex, inputValue) {
  return regex.test(inputValue);
}

function showWarning(isValid, errorSpan, message) {
  errorSpan.style.display = isValid ? "none" : "block";
  errorSpan.textContent = isValid ? "" : message;
}

function isFound(key, inputValue) {
  for (var i = 0; i < users.length; i++) {
    if (users[i][key] === inputValue) {
      if (users[i][key] === inputValue) {
        return { email: inputValue, idx: i };
      }
    }
  }
}

function isValidLogin() {
  var foundEmail = isFound("email", email.value.trim().toLowerCase());
  return !!foundEmail;
}

inputDiv.forEach(function (currentInput) {
  var nextSibling = currentInput.nextElementSibling;
  console.log(currentInput);
  currentInput.addEventListener("input", function (eventObject) {
    var currentTarget = eventObject.target;
    var check;

    if (currentTarget && currentTarget.nodeName == "INPUT") {
      check = checkPatternValidation(
        currentTarget.pattern,
        currentTarget.value
      );
      showWarning(
        check,
        nextSibling,
        nextSibling.getAttribute("data-err-message")
      );
    }
  });
});

// !!===================================Check_Validation================================:

// **===================================Submation================================:

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var toastTime = 2000;
  var emailInput = email.value.trim().toLowerCase();
  var foundUser = isFound("email", emailInput);

  console.log(isValidLogin());
  if (!foundUser) {
    showWarning(false, emailWarning, "Email not found");
    lanuchToast("Invalid email", toastTime, "d-flex");
    return;
  }
  if (users[foundUser.idx].password !== password.value.trim()) {
    showWarning(false, passwordWarning, "Incorrect password");
    lanuchToast("Wrong password", toastTime, "d-flex");
    return;
  }
  var userToken = {
    userEmail: emailInput,
    loginStartDate: new Date().getDate(),
  };

  userLogin = userToken;
  localStorage.setItem("logins", JSON.stringify(userToken));
  lanuchToast("Successful login", toastTime, "d-none");
  setTimeout(function () {
    routing("index.html");
  }, toastTime);
});

// **===================================Submation================================

// !!===================================Toggle-Password================================:

inputPassword.forEach(function (input) {
  var inputViewIcon = input.parentElement.querySelector(".fa-eye");

  if (inputViewIcon) {
    inputViewIcon.addEventListener("click", function () {
      var isPassword = input.type == "password";
      input.type = isPassword ? "text" : "password";
      if (isPassword) {
        inputViewIcon.classList.add("fa-eye-slash");
        inputViewIcon.classList.remove("fa-eye");
      } else {
        inputViewIcon.classList.remove("fa-eye-slash");
        inputViewIcon.classList.add("fa-eye");
      }
    });
  }
});

// !!===================================Toggle-Password================================

// !!===================================Toggle-Toast================================:
var toastEle = document.getElementById("toast");
var toastDesc = toastEle.querySelector("#desc");
var toastIcon = toastEle.querySelector("#img");

function lanuchToast(message, toastTime, showCorrect) {
  toastDesc.textContent = message;
  toastEle.className = "show";

  var successIcon = toastIcon.querySelector(".fa-circle-check");
  var errorIcon = toastIcon.querySelector(".fa-circle-xmark");

  successIcon.classList.remove("d-flex", "d-none");
  errorIcon.classList.remove("d-flex", "d-none");

  if (showCorrect == "d-none") {
    toastDesc.className = "success-color";
    successIcon.classList.add("d-flex");
    errorIcon.classList.add("d-none");
  } else {
    toastDesc.className = "error-color";
    successIcon.classList.add("d-none");
    errorIcon.classList.add("d-flex");
  }

  setTimeout(function () {
    toastEle.className = toastEle.className.replace("show", "");
  }, toastTime);
}

// !!===================================Toggle-Toast================================
