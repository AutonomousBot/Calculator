// Function for addition
function add(a,b) {
  return a+b
}

// Function for addition
function substract(a,b) {
  return a-b
}

// Function for multiplication
function multiply(a,b) {
  return a*b
}

// Function for division
function divide(a,b) {
  if (b == 0) {return "3RR0R. Cannot divide by 0."}
  return a/b
}

// Declares operator and numbers where we will store them.
let operator = "";
let numbersPair = [];
// declare counter clicks after operator button was pressed.
let clickCounter = 1

// Create const for results div.
const results = document.getElementById("results")

// Adds event to clear button which will make the results div empty.
const clearButton = document.getElementById("clear");
clearButton.onclick = function() {
  results.textContent = ""
  reset();
}

// Declares operator button.
const operatorButton = document.getElementsByClassName("operator")

let floatSize = ["0","0"]
// Adds numbers when buttons are clicked to the results div.
const numberPad = document.getElementsByClassName("number");
for (let i = 0; i < numberPad.length; i++) {
  numberPad[i].onclick = function() {
    // clears results div when a second number is entered.
    if ((operator != "" || operator == "=") && clickCounter < 1) {results.textContent = ""}

    // Turns number to one with exponant 10 if it gets too big. 
    if (isBig(results.textContent)) {results.textContent = expo(Number(results.textContent) + `${numberPad[i].textContent}`, 4)}
    else {results.textContent += `${numberPad[i].textContent}`}

    if (results.textContent.length > 21) {results.textContent = Number(results.textContent).toPrecision(15)}

    // Prevents user from clicking operator without numbers between.
    for (let i = 0; i < operatorButton.length; i++) {
      operatorButton[i].disabled = false;
    }
    clickCounter++
  }
}

// Adds event when operator is click on.
for (let i = 0; i < operatorButton.length; i++) {
  operatorButton[i].onclick = function() {
    // Resets color every time a new operator is clicked.
    for (let i = 0; i < operatorButton.length; i++) {
      operatorButton[i].style.setProperty("background-color", "")
    }
    // Adds last number to array. Check for decimal.
    arrayFloat(results.textContent)
    // Colors current operator.
    operatorButton[i].style.setProperty("background-color", "blue")
    // Calculates current pair if operator is clicked instead of equal sign.
    if (numbersPair.length == 2) {
      results.textContent = `${operate(operator, numbersPair[0], numbersPair[1])}`
      numbersPair = [];
      arrayFloat(results.textContent)
    }
    // Sets operator to current one.
    operator = operatorButton[i].id;
    clickCounter = 0;
    // Prevents user from clicking operator without numbers between.
    for (let i = 0; i < operatorButton.length; i++) {
      operatorButton[i].disabled = true;
    }
  }
}

//  Resets operations
function reset() {
  numbersPair = [];
  for (let i = 0; i < operatorButton.length; i++) {
    operatorButton[i].style.setProperty("background-color", "")
    operatorButton[i].disabled = false;
  }
}

// Adds event to equal operator.
const equalButton = document.getElementById("=")
equalButton.onclick = function() {
  if (operator == "" || operator == "="){return}
  // Adds last number to array. Check for decimal.
  arrayFloat(results.textContent)
  results.textContent = `${operate(operator, numbersPair[0], numbersPair[1])}`
  reset();
  operator = "=";
  clickCounter = 0;
}

// Takes operator and calls corresponding function-operation above for a and b.
function operate(operator, a, b) {
  let answer;
  if (operator == "+") { answer = add(a,b) }
  else if (operator == "-") { answer = substract(a,b) }
  else if (operator == "*") { answer = multiply(a,b) }
  else if (operator == "/") { answer = divide(a,b) }
  if (isFloat(answer) && !isNaN(answer)) {answer = answer.toFixed(6)}
  if (isBig(answer) && !isNaN(answer)) {answer = expo(answer, 4)}
  return answer;
}

// Adds event to backspace button.
const backspace = document.getElementById("Backspace")
backspace.onclick = function() {
  if (results.textContent.length > 0) {
    results.textContent = results.textContent.slice(0,-1)
  }
}

// Adds event to decimal key.
const decimal = document.getElementById(".")
decimal.onclick = function() {
  if (results.textContent == "") {results.textContent = "0."}
  // prevents user from inputting multiple decimals for a single number.
  if (!results.textContent.match(/[.]/)) {results.textContent += "."}
}

function arrayFloat(text) {
  if (text.match(/[.]/)) {
    numbersPair[numbersPair.length] = parseFloat(text)
  }
  else {
    numbersPair[numbersPair.length] = parseInt(text, 10)
  }
}

// Checks for floats.
function isFloat(number) {
  return number % 1 != 0;
}

// Checks for large numbers.
function isBig(number) {
  return number >= 10**10; 
} 

// Turns number to one with exponant 10.
function expo(x, f) {
  return Number.parseFloat(x).toExponential(f);
}

// Adds keyboard support.
let regexOperators = /[.\d\*\\\+\=\-]/
document.addEventListener('keydown', (event) => {
  let name = event.key;
  if ((new RegExp("Backspace")).test(name) || regexOperators.test(name)) {
    document.getElementById(`${name}`).click();
  }
  if (name == "Enter") {document.getElementById("=").click();}
  if (name == "c") {document.getElementById("clear").click();}
})