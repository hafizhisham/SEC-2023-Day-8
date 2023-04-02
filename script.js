const calculatorDisplay = document.querySelector("#display");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

let firstValue = 0;
let operatorValue = "";
let nextValue = false;

function numberValue(number) {
  if (nextValue) {
    calculatorDisplay.textContent = number;
    nextValue = false;
  } else {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}

function addDecimal() {
  if (nextValue) return;
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

const calculate = {
  "/": (firstNumber, secoundNumber) => firstNumber / secoundNumber,
  "*": (firstNumber, secoundNumber) => firstNumber * secoundNumber,
  "+": (firstNumber, secoundNumber) => firstNumber + secoundNumber,
  "-": (firstNumber, secoundNumber) => firstNumber - secoundNumber,
  "=": (firstNumber, secoundNumber) => secoundNumber,
};

function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  if (operatorValue && nextValue) {
    operatorValue = operator;
    return;
  }
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  nextValue = true;
  operatorValue = operator;
}

inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => numberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});

clearBtn.addEventListener("click", clearAll);

function clearAll() {
  firstValue = 0;
  operatorValue = "";
  nextValue = false;
  calculatorDisplay.textContent = "0";
}
