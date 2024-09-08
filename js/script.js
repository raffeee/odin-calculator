function change_display(value) {
  const display = document.querySelector("#display");
  if (evaluate === true) {
    display.textContent = value;
    evaluate = false;
  } else if (display.textContent == 0 | res === true) {
    display.textContent = value;
    res = false;
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
  return a / b;
}

function percent(a) {
  return a / 100;
}

function round_result(a) {
  // 1000000000000 is 13 chars, the max length that fits the display div
  return Math.round((a + Number.EPSILON) * 1000000000000) / 1000000000000
}

function operate(optr, a, b) {
  result = 0;
  if (optr === '+') { result = add(a, b) }
  else if (optr === '-') { result = subtract(a, b) }
  else if (optr === '*') { result = multiply(a, b) }
  else if (optr === '/') { result = divide(a, b) }
  
  if (typeof(result) === 'number' && toString(result).length > 12) {
    result = round_result(result);
  }

  return result
}

function reset_calc() {
  num1 = 0;
  num2 = 0;
  optr = '';
  last_action = '';
  res = true;
  change_display(0);
  res = false;
  evaluate = false;
}

let num1 = 0;
let num2 = 0;
let optr = '';
let last_action = '';
let res = false;
let evaluate = false;

const numbers = document.querySelectorAll(".number")
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    if (last_action == '=') {
      reset_calc()
    }
    change_display(number.id)
  });
});

const operators = document.querySelectorAll(".operator")
operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    optr = operator.textContent;
    last_action = optr;
    res = true;
    if (num1) {
      if (last_action != '=') {
        num2 = parseInt(document.querySelector("#display").textContent);
      }
      evaluate = true;
      result = operate(optr, num1, num2);
      change_display(result);
      num1 = result;
    } else {
      num1 = parseInt(document.querySelector("#display").textContent);
    }
  });
});

document.querySelector("#equals").addEventListener("click", () => {
  if (num1) {
    // Evaluate current pair of values before doing another calculation
    if (last_action != '=') {
      num2 = parseInt(document.querySelector("#display").textContent);
    }
  } else {
    num1 = parseInt(document.querySelector("#display").textContent);
  }
  evaluate = true;
  result = operate(optr, num1, num2);
  change_display(result);
  num1 = result;
  last_action = '=';
})

document.querySelector("#allclear").addEventListener("click", () => {
  reset_calc();
});
