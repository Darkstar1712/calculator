let firstNumber = "0";
let secondNumber = "0";
let operator = "";
const display = document.querySelector(".display");

setup();  

// Adds all the event listeners to the DOM
function setup() {
    document.querySelectorAll(".number").forEach(button => {
        button.addEventListener("click", () => addValueToNumber(button.textContent))    
    });
    
    document.querySelectorAll(".operator").forEach(button => {
        button.addEventListener("click", () => selectOperator(button))    
    });
    
    document.querySelector(".equals").addEventListener("click", () => equals()); 
    
    document.querySelector(".clear").addEventListener("click", () =>  clear());
}

// Adds the value of the pressed button to the current number
function addValueToNumber(value) {
    if (operator == "") {
        if (firstNumber.length <= 16 && firstNumber == "0") {
            firstNumber = value;
            display.textContent = firstNumber;
        } else if (firstNumber.length < 16) {
            firstNumber += value;
            display.textContent = numberWithCommas(firstNumber);
        }     
    } else {
        if (secondNumber.length <= 16 && secondNumber == "0") {
            secondNumber = value;
            display.textContent = secondNumber;
        } else if (secondNumber.length < 16) {
            secondNumber += value;
            display.textContent = numberWithCommas(secondNumber);
        }    
    }    
}

// Resets the calculator
function clear() {
    firstNumber = "0";
    secondNumber = "0";
    operator = "";
    display.textContent = firstNumber;
}

// Formats the number with commas
const numberWithCommas = function(x) {
    var parts = x.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

// Adds 2 numbers
const add = function(a, b) {
    return a + b;
};

// Subtracts second number from first
const subtract = function(a, b) {
    return a - b;
};

// Multiplies first number by second
const multiply = function(a, b) {
    return a * b;
};

// Divides first number by second
const divide = function(a, b) {
    return a / b;
};

const equals = function() {
    if(!operator.length == 0) {
        if (secondNumber == 0 && operator == "/") {
            display.textContent = "Cannot divide by zero";
            firstNumber = "0";
            secondNumber = "0";
            operator = "";
        } else {
            firstNumber = operate(firstNumber, secondNumber, operator).toString();
            secondNumber = "0";
            operator = "";
            display.textContent = numberWithCommas(firstNumber);
        }  
    }
}

// Sets the operator to the selected value
const selectOperator = function(button) {
    if (operator == "") {
        operator = button.textContent; 
    } else {
        firstNumber = operate(firstNumber, secondNumber, operator).toString();
        secondNumber = "0";
        operator = button.textContent;
        display.textContent = numberWithCommas(firstNumber);
    }    
}

// Takes two numbers and runs them through a function based on the value of the operator
const operate = function(first, second, operator) {
    a = parseFloat(first);
    b = parseFloat(second);
    
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}