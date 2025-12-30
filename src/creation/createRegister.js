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

// **===============================Instructions Creation===========================:
// ^^===============================Register Creation===========================:

function initializeRegisterSection(parent) {
  var section = createEle("section");
  section.classList.add("auth");

  // ===== auth card =====
  var authCard = createEle("div");
  authCard.classList.add("auth-card", "main-card-box-shadow");

  var cardHeader = createEle("div");
  cardHeader.classList.add("card-header");
  cardHeader.textContent = "Register";

  var form = createEle("form");
  form.classList.add("auth-form");

  // ===== input area =====
  var inputArea = createEle("div");
  inputArea.classList.add("input-area");

  // ---- full name ----
  var nameDiv = createEle("div");
  nameDiv.classList.add("input-div");

  var nameInput = createEle("input");
  nameInput.classList.add("main-input");
  addAttributes(nameInput, [
    { key: "type", value: "text" },
    { key: "name", value: "fullname" },
    { key: "id", value: "fullname" },
    { key: "placeholder", value: "Full Name" },
    { key: "pattern", value: "^[a-zA-Z\\s]{3,}$" },
  ]);

  var nameIcon = createEle("i");
  nameIcon.classList.add("fa-regular", "fa-user");

  appendElements([nameInput, nameIcon], nameDiv);

  var nameWarning = createEle("span");
  nameWarning.classList.add("fullname-warning", "span-warning");
  addAttributes(nameWarning, [
    {
      key: "data-err-message",
      value: "Name must be at least 3 letters (no numbers)",
    },
  ]);

  // ---- email ----
  var emailDiv = createEle("div");
  emailDiv.classList.add("input-div");

  var emailInput = createEle("input");
  emailInput.classList.add("main-input");
  addAttributes(emailInput, [
    { key: "type", value: "email" },
    { key: "name", value: "email" },
    { key: "id", value: "email" },
    { key: "placeholder", value: "Email" },
    { key: "pattern", value: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$" },
  ]);

  var emailIcon = createEle("i");
  emailIcon.classList.add("fa-solid", "fa-at");

  appendElements([emailInput, emailIcon], emailDiv);

  var emailWarning = createEle("span");
  emailWarning.classList.add("email-warning", "span-warning");
  addAttributes(emailWarning, [
    { key: "data-err-message", value: "Please enter a valid email address" },
  ]);

  // ---- password ----
  var passwordDiv = createEle("div");
  passwordDiv.classList.add("input-div");

  var passwordInput = createEle("input");
  passwordInput.classList.add("main-input");
  addAttributes(passwordInput, [
    { key: "type", value: "password" },
    { key: "name", value: "password" },
    { key: "id", value: "password" },
    { key: "placeholder", value: "Password" },
    { key: "pattern", value: "^(?=.*[A-Za-z])(?=.*\\d).{8,}$" },
  ]);

  var eyeIcon1 = createEle("i");
  eyeIcon1.classList.add("fa-regular", "fa-eye");

  var lockIcon1 = createEle("i");
  lockIcon1.classList.add("fa-solid", "fa-lock");

  appendElements([passwordInput, eyeIcon1, lockIcon1], passwordDiv);

  var passwordWarning = createEle("span");
  passwordWarning.classList.add("password-warning", "span-warning");
  addAttributes(passwordWarning, [
    {
      key: "data-err-message",
      value: "Password must be 8+ chars, with at least 1 letter & 1 number",
    },
  ]);

  // ---- confirm password ----
  var confirmDiv = createEle("div");
  confirmDiv.classList.add("input-div");

  var confirmInput = createEle("input");
  confirmInput.classList.add("main-input");
  addAttributes(confirmInput, [
    { key: "type", value: "password" },
    { key: "name", value: "confirm-password" },
    { key: "id", value: "confirm-password" },
    { key: "placeholder", value: "Confirm Password" },
    { key: "pattern", value: "^(?=.*[A-Za-z])(?=.*\\d).{8,}$" },
  ]);

  var eyeIcon2 = createEle("i");
  eyeIcon2.classList.add("fa-regular", "fa-eye");

  var lockIcon2 = createEle("i");
  lockIcon2.classList.add("fa-solid", "fa-lock");

  appendElements([confirmInput, eyeIcon2, lockIcon2], confirmDiv);

  var confirmWarning = createEle("span");
  confirmWarning.classList.add("confirm-password-warning", "span-warning");
  addAttributes(confirmWarning, [
    { key: "data-err-message", value: "Passwords do not match" },
  ]);

  appendElements(
    [
      nameDiv,
      nameWarning,
      emailDiv,
      emailWarning,
      passwordDiv,
      passwordWarning,
      confirmDiv,
      confirmWarning,
    ],
    inputArea
  );

  // ===== submit area =====
  var submitArea = createEle("div");
  submitArea.classList.add("submit-area");

  var submitBtn = createEle("button");
  submitBtn.classList.add("main-btn");
  addAttributes(submitBtn, [{ key: "type", value: "submit" }]);
  submitBtn.textContent = "Register";

  var loginAside = createEle("aside");
  loginAside.classList.add("login");

  var loginText = createEle("div");
  loginText.innerHTML =
    "Already have an account? <a class='main-link' href='./login.html'>Login</a>";

  appendElements([loginText], loginAside);
  appendElements([submitBtn, loginAside], submitArea);

  // assemble form
  appendElements([inputArea, submitArea], form);
  appendElements([cardHeader, form], authCard);

  // ===== image =====
  var cardImg = createEle("div");
  cardImg.classList.add("card-img");

  var img = createEle("img");
  addAttributes(img, [
    { key: "src", value: "../assets/images/register-form-img.png" },
    { key: "alt", value: "register" },
  ]);

  appendElements([img], cardImg);

  appendElements([authCard, cardImg], section);
  appendElements([section], parent);

  // ===== toast =====
  var toast = createEle("div");
  addAttributes(toast, [{ key: "id", value: "toast" }]);

  var toastImg = createEle("div");
  addAttributes(toastImg, [{ key: "id", value: "img" }]);

  var successIcon = createEle("i");
  successIcon.classList.add("fa-regular", "fa-circle-check");

  var errorIcon = createEle("i");
  errorIcon.classList.add("fa-regular", "fa-circle-xmark");

  appendElements([successIcon, errorIcon], toastImg);

  var toastDesc = createEle("p");
  addAttributes(toastDesc, [{ key: "id", value: "desc" }]);
  toastDesc.textContent = "A notification message..";

  appendElements([toastImg, toastDesc], toast);
  appendElements([toast], parent);

  return {
    section,
    form,
    submitBtn,
    toast,
  };
}

var main = document.querySelector("main");
initializeRegisterSection(main);

// **===============================Instructions Creation===========================:
