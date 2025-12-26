var loaderContainer = document.getElementById("loader-container");
var userLogin = JSON.parse(localStorage.getItem("logins")) || {};
toggleLoader();

var registerationForm = document.querySelector(".auth-form");

var fullname = document.querySelector("#fullname");
var email = document.querySelector("#email");
var password = document.querySelector("#password");
var confirmPassword = document.querySelector("#confirm-password");
var inputDiv = document.querySelectorAll(".input-div");
var inputPassword = document.querySelectorAll("input[type=password]");

var registerBtn = document.querySelector(".main-btn");
registerBtn.setAttribute("disabled", "true");

var nameWarning = document.querySelector(".fullname-warning");
var emailWarning = document.querySelector(".email-warning");
var passwordWarning = document.querySelector(".password-warning");
var confirmWarning = document.querySelector(".confirm-password-warning");

// Regex Patterns
var nameRegex = /^[a-zA-Z\s]{3,}$/; // At least 3 characters, letters and spaces only
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard Email format
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
var users = JSON.parse(localStorage.getItem("users")) || [];

function checkPatternValidation(regexPattern, inputValue) {
  var regex = new RegExp(regexPattern);
  return regex.test(inputValue);
}

function checkValidation(regex, inputValue) {
  return regex.test(inputValue);
}

function samePassword(confirmPassword, passwordValue) {
  return confirmPassword === passwordValue;
}

function showWarning(isValid, errorSpan, message) {
  errorSpan.style.display = isValid ? "none" : "block";
  errorSpan.textContent = isValid ? "" : message;
}

function isRegisteredBefore(inputEmail) {
  var isRegistered = false;
  for (var i = 0; i < users.length; i++) {
    if (users[i].email == inputEmail) {
      isRegistered = true;
      break;
    }
  }
  return isRegistered;
}

function addUser(fullname, email, password) {
  var newUser = {
    fullname: fullname,
    email: email,
    password: password,
  };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
}

function isValidForm() {
  var isNameOk = checkValidation(nameRegex, fullname.value);
  var isEmailOk = checkValidation(emailRegex, email.value);
  var isPassOk = checkValidation(passwordRegex, password.value);
  var isMatch = checkValidation(passwordRegex, confirmPassword.value);
  return isNameOk && isEmailOk && isPassOk && isMatch;
}

function updateButtonState() {
  var validForm = isValidForm();
  registerBtn.disabled = !validForm;
}

inputDiv.forEach(function (currentInput) {
  var nextSibling = currentInput.nextElementSibling;

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

      updateButtonState();
    }
  });
});

// !!===================================Check_Validation================================:

// **===================================Submation================================:

registerationForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var toastTime = 2000;

  if (isValidForm()) {
    registerBtn.removeAttribute("disabled");
    var inputName = fullname.value.trim().toLowerCase();
    var inputEmail = email.value.trim().toLowerCase();
    var inputPassword = password.value.trim();
    var isRegistered = isRegisteredBefore(inputEmail);

    if (isRegistered) {
      showWarning(isRegistered, emailWarning, "this email already exists");
      lanuchToast("This email already exists", toastTime, "d-none");
    } else {
      addUser(inputName, inputEmail, inputPassword);
      lanuchToast("Registration Successful", toastTime, "d-flex");
      setTimeout(function () {
        routing("/pages/login.html");
      }, toastTime);
    }
  }
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

  if (showCorrect == "d-flex") {
    toastDesc.className = "success-color";
    toastIcon.querySelector(".fa-circle-check").classList.add(showCorrect);
    toastIcon.querySelector(".fa-circle-xmark").classList.add("d-none");
  } else {
    toastDesc.className = "error-color";
    toastIcon.querySelector(".fa-circle-check").classList.add(showCorrect);
    toastIcon.querySelector(".fa-circle-xmark").classList.add("d-flex");
  }

  setTimeout(function () {
    toastEle.className = toastEle.className.replace("show");
  }, 10000);
}

// !!===================================Toggle-Toast================================
