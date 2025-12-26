var loaderContainer = document.getElementById("loader-container");
var userLogin = JSON.parse(localStorage.getItem("logins")) || {};
toggleLoader();
// !!================================Data=================================:

var questions = [
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
    question: "Which loop is best used when the number of iterations is known?",
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

var quizState = {
  currentQuestionIndex: 0,
  score: 0,
};

var studentAnswers = Array(questions.length).fill(null); //add student Answers

var questionDiv, questionTitle, answersContainer;

// !!================================Data=================================

// **===================================GUARD================================:
resultGuard();
function resultGuard() {
  if (userLogin && typeof userLogin.userScore === "number") {
    window.location.replace("/pages/result.html");
  }
}
// **===================================GUARD================================:

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

// **===================================LOADER================================:

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

// !!===============================Rendering===========================

// ^^===============================Update-States===========================:

function studentAnsweredAll() {
  var allAnswered = false;
  for (let i = 0; i < studentAnswers.length; i++) {
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

function updateNextBtnState() {
  nextBtn.disabled = quizState.currentQuestionIndex >= questions.length - 1;
}

function updateSubmitBtnState() {
  submitBtn.disabled = !studentAnsweredAll();
}

function updatePrevBtnState() {
  prevBtn.disabled = quizState.currentQuestionIndex === 0;
}

function getScore() {
  var score = 0;

  questions.forEach(function (question, idx) {
    var correctIndex =
      question.choices.findIndex(function (c) {
        return c.isCorrect;
      }) + 1;

    if (studentAnswers[idx] === correctIndex) score++;
  });
  var total = questions.length;
  var percentage = Math.round((score / total) * 100);

  quizState.score = score;
  quizState.total = total;
  quizState.percentage = percentage;
}

function saveUserScore() {
  userLogin.userScore = quizState.score;
  var userScores = {
    userEmail: userLogin.userEmail,
    userScore: userLogin.userScore,
    totalQuestions: quizState.total,
    userScorePercentage: quizState.percentage,
    scoreDate: new Date(),
  };
  localStorage.setItem("logins", JSON.stringify(userLogin));
  localStorage.setItem("allScores", JSON.stringify(userScores));
}

function resetQuestionPage() {
  quizState = {
    currentQuestionIndex: 0,
    score: 0,
  };
  // studentAnswers = [];
  studentAnswers.fill(null);
  renderQuestion(0);
  updateNextBtnState();
  updateSubmitBtnState();
  updatePrevBtnState();
}

// ^^===============================Update-States===========================

// !!===============================Events===========================:

prevBtn.addEventListener("click", function () {
  quizState.currentQuestionIndex--;
  renderQuestion(quizState.currentQuestionIndex);
});

nextBtn.addEventListener("click", function () {
  quizState.currentQuestionIndex++;
  renderQuestion(quizState.currentQuestionIndex);
});

answersContainer.addEventListener("change", function (e) {
  if (e.target.name === "answer") {
    studentAnswers[quizState.currentQuestionIndex] = Number(e.target.value);
    updateSubmitBtnState();
  }
});

submitBtn.addEventListener("click", function () {
  getScore();
  saveUserScore();
  resetQuestionPage();
  routing("pages/result.html");
});

// !!===============================Events===========================

// ^^===============================ExamTimer===========================:

var examTimerId, examTimerInterval;
var timeLeft = 1200; //Exam time in seconds.
var second = 1000; //Second value as milliSecond.
var examTimeInMilli = timeLeft * second; //Exam time in milliSeconds.
var progessPercentageIncrease = 100 / (examTimeInMilli / second);
var currentProgessWidth = 0;

var timeToDisplay = "";
var timeCounter = headerUI.timeCounter;
var timeClockIcon = headerUI.timeIcon;
var progresBar = headerUI.progressBar;

function changeTimeInCounter() {
  timeToDisplay = secondsToMinutesAndSeconds(timeLeft);
  timeCounter.textContent = timeToDisplay;
}

function secondsToMinutesAndSeconds(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60); // Get the number of full minutes
  const seconds = totalSeconds % 60; // Get the remaining seconds

  // Use String.prototype.padStart() to ensure two digits for the display
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
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

function eachSecond() {
  changeTimeColor();
  changeTime();
  changeTimeInCounter();
  needPulse(timeLeft);
  progresBar.style.width = currentProgessWidth + "%";
}

function changeTime() {
  timeLeft--;
  currentProgessWidth += progessPercentageIncrease;
}

function examTimer() {
  changeTimeInCounter();

  examTimerInterval = setInterval(function () {
    if (timeLeft > 0) {
      eachSecond();
    } else {
      clearInterval(examTimerInterval);
      stopClock();
      getScore();
      saveUserScore();
      resetQuestionPage();
      routing("pages/result.html");
    }
  }, second);
}

// ^^===============================ExamTimer===========================

// **===============================Start===========================:
examTimer();
renderQuestion(0);

function clickInInput() {
  var inputsWrappers = document.querySelectorAll(".checkbox-wrapper");
  inputsWrappers.forEach(function (wrapper) {
    wrapper.addEventListener("click", (e) => {
      var input = wrapper.querySelector("input");
      console.log(wrapper);
      if (input.name === "answer") {
        studentAnswers[quizState.currentQuestionIndex] = Number(input.value);
        updateSubmitBtnState();
      }
      console.log(studentAnswers);
      input.checked = true;
    });
  });
}

// **===============================Start===========================
