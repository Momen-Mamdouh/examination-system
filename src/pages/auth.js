// var quizState = {
//   currentQuestionIndex: 0,
//   score: 0,
// };

// var questionDiv, questionTitle, answersContainer;

// // !!================================Data=================================

// // !!================================Selections=================================:

// var questionSection = document.querySelector("section.question-section");

// // !!================================Selections=================================

// // **===============================Intializing===========================:

// function intializeQuestionSection() {
//   questionDiv = createEle("div");
//   questionTitle = createEle("h1");
//   answersContainer = createEle("div");

//   questionDiv.classList.add("question", "flex");
//   questionTitle.classList.add("question-title");
//   answersContainer.classList.add("answers-container");

//   appendElements([questionDiv, answersContainer], questionSection);
//   appendElements([questionTitle], questionDiv);
// }

// intializeQuestionSection();
// renderQuestion(0);

// // **===============================Intializing===========================

// // ^^===============================Creation===========================:

// function createEle(createdTag) {
//   var htmlElement = document.createElement(createdTag);
//   return htmlElement;
// }

// function createAnswer(choiceText, idx) {
//   var answer = createEle("div");
//   var answerLabel = createEle("label");
//   var answerInput = createEle("input");
//   answer.classList.add("answer");
//   var inputId = "choice-" + idx;

//   addAttributes(answerLabel, [{ key: "for", value: inputId }]);
//   addAttributes(answerInput, [
//     { key: "name", value: "answer" },
//     { key: "id", value: inputId },
//     { key: "type", value: "radio" },
//   ]);

//   answerLabel.textContent = choiceText;
//   appendElements([answerLabel, answerInput], answer);
//   return answer;
// }

// // ^^===============================Creation===========================

// // !!===============================Removing===========================:

// function removeElements(parent) {
//   while (parent.firstElementChild) {
//     parent.firstElementChild.remove();
//   }
// }

// // !!===============================Removing===========================

// // ??===============================Adding===========================:

// function appendElements(childs, parent) {
//   childs.forEach(function (childItem, idx) {
//     parent.appendChild(childItem);
//   });
// }

// function addAttributes(element, attributes) {
//   attributes.forEach(function (attr, idx) {
//     element.setAttribute(attr.key, attr.value);
//   });
// }

// function renderQuestion(index) {
//   var currentQuestion = questions[index];
//   questionTitle.textContent = index + 1 + ". " + currentQuestion.question;

//   removeElements(answersContainer);
//   currentQuestion.choices.forEach(function (choice, idx) {
//     var answerNode = createAnswer(choice.text, idx + 1);
//     answersContainer.appendChild(answerNode);
//   });
// }

// // ??===============================Adding===========================
