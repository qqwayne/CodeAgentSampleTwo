/**
 * Calculator App JavaScript
 * This file contains all the functionality for a basic calculator
 * supporting arithmetic operations, number input, and display management
 */

// Global variables to manage calculator state
let currentInput = ''; // Stores the current display value
let operator = ''; // Stores the current operator (+, -, *, /)
let previousInput = ''; // Stores the previous value for calculations
let shouldResetDisplay = false; // Flag to determine if display should be reset on next input

/**
 * Get reference to the display element
 * This element shows the current value and calculation results
 */
const display = document.getElementById('display');

/**
 * Appends a character (number or operator) to the display
 * @param {string} value - The character to append to the display
 */
function appendToDisplay(value) {
    // Remove error styling if present
    display.classList.remove('error');
    
    // If we should reset the display (after calculation or error), clear it first
    if (shouldResetDisplay) {
        display.value = '';
        shouldResetDisplay = false;
    }
    
    // Handle decimal point input
    if (value === '.') {
        // Prevent multiple decimal points in the same number
        if (display.value.includes('.') && !hasOperatorInDisplay()) {
            return;
        }
        // Add leading zero if display is empty or starts with operator
        if (display.value === '' || isLastCharOperator()) {
            display.value += '0.';
            return;
        }
    }
    
    // Handle operator input
    if (isOperator(value)) {
        // If display is empty, don't allow operators (except minus for negative numbers)
        if (display.value === '' && value !== '-') {
            return;
        }
        
        // If last character is an operator, replace it with the new operator
        if (isLastCharOperator()) {
            display.value = display.value.slice(0, -1) + value;
            return;
        }
    }
    
    // Append the value to display
    display.value += value;
}

/**
 * Checks if a character is an arithmetic operator
 * @param {string} char - Character to check
 * @returns {boolean} True if the character is an operator
 */
function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
}

/**
 * Checks if the last character in display is an operator
 * @returns {boolean} True if last character is an operator
 */
function isLastCharOperator() {
    const lastChar = display.value.slice(-1);
    return isOperator(lastChar);
}

/**
 * Checks if the display contains any operator
 * @returns {boolean} True if display contains an operator
 */
function hasOperatorInDisplay() {
    return /[+\-*/]/.test(display.value);
}

/**
 * Performs the calculation based on the current display value
 * Evaluates mathematical expressions and handles errors
 */
function calculate() {
    try {
        // Get the expression from display
        let expression = display.value;
        
        // Return if display is empty or ends with an operator
        if (expression === '' || isLastCharOperator()) {
            return;
        }
        
        // Replace display symbols with JavaScript operators
        expression = expression.replace(/×/g, '*').replace(/÷/g, '/');
        
        // Evaluate the expression safely
        const result = evaluateExpression(expression);
        
        // Check for division by zero or invalid results
        if (!isFinite(result)) {
            showError('Error: Division by zero');
            return;
        }
        
        // Display result with appropriate formatting
        const formattedResult = formatResult(result);
        display.value = formattedResult;
        
        // Set flag to reset display on next input
        shouldResetDisplay = true;
        
    } catch (error) {
        // Handle any calculation errors
        showError('Error: Invalid expression');
        console.error('Calculation error:', error);
    }
}

/**
 * Safely evaluates a mathematical expression
 * Uses Function constructor for safer evaluation than eval()
 * @param {string} expression - The mathematical expression to evaluate
 * @returns {number} The result of the evaluation
 */
function evaluateExpression(expression) {
    // Validate that expression only contains allowed characters
    if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
        throw new Error('Invalid characters in expression');
    }
    
    // Use Function constructor for safer evaluation
    return new Function('return ' + expression)();
}

/**
 * Formats the calculation result for display
 * Handles very large numbers, very small numbers, and decimal precision
 * @param {number} result - The number to format
 * @returns {string} Formatted result string
 */
function formatResult(result) {
    // Handle very large or very small numbers with scientific notation
    if (Math.abs(result) > 1e15 || (Math.abs(result) < 1e-6 && result !== 0)) {
        return result.toExponential(6);
    }
    
    // Round to avoid floating point precision issues
    const rounded = Math.round(result * 1e10) / 1e10;
    
    // Convert to string and limit decimal places if necessary
    let formatted = rounded.toString();
    
    // Limit display length to prevent overflow
    if (formatted.length > 12) {
        return parseFloat(formatted).toPrecision(8);
    }
    
    return formatted;
}

/**
 * Displays an error message and applies error styling
 * @param {string} message - Error message to display
 */
function showError(message) {
    display.value = message;
    display.classList.add('error');
    shouldResetDisplay = true;
    
    // Remove error styling after 2 seconds
    setTimeout(() => {
        display.classList.remove('error');
    }, 2000);
}

/**
 * Clears the entire display and resets calculator state
 * This is triggered by the 'C' (Clear) button
 */
function clearDisplay() {
    display.value = '';
    display.classList.remove('error');
    currentInput = '';
    operator = '';
    previousInput = '';
    shouldResetDisplay = false;
}

/**
 * Clears only the current entry, keeping previous calculations
 * This is triggered by the 'CE' (Clear Entry) button
 */
function clearEntry() {
    // If display contains operators, remove only the current number
    const operators = ['+', '-', '*', '/'];
    let lastOperatorIndex = -1;
    
    for (let i = display.value.length - 1; i >= 0; i--) {
        if (operators.includes(display.value[i])) {
            lastOperatorIndex = i;
            break;
        }
    }
    
    if (lastOperatorIndex !== -1) {
        // Keep everything up to and including the last operator
        display.value = display.value.substring(0, lastOperatorIndex + 1);
    } else {
        // No operators found, clear entire display
        display.value = '';
    }
    
    display.classList.remove('error');
    shouldResetDisplay = false;
}

/**
 * Deletes the last character from the display
 * This is triggered by the backspace (⌫) button
 */
function deleteLast() {
    if (display.value.length > 0) {
        display.value = display.value.slice(0, -1);
    }
    display.classList.remove('error');
    shouldResetDisplay = false;
}

/**
 * Keyboard event handler for calculator input
 * Allows users to interact with calculator using keyboard
 */
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Handle number keys
    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    }
    // Handle operator keys
    else if (['+', '-', '*', '/'].includes(key)) {
        appendToDisplay(key);
    }
    // Handle decimal point
    else if (key === '.') {
        appendToDisplay('.');
    }
    // Handle Enter and = for calculation
    else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    }
    // Handle Escape and c for clear
    else if (key === 'Escape' || key.toLowerCase() === 'c') {
        clearDisplay();
    }
    // Handle Backspace for delete
    else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
});

/**
 * Initialize calculator when page loads
 * Set up event listeners and initial state
 */
document.addEventListener('DOMContentLoaded', function() {
    // Focus on display for immediate keyboard input
    display.focus();
    
    // Prevent manual typing in display (keyboard events still work)
    display.addEventListener('keypress', function(event) {
        event.preventDefault();
    });
    
    console.log('Calculator initialized successfully');
});