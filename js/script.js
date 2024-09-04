function change_display(value) {
  const display = document.querySelector("#display")
  if (display.textContent == 0) {
    display.textContent = value
  } else {
    display.textContent += value
  }
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(optr, a, b) {
  if (optr === '+') return add(a, b);
  else if (optr === '-') return subtract(a, b);
  else if (optr === '*') return multiply(a, b);
  else if (optr === '/') return divide(a, b);
  else return 0
}

let num1 = 0
let num2 = 0
let operator = ''
let curr = 0
