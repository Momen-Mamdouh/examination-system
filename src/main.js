(function () {
  //module script in ES5 style
  // !!===================================Start_Code================================:
  var loaderContainer = document.getElementById("loader-container");
  var welcomeHeader = document.querySelector("h1");
  var startBtn = document.querySelector(".start-btn");
  var signOutBtn = document.querySelector(".signout-btn");
  var LOADER_TIME = 1500;
  var today = Date.now();

  var users = [];
  try {
    users = JSON.parse(localStorage.getItem("users")) || [];
  } catch (error) {
    users = [];
    console.warn(
      "corrupt users data in localStorage, resetting users array to empty one"
    );
  }

  var currentUser = null;

  try {
    currentUser = JSON.parse(localStorage.getItem("logins")) || null;
  } catch (error) {
    currentUser = null;
    console.warn(
      "corrupt login data in localStorage, resetting login state to null"
    );
  }

  homeGuard();

  // !!===================================Start_Code================================:

  // !!===================================GUARD================================:

  function homeGuard() {
    if (!currentUser || !currentUser.userEmail) {
      replaceRoute("/pages/login.html");
      return; //This line to make sure script execution stop
    } else {
      if (oneDayPassed()) {
        signOut();
      } else {
        welcoming();
      }
    }
  }

  function signOut() {
    localStorage.removeItem("logins");
    replaceRoute("/pages/login.html");
  }

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

  // **===================================HELPERS================================:

  function capitalizeFirstLetter(str) {
    if (str.length === 0) {
      // Handle empty string case
      return "";
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function oneDayPassed() {
    var oneDayInMs = 24 * 60 * 60 * 1000;
    // Check if the login session is from a previous day
    return today - currentUser.loginStartDate >= oneDayInMs;
  }

  function getUserName() {
    for (var i = 0; i < users.length; i++) {
      if (currentUser.userEmail === users[i].email) {
        return users[i].fullname;
      }
    }
    return "User"; // Fallback
  }

  function welcoming() {
    var userName = getUserName();
    welcomeHeader.textContent = "Welcome, " + capitalizeFirstLetter(userName);
  }

  // **===================================HELPERS================================:

  // ^^===================================EVENTS================================:

  if (startBtn) {
    startBtn.addEventListener("click", function (eventObject) {
      eventObject.preventDefault(); // Prevent default link behavior as here startBtn is an anchor tag
      currentUser.userScore = null;
      localStorage.setItem("logins", JSON.stringify(currentUser));
      replaceRoute("/pages/test.html");
    });
  }

  if (signOutBtn) {
    signOutBtn.addEventListener("click", signOut);
  }

  // ^^===================================EVENTS================================:
})();
