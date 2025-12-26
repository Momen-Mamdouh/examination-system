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

// ^^===============================Creation===========================:

// ??===============================Insertion===========================:

function appendElements(children, parent) {
  console.log(children);
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

// **===============================Instructions Creation===========================:

function initializeInstructionsSection(parent) {
  var section = createEle("section");
  section.classList.add("instructions", "container");

  // title
  var heading = createEle("h3");
  heading.textContent = "Exam instructions";

  // list
  var list = createEle("ul");
  list.classList.add("instructions-list");

  var instructionsData = [
    {
      number: "1",
      title: "MCQ Format",
      text: "This is an MCQ exam; please select only one choice from the four options displayed for each question.",
    },
    {
      number: "2",
      title: "Navigation",
      text: "Use the Next and Prev buttons to move between questions. Note that navigation is restricted at the start and end of the exam.",
    },
    {
      number: "3",
      title: "Mark for Review",
      text: "Any question can be marked in the sidebar so you can jump back to it directly to choose or change your answer.",
    },
    {
      number: "4",
      title: "Completion",
      text: "You cannot submit the exam if any questions are left unanswered. Ensure all fields are filled before finishing.",
    },
    {
      number: "5",
      title: "Final Submission",
      text: "Once you click submit, your answers are final. You cannot re-enter the exam, and your results will be displayed immediately.",
    },
  ];

  instructionsData.forEach(function (item) {
    var li = createEle("li");
    li.classList.add("list-item");

    var header = createEle("div");
    header.classList.add("list-header");

    var number = createEle("span");
    number.classList.add("list-number");
    number.textContent = item.number;

    var title = createEle("h4");
    title.classList.add("title");
    title.textContent = item.title;

    appendElements([number, title], header);

    var content = createEle("div");
    content.classList.add("list-content");

    var text = createEle("p");
    text.classList.add("text");
    text.textContent = item.text;

    appendElements([text], content);
    appendElements([header, content], li);
    appendElements([li], list);
  });

  // start button
  var buttonWrapper = createEle("button");
  addAttributes(buttonWrapper, [{ key: "type", value: "button" }]);

  var startLink = createEle("a");
  startLink.classList.add("main-btn", "start-btn");
  addAttributes(startLink, [{ key: "href", value: "./pages/test.html" }]);
  startLink.textContent = "Start";

  appendElements([startLink], buttonWrapper);

  // assemble section
  appendElements([heading, list, buttonWrapper], section);
  appendElements([section], parent);

  return section;
}

var main = document.querySelector("main");
initializeInstructionsSection(main);

// **===============================Instructions Creation===========================:
