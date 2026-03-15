// DOM
const display = document.getElementById("display");
const numbers = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".op");
const clearBtn = document.getElementById("clear");
const equalBtn = document.getElementById("equal");

let currentInput = "";

// Events for numbers
numbers.forEach((button) => {
  button.addEventListener("click", () => {
    currentInput += button.textContent;
    display.value = currentInput;
  });
});

// Events for operators
operators.forEach((button) => {
  button.addEventListener("click", () => {
    currentInput += button.textContent;
    display.value = currentInput;
  });
});

// Clear button
clearBtn.addEventListener("click", () => {
  currentInput = "";
  display.value = "";
});

// Equal button
equalBtn.addEventListener("click", () => {
  try {
    currentInput = eval(currentInput);
    display.value = currentInput;
  } catch {
    display.value = "Error";
  }
});
