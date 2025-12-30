(function () {
  //module script in ES5 style
  // !!===================================Start_Code================================:
  var loaderContainer = document.getElementById("loader-container");
  var LOADER_TIME = 1500;
  var TOAST_TIME = 2000;
  var DEBOUNCE_TIME = 800;

  var users = [];
  try {
    users = JSON.parse(localStorage.getItem("users")) || [];
  } catch (error) {
    users = [];
    console.warn(
      "corrupt users data in localStorage, resetting users array to empty one"
    );
  }

  var authState = {
    formData: { email: false, password: false },
    usersMap: {},
    currentUser: null,
  };

  try {
    authState.currentUser = JSON.parse(localStorage.getItem("logins")) || null;
  } catch (error) {
    authState.currentUser = null;
    console.warn(
      "corrupt login data in localStorage, resetting login state to null"
    );
  }

  loginGuard();

  // !!===================================Start_Code================================:

  var loginForm = document.querySelector(".auth-form");

  var email = document.querySelector("#email");
  var password = document.querySelector("#password");

  var inputDiv = document.querySelectorAll(".input-div");
  var inputPassword = document.querySelectorAll("input[type=password]");

  var loginBtn = document.querySelector(".main-btn");

  var emailWarning = document.querySelector(".email-warning");
  var passwordWarning = document.querySelector(".password-warning");

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard Email format
  var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/; /// Allows special characters, requires 1 letter, 1 number, and 8+ length

  // !!===================================GUARD================================:

  function loginGuard() {
    if (authState.currentUser && authState.currentUser.userEmail) {
      replaceRoute("/index.html");
      return; //This line to make sure script execution stop
    } else {
      toggleLoader();
    }
  }

  /*  function debounceEvent() {
    var setTimeOutId = null;

    return function (eventObject) {
      if (setTimeOutId) {
        clearTimeout(setTimeOutId);
      }

      setTimeOutId = setTimeout(function () {
        checkInput(eventObject);
      }, DEBOUNCE_TIME);
    };
  }

  */

  // !!===================================GUARD================================

  // ^^===================================LOADER================================:

  function toggleLoader() {
    if (!loaderContainer) return;
    loaderContainer.style.display = "block";
    setTimeout(function () {
      loaderContainer.style.display = "none";
    }, LOADER_TIME);
  }

  // ^^===================================LOADER================================

  // **===================================ROUTING================================:

  function routing(route) {
    toggleLoader();
    setTimeout(function () {
      window.location.pathname = route;
    }, LOADER_TIME);
    return; //This line to make sure script execution stop
  }

  function replaceRoute(route) {
    toggleLoader();
    setTimeout(function () {
      window.location.replace(route);
    }, LOADER_TIME);
    return; //This line to make sure script execution stop
  }

  // **===================================ROUTING================================

  // !!===================================Check_Validation================================:

  function showWarning(isValid, errorSpan, message) {
    errorSpan.style.display = isValid ? "none" : "block";
    errorSpan.textContent = isValid ? "" : message;
  }

  function inputNormilization(inputValue) {
    return inputValue.trim().toLowerCase();
  }

  function makeEmailsMap() {
    //This function created to make a map of users in website so we only search for user by email in map with O(1).
    //Else you'll have to create fucntion that loop each in users asn check for equality of email with O(n).
    users.forEach(function (user, idx) {
      var key = inputNormilization(users[idx]["email"]);
      var value = { idx: idx };
      authState.usersMap[key] = value;
    });
  }
  makeEmailsMap();

  function checkEmailValidation(regexPattern, inputValue, inputType) {
    var regex;
    if (inputType === "email") {
      if (regexPattern) {
        regex = new RegExp(regexPattern);
      } else {
        regex = emailRegex;
      }
      return regex.test(inputValue);
    } else {
      return null;
    }
  }

  function isFormFull() {
    return authState.formData.email && authState.formData.password;
  }

  function updateLoginButton(mustDisabled) {
    if (mustDisabled) {
      //Explict disabled for only last case at which successful login occur to avoid user many submations after successful login
      loginBtn.disabled = mustDisabled;
      return;
    }
    loginBtn.disabled = !(
      isFormFull() && checkEmailValidation(email.pattern, email.value, "email")
    );
  }
  updateLoginButton();

  function checkInput(eventObject) {
    var currentTarget = eventObject.target;
    if (currentTarget && currentTarget.nodeName == "INPUT") {
      authState.formData[currentTarget.type] = currentTarget.value !== "";
      showWarning(
        authState.formData.email,
        emailWarning,
        "Please enter valid Email"
      );
      if (currentTarget.type === "email") {
        showWarning(
          checkEmailValidation(
            currentTarget.pattern,
            currentTarget.value,
            currentTarget.type
          ),
          emailWarning,
          "Please enter valid Email"
        );
      }

      showWarning(
        authState.formData.password,
        passwordWarning,
        "Please enter valid password"
      );
      updateLoginButton();
    }
  }

  inputDiv.forEach(function (currentInput) {
    //var debounceHandler = debounceEvent(); //And here each eventHanlder has it's own Listenerand by this clousre occurs
    currentInput.addEventListener("input", function (eventObject) {
      checkInput(eventObject);
    });
  });

  // !!===================================Check_Validation================================:

  // **===================================Submation================================:

  loginForm.addEventListener("submit", function (eventObject) {
    eventObject.preventDefault();
    var emailInput = inputNormilization(email.value);
    var foundUser = authState.usersMap[emailInput];

    if (!foundUser) {
      updateLoginButton();
      showWarning(foundUser, emailWarning, "Email not found");
      launchToast("Invalid email", TOAST_TIME, foundUser);
      return;
    }
    if (users[foundUser.idx].password !== password.value) {
      updateLoginButton();
      showWarning(false, passwordWarning, "Incorrect password");
      launchToast("Wrong password", TOAST_TIME, false);
      return;
    }
    var userToken = {
      userEmail: emailInput,
      loginStartDate: Date.now(),
    };

    authState.currentUser = userToken;
    localStorage.setItem("logins", JSON.stringify(userToken));
    launchToast("Successful login", TOAST_TIME, foundUser);
    updateLoginButton(true);
    setTimeout(function () {
      replaceRoute("/index.html");
    }, TOAST_TIME);
  });

  // **===================================Submation================================

  // ~~===================================Toggle-Password================================:

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

  // ~~===================================Toggle-Password================================

  // ~~===================================Toggle-Toast================================:
  var toastEle = document.getElementById("toast");
  var toastDesc = toastEle.querySelector("#desc");
  var toastIcon = toastEle.querySelector("#img");

  function launchToast(message, toastTime, isSuccess) {
    toastDesc.textContent = message;
    toastEle.className = "show";

    var successIcon = toastIcon.querySelector(".fa-circle-check");
    var errorIcon = toastIcon.querySelector(".fa-circle-xmark");

    successIcon.classList.remove("d-flex", "d-none");
    errorIcon.classList.remove("d-flex", "d-none");

    if (isSuccess) {
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

  // ~~===================================Toggle-Toast================================
})();
