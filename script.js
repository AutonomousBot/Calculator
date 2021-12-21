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
let numbersPair;

// Create const for results div.
const results = document.getElementById("results")

// Adds event to clear button which will make the results div empty.
const clearButton = document.getElementById("clear");
clearButton.onclick = function() {results.textContent = ""}

// Adds numbers when buttons are clicked to the results div.
const numberPad = document.getElementsByClassName("number");
for (let i = 0; i < numberPad.length; i++) {
  numberPad[i].onclick = function() {
    if (operator != "") {results.innerHTML = ""}
    results.textContent += `${numberPad[i].textContent}`
  }
}

// Adds event when operator is click on.
const operatorButton = document.getElementsByClassName("operator")
operatorButton.onclick = function() {numbersPair[0] = results.textContent}

// Takes operator and calls corresponding function-operation above for a and b.
function operate(operator, a, b) {
  if (operator == "+") { add(a,b) }
  else if (operator == "-") { substract(a,b) }
  else if (operator == "*") { substract(a,b) }
  else if (operator == "/") { substract(a,b) }
}