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

var studentAnswers = Array(questions.length).fill(null) //add student Answers

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
    { key: "value", value: idx }, //add value to 
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
  updateNextBtnState() // update btn state if it should be disabled or not
  updatePrevBtnState() // update btn state if it should be disabled or not
  var currentQuestion = questions[index];
  questionTitle.textContent = index + 1 + ". " + currentQuestion.question;

  removeElements(answersContainer);
  currentQuestion.choices.forEach(function (choice, idx) {
    var answerNode = createAnswer(choice.text, idx + 1);
    // adding selected answer by student
    var questionIndex = index
    var savedAnswer = studentAnswers[questionIndex]
    if(savedAnswer == idx+1){
      var input = answerNode.querySelector("input");
      input.checked = true
    }
    answersContainer.appendChild(answerNode);
  });
}

// ??===============================Adding===========================
// ??=============================== prev-btn ===========================
function createPrevBtn (){
  var prevBtn = createEle('button')
  prevBtn.textContent = 'prev'
  prevBtn.classList.add('prev-btn')
  prevBtn.disabled= true
  questionSection.appendChild(prevBtn)
  return prevBtn
} 

var prevBtn = createPrevBtn()

prevBtn.addEventListener('click', function(){
  if(quizState.currentQuestionIndex > 0){
    quizState.currentQuestionIndex--
    renderQuestion(quizState.currentQuestionIndex)
  }
})



// ??=============================== next-btn ===========================
function createNextBtn (){
  var nextBtn = createEle('button')
  nextBtn.textContent = 'next'
  nextBtn.classList.add('next-btn')
  questionSection.appendChild(nextBtn)
  return nextBtn
} 

var nextBtn = createNextBtn()

// event listener
nextBtn.addEventListener('click', function(){
    quizState.currentQuestionIndex++
    renderQuestion(quizState.currentQuestionIndex)
})


// update buttons state 
function updateNextBtnState(){
  if(quizState.currentQuestionIndex < questions.length-1){
    nextBtn.disabled = false
  }
  else{
    nextBtn.disabled = true
  }
}

function updatePrevBtnState(){
  if(quizState.currentQuestionIndex == 0){
    prevBtn.disabled = true
  }
  else{
    prevBtn.disabled = false
  }
}

// submit button 
function createSubmitBtn (){
  var submitBtn = createEle('button')
  submitBtn.textContent = 'submit'
  submitBtn.classList.add('submit-btn')
  questionSection.appendChild(submitBtn)
  return submitBtn
} 

var submitBtn = createSubmitBtn()


submitBtn.addEventListener('click', function(){
  var score = 0
  questions.forEach(function(question, questionIndex){
    var correctAnswerIndex = question.choices.findIndex(function(choice){
      return choice.isCorrect
    })
    var correctAnswerValue = correctAnswerIndex+1
    studentAnswer = studentAnswers[questionIndex]
    if(studentAnswer == correctAnswerValue){
      score++
    }
    
  })
  quizState.score = score;
  console.log("Final score:", score, "/", questions.length);
  alert("Your score is: " + score + " / " + questions.length);
})
// add event listener when selecting an answer
answersContainer.addEventListener('change', function(e){
  if(e.target.name == 'answer'){
    var questionIndex = quizState.currentQuestionIndex
    var answerIndex = Number(e.target.value)
    studentAnswers[questionIndex] = answerIndex
  }
  console.log(studentAnswers)
})
// start rendering first question
renderQuestion(0); //moved to bottom 
