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
clearButton.onclick = function() {results.textContent = ""}

// Adds numbers when buttons are clicked to the results div.
const numberPad = document.getElementsByClassName("number");
for (let i = 0; i < numberPad.length; i++) {
  numberPad[i].onclick = function() {
    // clears results div when a second number is entered.
    if ((operator != "" || operator == "=") && clickCounter < 1) {results.textContent = ""}
    results.textContent += `${numberPad[i].textContent}`
    clickCounter++
  }
}

// Adds event when operator is click on.
const operatorButton = document.getElementsByClassName("operator")
for (let i = 0; i < operatorButton.length; i++) {
  operatorButton[i].onclick = function() {
    numbersPair[numbersPair.length] = parseInt(results.textContent, 10)
    operatorButton[i].style.setProperty("background-color", "blue")
    if (operator == "" || operator == "=") {operator = operatorButton[i].id;}
    clickCounter = 0;
  }
}

//  Resets operations
function reset() {
  numbersPair = [];
  for (let i = 0; i < operatorButton.length; i++) {
    operatorButton[i].style.setProperty("background-color", "")
  }
}

// Adds event to equal operator.
const equalButton = document.getElementById("=")
equalButton.onclick = function() {
  if (operator == "" || operator == "="){return}
  // Adds last number to array.
  numbersPair[numbersPair.length] = parseInt(results.textContent, 10)
  results.textContent = `${operate(operator, numbersPair[0], numbersPair[1])}`
  reset();
  operator = "=";
  clickCounter = 0;
}

// Takes operator and calls corresponding function-operation above for a and b.
function operate(operator, a, b) {
  if (operator == "+") { return add(a,b) }
  else if (operator == "-") { return substract(a,b) }
  else if (operator == "*") { return multiply(a,b) }
  else if (operator == "/") { return divide(a,b) }
}

// features to add: prevent user from clicking an operator twice in a row.