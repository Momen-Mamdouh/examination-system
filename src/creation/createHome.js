// ^^===============================Creation===========================:

function createEle(tag) {
  return document.createElement(tag);
}

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

function createIcon(className) {
  var i = createEle("i");
  i.className = className;
  return i;
}

function createTextElement(tag, text) {
  var el = createEle(tag);
  el.textContent = text;
  return el;
}

// ^^===============================Creation===========================

// ??===============================Helpers===========================:

function getTodayDate() {
  var options = { year: "numeric", month: "short", day: "2-digit" };
  return new Date().toLocaleDateString("en-US", options);
}

// ??===============================Helpers===========================

// **===============================Instructions Creation===========================:

function initializeInstructionsSection(parent) {
  var bodyContainer = createEle("div");
  bodyContainer.classList.add("body-container");

  var header = createEle("header");
  header.classList.add("Top-header");

  var signoutBtn = createEle("button");
  signoutBtn.classList.add("main-btn", "signout-btn");
  signoutBtn.textContent = "Sign Out";
  signoutBtn.style.position = "absolute";
  signoutBtn.style.right = "20px";
  signoutBtn.style.top = "20px";

  var iconDiv = createEle("div");
  iconDiv.classList.add("icon-main");
  appendElements([createIcon("fa-solid fa-graduation-cap fa-4x")], iconDiv);

  var h1 = createTextElement("h1", "Final Examination");
  var subP = createTextElement("p", "Computer Science Fundamentals");

  var examDetails = createEle("div");
  examDetails.classList.add("exam-details");

  var timeDiv = createEle("div");
  appendElements(
    [createIcon("fa-regular fa-clock"), document.createTextNode(" 20 Minutes")],
    timeDiv
  );

  var qDiv = createEle("div");
  appendElements(
    [
      createIcon("fa-solid fa-list-check"),
      document.createTextNode(" 10 Questions"),
    ],
    qDiv
  );

  appendElements([timeDiv, qDiv], examDetails);
  appendElements([signoutBtn, iconDiv, h1, subP, examDetails], header);

  var cardsContainer = createEle("div");
  cardsContainer.classList.add("cards-container");

  var cardsData = [
    { icon: "fa-calendar-days", label: "Date", value: getTodayDate() },
    { icon: "fa-hourglass-half", label: "Duration", value: "20 Minutes" },
    { icon: "fa-pen-to-square", label: "Questions", value: "10 Questions" },
    { icon: "fa-solid fa-award", label: "Pass Score", value: "60%" },
  ];

  cardsData.forEach(function (data) {
    var card = createEle("div");
    card.classList.add("card");

    appendElements(
      [
        createIcon("fa-regular " + data.icon),
        createTextElement("p", data.label),
        createTextElement("span", data.value),
      ],
      card
    );

    cardsContainer.appendChild(card);
  });

  var instructionSec = createEle("div");
  instructionSec.classList.add("instructions-sec");

  var leftCard = createEle("div");
  leftCard.classList.add("card", "instructions-card");

  var titleDiv = createEle("div");
  titleDiv.classList.add("title");

  appendElements(
    [
      createIcon("fa-solid fa-clipboard-list fa-2x"),
      createTextElement("h2", "Exam Instructions"),
    ],
    titleDiv
  );

  var listDiv = createEle("div");
  listDiv.classList.add("instructions-ordered");

  var instructionsData = [
    {
      number: "1",
      text: "This is an MCQ exam; please select only one choice from the four options.",
    },
    {
      number: "2",
      text: "Use Next and Prev buttons to navigate between questions.",
    },
    {
      number: "3",
      text: "You can mark questions and return to them later from the sidebar.",
    },
    {
      number: "4",
      text: "You must answer all questions before submitting the exam.",
    },
    {
      number: "5",
      text: "Once submitted, answers are final and results appear immediately.",
    },
  ];

  instructionsData.forEach(function (item) {
    var p = createEle("p");
    var span = createEle("span");
    span.classList.add("instruction");
    span.textContent = item.number;

    appendElements([span, document.createTextNode(item.text)], p);
    listDiv.appendChild(p);
  });

  appendElements([titleDiv, listDiv], leftCard);

  var rSide = createEle("div");
  rSide.classList.add("r-side");

  var tipsCard = createEle("div");
  tipsCard.classList.add("card", "tips-card");

  var tipsTitle = createEle("div");
  tipsTitle.classList.add("title");

  appendElements(
    [
      createIcon("fa-solid fa-lightbulb fa-2x"),
      createTextElement("h2", "Success Tips"),
    ],
    tipsTitle
  );

  var tipsContent = createEle("div");
  tipsContent.classList.add("Tips");

  function createTip(text) {
    var d = createEle("div");
    appendElements(
      [createIcon("fa-solid fa-circle-check"), createTextElement("p", text)],
      d
    );
    return d;
  }

  appendElements(
    [
      createTip("Manage time wisely — 1 min/question"),
      createTip("Answer all questions — no penalties"),
    ],
    tipsContent
  );

  appendElements([tipsTitle, tipsContent], tipsCard);

  var noticeCard = createEle("div");
  noticeCard.classList.add("notice-card");

  appendElements(
    [
      createTextElement("h2", "⚠️ Important Notice"),
      createTextElement(
        "p",
        'Once you click "Start Exam", the timer begins immediately.'
      ),
    ],
    noticeCard
  );

  appendElements([tipsCard, noticeCard], rSide);
  appendElements([leftCard, rSide], instructionSec);

  var btnDiv = createEle("div");
  btnDiv.classList.add("button-div");

  var startBtn = createEle("a");
  startBtn.classList.add("main-btn", "start-btn");
  startBtn.href = "#";
  startBtn.textContent = "Start Exam";

  btnDiv.appendChild(startBtn);

  appendElements(
    [header, cardsContainer, instructionSec, btnDiv],
    bodyContainer
  );
  parent.appendChild(bodyContainer);
}

var main =
  document.querySelector("main") || document.querySelector(".page-home");

initializeInstructionsSection(main);

// **===============================Instructions Creation===========================
