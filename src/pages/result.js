(function () {
  //module script in ES5 style
  // !!===================================Start_Code================================:
  var loaderContainer = document.getElementById("loader-container");
  var backBtn = document.getElementById("back");
  var signOutBtn = document.querySelector(".signout-btn");
  var LOADER_TIME = 1500;

  var users = [];
  try {
    users = JSON.parse(localStorage.getItem("users")) || [];
  } catch (error) {
    users = [];
    console.warn(
      "corrupt users data in localStorage, resetting users array to empty one"
    );
  }

  var allScores = [];
  try {
    allScores = JSON.parse(localStorage.getItem("allScores")) || [];
  } catch (error) {
    allScores = [];
    console.warn(
      "corrupt all scores data in localStorage, resetting allScores array to empty one"
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

  resultGuard();

  // !!===================================Start_Code================================:

  // !!===================================GUARD================================:

  function resultGuard() {
    if (
      currentUser &&
      currentUser.userEmail &&
      typeof currentUser.userScore === "number"
    ) {
      toggleLoader();
      return;
    } else {
      replaceRoute("/index.html");
    }
  }

  /* function isResultPageAllowed() {
     return Date.now() - currentUser.examFinishedAt < RESULT_TTL;
  }*/

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

  function getUserLoginData() {
    for (var i = 0; i < allScores.length; i++) {
      var user = allScores[i];
      if (user.userEmail === currentUser.userEmail) {
        return user;
      }
    }
  }

  // **===================================HELPERS================================:

  var resultData = getUserLoginData() || null;

  // if there is no data
  function renderResult(data, ui) {
    if (!data) {
      ui.message.textContent = "No result found. Please take the exam first.";
      return;
    }

    var percentage = Number(data.userScorePercentage) || 0;
    var score = Number(data.userScore) || 0;
    var total = Number(data.totalQuestions) || 0;

    ui.circle.style.background =
      "conic-gradient(#2F5BFF " + percentage + "%, #d0def0ff  0%)";

    ui.percentEl.textContent = percentage + "%";

    var grade = "";
    var msg = "";
    var primaryColor = ""; // The "progress" color
    var remainingColor = "#e2e8f0"; // The "empty" color (light gray)

    if (percentage >= 90) {
      grade = "Excellent";
      msg = "Great job!";
      primaryColor = "#2F5BFF"; // Vibrant Blue
    } else if (percentage >= 75) {
      grade = "Very Good";
      msg = "Keep going!";
      primaryColor = "#10b981"; // Emerald Green
    } else if (percentage >= 60) {
      grade = "Good";
      msg = "Nice effort.";
      primaryColor = "#3b82f6"; // Sky Blue
    } else if (percentage >= 50) {
      grade = "Pass";
      msg = "You passed.";
      primaryColor = "#f59e0b"; // Amber/Orange
    } else {
      grade = "Failed";
      msg = "Try again.";
      primaryColor = "#ef4444"; // Vivid Red
    }

    ui.circle.style.background =
      "conic-gradient(" +
      primaryColor +
      " " +
      percentage +
      "%, " +
      remainingColor +
      " 0%)";

    ui.gradeEl.textContent = grade;
    // ui.gradeText.style.color = primaryColor;
    ui.message.textContent = msg + " Score: " + score + "/" + total;
  }

  renderResult(resultData, resultUI);

  // ^^===================================EVENTS================================:

  if (signOutBtn) {
    signOutBtn.addEventListener("click", signOut);
  }

  if (backBtn) {
    backBtn.addEventListener("click", function (eventObject) {
      eventObject.preventDefault(); // Prevent default link behavior
      console.log("hi");
      replaceRoute("/index.html");
    });
  }

  // ^^===================================EVENTS================================:
})();
