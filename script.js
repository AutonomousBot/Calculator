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

// Takes operator and calls corresponding function-operation above for a and b.
function operate(operator, a, b) {
  if (operator == "+") { add(a,b) }
  else if (operator == "-") { substract(a,b) }
  else if (operator == "*") { substract(a,b) }
  else if (operator == "/") { substract(a,b) }
}