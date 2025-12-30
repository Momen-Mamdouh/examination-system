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

  registerGuard();
  // !!===================================Start_Code================================:

  var registerationForm = document.querySelector(".auth-form");

  var fullname = document.querySelector("#fullname");
  var email = document.querySelector("#email");
  var password = document.querySelector("#password");
  var confirmPassword = document.querySelector("#confirm-password");
  var inputDiv = document.querySelectorAll(".input-div");
  var inputPassword = document.querySelectorAll("input[type=password]");

  var registerBtn = document.querySelector(".main-btn");

  var nameWarning = document.querySelector(".fullname-warning");
  var emailWarning = document.querySelector(".email-warning");
  var passwordWarning = document.querySelector(".password-warning");
  var confirmWarning = document.querySelector(".confirm-password-warning");

  // Regex Patterns
  var nameRegex = /^[a-zA-Z\s]{3,}$/; // At least 3 characters, letters and spaces only
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard Email format
  var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/; /// Allows special characters, requires 1 letter, 1 number, and 8+ length

  // !!===================================GUARD================================:

  function registerGuard() {
    if (authState.currentUser && authState.currentUser.userEmail) {
      replaceRoute("/index.html");
      return; //This line to make sure script execution stop
    } else {
      toggleLoader();
    }
  }

  /*function debounceEvent(spanWarning) {
    var setTimeOutId = null;

    return function (eventObject) {
      if (setTimeOutId) {
        clearTimeout(setTimeOutId);
      }

      setTimeOutId = setTimeout(function () {
        checkInput(eventObject, spanWarning);
      }, DEBOUNCE_TIME);
    };
  }*/

  // !!===================================GUARD================================

  // ^^===================================LOADER================================

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

  // **===================================ROUTING================================:

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

  function checkValidation(regexPattern, inputValue, inputType) {
    var regex;
    if (regexPattern) {
      regex = new RegExp(regexPattern);
    } else {
      if (inputType === "email") {
        regex = emailRegex;
      } else if (inputType === "password") {
        regex = passwordRegex;
      } else {
        regex = nameRegex;
      }
    }
    return regex.test(inputValue);
  }

  function samePassword(confirmPassword, passwordValue) {
    return confirmPassword === passwordValue;
  }

  function isValidForm() {
    var isNameOk = checkValidation(nameRegex, fullname.value, fullname.type);
    var isEmailOk = checkValidation(emailRegex, email.value, email.type);
    var isPassOk = checkValidation(
      passwordRegex,
      password.value,
      password.type
    );
    var isMatch = checkValidation(
      passwordRegex,
      confirmPassword.value,
      confirmPassword.type
    );
    return isNameOk && isEmailOk && isPassOk && isMatch;
  }

  function updateRegisterButton(mustDisabled) {
    if (mustDisabled) {
      //Explict disabled for only last case at which successful login occur to avoid user many submations after successful login
      registerBtn.disabled = mustDisabled;
      return;
    }
    registerBtn.disabled = !(
      isValidForm() && samePassword(confirmPassword.value, password.value)
    );
  }
  updateRegisterButton();

  function isRegisteredBefore(inputEmail) {
    return authState.usersMap[inputEmail];
  }

  function addUser(fullname, email, password) {
    //Data comes already normlized
    var newUser = {
      fullname: fullname,
      email: email,
      password: password,
    };
    users.push(newUser);
    authState.usersMap[newUser.email] = { idx: users.length };
    localStorage.setItem("users", JSON.stringify(users));
  }

  function checkInput(eventObject, spanWarning) {
    var currentTarget = eventObject.target;
    var check;
    if (currentTarget && currentTarget.nodeName == "INPUT") {
      check = checkValidation(
        currentTarget.pattern,
        currentTarget.value,
        currentTarget.type
      );
      showWarning(
        check,
        spanWarning,
        spanWarning.getAttribute("data-err-message")
      );

      updateRegisterButton();
    }
  }

  inputDiv.forEach(function (currentInput) {
    var spanWarning = currentInput.nextElementSibling;
    //var debounceHandler = debounceEvent(spanWarning);  //And here each eventHanlder has it's own Listenerand by this clousre occurs
    currentInput.addEventListener("input", function (eventObject) {
      checkInput(eventObject, spanWarning);
    });
  });

  // !!===================================Check_Validation================================:

  // **===================================Submation================================:

  registerationForm.addEventListener("submit", function (eventObject) {
    eventObject.preventDefault();

    if (isValidForm()) {
      registerBtn.removeAttribute("disabled");
      var inputName = fullname.value;
      var inputEmail = inputNormilization(email.value);
      var inputPassword = password.value;
      var isRegistered = isRegisteredBefore(inputEmail);

      if (isRegistered) {
        showWarning(!isRegistered, emailWarning, "This Email already exists");
        launchToast("This Email already exists", TOAST_TIME, !isRegistered);
        updateRegisterButton(isRegistered);
      } else {
        addUser(inputName, inputEmail, inputPassword);
        launchToast("Registration Successful", TOAST_TIME, !isRegistered);
        updateRegisterButton(!isRegistered);
        setTimeout(function () {
          replaceRoute("/pages/login.html");
        }, TOAST_TIME);
      }
    }
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
