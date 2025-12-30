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
  children.forEach(function (child) {
    parent.appendChild(child);
  });
}

// ??===============================Insertion===========================

// ^^===============================Layout Initialization===========================:

// ^^===============================Layout Initialization===========================:

function initializeResultSection(parent) {
  var section = createEle("section");
  section.classList.add("result-section");

  var box = createEle("div");
  box.classList.add("box", "card");

  var title = createEle("h1");
  title.textContent = "Result";

  var circle = createEle("div");
  circle.classList.add("circle");

  var inside = createEle("div");
  inside.classList.add("inside");

  var percentEl = createEle("h2");
  percentEl.textContent = "0%";

  var gradeEl = createEle("p");
  gradeEl.textContent = "-";

  appendElements([percentEl, gradeEl], inside);
  appendElements([inside], circle);

  var message = createEle("p");
  message.classList.add("result-message");

  var btnsDiv = createEle("div");
  btnsDiv.classList.add("btns-div");

  var backBtn = createEle("a");
  backBtn.textContent = "Back";
  backBtn.href = "#";
  backBtn.id = "back";
  backBtn.classList.add("main-btn");

  var signoutBtn = createEle("button");
  signoutBtn.classList.add("main-btn", "signout-btn");
  signoutBtn.textContent = "Sign Out";

  appendElements([backBtn, signoutBtn], btnsDiv);

  appendElements([title, circle, message, btnsDiv], box);

  appendElements([box], section);
  appendElements([section], parent);

  return {
    section,
    circle,
    percentEl,
    gradeEl,
    message,
    backBtn,
  };
}

var main = document.querySelector("main");
var resultUI = initializeResultSection(main);
