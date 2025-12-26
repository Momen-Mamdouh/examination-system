var body = document.body;

// ^^===============================Creation===========================:

function createEle(tag) {
  return document.createElement(tag);
}

function addAttributes(element, attributes) {
  attributes.forEach(function (attr) {
    element.setAttribute(attr.key, attr.value);
  });
}

function createButton(text, className, parent, disabled) {
  var btn = createEle("button");
  btn.textContent = text;
  btn.classList.add(className);
  if (disabled) btn.disabled = true;
  appendElements([btn], parent);
  return btn;
}

function createAnswer(choiceText, idx) {
  var wrapper = createEle("div");
  wrapper.classList.add("checkbox-wrapper");

  var input = createEle("input");
  addAttributes(input, [
    { key: "type", value: "radio" },
    { key: "id", value: "choice-" + idx },
    { key: "name", value: "answer" },
    { key: "value", value: idx },
  ]);

  var label = createEle("label");
  addAttributes(label, [{ key: "for", value: "choice-" + idx }]);

  var tick = createEle("div");
  tick.classList.add("tick_mark");
  appendElements([tick], label);

  var span = createEle("span");
  span.textContent = choiceText;

  appendElements([input, label, span], wrapper);

  return wrapper;
}

function createIconButton(text, iconClass, classes, parent, disabled) {
  var btn = createEle("button");
  classes.forEach(function (cls) {
    btn.classList.add(cls);
  });

  if (disabled) btn.disabled = true;

  var icon = createEle("i");
  icon.classList.add("fa-solid", iconClass);

  btn.appendChild(icon);
  btn.appendChild(document.createTextNode(" " + text));

  appendElements([btn], parent);
  return btn;
}

// ^^===============================Creation===========================:

// ??===============================Insertion===========================:

function appendElements(children, parent) {
  children.forEach(function (child) {
    parent.appendChild(child);
  });
}

function removeElements(parent) {
  while (parent.firstElementChild) {
    parent.firstElementChild.remove();
  }
}

// ??===============================Insertion===========================

// **===============================Intializing===========================:
var mainTag = document.querySelector("main");
// ^^===============================Header Initialization===========================:

function initializeHeader(parent) {
  // elements
  var header = createEle("header");
  var nav = createEle("nav");

  // header container
  var headerContainer = createEle("div");
  headerContainer.classList.add("header-container", "flex");

  // left icon section
  var headerIcon = createEle("div");
  headerIcon.classList.add("header-icon");

  var icon = createEle("i");
  icon.classList.add("fa-solid", "fa-hexagon-nodes");

  var title = createEle("h2");
  title.textContent = "Exam";

  appendElements([icon, title], headerIcon);

  // time counter section
  var timeCounterContainer = createEle("div");
  timeCounterContainer.classList.add("time-counter");

  var timeIcon = createEle("i");
  timeIcon.classList.add("fa-solid", "fa-hourglass-end", "fa-spin");

  var timeText = createEle("h3");
  addAttributes(timeText, [{ key: "id", value: "time-counter" }]);
  timeText.textContent = "00:00";

  appendElements([timeIcon, timeText], timeCounterContainer);

  // assemble header container
  appendElements([headerIcon, timeCounterContainer], headerContainer);

  // progress bar section
  var timeProgressContainer = createEle("div");
  timeProgressContainer.classList.add("time-progress-container");

  var progressBar = createEle("div");
  progressBar.classList.add("progress-bar");

  var progressFill = createEle("span");
  progressFill.classList.add("progress-bar-fill");
  addAttributes(progressFill, [
    { key: "id", value: "timer-range" },
    { key: "style", value: "width: 0%;" },
  ]);

  appendElements([progressFill], progressBar);
  appendElements([progressBar], timeProgressContainer);

  // assemble nav
  appendElements([headerContainer, timeProgressContainer], nav);

  // assemble header
  appendElements([nav], header);

  // insert into DOM
  appendElements([header], parent);

  return {
    timeCounter: timeText,
    progressBar: progressFill,
    timeIcon: timeIcon,
  };
}
var headerUI = initializeHeader(mainTag);

// ^^===============================Header Initialization===========================

// ^^===============================Questions Initialization===========================:

// ^^===============================Question Layout Creation===========================:

function initializeQuestionLayout(parent) {
  // section
  var section = createEle("section");
  section.classList.add("question-section");

  // question wrapper
  var questionDiv = createEle("div");
  questionDiv.classList.add("question");

  var questionTitle = createEle("h1");
  questionTitle.textContent = "Question Number";

  var questionText = createEle("p");
  questionText.textContent = "";

  var answersContainer = createEle("div");
  answersContainer.classList.add("answers-container");

  appendElements([questionTitle, questionText, answersContainer], questionDiv);

  // mark sidebar
  var markSidebar = createEle("div");
  markSidebar.classList.add("mark-sidebar");

  appendElements([questionDiv, markSidebar], section);

  // buttons container
  var btnsContainer = createEle("div");
  btnsContainer.classList.add("question-btns");

  var prevBtn = createIconButton(
    "Prev",
    "fa-angle-left",
    ["main-btn", "prev-btn"],
    btnsContainer
  );

  var markBtn = createIconButton(
    "Mark",
    "fa-bookmark",
    ["main-btn", "mark-btn"],
    btnsContainer
  );

  var nextBtn = createIconButton(
    "Next",
    "fa-angle-right",
    ["main-btn", "next-btn"],
    btnsContainer,
    true
  );

  var submitBtn = createIconButton(
    "Submit",
    "fa-angle-right",
    ["main-btn", "submit-btn"],
    btnsContainer,
    true
  );

  // insert into DOM
  appendElements([section, btnsContainer], parent);

  // expose ONLY what logic needs
  return {
    questionTitle,
    questionText,
    answersContainer,
    prevBtn,
    nextBtn,
    markBtn,
    submitBtn,
  };
}

var main = document.querySelector("main");
var questionUi = initializeQuestionLayout(main);

var questionTitle = questionUi.questionTitle;
var questionText = questionUi.questionText;
var answersContainer = questionUi.answersContainer;
var prevBtn = questionUi.prevBtn;
var nextBtn = questionUi.nextBtn;
var submitBtn = questionUi.submitBtn;

// ^^===============================Questions Initialization===========================:

// **===============================Intializing===========================
