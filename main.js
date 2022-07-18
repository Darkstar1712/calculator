const calculator = {
    displayValue: "0",
    firstNumber: null,
    secondNumber: null,
    waitingForSecondNumber: false,
    operator: null,
    previousOperator: null,
    positive: true
};

// Adds all the event listeners to the DOM
const buttons = document.querySelector(".buttons");

buttons.addEventListener("click", (e) => {
    handleInput(e);
});

window.addEventListener("keydown", (e) => {
    handleInput(e);
})

function handleInput(input) {
    const { target } = input;
    const key = input.key
    let value = target.dataset.value;

    if (key) {
        value = key;
    }

    Array.from(buttons.children)
      .forEach(k => k.classList.remove('is-depressed'))

    switch (value) {
        case "+":
        case "-":
        case "*":
        case "/":
        case "=":
            selectOperator(value);
            break;
        case "Enter":
            selectOperator("=");
            break;
        case ".":
            inputDecimal(value);
            break;
        case "all-clear":
            resetCalculator();
            break;
        case "Backspace":
            backspace();
            break;
        case "negative":
            positiveNegative();
            break;
        default:
            if (Number.isInteger(parseFloat(value))) {
            inputNumber(value);
        }
    }
    
    updateDisplay();
}

// Updates the value of the display
function updateDisplay() {
    const display = document.querySelector(".display");
    
    display.textContent = calculator.displayValue;
}

function highlightButtonOnClick(button) {
    button.classList.add("is-depressed");
}

// Adds the value of the pressed button to the current number
function inputNumber(number) {
    const { displayValue, waitingForSecondNumber } = calculator;

    if (waitingForSecondNumber === true) {
        calculator.displayValue = number;
        calculator.waitingForSecondNumber = false;
        calculator.positive = true;
    } else {
        calculator.displayValue = displayValue === "0" ? number : displayValue + number;
    }
}

// Adds a decimal point if one isn"t already present
function inputDecimal(decimal) {
    if (calculator.waitingForSecondNumber === true) {
        calculator.displayValue = "0."
        calculator.waitingForSecondNumber = false;
        return;
    }

    if (!calculator.displayValue.includes(decimal)) {
        calculator.displayValue += decimal;
    }
}

// Handles the processing of the operator buttons
function selectOperator(nextOperator) {
    const { firstNumber, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);

    if (nextOperator != "=") {
        Array.from(buttons.children)
        .forEach(k => k.dataset.value === nextOperator ? highlightButtonOnClick(k): null)
    }

    if (operator && calculator.waitingForSecondNumber) {
        calculator.operator = nextOperator;
        return;
    }

    if (firstNumber === null && !isNaN(inputValue)) {
      calculator.firstNumber = inputValue;
    } else if (operator) {
        const result = calculate(firstNumber, inputValue, operator); 
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstNumber = result;
    }
  
    calculator.waitingForSecondNumber = true;
    calculator.operator = nextOperator;
}

// Resets the calculator back to the default state
function resetCalculator() {
    calculator.displayValue = "0";
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
    calculator.operator = null;
    calculator.positive = true;
}

// Removes the last input from the display
function backspace() {
    const { displayValue } = calculator;

    if (displayValue.length === 1) {
        calculator.displayValue = "0";
    } else {
        calculator.displayValue = displayValue.slice(0, -1);    
    }
}

// Switches the input from positive to negative and vice versa
function positiveNegative() {
    const { positive, displayValue } = calculator;

    if (displayValue === "0") {
        return;
    }

    if (positive === true) {
        calculator.positive = false;
        calculator.displayValue = "-" + displayValue;
    } else {
        calculator.positive = true;
        calculator.displayValue = displayValue.replace("-", "");    
    }
}

// Calculates the two numbers based on the operator
function calculate(firstNumber, secondNumber, operator) {
    switch (operator) {
        case "+":
            return add(firstNumber, secondNumber);
        case "-":
            return subtract(firstNumber, secondNumber);
        case "*":
            return multiply(firstNumber, secondNumber);
        case "/":
            return divide(firstNumber, secondNumber);
    }

    return secondNumber;
}

// Adds 2 numbers
function add(a, b) {
    return a + b;
};

// Subtracts second number from first
function subtract(a, b) {
    return a - b;
};

// Multiplies first number by second
function multiply(a, b) {
    return a * b;
};

// Divides first number by second
function divide(a, b) {
    return a / b;
};