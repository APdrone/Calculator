function createElementDOM(
  elType,
  classNames,
  attributeNames = {},
  visibleText
) {
  const inputDiv = document.createElement(elType);
  inputDiv.classList.add(...classNames);

  for (const [key, value] of Object.entries(attributeNames)) {
    inputDiv.setAttribute(key, value);
  }
  inputDiv.innerHTML = visibleText;
  return inputDiv;
}

const containerDiv = createElementDOM("div", ["container", "grid"], {}, "");

const userInputDiv = createElementDOM("div", ["user__Input"], {}, "");

const resultSection = createElementDOM("div", ["results__section"], {}, "");

const resultDiv = createElementDOM("p", ["result"], {}, "");

function createButtons(btn1, btn2, btn3, btn4) {
  const child = document.createElement("div");
  child.classList.add("grid-child");
  if (btn1 === "C" || btn3 == "=") {
    child.innerHTML = `
            <input type="button" class="btn btn-red" value=${btn1}>
            <input type="button" class="btn" value=${btn2}>
            <input type="button" class="btn btn-equal" value=${btn3}>
            <input type="button" class="btn btn-operations" value=${btn4}>
      `;
  } else {
    child.innerHTML = `
            <input type="button" class="btn" value=${btn1}>
            <input type="button" class="btn" value=${btn2}>
            <input type="button" class="btn" value=${btn3}>
            <input type="button" class="btn btn-operations" value=${btn4}>
      `;
  }

  return child;
}

resultSection.append(resultDiv);

containerDiv.append(
  userInputDiv,
  resultSection,
  createButtons(7, 8, 9, "+"),
  createButtons(4, 5, 6, "-"),
  createButtons(1, 2, 3, "*"),
  createButtons("C", 0, "=", "/")
);

document.body.append(containerDiv);

const inputs = document.querySelectorAll(".btn");
const opsBtn = document.querySelectorAll(".btn-operations");
const userInputs = document.querySelector(".user__Input");
const result = document.querySelector(".result");

document.addEventListener("keyup", (e) => {
  if (e.key.search(/[0-9]/) === 0) {
    userInputs.innerHTML = userInputs.innerHTML + e.key;
  } else {
    alert("Only numbers are allowed");
  }
});

for (let i = 0; i < inputs.length; i++) {
  let pattern = /[0-9]/;
  const found = inputs[i].getAttribute("value").search(pattern);
  if (found === 0) {
    inputs[i].addEventListener("click", function () {
      const inp = inputs[i].getAttribute("value");
      userInputs.innerHTML = userInputs.innerHTML + inp;
    });
  } else {
    if (inputs[i].getAttribute("value").search(/[*+-/]/) === 0) {
      inputs[i].addEventListener("click", function () {
        if (userInputs.innerHTML.trim().search(/[0-9]/) === 0) {
          const inp = inputs[i].getAttribute("value");
          userInputs.innerHTML = userInputs.innerHTML + inp;
        }
        if (userInputs.innerHTML.trim().search(/[*+-/]/)) {
          opsBtn.forEach((el) => (el.disabled = true));
        }
      });
    }

    if (inputs[i].getAttribute("value") === "=") {
      inputs[i].addEventListener("click", function () {
        const mathExp = userInputs.innerHTML;
        let total = 0;
        if (mathExp.includes("-")) {
          total = mathExp
            .trim()
            .split("-")
            .map(Number)
            .reduce((acc, cur) => acc - cur);
        }
        if (mathExp.includes("+")) {
          total = mathExp
            .trim()
            .split("+")
            .map(Number)
            .reduce((acc, cur) => acc + cur);
        }
        if (mathExp.includes("/")) {
          total = mathExp
            .trim()
            .split("/")
            .map(Number)
            .reduce((acc, cur) => acc / cur)
            .toFixed(2);
        }

        if (mathExp.includes("*")) {
          total = mathExp
            .trim()
            .split("*")
            .map(Number)
            .reduce((acc, cur) => acc * cur);
        }

        result.innerHTML = total;
        userInputs.innerHTML = "";
        opsBtn.forEach((el) => (el.disabled = false));
      });
    }

    if (inputs[i].getAttribute("value") === "C") {
      inputs[i].addEventListener("click", function () {
        userInputs.innerHTML = "";
        result.innerHTML = "";
        opsBtn.forEach((el) => (el.disabled = false));
      });
    }
  }
}
