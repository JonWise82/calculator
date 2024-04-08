// Wait for the document to fully load before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Initialize variables to keep track of inputs and the current operation
    let currentOperation = null;
    let currentInput = '';
    let previousInput = '';
    
    // Reference to the display element where results and inputs are shown
    const resultDisplay = document.getElementById('result');

    // Function to update the calculator's display
    const updateDisplay = (value) => {
        resultDisplay.innerText = value;
    };

    // Function to clear all inputs and reset the calculator
    const clearAll = () => {
        currentInput = '';
        previousInput = '';
        currentOperation = null;
        updateDisplay('0'); // Reset display to 0
    };

    // Function to handle number button clicks
    const inputNumber = (number) => {
        // Prevents the input from being too long for the display
        if (currentInput.length < 10) {
            currentInput += number;
            updateDisplay(currentInput);
        }
    };

    // Function to handle decimal point input
    const inputDecimal = () => {
        // Only add decimal if there isn't one already
        if (!currentInput.includes('.')) {
            if (currentInput === '') currentInput = '0';
            currentInput += '.';
            updateDisplay(currentInput);
        }
    };

    // Function to execute the calculation based on the current operation
    const calculate = () => {
        if (currentOperation && previousInput !== '') {
            let result;
            const prev = parseFloat(previousInput);
            const current = parseFloat(currentInput);

            // Perform the operation based on the type of operator
            switch (currentOperation) {
                case '+':
                    result = prev + current;
                    break;
                case '-':
                    result = prev - current;
                    break;
                case 'x':
                    result = prev * current;
                    break;
                case '/':
                    result = prev / current;
                    break;
                default:
                    return;
            }
            
            // Update the current input with the result and reset operation
            currentInput = result.toString();
            currentOperation = null;
            updateDisplay(currentInput);
        }
    };

    // Function to set the current operation and prepare for the next input
    const chooseOperation = (operation) => {
        if (currentInput === '') return;
        if (previousInput !== '') {
            calculate();
        }
        
        currentOperation = operation;
        previousInput = currentInput;
        currentInput = '';
    };

     // Function to handle percentage conversion
     const convertPercentage = () => {
        if (currentInput === '') return;
            currentInput = currentInput/100;
            updateDisplay(currentInput);
    };

    // Function to handle plus-minus
    const plusMinus = () => {
        if (currentInput === '') return;
            currentInput = currentInput * -1;
            updateDisplay(currentInput);
    };

    // Add event listeners to number buttons
    document.querySelectorAll('.number').forEach(button => {
        button.addEventListener('click', () => inputNumber(button.innerText));
    });

    // Add event listeners to operator buttons
    document.querySelectorAll('.operator').forEach(button => {
        button.addEventListener('click', () => chooseOperation(button.innerText));
    });

    // Add event listener for decimal point input
    document.getElementById('decimal').addEventListener('click', inputDecimal);
    
    // Add event listener for clearing the calculator
    document.getElementById('all-clear').addEventListener('click', clearAll);
    
    // Add event listener for executing the calculation
    document.getElementById('equals').addEventListener('click', calculate);

    // Add event listener for percentage
    document.getElementById('percentage').addEventListener('click', convertPercentage);

    // Add event listener for percentage
    document.getElementById('plus-minus').addEventListener('click', plusMinus);

    // Initialize the calculator to a clear state
    clearAll();
});
