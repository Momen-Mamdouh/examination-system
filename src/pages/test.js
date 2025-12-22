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

var questionDiv, questionTitle, answersContainer;

// !!================================Data=================================

// !!================================Selections=================================:

var questionSection = document.querySelector("section.question-section");

// !!================================Selections=================================

// **===============================Intializing===========================:

function intializeQuestionSection() {
  questionDiv = createEle("div");
  questionTitle = createEle("h1");
  answersContainer = createEle("div");

  questionDiv.classList.add("question", "flex");
  questionTitle.classList.add("question-title");
  answersContainer.classList.add("answers-container");

  appendElements([questionDiv, answersContainer], questionSection);
  appendElements([questionTitle], questionDiv);
}

intializeQuestionSection();
renderQuestion(0);

// **===============================Intializing===========================

// ^^===============================Creation===========================:

function createEle(createdTag) {
  var htmlElement = document.createElement(createdTag);
  return htmlElement;
}

function createAnswer(choiceText, idx) {
  var answer = createEle("div");
  var answerLabel = createEle("label");
  var answerInput = createEle("input");
  answer.classList.add("answer");
  var inputId = "choice-" + idx;

  addAttributes(answerLabel, [{ key: "for", value: inputId }]);
  addAttributes(answerInput, [
    { key: "name", value: "answer" },
    { key: "id", value: inputId },
    { key: "type", value: "radio" },
  ]);

  answerLabel.textContent = choiceText;
  appendElements([answerLabel, answerInput], answer);
  return answer;
}

// ^^===============================Creation===========================

// !!===============================Removing===========================:

function removeElements(parent) {
  while (parent.firstElementChild) {
    parent.firstElementChild.remove();
  }
}

// !!===============================Removing===========================

// ??===============================Adding===========================:

function appendElements(childs, parent) {
  childs.forEach(function (childItem, idx) {
    parent.appendChild(childItem);
  });
}

function addAttributes(element, attributes) {
  attributes.forEach(function (attr, idx) {
    element.setAttribute(attr.key, attr.value);
  });
}

function renderQuestion(index) {
  var currentQuestion = questions[index];
  questionTitle.textContent = index + 1 + ". " + currentQuestion.question;

  removeElements(answersContainer);
  currentQuestion.choices.forEach(function (choice, idx) {
    var answerNode = createAnswer(choice.text, idx + 1);
    answersContainer.appendChild(answerNode);
  });
}

// ??===============================Adding===========================
