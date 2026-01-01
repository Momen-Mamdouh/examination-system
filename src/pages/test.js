(function () {
  //module script in ES5 style
  // !!================================Data=================================:

  var originalQuestions = [
    {
      question: "Which keyword is used to declare a constant in JavaScript?",
      choices: [
        { text: "var", isCorrect: false },
        { text: "let", isCorrect: false },
        { text: "const", isCorrect: true },
        { text: "static", isCorrect: false },
      ],
    },
    {
      question: "What does DOM stand for?",
      choices: [
        { text: "Document Object Model", isCorrect: true },
        { text: "Data Object Model", isCorrect: false },
        { text: "Document Oriented Method", isCorrect: false },
        { text: "Digital Object Manager", isCorrect: false },
      ],
    },
    {
      question: "Which method selects all elements that match a CSS selector?",
      choices: [
        { text: "getElementById", isCorrect: false },
        { text: "getElementsByClassName", isCorrect: false },
        { text: "querySelector", isCorrect: false },
        { text: "querySelectorAll", isCorrect: true },
      ],
    },
    {
      question: "Which value represents the absence of a value in JavaScript?",
      choices: [
        { text: "0", isCorrect: false },
        { text: "null", isCorrect: true },
        { text: "false", isCorrect: false },
        { text: "NaN", isCorrect: false },
      ],
    },
    {
      question: "Which operator is used for strict equality comparison?",
      choices: [
        { text: "==", isCorrect: false },
        { text: "=", isCorrect: false },
        { text: "===", isCorrect: true },
        { text: "!=", isCorrect: false },
      ],
    },
    {
      question: "Which method converts a JSON string into a JavaScript object?",
      choices: [
        { text: "JSON.parse()", isCorrect: true },
        { text: "JSON.stringify()", isCorrect: false },
        { text: "JSON.object()", isCorrect: false },
        { text: "parse.JSON()", isCorrect: false },
      ],
    },
    {
      question:
        "Which loop is best used when the number of iterations is known?",
      choices: [
        { text: "while", isCorrect: false },
        { text: "do...while", isCorrect: false },
        { text: "for", isCorrect: true },
        { text: "for...in", isCorrect: false },
      ],
    },
    {
      question: "Which function is used to delay code execution in JavaScript?",
      choices: [
        { text: "delay()", isCorrect: false },
        { text: "wait()", isCorrect: false },
        { text: "setTimeout()", isCorrect: true },
        { text: "setInterval()", isCorrect: false },
      ],
    },
    {
      question: "What will typeof [] return?",
      choices: [
        { text: "array", isCorrect: false },
        { text: "object", isCorrect: true },
        { text: "list", isCorrect: false },
        { text: "undefined", isCorrect: false },
      ],
    },
    {
      question: "Which event is triggered when an input field loses focus?",
      choices: [
        { text: "focus", isCorrect: false },
        { text: "change", isCorrect: false },
        { text: "blur", isCorrect: true },
        { text: "input", isCorrect: false },
      ],
    },
  ];

  var questions =
    JSON.parse(localStorage.getItem("questions")) ||
    shuffleQuestions(originalQuestions);
  localStorage.setItem("questions", JSON.stringify(questions));

  var quizState = {
    currentQuestionIndex: 0,
    score: 0,
  };

  var studentAnswers =
    JSON.parse(localStorage.getItem("currentStudentAnswers")) ||
    Array(questions.length).fill(null); //add student Answers

  // !!================================Data=================================

  // !!===================================Start_Code================================:
  var loaderContainer = document.getElementById("loader-container");
  var LOADER_TIME = 1500;
  var EXAM_TIME = 1200;
  var timeLeft = JSON.parse(localStorage.getItem("timeLeft")) || EXAM_TIME; //Exam time in seconds.
  var SECOND = 1000; //Second value as milliSecond.
  var examTimeInMilli = timeLeft * SECOND; //Exam time in milliSeconds.
  var examTimerIntervalId;
  var progessPercentageIncrease = 100 / (examTimeInMilli / SECOND);
  var currentProgessWidth = progessPercentageIncrease;

  var timeToDisplay = "";
  var timeCounter = headerUI.timeCounter;
  var timeClockIcon = headerUI.timeIcon;
  var progresBar = headerUI.progressBar;

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

  // !!===================================GUARD================================:

  testGuard();
  function testGuard() {
    if (currentUser && currentUser.userEmail) {
      console.log("LOGIN");
      if (timeLeft <= 0) {
        console.log("NO TIME LEFT GO RESULT");
        replaceRoute("/pages/result.html");
        return false;
      }
    } else {
      console.log("NOT LOGIN");
      replaceRoute("/pages/login.html");
      return false;
    }
    return true;
  }
  if (!testGuard()) return;

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

  // !!===============================Rendering===========================:

  function renderQuestion(index) {
    updatePrevBtnState();
    updateNextBtnState();
    updateSubmitBtnState();

    var currentQuestion = questions[index];
    questionTitle.textContent = index + 1 + ".Question:";
    questionText.textContent = currentQuestion.question;

    removeElements(answersContainer);

    currentQuestion.choices.forEach(function (choice, idx) {
      var answerNode = createAnswer(choice.text, idx + 1);

      if (studentAnswers[index] == idx + 1) {
        answerNode.querySelector("input").checked = true;
      }

      appendElements([answerNode], answersContainer);
    });
    clickInInput();
  }

  function shuffleQuestions(questionsArray) {
    // make a shallow copy so the original array is not mutated
    var shuffled = questionsArray.slice();

    for (var i = shuffled.length - 1; i > 0; i--) {
      // pick a random index from 0 to i
      var randomIndex = Math.floor(Math.random() * (i + 1));

      // swap elements
      var temp = shuffled[i];
      shuffled[i] = shuffled[randomIndex];
      shuffled[randomIndex] = temp;
    }

    return shuffled;
  }

  // !!===============================Rendering===========================

  // ^^===============================Update-States===========================:

  function updateNextBtnState() {
    nextBtn.disabled = quizState.currentQuestionIndex >= questions.length - 1;
  }

  function updateSubmitBtnState() {
    submitBtn.disabled = !studentAnsweredAll();
  }

  function updatePrevBtnState() {
    prevBtn.disabled = quizState.currentQuestionIndex === 0;
  }

  function clickInInput() {
    var inputsWrappers = document.querySelectorAll(".checkbox-wrapper");
    inputsWrappers.forEach(function (wrapper) {
      wrapper.addEventListener("click", function (eventObject) {
        var input = wrapper.querySelector("input");
        if (input.name === "answer") {
          studentAnswers[quizState.currentQuestionIndex] = Number(input.value);
          localStorage.setItem(
            "currentStudentAnswers",
            JSON.stringify(studentAnswers)
          );
          updateSubmitBtnState();
        }
        input.checked = true;
      });
    });
  }

  function studentAnsweredAll() {
    var allAnswered = false;
    for (var i = 0; i < studentAnswers.length; i++) {
      if (studentAnswers[i]) {
        allAnswered = true;
        continue;
      } else {
        allAnswered = false;
        break;
      }
    }
    return allAnswered;
  }

  function getScore() {
    var score = 0;

    questions.forEach(function (question, idx) {
      var correctIndex = -1;

      for (var i = 0; i < question.choices.length; i++) {
        if (question.choices[i].isCorrect) {
          correctIndex = i + 1; // +1 because your answers are 1-based
          break;
        }
      }

      if (studentAnswers[idx] === correctIndex) score++;
    });
    var total = questions.length;
    var percentage = Math.round((score / total) * 100);

    quizState.score = score;
    quizState.total = total;
    quizState.percentage = percentage;
    console.log(quizState);
  }

  function saveUserScore() {
    currentUser.userScore = quizState.score;
    var newScoreEntry = {
      userEmail: currentUser.userEmail,
      userScore: currentUser.userScore,
      totalQuestions: quizState.total,
      userScorePercentage: quizState.percentage,
      scoreDate: new Date(),
    };

    console.log(allScores, newScoreEntry);
    allScores.push(newScoreEntry);
    localStorage.setItem("logins", JSON.stringify(currentUser));
    localStorage.setItem("allScores", JSON.stringify(allScores));
  }

  function resetTimeLeft() {
    timeLeft = EXAM_TIME;
    localStorage.setItem("timeLeft", JSON.stringify(EXAM_TIME));
  }

  function resetMarkedQuestions() {
    markedQuestionsArr = [];
    localStorage.removeItem("markedQuestions");
  }

  function resetQuestionPage() {
    quizState = {
      currentQuestionIndex: 0,
      score: 0,
    };

    studentAnswers.fill(null);
    localStorage.setItem(
      "currentStudentAnswers",
      JSON.stringify(studentAnswers)
    );
    renderQuestion(0);
    resetMarkedQuestions();
    updateNextBtnState();
    updateSubmitBtnState();
    updatePrevBtnState();
  }

  function resetExam() {
    clearInterval(examTimerIntervalId);
    resetTimeLeft();
    stopClock();
    getScore();
    saveUserScore();
    resetQuestionPage();
  }

  // ^^===============================Update-States===========================

  // ^^===============================Mark-Questions===========================

  var markedQuestionsArr =
    JSON.parse(localStorage.getItem("markedQuestions")) || [];
  var markBtn = document.querySelector(".mark-btn");

  function checkMarked(x) {
    if (markedQuestionsArr.length == 0) return false;
    for (var i = 0; i < markedQuestionsArr.length; i++) {
      if (x == markedQuestionsArr[i]) {
        return true;
      }
    }
    return false;
  }
  function createMarkedQuestion(indexToMark) {
    var markedQuestion = document.createElement("button");
    // var currentIndex = quizState.currentQuestionIndex;
    markedQuestion.className = "marked-question";
    markedQuestion.value = indexToMark;
    markedQuestion.textContent = "Question " + (indexToMark + 1);
    markedQuestion.addEventListener("click", function () {
      quizState.currentQuestionIndex = indexToMark;
      renderQuestion(indexToMark);
    });

    // remove button
    var removeBtn = document.createElement("span"); // will make the span behave as a button inside
    removeBtn.className = "mark-remove";
    removeBtn.textContent = "X";
    removeBtn.addEventListener("click", function (eventObject) {
      eventObject.stopPropagation();
      var pos = markedQuestionsArr.indexOf(indexToMark);
      if (pos > -1) {
        markedQuestionsArr.splice(pos, 1);
        localStorage.setItem(
          "markedQuestions",
          JSON.stringify(markedQuestionsArr)
        );
      }
      sidebar.removeChild(markedQuestion);
    });
    markedQuestion.appendChild(removeBtn);
    markSidebar.appendChild(markedQuestion);
  }

  function renderMarkedSidebar() {
    markSidebar.innerHTML = "<h2>Marked Questions: </h2>"; // Clear existing
    markedQuestionsArr.forEach(function (index) {
      createMarkedQuestion(index);
    });
  }

  // already marked toast
  var markMsg = document.getElementById("markMsg");
  var markMsgTimeoutId = null;

  function showMarkMsg(text) {
    if (!markMsg) return;

    markMsg.textContent = text;
    markMsg.style.display = "block";

    clearTimeout(markMsgTimeoutId);
    markMsgTimeoutId = setTimeout(function () {
      markMsg.style.display = "none";
    }, 1500);
  }
  // ^^===============================Mark-Questions===========================

  // !!===============================Listening_Events===========================:

  prevBtn.addEventListener("click", function () {
    quizState.currentQuestionIndex--;
    renderQuestion(quizState.currentQuestionIndex);
  });

  nextBtn.addEventListener("click", function () {
    quizState.currentQuestionIndex++;
    renderQuestion(quizState.currentQuestionIndex);
  });

  answersContainer.addEventListener("change", function (eventObject) {
    if (eventObject.target.name === "answer") {
      studentAnswers[quizState.currentQuestionIndex] = Number(
        eventObject.target.value
      );
      localStorage.setItem(
        "currentStudentAnswers",
        JSON.stringify(studentAnswers)
      );
      updateSubmitBtnState();
    }
  });

  submitBtn.addEventListener("click", function () {
    if (studentAnsweredAll()) {
      resetExam();
      replaceRoute("/pages/result.html");
    } else {
      updateSubmitBtnState();
      showMarkMsg("Please Answer all questions before submation");
    }
  });

  markBtn.addEventListener("click", function () {
    var currentIndex = quizState.currentQuestionIndex;
    var isMarked = checkMarked(currentIndex);
    if (isMarked) {
      showMarkMsg("Already marked!");
      return;
    } else {
      markedQuestionsArr.push(currentIndex);
      localStorage.setItem(
        "markedQuestions",
        JSON.stringify(markedQuestionsArr)
      );
      createMarkedQuestion(currentIndex);
    }
  });

  window.addEventListener("beforeunload", function (eventObject) {
    // eventObject.preventDefault();
    // eventObject.returnValue = "";
    timeLeft = JSON.parse(localStorage.getItem("timeLeft")) || EXAM_TIME;
    studentAnswers =
      JSON.parse(localStorage.getItem("currentStudentAnswers")) ||
      Array(questions.length).fill(null);
  });

  // !!===============================Listening_Events===========================

  // ^^===============================ExamTimer===========================:

  function changeTimeInCounter() {
    timeToDisplay = secondsToMinutesAndSeconds(timeLeft);
    timeCounter.textContent = timeToDisplay;
  }

  function normailizeTimeString(value) {
    return value < 10 ? "0" + value : String(value);
  }

  function secondsToMinutesAndSeconds(totalSeconds) {
    var minutes = Math.floor(totalSeconds / 60); // Get the number of full minutes
    var seconds = totalSeconds % 60; // Get the remaining seconds

    // Use String.prototype.padStart() to ensure two digits for the display
    var formattedMinutes = normailizeTimeString(minutes);
    var formattedSeconds = normailizeTimeString(seconds);
    var timeString = formattedMinutes + ":" + formattedSeconds;

    return timeString;
  }

  function changeTimeColor() {
    var progress = currentProgessWidth / 100;

    var startColor = { r: 37, g: 99, b: 235 }; // --action-color
    var warnColor = { r: 251, g: 191, b: 36 }; // --warning-color
    var endColor = { r: 239, g: 68, b: 68 }; // --error-color

    var r, g, b;

    if (progress < 0.5) {
      // Blue → Yellow
      var time = progress / 0.5;
      r = startColor.r + time * (warnColor.r - startColor.r);
      g = startColor.g + time * (warnColor.g - startColor.g);
      b = startColor.b + time * (warnColor.b - startColor.b);
    } else {
      // Yellow → Red
      var time = (progress - 0.5) / 0.5;
      r = warnColor.r + time * (endColor.r - warnColor.r);
      g = warnColor.g + time * (endColor.g - warnColor.g);
      b = warnColor.b + time * (endColor.b - warnColor.b);
    }

    var currentColor = "rgb(" + (r | 0) + "," + (g | 0) + "," + (b | 0) + ")";
    timeCounter.style.color = currentColor;
    timeClockIcon.style.color = currentColor;
    progresBar.style.backgroundColor = currentColor;
  }

  function stopClock() {
    timeClockIcon.classList.remove("fa-solid", "fa-hourglass-end", "fa-spin");
    timeClockIcon.classList.add("fa-regular", "fa-clock");
  }

  function needPulse(timeLeft) {
    if (timeLeft <= 60 && timeLeft > 0) {
      timeCounter.classList.add("pulse");
      timeClockIcon.classList.add("pulse");
    } else {
      timeCounter.classList.remove("pulse");
      timeClockIcon.classList.remove("pulse");
    }
  }

  function updateProgressBar() {
    var elapsedSeconds = EXAM_TIME - timeLeft;
    currentProgessWidth = (elapsedSeconds / EXAM_TIME) * 100;
    if (currentProgessWidth > 100) currentProgessWidth = 100;
    progresBar.style.width = currentProgessWidth + "%";
  }

  function eachSecond() {
    changeTime();
    updateProgressBar();
    changeTimeColor();
    changeTimeInCounter();
    needPulse(timeLeft);
    progresBar.style.width = currentProgessWidth + "%";
  }

  function changeTime() {
    timeLeft--;
    localStorage.setItem("timeLeft", JSON.stringify(timeLeft));
    currentProgessWidth += progessPercentageIncrease;
  }

  function examTimer() {
    changeTimeInCounter();

    examTimerIntervalId = setInterval(function () {
      if (timeLeft > 0) {
        eachSecond();
      } else {
        resetExam();
        replaceRoute("/pages/result.html");
      }
    }, SECOND);
  } //**************** */

  // ^^===============================ExamTimer===========================

  // **===============================Start===========================:
  examTimer();
  renderQuestion(0);
  renderMarkedSidebar();

  // **===============================Start===========================
})();
