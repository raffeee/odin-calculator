function change_display(value) {
  // TODO: prepend 0 if value is decimal and res is true
  if (res) {
    display.textContent = value;
    res = false;
  } else if (evaluate) {
      display.textContent = value;
      evaluate = false;
  } else if (display.textContent === '0') {
    if (value === '.') {
      display.textContent += value;
    } else {
      display.textContent = value;
    }
  } else {
    display.textContent += value;
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
  return !isFinite(a / b) || isNaN(a / b) ? "#DIV/0!" : a / b;
}

function percent(a) {
  return a / 100;
}

function round(a, places) {
  const multiplier = Math.pow(10, places);
  return Math.round(a * multiplier) / multiplier;
}

function operate(optr, a, b) {
  result = 0;
  if (a && !b) { result = a }
  if (optr === '+') { result = add(a, b) }
  else if (optr === '-') { result = subtract(a, b) }
  else if (optr === '*') { result = multiply(a, b) }
  else if (optr === '/') { result = divide(a, b) }
  if (toString(result).length > 12) {
    result = round(result, 12)
  }
  return result
}

function reset_calc() {
  num1 = 0;
  num2 = 0;
  optr = '';
  output = 0;
  last_input = '';
  res = true;
  change_display(0);
  res = false;
  evaluate = false;
}

const display = document.querySelector("#display");
const calc_optrs = ['plus', 'minus', 'multiply', 'divide'];
const calc_funcs = ['percent', 'sign', 'allclear'];
let num1 = 0;
let num2 = 0;
let optr = '';
let output = 0;
let last_input = '';
let res = false;
let evaluate = false;

const numbers = document.querySelectorAll(".number")
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    if (last_input == 'equals') { reset_calc() }
    change_display(number.textContent)
  });
});


document.querySelector("#decimal").addEventListener("click", () => {
  if (display.textContent.includes('.')) { return null }
  else {
    change_display(decimal.textContent)
  }
});

const operators = document.querySelectorAll(".operator")
operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    if (calc_optrs.indexOf(last_input) > -1) {
        // Do not perform an evaluation when operations are pressed consecutively
    } else if (last_input == 'equals') {
      num1 = output
    } else {
      if (!num1) {
        num1 = parseFloat(display.textContent);
      } else if (last_input == 'equals' || calc_optrs.indexOf(last_input) > -1) {
        num2 = 0
        evaluate = true;
      } else {
        num2 = parseFloat(display.textContent);
        evaluate = true;
      }
    }
    if (evaluate) {
      output = operate(optr, num1, num2);
      change_display(output)
      num1 = output
    }
    optr = operator.textContent
    res = true;
  });
});

document.querySelector("#equals").addEventListener("click", () => {
  if (last_input == 'equals') {
      // Do not repeat evaluations on multiple equals clicks
  } else if (!num1) {
    num1 = parseFloat(display.textContent);
  } else if (calc_optrs.indexOf(last_input) > -1) {
    num2 = parseFloat(display.textContent);
    evaluate = true;
  } else {
    num2 = parseFloat(display.textContent);
    evaluate = true;
  }

  if (evaluate) {
    output = operate(optr, num1, num2);
    change_display(output)
    num1 = output
    num2 = 0
  }
});

// Convert to positive/negative value
document.querySelector("#sign").addEventListener("click", () => {
  if (display.textContent[0] === '-') {
    display.textContent = display.textContent.substring(1)
  } else {
    display.textContent = '-' + display.textContent
  }
});

document.querySelector("#allclear").addEventListener("click", () => {
  reset_calc();
});

// Track last pressed calculator button
const buttons = document.querySelectorAll("#buttons > button")
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // Avoid duplicate reassignments
    if (last_input !== button.id) {
      last_input = button.id
    }
  })
});
